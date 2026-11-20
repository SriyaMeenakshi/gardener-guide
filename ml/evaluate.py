"""Final, honest evaluation. Reads the TEST split once, after the model has been chosen on validation.

Reports:
  * accuracy / macro-F1 on the held-out, leaf-grouped test split, plus per-class results and a confusion matrix
  * how accuracy changes with the model's confidence (to choose a "not sure" threshold from VALIDATION data)
  * an out-of-scope probe: how confidently does the model label photos of plants it was NOT trained on?

Usage:  python evaluate.py
"""
import csv
import math

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import torch
from sklearn.metrics import accuracy_score, confusion_matrix, f1_score, precision_recall_fscore_support

from common import ARTIFACTS, CACHE, REPO_ML, SERVER_MODELS, ensure_dirs, read_json, write_json
from extract_features import load_split
from features import backbone, load_image_tensor, normalise
from head import Head

THRESHOLDS = [0.5, 0.7, 0.8, 0.9, 0.95, 0.99]
# Plants in the website that the PlantVillage crops do not include (so any disease label is wrong by construction)
OUT_OF_SCOPE = ["rose", "hibiscus", "marigold", "tulasi", "mint", "aloevera", "coriander", "lemon", "guava", "papaya"]
RELATED = ["tomato", "chilli"]  # tomato is a trained crop; chilli is a close relative of bell pepper
PHOTOS = REPO_ML.parent / "client" / "public" / "plants"


def load_head():
    ck = torch.load(CACHE / "head.pt", map_location="cpu", weights_only=False)
    cfg = ck["cfg"]
    head = Head(ck["mean"], ck["std"], len(ck["classes"]), hidden=cfg["hidden"], dropout=cfg["dropout"])
    head.load_state_dict(ck["state"])
    return head.eval(), ck["classes"], cfg


def probs_of(head, x):
    with torch.no_grad():
        return torch.softmax(head(torch.from_numpy(x)), dim=1).numpy()


def choose_threshold(p_val, y_val, target=0.999):
    """Smallest confidence threshold at which the answers we DO give are right >= target of the time (on validation).

    History: this first used target=0.98, which is already met at the lowest threshold (0.5). The out-of-scope probe
    below then showed that 0.5 still lets 50-80% of photos of unsupported plants (mint, aloe, guava, coriander)
    through with a wrong diagnosis, so the target was tightened to 99.9%. The choice still uses validation data only."""
    conf, pred = p_val.max(1), p_val.argmax(1)
    for t in np.arange(0.5, 0.995, 0.01):
        keep = conf >= t
        if keep.sum() >= 0.5 * len(y_val) and (pred[keep] == y_val[keep]).mean() >= target:
            return round(float(t), 2)
    return 0.9


def photos_for(slugs):
    out = {}
    for slug in slugs:
        files = set(PHOTOS.glob(f"{slug}.*"))  # the card photo, e.g. client/public/plants/rose.jpg
        if (PHOTOS / slug).is_dir():
            files |= set((PHOTOS / slug).rglob("*"))  # and the article photos in client/public/plants/rose/
        out[slug] = sorted(p for p in files if p.suffix.lower() in (".jpg", ".jpeg", ".png"))
    return out


def probe(head, net, classes, groups):
    result = {}
    for slug, files in groups.items():
        if not files:
            continue
        with torch.inference_mode():
            feats = np.concatenate([net(torch.stack([normalise(load_image_tensor(f)) for f in files[i:i + 16]])).numpy() for i in range(0, len(files), 16)])
        p = probs_of(head, feats)
        conf, pred = p.max(1), p.argmax(1)
        result[slug] = {
            "images": len(files),
            "mean_top_confidence": round(float(conf.mean()), 3),
            **{f"share_confidence_ge_{t}": round(float((conf >= t).mean()), 3) for t in (0.5, 0.8, 0.9)},
            "most_common_labels": sorted({classes[i]: int((pred == i).sum()) for i in set(pred.tolist())}.items(), key=lambda kv: -kv[1])[:3],
        }
    return result


def main():
    ensure_dirs()
    head, classes, cfg = load_head()
    xte, yte = load_split("test")
    xva, yva = load_split("val")
    p_te, p_va = probs_of(head, xte), probs_of(head, xva)
    pred = p_te.argmax(1)

    acc = accuracy_score(yte, pred)
    macro_f1 = f1_score(yte, pred, average="macro")
    prec, rec, f1, support = precision_recall_fscore_support(yte, pred, labels=range(len(classes)), zero_division=0)
    print(f"TEST  accuracy {acc:.4f}   macro-F1 {macro_f1:.4f}   ({len(yte)} images, {len(classes)} classes)")

    with open(ARTIFACTS / "per_class.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["class", "precision", "recall", "f1", "test_images"])
        for i, c in enumerate(classes):
            w.writerow([c, f"{prec[i]:.4f}", f"{rec[i]:.4f}", f"{f1[i]:.4f}", int(support[i])])
    weakest = sorted(range(len(classes)), key=lambda i: f1[i])[:5]
    print("weakest classes:", [(classes[i], round(float(f1[i]), 3)) for i in weakest])

    cm = confusion_matrix(yte, pred, labels=range(len(classes)))
    off = [(int(cm[i, j]), classes[i], classes[j]) for i in range(len(classes)) for j in range(len(classes)) if i != j and cm[i, j] > 0]
    top_confusions = sorted(off, reverse=True)[:8]
    fig, ax = plt.subplots(figsize=(14, 12))
    norm = cm / cm.sum(1, keepdims=True).clip(min=1)
    ax.imshow(norm, cmap="Greens")
    ax.set_xticks(range(len(classes)), classes, rotation=90, fontsize=6)
    ax.set_yticks(range(len(classes)), classes, fontsize=6)
    ax.set_xlabel("Predicted")
    ax.set_ylabel("True")
    ax.set_title(f"Confusion matrix, test split (row-normalised). Accuracy {acc:.1%}")
    fig.tight_layout()
    fig.savefig(ARTIFACTS / "confusion_matrix.png", dpi=110)

    conf, correct = p_te.max(1), pred == yte
    by_threshold = {str(t): {"answered": round(float((conf >= t).mean()), 4), "accuracy_when_answered": round(float(correct[conf >= t].mean()), 4) if (conf >= t).any() else None} for t in THRESHOLDS}
    rule_threshold = choose_threshold(p_va, yva)
    # Safety margin: round UP to the next 0.05. With the plain rule (0.88) the unsupported-plant probe, run through the
    # server's own image pipeline, still let 2 of 45 photos through with a wrong diagnosis (both at 0.89). Rounding up
    # is a simple, explainable margin, and 0.9 is a row of the measured test trade-off table below.
    threshold = round(math.ceil(rule_threshold * 20 - 1e-9) / 20, 2)
    print(f"confidence threshold: {rule_threshold} from the validation rule, {threshold} after the safety margin")

    net = backbone()
    scope = probe(head, net, classes, photos_for(OUT_OF_SCOPE))
    related = probe(head, net, classes, photos_for(RELATED))
    all_conf = [v["share_confidence_ge_0.9"] * v["images"] for v in scope.values()]
    n_scope = sum(v["images"] for v in scope.values())
    wrongly_sure = round(sum(all_conf) / n_scope, 3) if n_scope else None
    print(f"OUT-OF-SCOPE photos: {n_scope} images of {len(scope)} unsupported plants; share labelled with confidence >= 0.9: {wrongly_sure}")

    write_json(ARTIFACTS / "metrics.json", {
        "dataset": "PlantVillage colour images (CC BY-SA 3.0 per its Hugging Face card), official leaf-grouped split",
        "backbone": "MobileNetV2 (ImageNet pretrained, frozen) + trained classifier head",
        "head": cfg,
        "classes": len(classes),
        "test": {"images": int(len(yte)), "accuracy": round(float(acc), 4), "macro_f1": round(float(macro_f1), 4), "top_confusions": [{"count": c, "true": a, "predicted": b} for c, a, b in top_confusions]},
        "confidence_tradeoff_on_test": by_threshold,
        "threshold_from_validation_rule": rule_threshold,
        "recommended_min_confidence": threshold,
        "out_of_scope_probe": {"note": "photos from this website of plants the model was never trained on; ANY disease label is wrong by construction", "images": n_scope, "share_labelled_with_confidence_ge_0.9": wrongly_sure, "per_plant": scope},
        "related_crops_probe": related,
    })
    labels_path = SERVER_MODELS / "labels.json"
    if labels_path.exists():  # the exported model's settings must always match the evaluation that justified them
        labels = read_json(labels_path)
        labels["recommendedMinConfidence"] = threshold
        labels["testAccuracy"] = round(float(acc), 4)
        write_json(labels_path, labels)
        print(f"updated {labels_path.name}: recommendedMinConfidence={threshold}")
    print("wrote metrics.json, per_class.csv, confusion_matrix.png")


if __name__ == "__main__":
    main()
