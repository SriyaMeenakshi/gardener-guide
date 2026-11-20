"""Write server/models/parity.json: reference answers for a few site photos, computed with the PYTHON pipeline.

The Node server's test (server/test/local-detector.test.js) preprocesses the same photos with `sharp` and checks that it
gets the same answers, so any drift between training-time and serving-time image handling is caught.

Uses the exported model, so it does not retrain or re-export anything.
Usage:  python make_parity.py
"""
import numpy as np
import onnxruntime as ort

from common import REPO_ML, SERVER_MODELS, write_json
from evaluate import photos_for
from features import load_image_tensor

SLUGS = ("tomato", "rose", "mint", "chilli")
PER_SLUG = 3


def write_parity(session):
    refs = []
    for slug in SLUGS:
        for f in photos_for([slug])[slug][:PER_SLUG]:
            p = session.run(None, {"image": load_image_tensor(f).unsqueeze(0).numpy()})[0][0]
            top = np.argsort(-p)[:3]
            refs.append({"file": f.relative_to(REPO_ML.parent).as_posix(), "top": [{"index": int(i), "prob": round(float(p[i]), 5)} for i in top]})
    write_json(SERVER_MODELS / "parity.json", refs)
    return refs


if __name__ == "__main__":
    sess = ort.InferenceSession(str(SERVER_MODELS / "model.onnx"), providers=["CPUExecutionProvider"])
    refs = write_parity(sess)
    print(f"wrote parity.json: {len(refs)} reference photos, e.g. {refs[0]['file']}")
