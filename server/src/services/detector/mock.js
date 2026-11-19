import { createHash } from "node:crypto";

// Offline stand-in for local development and demos (DETECTOR_PROVIDER=mock). It does NOT look at the image's
// content: it derives a repeatable answer from a hash of the bytes. Results are flagged provider:"mock" so the
// UI can say they are not real.
export function createMockDetector() {
  return {
    name: "mock",
    async detect({ buffer, conditions }) {
      const h = createHash("sha256").update(buffer).digest();
      const confidence = 0.6 + (h[1] / 255) * 0.35; // 0.60 - 0.95
      const pick = h[0] % (conditions.length + 2);

      if (pick === conditions.length) {
        return { subject: "plant", plantName: "Demo plant", status: "healthy", conditionSlug: "none", confidence, observations: "Demo mode: no real analysis was done. This placeholder says the plant looks healthy." };
      }
      if (pick === conditions.length + 1) {
        return { subject: "plant", plantName: "", status: "unclear", conditionSlug: "none", confidence: 0.3, observations: "Demo mode: no real analysis was done. This placeholder says the photo is unclear." };
      }
      const c = conditions[pick];
      return { subject: "plant", plantName: "Demo plant", status: "issue", conditionSlug: c.slug, confidence, observations: `Demo mode: no real analysis was done. This placeholder picked "${c.name}" from the image bytes.` };
    },
  };
}
