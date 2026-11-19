"""Shared paths and constants for the plant-disease model pipeline.

Heavy files (dataset images, cached features) live OUTSIDE the repo, in GG_ML_DIR (default ~/gg-ml).
Only small, final artifacts (model.onnx, labels.json, metrics) are written to ml/artifacts and committed.
"""
import json
import os
from pathlib import Path

REPO_ML = Path(__file__).resolve().parent
ARTIFACTS = REPO_ML / "artifacts"  # metrics, per-class results, confusion matrix
SERVER_MODELS = REPO_ML.parent / "server" / "models"  # the exported model the Node server loads at runtime
WORK = Path(os.environ.get("GG_ML_DIR", Path.home() / "gg-ml"))

DATA = WORK / "data"          # extracted colour images: DATA/color/<class>/<file>.JPG
META = WORK / "meta"          # official split files and leaf map from the dataset repo
CACHE = WORK / "cache"        # extracted feature vectors

HF_REPO = "mohanty/PlantVillage"
ZIP_URL = f"https://huggingface.co/datasets/{HF_REPO}/resolve/main/data.zip"

IMG_SIZE = 224
MEAN = (0.485, 0.456, 0.406)  # ImageNet statistics, as the pretrained network expects
STD = (0.229, 0.224, 0.225)


def ensure_dirs():
    for d in (WORK, DATA, META, CACHE, ARTIFACTS, SERVER_MODELS):
        d.mkdir(parents=True, exist_ok=True)


def read_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def write_json(path, obj):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=2, ensure_ascii=False)
        f.write("\n")
