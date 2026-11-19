import { z } from "zod";

// What a detector must return. Kept deliberately small: the model classifies; it does not write advice.
export const NONE = "none";

export const buildJsonSchema = (slugs) => ({
  type: "object",
  properties: {
    subject: { type: "string", enum: ["plant", "not_plant"], description: "Is the main subject of the photo a plant?" },
    plantName: { type: "string", description: "Common name of the plant, or an empty string if unknown" },
    status: { type: "string", enum: ["healthy", "issue", "unclear"] },
    conditionSlug: { type: "string", enum: [...slugs, NONE], description: `The best matching problem, or "${NONE}"` },
    confidence: { type: "number", description: "Confidence in the overall assessment, from 0.0 to 1.0" },
    observations: { type: "string", description: "One or two sentences describing what is visible in the photo" },
  },
  required: ["subject", "plantName", "status", "conditionSlug", "confidence", "observations"],
  additionalProperties: false,
});

const rawSchema = z.object({
  subject: z.enum(["plant", "not_plant"]),
  plantName: z.string(),
  status: z.enum(["healthy", "issue", "unclear"]),
  conditionSlug: z.string(),
  confidence: z.number(),
  observations: z.string(),
});

export const MIN_CONFIDENCE = () => {
  const v = Number(process.env.DIAGNOSE_MIN_CONFIDENCE);
  return Number.isFinite(v) && v > 0 && v < 1 ? v : 0.5;
};

// eslint-disable-next-line no-control-regex
const clean = (s, max) => String(s ?? "").replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);

const UNCLEAR = (observations = "") => ({ outcome: "unclear", plantName: null, conditionSlug: null, confidence: 0, observations });

/**
 * Never trust the detector's output: validate its shape, clamp numbers, drop anything that is not in the
 * knowledge base, and downgrade low-confidence answers to "unclear" so users are asked to retake the photo
 * instead of being shown a shaky diagnosis.
 */
export function normalize(raw, knownSlugs) {
  const parsed = rawSchema.safeParse(raw);
  if (!parsed.success) return UNCLEAR();

  const r = parsed.data;
  const confidence = Math.min(1, Math.max(0, r.confidence));
  const observations = clean(r.observations, 400);
  const plantName = clean(r.plantName, 80) || null;
  const sure = confidence >= MIN_CONFIDENCE();

  if (r.subject === "not_plant") return sure ? { outcome: "not_plant", plantName: null, conditionSlug: null, confidence, observations } : { ...UNCLEAR(observations), confidence };
  if (r.status === "healthy" && sure) return { outcome: "healthy", plantName, conditionSlug: null, confidence, observations };
  if (r.status === "issue" && sure && r.conditionSlug !== NONE && knownSlugs.includes(r.conditionSlug)) {
    return { outcome: "issue", plantName, conditionSlug: r.conditionSlug, confidence, observations };
  }
  return { ...UNCLEAR(observations), plantName, confidence };
}

// An error a detector can raise whose message is safe to show to the user.
export class DetectorError extends Error {
  constructor(publicMessage, status = 502) {
    super(publicMessage);
    this.name = "DetectorError";
    this.status = status;
  }
}
