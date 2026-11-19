// Picks the sharp resize settings whose output best matches the Python training pipeline.
// For each reference photo in models/parity.json (answers computed by Python), run the Node pipeline with every
// combination of resampling kernel and JPEG shrink-on-load, and compare the model's probabilities.
//
// Usage (from /server):  node scripts/tune-resize.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as ort from "onnxruntime-node";
import { MODEL_DIR, preprocess } from "../src/services/detector/local.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const parity = JSON.parse(fs.readFileSync(path.join(MODEL_DIR, "parity.json"), "utf8"));
const session = await ort.InferenceSession.create(path.join(MODEL_DIR, "model.onnx"), { executionProviders: ["cpu"] });

const probsOf = async (buffer, opts) => {
  const input = await preprocess(buffer, opts);
  const out = await session.run({ image: new ort.Tensor("float32", input, [1, 3, 224, 224]) });
  return Array.from(out.probs.data);
};

const rows = [];
for (const kernel of ["lanczos3", "lanczos2", "cubic", "mitchell", "linear", "nearest"]) {
  for (const fastShrinkOnLoad of [true, false]) {
    let sum = 0, worst = 0, n = 0, top1Same = 0;
    for (const ref of parity) {
      const probs = await probsOf(fs.readFileSync(path.join(repoRoot, ref.file)), { kernel, fastShrinkOnLoad });
      const best = probs.indexOf(Math.max(...probs));
      if (best === ref.top[0].index) top1Same++;
      for (const t of ref.top) {
        const d = Math.abs(probs[t.index] - t.prob);
        sum += d; n++; worst = Math.max(worst, d);
      }
    }
    rows.push({ kernel, fastShrinkOnLoad, meanAbsDiff: +(sum / n).toFixed(4), worstDiff: +worst.toFixed(4), top1Same: `${top1Same}/${parity.length}` });
  }
}
rows.sort((a, b) => a.meanAbsDiff - b.meanAbsDiff);
console.table(rows);
console.log("best:", rows[0]);
