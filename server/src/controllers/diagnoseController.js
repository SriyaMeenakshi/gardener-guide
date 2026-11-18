import mongoose from "mongoose";
import Diagnosis from "../models/Diagnosis.js";
import Disease from "../models/Disease.js";
import { getDetector } from "../services/detector/index.js";
import { normalize } from "../services/detector/result.js";
import { asyncHandler } from "../middleware/errorHandler.js";

export const DISCLAIMER =
  "This is an automated suggestion, not a professional diagnosis. If your plant keeps getting worse, ask a local nursery or agricultural extension service.";

const HISTORY_LIMIT = 50;

const round2 = (n) => Math.round(n * 100) / 100;

// The shape sent to the client. Treatment text always comes from our own Disease knowledge base.
function present(doc) {
  const c = doc.condition;
  return {
    _id: doc._id,
    createdAt: doc.createdAt,
    provider: doc.provider,
    outcome: doc.outcome,
    plantName: doc.plantName,
    confidence: round2(doc.confidence),
    observations: doc.observations,
    condition: c ? { slug: c.slug, name: c.name, kind: c.kind, symptoms: c.symptoms, cause: c.cause, treatment: c.treatment, prevention: c.prevention } : null,
    disclaimer: DISCLAIMER,
  };
}

// POST /api/diagnose  (multipart, field "image")
export const diagnose = asyncHandler(async (req, res) => {
  const conditions = await Disease.find().select("slug name kind").lean();
  const detector = getDetector();

  const raw = await detector.detect({ buffer: req.image.buffer, mediaType: req.image.mediaType, conditions });
  const result = normalize(raw, conditions.map((c) => c.slug));

  const condition = result.conditionSlug ? await Disease.findOne({ slug: result.conditionSlug }) : null;
  const doc = await Diagnosis.create({
    user: req.user._id,
    outcome: result.outcome,
    plantName: result.plantName,
    condition: condition?._id ?? null,
    confidence: result.confidence,
    observations: result.observations,
    provider: detector.name,
  });
  doc.condition = condition;
  res.status(201).json(present(doc));
});

// GET /api/diagnose/history  (the signed-in user's own results, newest first)
export const history = asyncHandler(async (req, res) => {
  const docs = await Diagnosis.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(HISTORY_LIMIT).populate("condition");
  res.json(docs.map(present));
});

// DELETE /api/diagnose/:id
export const removeDiagnosis = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const doc = mongoose.isValidObjectId(id) ? await Diagnosis.findOne({ _id: id, user: req.user._id }) : null;
  if (!doc) return res.status(404).json({ message: "Result not found" });
  await doc.deleteOne();
  res.status(204).end();
});
