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

const sectionSchema = new mongoose.Schema(
  { heading: { type: String, required: true }, body: { type: String, required: true } },
  { _id: false }
);

const careSchema = new mongoose.Schema(
  { title: { type: String, required: true }, body: { type: String, required: true } },
  { _id: false }
);

const videoSchema = new mongoose.Schema(
  {
    heading: String,
    text: String,
    label: { type: String, default: "Watch the guide" },
    url: { type: String, required: true },
  },
  { _id: false }
);

const plantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["indoor", "flowering", "medicinal", "kitchen", "fruit"],
      index: true,
    },
    image: { type: String, required: true },
    heroImage: String,
    headline: String,
    description: { type: String, default: "" },
    sunlight: { type: String, enum: ["low", "partial", "full"], default: "full" },
    water: { type: String, enum: ["low", "moderate", "high"], default: "moderate" },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
    // Plant-specific callouts (e.g. Mint's "Golden Rule", Tulasi's cultural significance).
    extraSections: [sectionSchema],
    varieties: [varietySchema],
    // Title already carries an emoji, e.g. "☀️ Sunlight".
    careRequirements: [careSchema],
    commonProblems: [problemSchema],
    video: videoSchema,
  },
  { timestamps: true }
);

plantSchema.index({ name: "text", description: "text" });

export default mongoose.model("Plant", plantSchema);
