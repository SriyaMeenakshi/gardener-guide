"""Download ONLY the colour images of PlantVillage (about 840 MB) instead of the whole 2.2 GB data.zip.

The zip stores the colour, segmented and grayscale versions one after another, so the colour images are a
single contiguous byte range. We read the zip's table of contents (a few MB), fetch that one range, then
unpack each file locally and check its CRC.

Dataset: PlantVillage (Hughes & Salathé 2015; Mohanty et al. 2016). Hugging Face card license: CC BY-SA 3.0.
The images are NOT redistributed in this repository.

Usage:  python download_data.py            (resumable; safe to re-run)
"""
import argparse
import struct
import sys
import zlib

import requests
from huggingface_hub import hf_hub_download
from remotezip import RemoteZip

from common import DATA, HF_REPO, META, WORK, ZIP_URL, ensure_dirs, read_json, write_json

PREFIX = "raw/color/"
BLOCK = WORK / "color_block.bin"
MANIFEST = WORK / "color_manifest.json"
LOCAL_HEADER = struct.Struct("<IHHHHHIIIHH")  # signature .. name length, extra length (30 bytes)


def fetch_metadata():
    for f in ("README.md", "splits/color_train.txt", "splits/color_test.txt", "leaf_grouping/leaf-map.json"):
        hf_hub_download(HF_REPO, f, repo_type="dataset", local_dir=META)


def build_manifest():
    if MANIFEST.exists():
        return read_json(MANIFEST)
    print("Reading the zip's table of contents...")
    with RemoteZip(ZIP_URL) as z:
        entries = [
            {"name": i.filename, "offset": i.header_offset, "csize": i.compress_size, "usize": i.file_size, "method": i.compress_type, "crc": i.CRC}
            for i in z.infolist()
            if i.filename.startswith(PREFIX) and not i.filename.endswith("/")
        ]
    manifest = {"count": len(entries), "end": max(e["offset"] + e["csize"] for e in entries), "entries": entries}
    write_json(MANIFEST, manifest)
    return manifest


def download_block(end):
    """Stream bytes [0, end) of the zip to disk, resuming if interrupted."""
    total = end + 1024 * 1024  # small margin so the last entry's local header + data are fully included
    have = BLOCK.stat().st_size if BLOCK.exists() else 0
    if have >= total:
        return
    print(f"Downloading colour block: {total / 1e6:.0f} MB total, {have / 1e6:.0f} MB already on disk")
    headers = {"Range": f"bytes={have}-{total - 1}"}
    last = 0
    with requests.get(ZIP_URL, headers=headers, stream=True, timeout=60) as r:
        r.raise_for_status()
        if r.status_code != 206:
            sys.exit(f"Server ignored the range request (status {r.status_code}); cannot download only the colour images.")
        with open(BLOCK, "ab") as f:
            for chunk in r.iter_content(chunk_size=1024 * 1024):
                f.write(chunk)
                have += len(chunk)
                if have - last >= 50 * 1024 * 1024:
                    last = have
                    print(f"  {have / 1e6:7.0f} / {total / 1e6:.0f} MB", flush=True)
    if BLOCK.stat().st_size < total:
        sys.exit("Download ended early. Re-run this script to resume.")


def extract(manifest):
    entries = manifest["entries"]
    done = bad = skipped = 0
    with open(BLOCK, "rb") as blk:
        for n, e in enumerate(entries, 1):
            rel = e["name"][len(PREFIX):]
            out = DATA / "color" / rel
            if out.exists() and out.stat().st_size == e["usize"]:
                skipped += 1
                continue
            blk.seek(e["offset"])
            sig, *_rest, name_len, extra_len = LOCAL_HEADER.unpack(blk.read(LOCAL_HEADER.size))
            if sig != 0x04034B50:
                bad += 1
                continue
            blk.seek(e["offset"] + LOCAL_HEADER.size + name_len + extra_len)
            raw = blk.read(e["csize"])
            data = raw if e["method"] == 0 else zlib.decompress(raw, -15)
            if zlib.crc32(data) & 0xFFFFFFFF != e["crc"]:
                bad += 1
                continue
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_bytes(data)
            done += 1
            if n % 5000 == 0:
                print(f"  unpacked {n}/{len(entries)}", flush=True)
    return done, skipped, bad


def main():
    argparse.ArgumentParser(description=__doc__.splitlines()[0]).parse_args()
    ensure_dirs()
    fetch_metadata()
    manifest = build_manifest()
    print(f"{manifest['count']} colour images listed")
    download_block(manifest["end"])
    done, skipped, bad = extract(manifest)
    print(f"Unpacked {done} new, {skipped} already present, {bad} FAILED (bad header or CRC)")
    if bad:
        sys.exit(1)
    print("Done. You can delete", BLOCK, "to free ~840 MB.")


if __name__ == "__main__":
    main()
