"""Build train / validation / test lists with NO leaf shared between splits.

PlantVillage contains several photos of the same physical leaf. A random split would put near-duplicates in both
train and test and inflate accuracy. The dataset authors publish a leaf-grouped train/test split and a leaf map;
we use their test split as-is and carve the validation set out of train, grouping by leaf the same way.

Output: CACHE/splits.json  {classes: [...], train: [[relpath, label], ...], val: [...], test: [...]}
"""
import random
from collections import Counter, defaultdict

from common import CACHE, DATA, META, ensure_dirs, read_json, write_json

VAL_FRACTION = 0.12
SEED = 42
PREFIX = "raw/color/"


def read_list(name):
    rel = []
    for line in (META / "splits" / name).read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith(PREFIX):
            rel.append(line[len(PREFIX):])
    return rel


def leaf_key(relpath):
    """'Class/uuid___Mary_HL 9155.JPG' -> 'mary_hl 9155' (the format used by leaf-map.json)."""
    stem = relpath.split("/", 1)[1].rsplit(".", 1)[0]
    return stem.split("___", 1)[-1].lower()


def main():
    ensure_dirs()
    train_rel, test_rel = read_list("color_train.txt"), read_list("color_test.txt")
    leaf_map = read_json(META / "leaf_grouping" / "leaf-map.json")

    classes = sorted({p.split("/", 1)[0] for p in train_rel + test_rel})
    index = {c: i for i, c in enumerate(classes)}

    def group_of(rel):
        hit = leaf_map.get(leaf_key(rel))
        return hit[0] if hit else f"ungrouped:::{rel}"  # unknown photo: treat as its own leaf

    missing = [r for r in train_rel + test_rel if not (DATA / "color" / r).exists()]
    if missing:
        raise SystemExit(f"{len(missing)} listed images are missing on disk (first: {missing[0]}). Run download_data.py first.")

    # leaf groups in train, then hold out whole groups for validation
    groups = defaultdict(list)
    for r in train_rel:
        groups[group_of(r)].append(r)
    keys = sorted(groups)
    random.Random(SEED).shuffle(keys)
    n_val = int(len(keys) * VAL_FRACTION)
    val_keys = set(keys[:n_val])

    train = [r for k in keys[n_val:] for r in groups[k]]
    val = [r for k in keys[:n_val] for r in groups[k]]

    # Even the official split shares a few leaves between train and test. Drop those test images so that
    # no physical leaf is ever seen in training AND scored in the test set.
    train_groups = {group_of(r) for r in train + val}
    leaky = [r for r in test_rel if group_of(r) in train_groups and not group_of(r).startswith("ungrouped")]
    leaky_set = set(leaky)
    test_rel = [r for r in test_rel if r not in leaky_set]
    test_groups = {group_of(r) for r in test_rel}
    print(f"removed {len(leaky)} test images whose leaf also appears in train/val ({len(leaky) / (len(test_rel) + len(leaky)):.1%} of the official test split)")

    assert not ({group_of(r) for r in train} & val_keys), "validation leaf also in train"
    assert not (train_groups & test_groups), "a leaf is in both train/val and test"
    print(f"leaf groups: train+val={len(train_groups)}  test={len(test_groups)}  shared between them=0")

    def pack(rels):
        return [[r, index[r.split("/", 1)[0]]] for r in rels]

    splits = {"classes": classes, "train": pack(train), "val": pack(val), "test": pack(test_rel)}
    write_json(CACHE / "splits.json", splits)

    print(f"classes: {len(classes)}")
    for name in ("train", "val", "test"):
        counts = Counter(label for _, label in splits[name])
        print(f"{name:5s}: {len(splits[name]):6d} images, smallest class has {min(counts.values())}, all classes present: {len(counts) == len(classes)}")


if __name__ == "__main__":
    main()
