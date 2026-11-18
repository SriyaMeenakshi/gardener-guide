import mongoose from "mongoose";
import { sectionSchema, videoSchema, relatedSchema } from "./articleParts.js";

const careGuideSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    icon: String,
    // Short blurb shown on the care list card.
    description: { type: String, required: true },
    // Article fields
    headline: String,
    heroImage: String,
    intro: String,
    sections: [sectionSchema],
    video: videoSchema,
    related: [relatedSchema],
  },
  { timestamps: true }
);

export default mongoose.model("CareGuide", careGuideSchema);
