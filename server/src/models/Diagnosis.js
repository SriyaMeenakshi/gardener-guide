import mongoose from "mongoose";

// One saved result per upload. The photo itself is NOT stored (privacy, storage cost); only the outcome.
const diagnosisSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    outcome: { type: String, required: true, enum: ["healthy", "issue", "unclear", "not_plant"] },
    plantName: { type: String, default: null, maxlength: 80 },
    condition: { type: mongoose.Schema.Types.ObjectId, ref: "Disease", default: null },
    confidence: { type: Number, required: true, min: 0, max: 1 },
    observations: { type: String, default: "", maxlength: 500 },
    provider: { type: String, required: true }, // "claude" | "mock": so demo results can never be mistaken for real ones
  },
  { timestamps: true }
);

diagnosisSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Diagnosis", diagnosisSchema);
