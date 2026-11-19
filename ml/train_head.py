"""Train the classifier head on the cached features and pick the best variant using the VALIDATION set only.

The test set is never touched here; evaluate.py reads it once, at the end.
Usage:  python train_head.py
"""
import itertools
import time

import numpy as np
import torch
from sklearn.metrics import accuracy_score, f1_score
from torch import nn

from common import ARTIFACTS, CACHE, ensure_dirs, read_json, write_json
from extract_features import load_split
from head import Head

EPOCHS = 40
BATCH = 256
SEED = 0


def class_weights(y, n_classes):
    counts = np.bincount(y, minlength=n_classes).astype(np.float64)
    w = 1.0 / np.sqrt(counts)  # soften full inverse-frequency weighting
    return torch.tensor(w / w.mean(), dtype=torch.float32)


def fit(xtr, ytr, xva, yva, n_classes, hidden, weighted, weight_decay, dropout):
    torch.manual_seed(SEED)
    mean, std = xtr.mean(0), xtr.std(0) + 1e-6
    model = Head(mean, std, n_classes, hidden=hidden, dropout=dropout)
    loss_fn = nn.CrossEntropyLoss(weight=class_weights(ytr.numpy(), n_classes) if weighted else None, label_smoothing=0.05)
    opt = torch.optim.AdamW(model.parameters(), lr=2e-3, weight_decay=weight_decay)
    steps = EPOCHS * ((len(xtr) + BATCH - 1) // BATCH)
    sched = torch.optim.lr_scheduler.OneCycleLR(opt, max_lr=2e-3, total_steps=steps)

    best = {"f1": -1}
    for epoch in range(EPOCHS):
        model.train()
        order = torch.randperm(len(xtr))
        for i in range(0, len(xtr), BATCH):
            idx = order[i:i + BATCH]
            opt.zero_grad()
            loss_fn(model(xtr[idx]), ytr[idx]).backward()
            opt.step()
            sched.step()
        model.eval()
        with torch.no_grad():
            pred = model(xva).argmax(1).numpy()
        f1 = f1_score(yva.numpy(), pred, average="macro")
        if f1 > best["f1"]:
            best = {"f1": f1, "acc": accuracy_score(yva.numpy(), pred), "epoch": epoch + 1, "state": {k: v.clone() for k, v in model.state_dict().items()}}
    return best, mean, std


def main():
    ensure_dirs()
    classes = read_json(CACHE / "splits.json")["classes"]
    xtr, ytr = (torch.from_numpy(a) for a in load_split("train"))
    xva, yva = (torch.from_numpy(a) for a in load_split("val"))
    ytr, yva = ytr.long(), yva.long()
    print(f"train {tuple(xtr.shape)}  val {tuple(xva.shape)}  classes {len(classes)}")

    grid = list(itertools.product([0, 512], [False, True], [1e-4, 1e-2], [0.2]))
    results, champion = [], None
    for hidden, weighted, wd, dropout in grid:
        t = time.time()
        best, mean, std = fit(xtr, ytr, xva, yva, len(classes), hidden, weighted, wd, dropout)
        cfg = {"hidden": hidden, "class_weighted": weighted, "weight_decay": wd, "dropout": dropout}
        print(f"{str(cfg):95s} val macro-F1 {best['f1']:.4f}  acc {best['acc']:.4f}  (epoch {best['epoch']}, {time.time() - t:.0f}s)", flush=True)
        results.append({**cfg, "val_macro_f1": round(best["f1"], 4), "val_accuracy": round(best["acc"], 4), "best_epoch": best["epoch"]})
        if champion is None or best["f1"] > champion["f1"]:
            champion = {**best, "cfg": cfg, "mean": mean, "std": std}

    torch.save({"cfg": champion["cfg"], "state": champion["state"], "mean": champion["mean"], "std": champion["std"], "classes": classes}, CACHE / "head.pt")
    write_json(ARTIFACTS / "validation_search.json", {"selected": champion["cfg"], "results": results})
    print("selected:", champion["cfg"], f"val macro-F1 {champion['f1']:.4f}")


if __name__ == "__main__":
    main()
