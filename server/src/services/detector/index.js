import { createClaudeDetector } from "./claude.js";
import { createMockDetector } from "./mock.js";

// Which detector is used is a deployment setting, so the model/provider can change without touching the controller.
//   DETECTOR_PROVIDER=claude (default)  needs ANTHROPIC_API_KEY
//   DETECTOR_PROVIDER=mock              offline demo, never use in production
let current = null;

export function getDetector() {
  if (!current) {
    const provider = (process.env.DETECTOR_PROVIDER || "claude").toLowerCase();
    if (provider === "mock") current = createMockDetector();
    else if (provider === "claude") current = createClaudeDetector();
    else throw new Error(`Unknown DETECTOR_PROVIDER "${provider}" (use "claude" or "mock")`);
  }
  return current;
}

// Tests inject a fake detector here.
export function setDetector(detector) {
  current = detector;
}
