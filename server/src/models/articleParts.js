import mongoose from "mongoose";

// Building blocks shared by long-form articles (care guides and gardening methods).

// A sub-point inside a section: a tip, a mistake (with image + bullets), a soil type, etc.
const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: String,
    image: String,
    bullets: [String],
  },
  { _id: false }
);

export const sectionSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    body: String,
    bullets: [String],
    items: [itemSchema],
  },
  { _id: false }
);

export const videoSchema = new mongoose.Schema(
  {
    heading: String,
    text: String,
    label: { type: String, default: "Watch the tutorial" },
    url: { type: String, required: true },
    thumbnail: String,
  },
  { _id: false }
);

export const relatedSchema = new mongoose.Schema(
  { slug: { type: String, required: true }, label: { type: String, required: true } },
  { _id: false }
);
