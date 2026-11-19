"""Bundle backbone + head into ONE ONNX file the Node server can run (no Python needed in production).

Input : float32 NCHW RGB, shape (N, 3, 224, 224), values in [0, 1]   (normalisation is baked into the graph)
Output: float32 (N, 38) class probabilities (softmax baked in)

Also writes labels.json and parity.json (reference answers for a few site photos) so the Node preprocessing
can be tested against this Python pipeline.
Usage:  python export_onnx.py
"""
import numpy as np
import onnxruntime as ort
import torch
from torch import nn

from common import ARTIFACTS, CACHE, DATA, IMG_SIZE, MEAN, REPO_ML, SERVER_MODELS, STD, ensure_dirs, read_json, write_json
from evaluate import load_head, photos_for
from features import backbone, load_image_tensor, normalise


class Packaged(nn.Module):
    def __init__(self, net, head):
        super().__init__()
        self.net, self.head = net, head
        self.register_buffer("mean", torch.tensor(MEAN).view(1, 3, 1, 1))
        self.register_buffer("std", torch.tensor(STD).view(1, 3, 1, 1))

    def forward(self, image):
        return torch.softmax(self.head(self.net((image - self.mean) / self.std)), dim=1)


def export(model, path):
    dummy = torch.rand(1, 3, IMG_SIZE, IMG_SIZE)
    kwargs = dict(input_names=["image"], output_names=["probs"], dynamic_axes={"image": {0: "batch"}, "probs": {0: "batch"}}, opset_version=17)
    try:
        torch.onnx.export(model, dummy, str(path), dynamo=False, **kwargs)  # classic exporter: no extra dependencies
    except TypeError:
        torch.onnx.export(model, dummy, str(path), **kwargs)  # older torch has no `dynamo` argument


def main():
    ensure_dirs()
    head, classes, _ = load_head()
    model = Packaged(backbone(), head).eval()
    path = SERVER_MODELS / "model.onnx"
    export(model, path)
    print(f"wrote {path.name}: {path.stat().st_size / 1e6:.1f} MB")

    # 1) the exported graph must agree with PyTorch on real test images
    test = read_json(CACHE / "splits.json")["test"]
    rng = np.random.default_rng(0)
    pick = [test[i] for i in rng.choice(len(test), 64, replace=False)]
    batch = torch.stack([load_image_tensor(DATA / "color" / rel) for rel, _ in pick])
    sess = ort.InferenceSession(str(path), providers=["CPUExecutionProvider"])
    with torch.no_grad():
        ref = model(batch).numpy()
    got = sess.run(None, {"image": batch.numpy()})[0]
    diff = float(np.abs(ref - got).max())
    same = bool((ref.argmax(1) == got.argmax(1)).all())
    print(f"ONNX vs PyTorch on 64 test images: max |prob diff| = {diff:.2e}, identical predictions = {same}")
    assert diff < 1e-3 and same, "exported model does not match PyTorch"
    acc = float((got.argmax(1) == np.array([y for _, y in pick])).mean())
    print(f"(sanity) accuracy of the ONNX model on that sample: {acc:.3f}")

    # 2) labels + reference answers for the Node parity test
    metrics = read_json(ARTIFACTS / "metrics.json")
    crops = sorted({c.split("___")[0] for c in classes})
    write_json(SERVER_MODELS / "labels.json", {
        "classes": classes,
        "crops": crops,
        "inputSize": IMG_SIZE,
        "preprocessing": "RGB, centre-crop to a square, resize to 224x224 (bilinear), float32 in [0,1], NCHW. Normalisation is inside the model.",
        "recommendedMinConfidence": metrics["recommended_min_confidence"],
        "testAccuracy": metrics["test"]["accuracy"],
    })
    refs = []
    for slug in ("tomato", "rose", "mint", "chilli"):
        for f in photos_for([slug])[slug][:3]:
            p = sess.run(None, {"image": load_image_tensor(f).unsqueeze(0).numpy()})[0][0]
            top = np.argsort(-p)[:3]
            refs.append({"file": f.relative_to(REPO_ML.parent).as_posix(), "top": [{"index": int(i), "prob": round(float(p[i]), 5)} for i in top]})
    write_json(SERVER_MODELS / "parity.json", refs)
    print(f"wrote labels.json and parity.json ({len(refs)} reference photos)")


if __name__ == "__main__":
    main()
