import mongoose from "mongoose";

const methodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String, required: true },
    description: { type: String, default: "" },
    sections: [{ heading: String, body: String, _id: false }],
  },
  { timestamps: true }
);

export default mongoose.model("Method", methodSchema);
