import { createClaudeDetector } from "./claude.js";
import { createMockDetector } from "./mock.js";
import { createLocalDetector, modelFilesExist } from "./local.js";

// Which detector is used is a deployment setting, so the model/provider can change without touching the controller.
//   DETECTOR_PROVIDER=local   on-device model trained on PlantVillage. Free, but knows only 14 crops.
//   DETECTOR_PROVIDER=claude  Anthropic vision API. Knows far more plants, but needs ANTHROPIC_API_KEY and costs money.
//   DETECTOR_PROVIDER=mock    offline demo that does NOT analyse the image: for local development only.
// If unset: "local" when the trained model files are present, otherwise "claude".
let current = null;

export function getDetector() {
  if (!current) {
    const provider = (process.env.DETECTOR_PROVIDER || (modelFilesExist() ? "local" : "claude")).toLowerCase();
    if (provider === "local") current = createLocalDetector();
    else if (provider === "mock") current = createMockDetector();
    else if (provider === "claude") current = createClaudeDetector();
    else throw new Error(`Unknown DETECTOR_PROVIDER "${provider}" (use "local", "claude" or "mock")`);
  }
  return current;
}

// Tests inject a fake detector here.
export function setDetector(detector) {
  current = detector;
}
