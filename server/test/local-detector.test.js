import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createLocalDetector, modelFilesExist, MODEL_DIR } from "../src/services/detector/local.js";
import { CLASS_TO_CONDITION, describeClass } from "../src/services/detector/plantvillage.js";
import { normalize, DetectorError } from "../src/services/detector/result.js";
import { diseases } from "../src/seed/diseases.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const haveModel = modelFilesExist();
const skip = haveModel ? false : "trained model not present in server/models (run the ml/ pipeline)";

const labels = haveModel ? JSON.parse(fs.readFileSync(path.join(MODEL_DIR, "labels.json"), "utf8")) : { classes: [] };
const parity = haveModel ? JSON.parse(fs.readFileSync(path.join(MODEL_DIR, "parity.json"), "utf8")) : [];
const slugs = diseases.map((d) => d.slug);

test("every model class maps to a real knowledge-base entry (or healthy)", { skip }, () => {
  for (const c of labels.classes) {
    assert.ok(c in CLASS_TO_CONDITION, `class not mapped: ${c}`);
    const slug = describeClass(c).conditionSlug;
    if (slug !== null) assert.ok(slugs.includes(slug), `${c} -> unknown KB slug ${slug}`);
  }
  assert.equal(Object.keys(CLASS_TO_CONDITION).length, labels.classes.length, "mapping has classes the model does not");
});

test("describeClass tidies dataset names for display", () => {
  assert.deepEqual(describeClass("Pepper,_bell___Bacterial_spot"), { plantName: "Bell pepper", condition: "Bacterial spot", conditionSlug: "bacterial-spot" });
  assert.equal(describeClass("Corn_(maize)___healthy").plantName, "Corn");
  assert.equal(describeClass("Tomato___healthy").conditionSlug, null);
  assert.throws(() => describeClass("Unknown___thing"), /no knowledge-base mapping/);
});

test("Node preprocessing matches the Python pipeline (parity on real photos)", { skip }, async () => {
  assert.ok(parity.length >= 6, "parity fixtures are missing");
  const detector = createLocalDetector();
  let worst = 0;
  for (const ref of parity) {
    const { probs } = await detector.predict(fs.readFileSync(path.join(repoRoot, ref.file)));
    const ranked = probs.map((p, i) => [p, i]).sort((a, b) => b[0] - a[0]);
    assert.equal(ranked[0][1], ref.top[0].index, `${ref.file}: top-1 class differs from Python`);
    const diff = Math.abs(ranked[0][0] - ref.top[0].prob);
    worst = Math.max(worst, diff);
    assert.ok(diff < 0.04, `${ref.file}: top-1 probability differs by ${diff.toFixed(3)} (resampling mismatch? re-run scripts/tune-resize.mjs)`);
  }
  console.log(`  parity: ${parity.length} photos, worst top-1 probability difference ${worst.toFixed(4)}`);
});

test("probabilities are a valid distribution over all classes", { skip }, async () => {
  const { probs } = await createLocalDetector().predict(fs.readFileSync(path.join(repoRoot, parity[0].file)));
  assert.equal(probs.length, labels.classes.length);
  assert.ok(Math.abs(probs.reduce((a, b) => a + b, 0) - 1) < 1e-3);
  assert.ok(probs.every((p) => p >= 0 && p <= 1));
});

test("detect() returns a result the API accepts, with advice from the knowledge base", { skip }, async () => {
  const buffer = fs.readFileSync(path.join(repoRoot, parity[0].file));
  const raw = await createLocalDetector().detect({ buffer, mediaType: "image/jpeg", conditions: [] });
  assert.equal(raw.subject, "plant");
  assert.ok(raw.confidence > 0 && raw.confidence <= 1);
  assert.match(raw.observations, /Closest match/);
  const result = normalize(raw, slugs); // must pass the same validation as every other detector
  assert.ok(["issue", "healthy", "unclear"].includes(result.outcome));
  if (result.outcome === "issue") assert.ok(slugs.includes(result.conditionSlug));
});

test("a low-confidence answer becomes 'unclear' (threshold is configurable)", { skip }, async () => {
  process.env.DIAGNOSE_MIN_CONFIDENCE = "0.999";
  try {
    const buffer = fs.readFileSync(path.join(repoRoot, "public/plants/rose.jpg"));
    const raw = await createLocalDetector().detect({ buffer, mediaType: "image/jpeg", conditions: [] });
    assert.equal(raw.status, "unclear");
  } finally {
    delete process.env.DIAGNOSE_MIN_CONFIDENCE;
  }
});

test("bytes that are not an image give a clean 422, not a crash", { skip }, async () => {
  await assert.rejects(createLocalDetector().detect({ buffer: Buffer.from("definitely not an image"), mediaType: "image/jpeg", conditions: [] }), (e) => e instanceof DetectorError && e.status === 422);
});

test("describe() lists tidy crop names and the accuracy claim", { skip }, async () => {
  const d = await createLocalDetector().describe();
  assert.ok(d.supportedCrops.includes("Tomato") && d.supportedCrops.includes("Bell pepper"));
  assert.ok(d.supportedCrops.every((c) => !/[_()]/.test(c)), "crop names should be display-ready");
  assert.ok(d.minConfidence > 0 && d.minConfidence < 1);
});

test("a missing model gives a safe 503 and can retry later", async () => {
  const detector = createLocalDetector({ modelDir: path.join(here, "does-not-exist") });
  for (let i = 0; i < 2; i++) {
    await assert.rejects(detector.detect({ buffer: Buffer.from("x"), mediaType: "image/jpeg", conditions: [] }), (e) => e instanceof DetectorError && e.status === 503);
  }
});
