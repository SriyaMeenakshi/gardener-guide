import mongoose from "mongoose";

const careGuideSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    icon: String,
    description: { type: String, required: true },
    // Detailed sections are filled in later as v1 guide pages are migrated.
    sections: [{ heading: String, body: String, _id: false }],
  },
  { timestamps: true }
);

export default mongoose.model("CareGuide", careGuideSchema);
