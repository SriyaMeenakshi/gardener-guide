import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    cause: String,
    fix: { type: String, required: true },
  },
  { _id: false }
);

const varietySchema = new mongoose.Schema(
  { name: { type: String, required: true }, description: String, image: String },
  { _id: false }
);

const plantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["flowering", "medicinal", "kitchen", "fruit"],
      index: true,
    },
    image: { type: String, required: true },
    description: { type: String, default: "" },
    sunlight: { type: String, enum: ["low", "partial", "full"], default: "full" },
    water: { type: String, enum: ["low", "moderate", "high"], default: "moderate" },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
    soil: { type: String, default: "" },
    varieties: [varietySchema],
    commonProblems: [problemSchema],
    videoUrl: String,
  },
  { timestamps: true }
);

plantSchema.index({ name: "text", description: "text" });

export default mongoose.model("Plant", plantSchema);
