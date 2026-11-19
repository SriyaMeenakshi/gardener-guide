"""Run every image through the frozen backbone ONCE and cache the 1280-d feature vectors.

Why: this machine has no GPU, and fine-tuning a whole network on 54k images on a laptop CPU takes many hours.
Caching features lets the classifier head be trained in seconds, as many times as needed to tune it.

Resumable: features are saved in chunks, and finished chunks are skipped on re-run.
Usage:  python extract_features.py [--limit N]   (N = quick benchmark on N images per split)
"""
import argparse
import time

import numpy as np
import torch
from torch.utils.data import DataLoader, Dataset

from common import CACHE, DATA, ensure_dirs, read_json
from features import backbone, load_image_tensor, normalise

CHUNK = 2048


class Images(Dataset):
    def __init__(self, items):
        self.items = items

    def __len__(self):
        return len(self.items)

    def __getitem__(self, i):
        rel, label = self.items[i]
        return normalise(load_image_tensor(DATA / "color" / rel)), label


def extract(split, items, net, workers):
    out_dir = CACHE / "feats"
    out_dir.mkdir(exist_ok=True)
    started, done_images = time.time(), 0
    for k, start in enumerate(range(0, len(items), CHUNK)):
        path = out_dir / f"{split}_{k:04d}.npz"
        chunk = items[start:start + CHUNK]
        if path.exists():
            done_images += len(chunk)
            continue
        loader = DataLoader(Images(chunk), batch_size=32, num_workers=workers, shuffle=False)
        feats, labels = [], []
        with torch.inference_mode():
            for x, y in loader:
                feats.append(net(x).numpy().astype(np.float32))
                labels.append(y.numpy())
        np.savez(path, x=np.concatenate(feats), y=np.concatenate(labels))
        done_images += len(chunk)
        rate = done_images / max(time.time() - started, 1e-6)
        print(f"[{split}] {min(start + CHUNK, len(items))}/{len(items)}  ~{rate:.1f} img/s", flush=True)


def load_split(split):
    paths = sorted((CACHE / "feats").glob(f"{split}_*.npz"))
    parts = [np.load(p) for p in paths]
    return np.concatenate([p["x"] for p in parts]), np.concatenate([p["y"] for p in parts])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0, help="only the first N images of each split (benchmark)")
    # 0 = decode images in the main process. PlantVillage images are small (256 px) and decode far faster than the
    # model runs, and every worker process would load its own copy of PyTorch (hundreds of MB each).
    ap.add_argument("--workers", type=int, default=0)
    args = ap.parse_args()

    ensure_dirs()
    splits = read_json(CACHE / "splits.json")
    torch.set_num_threads(max(1, torch.get_num_threads() - args.workers))
    net = backbone()
    for name in ("train", "val", "test"):
        items = splits[name][: args.limit] if args.limit else splits[name]
        extract(name if not args.limit else f"bench_{name}", items, net, args.workers)
    print("done")


if __name__ == "__main__":
    main()
