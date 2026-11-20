# Plant Doctor: the on-device disease model

A small image classifier, trained from scratch-to-finish on a laptop CPU, that powers the free version of the
Plant Doctor page. It runs inside the Node server (ONNX Runtime), so there is **no API key, no per-photo cost, and the
photo never leaves the server.**

## What it is

| | |
|---|---|
| Task | Classify a leaf photo into one of **38 classes** (14 crops, healthy or one of 26 diseases) |
| Data | [PlantVillage](https://github.com/spMohanty/PlantVillage-Dataset), colour images, 54,305 photos |
| Model | MobileNetV2 (ImageNet-pretrained, **frozen**) as a feature extractor + a small trained head (1280 -> 512 -> 38) |
| Size / speed | 11 MB ONNX file; about 1.2 s per photo end to end (browser upload to answer) on a laptop CPU |
| Output | Class probabilities. The server maps each class to advice in the `Disease` knowledge base |

**Crops it knows:** apple, bell pepper, blueberry, cherry, corn, grape, orange, peach, potato, raspberry, soybean,
squash, strawberry, tomato.  Of this website's own plants only **tomato** is covered (and chilli, loosely, via pepper).
It has never seen a rose, mint, hibiscus, aloe, marigold, tulasi, coriander, lemon, guava or papaya.

## Results (measured, not estimated)

Evaluated **once**, on a held-out test set the model never trained on or was tuned against.

| Metric | Value |
|---|---|
| Test images | 9,846 (leaf-disjoint from training, see "Avoiding leakage") |
| **Accuracy** | **98.3 %** |
| Macro-F1 (treats all 38 classes equally) | 0.979 |
| Weakest classes (F1) | Corn gray leaf spot 0.91, Tomato early blight 0.91, Tomato target spot 0.92 |
| Most common mix-ups | Potato late blight -> Tomato late blight (17), Tomato spider mites -> Target spot (13), Corn gray leaf spot -> Northern leaf blight (10) |

Full per-class numbers: [`artifacts/per_class.csv`](artifacts/per_class.csv). Confusion matrix:
[`artifacts/confusion_matrix.png`](artifacts/confusion_matrix.png). Everything: [`artifacts/metrics.json`](artifacts/metrics.json).

**Saying "not sure" is a feature.** The app only gives a diagnosis when the model's confidence is at least **0.90**.

| Confidence threshold | Share of test photos answered | Accuracy of those answers |
|---|---|---|
| 0.5 | 97.2 % | 99.1 % |
| 0.7 | 92.6 % | 99.7 % |
| 0.9 | 77.5 % | 99.97 % |

Below the threshold the user sees "Not sure, try another photo" plus tips, never a shaky diagnosis.

## What these numbers do NOT tell you

Please read this part before quoting 98 %.

1. **PlantVillage photos are taken in a lab:** one leaf, plain background, even light. 98 % is accuracy on *that kind
   of photo*. Published studies consistently find that models trained on PlantVillage do much worse on ordinary garden
   photos (messy background, shadows, partial leaves). We did not have a labelled set of garden photos, so **real-world
   accuracy is unknown and expected to be lower.** The app says this on the page.
2. **It always answers with one of its 38 classes.** There is no "this is not a leaf" or "this is a rose" class.
   We measured what happens on **45 photos from this website of 10 unsupported plants**. The average top confidence
   was low (0.26-0.60). At the app's threshold of 0.90, **0 of 45 get a diagnosis** when run through the server's own
   image pipeline (1 of 45 in the Python pipeline: a photo sitting right at the line). It is not a comfortable margin:
   a peppermint photo scored 0.895 ("Strawberry leaf scorch") and an aloe photo 0.893, just under the line. At the
   threshold of 0.5 that first looked reasonable, 50-80 % of mint, aloe, coriander and guava photos would have been
   diagnosed wrongly. The probe is small and informal; it is a warning sign, not a guarantee. The structural fix is an
   explicit "not a leaf / unknown plant" class, not a higher threshold.
3. **Six PlantVillage test photos were also run through the full app** (browser upload -> server -> advice) as a
   smoke test: 4 correct and confident, 2 correct but below the confidence bar (so shown as "not sure"). That is a
   check that the plumbing works, not an accuracy estimate.

## How it was built

```
download_data.py     colour images only (840 MB of the 2.2 GB zip), CRC-verified
make_splits.py       train / validation / test, grouped by physical leaf
extract_features.py  frozen MobileNetV2 -> 1280-d vector per image, cached (~40 min on CPU)
train_head.py        trains 8 head variants, picks the best on VALIDATION only
evaluate.py          scores the test set once; confidence trade-off; unsupported-plant probe
export_onnx.py       backbone + head + softmax -> one ONNX file in server/models/
```

Why frozen features: the machine has no GPU, and fine-tuning the whole network on 54k images on a laptop CPU takes
many hours. Caching the features lets the head be trained and tuned in minutes. The cost is some accuracy versus a
fully fine-tuned network; fine-tuning the last blocks is the natural next step if more accuracy is needed.

### Avoiding leakage
PlantVillage has several photos of the *same leaf*. A random split would put near-duplicates on both sides and inflate
accuracy. We use the dataset authors' leaf-grouped split and carve validation out of train by leaf. We then found that
even the official split shares 129 leaves between train and test, so **we removed those 863 test images (8.1 %)**; no
physical leaf is in both training and test.

### What was decided on which data
- Head type and hyper-parameters: chosen on **validation** (MLP with 512 hidden units; macro-F1 0.978 vs 0.967 for a linear head).
- Confidence threshold: the rule is "smallest threshold where answered **validation** photos are >= 99.9 % correct",
  which gives 0.88. The first version of the rule used 98 %, already met at the lowest threshold (0.5); the
  unsupported-plant probe showed that was too lax, so the target was tightened. Then the same probe, run through the
  server's pipeline, showed 2 of 45 unsupported photos still passing at 0.88 (both at 0.89), so the value is **rounded up to
  the next 0.05, giving 0.90**. Both adjustments were judgement calls made after looking at that probe (which is
  separate from the test set), and both are recorded in `evaluate.py` and `metrics.json`.
- Test set: used for the final report only.

### Making sure the server matches training
Training preprocesses with Python/PIL; the server preprocesses with `sharp`. Different resampling code gives slightly
different pixels, so the server's settings were chosen by measurement (`server/scripts/tune-resize.mjs`): bilinear
with shrink-on-load off was the best of 12 combinations (the first guess, Lanczos, was among the worst).
On 12 site photos the probabilities differ by at most 0.049 (mean 0.01), clear winners are always the same class, and the
"answer or not sure" decision always agrees. One photo flips its top-1 between two classes that are tied at about 25 %
(0.255 vs 0.253); that is a coin flip, not an error. Differences are largest on flat, low-confidence photos.
A test in `server/test/local-detector.test.js` guards all of this.

## Reproduce it

```bash
python -m venv venv && venv\Scripts\activate
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
pip install -r requirements.txt
set GG_ML_DIR=C:\path\with\4GB\free        # dataset and cached features go here, outside the repo
python download_data.py && python make_splits.py && python extract_features.py
python train_head.py && python evaluate.py && python export_onnx.py
```
Expect about 40 minutes for feature extraction and 30-60 minutes for head training on a laptop CPU.

## Data licence and attribution
PlantVillage images: Hughes & Salathé (2015), *An open access repository of images on plant health to enable the
development of mobile disease diagnostics*; Mohanty, Hughes & Salathé (2016), *Using deep learning for image-based plant
disease detection*, Frontiers in Plant Science. The Hugging Face dataset card lists the licence as **CC BY-SA 3.0**
(some other sources describe the original release as CC0). The images are **not** included in this repository. The
trained weights are derived from them; if you redistribute the model, check that licence yourself.

## Known limits and next steps
- Frozen backbone: fine-tuning the last blocks should add accuracy (needs more compute time).
- Only 14 crops. Adding a labelled set of *garden* photos (and plants like rose or mint) would fix the biggest gap.
- Add an explicit "not a plant leaf" class, or a proper out-of-distribution detector, instead of relying on a threshold.
- The advice texts in the knowledge base are general guidance and should be reviewed by someone who knows plant care.
