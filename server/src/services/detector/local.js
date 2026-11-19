import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DetectorError } from "./result.js";
import { describeClass } from "./plantvillage.js";

// On-device detector: a MobileNetV2 classifier trained on PlantVillage (see /ml), run with ONNX Runtime.
// Free to run: no API key, no per-photo cost, and the photo never leaves this server.
const here = path.dirname(fileURLToPath(import.meta.url));
export const MODEL_DIR = process.env.DETECTOR_MODEL_DIR || path.resolve(here, "../../../models");
const SIZE = 224;
// Resampling settings that best matched the Python training pipeline; chosen with scripts/tune-resize.mjs and
// guarded by the parity test in test/local-detector.test.js.
// Measured on 12 photos: bilinear without shrink-on-load gave a worst probability difference of 0.026 versus
// Python (Lanczos, the intuitive choice, was 0.087 and changed a top-1 answer).
export const RESIZE_KERNEL = "linear";
export const FAST_SHRINK_ON_LOAD = false;
const MAX_PIXELS = 40_000_000; // refuse decompression bombs: a small JPEG file can declare an enormous image

export const modelFilesExist = (dir = MODEL_DIR) => fs.existsSync(path.join(dir, "model.onnx")) && fs.existsSync(path.join(dir, "labels.json"));

/**
 * Turn an uploaded image into the model's input: RGB, EXIF-rotated, centre-cropped to a square, resized to 224x224,
 * float32 in [0,1], channel-first. Must stay equivalent to ml/features.py. Normalisation is inside the model.
 */
export async function preprocess(buffer, { kernel = RESIZE_KERNEL, fastShrinkOnLoad = FAST_SHRINK_ON_LOAD } = {}) {
  const { default: sharp } = await import("sharp");
  const { data, info } = await sharp(buffer, { limitInputPixels: MAX_PIXELS })
    .rotate() // apply the photo's EXIF orientation
    .flatten({ background: "#ffffff" }) // transparency -> white, as in training
    .resize(SIZE, SIZE, { fit: "cover", position: "centre", kernel, fastShrinkOnLoad })
    .removeAlpha()
    .toColourspace("srgb")
    .raw()
    .toBuffer({ resolveWithObject: true });

  if (info.channels !== 3) throw new Error(`unexpected channel count ${info.channels}`);
  const plane = SIZE * SIZE;
  const out = new Float32Array(3 * plane);
  for (let i = 0; i < plane; i++) {
    out[i] = data[i * 3] / 255;
    out[plane + i] = data[i * 3 + 1] / 255;
    out[2 * plane + i] = data[i * 3 + 2] / 255;
  }
  return out;
}

export function createLocalDetector({ modelDir = MODEL_DIR } = {}) {
  let loading = null;

  const load = () =>
    (loading ??= (async () => {
      const ort = await import("onnxruntime-node");
      const labels = JSON.parse(fs.readFileSync(path.join(modelDir, "labels.json"), "utf8"));
      labels.classes.forEach(describeClass); // fail loudly at load time if a class has no mapping
      const session = await ort.InferenceSession.create(path.join(modelDir, "model.onnx"), { executionProviders: ["cpu"] });
      return { ort, labels, session };
    })().catch((err) => {
      loading = null; // allow a retry instead of caching the failure
      console.error("Local detector failed to load:", err.message);
      throw new DetectorError("Disease detection isn't available right now.", 503);
    }));

  const minConfidence = (labels) => {
    const v = Number(process.env.DIAGNOSE_MIN_CONFIDENCE);
    return Number.isFinite(v) && v > 0 && v < 1 ? v : labels.recommendedMinConfidence;
  };

  return {
    name: "local",

    // Shown to the user: this model only knows some crops, and they should be told which.
    async describe() {
      const { labels } = await load();
      const supportedCrops = [...new Set(labels.classes.map((c) => describeClass(c).plantName))].sort();
      return { supportedCrops, minConfidence: minConfidence(labels), testAccuracy: labels.testAccuracy };
    },

    // Raw class probabilities for an image buffer (used by detect() and by the Node-vs-Python parity test).
    async predict(buffer) {
      const { ort, labels, session } = await load();

      let input;
      try {
        input = await preprocess(buffer);
      } catch {
        throw new DetectorError("We couldn't read that image. Please try another photo.", 422);
      }

      const out = await session.run({ image: new ort.Tensor("float32", input, [1, 3, SIZE, SIZE]) });
      return { labels, probs: Array.from(out.probs.data) };
    },

    async detect({ buffer }) {
      const { labels, probs } = await this.predict(buffer);
      const ranked = probs.map((p, i) => [p, i]).sort((a, b) => b[0] - a[0]);
      const [topP, topI] = ranked[0];
      const top = describeClass(labels.classes[topI]);

      const pct = (p) => `${Math.round(p * 100)}%`;
      const others = ranked
        .slice(1, 3)
        .map(([p, i]) => `${describeClass(labels.classes[i]).plantName} (${describeClass(labels.classes[i]).condition}) ${pct(p)}`)
        .join(", ");
      const observations = `Closest match: ${top.plantName} (${top.condition}) ${pct(topP)}. Next: ${others}.`;

      const sure = topP >= minConfidence(labels);
      return {
        subject: "plant",
        plantName: top.plantName,
        status: !sure ? "unclear" : top.conditionSlug ? "issue" : "healthy",
        conditionSlug: top.conditionSlug ?? "none",
        confidence: topP,
        observations,
      };
    },
  };
}
