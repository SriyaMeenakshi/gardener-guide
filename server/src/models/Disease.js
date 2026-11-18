import mongoose from "mongoose";

// Knowledge base of plant problems. The detector may only choose from these entries, so every
// piece of treatment advice shown to a user comes from here, never from the AI model's own text.
const diseaseSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    kind: { type: String, required: true, enum: ["pest", "disease", "deficiency", "environmental"] },
    plantsAffected: [String], // plant slugs this commonly affects (informational)
    symptoms: [String],
    cause: { type: String, default: "" },
    treatment: [String],
    prevention: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Disease", diseaseSchema);
