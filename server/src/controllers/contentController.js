import CareGuide from "../models/CareGuide.js";
import Method from "../models/Method.js";
import DIY from "../models/DIY.js";
import { asyncHandler } from "../middleware/errorHandler.js";

// Small factory so care guides and methods (both slug-based) share one implementation.
function slugResource(Model, label) {
  return {
    list: asyncHandler(async (req, res) => {
      res.json(await Model.find().sort({ createdAt: 1 }).lean());
    }),
    get: asyncHandler(async (req, res) => {
      const doc = await Model.findOne({ slug: String(req.params.slug).toLowerCase() }).lean();
      if (!doc) return res.status(404).json({ message: `${label} not found` });
      res.json(doc);
    }),
  };
}

export const care = slugResource(CareGuide, "Care guide");
export const methods = slugResource(Method, "Method");

export const listDIY = asyncHandler(async (req, res) => {
  res.json(await DIY.find().sort({ createdAt: 1 }).lean());
});
