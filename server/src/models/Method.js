import mongoose from "mongoose";
import { sectionSchema, videoSchema } from "./articleParts.js";

const methodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String, required: true },
    headline: String,
    // Intro paragraph shown at the top of the method page.
    description: { type: String, default: "" },
    sections: [sectionSchema],
    video: videoSchema,
  },
  { timestamps: true }
);

export default mongoose.model("Method", methodSchema);
