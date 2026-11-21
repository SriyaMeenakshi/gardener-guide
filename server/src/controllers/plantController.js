import Plant from "../models/Plant.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const ENUMS = {
  category: ["indoor", "flowering", "medicinal", "kitchen", "fruit"],
  sunlight: ["low", "partial", "full"],
  water: ["low", "moderate", "high"],
  difficulty: ["easy", "medium", "hard"],
};

// GET /api/plants?category=&sunlight=&water=&difficulty=&search=&page=&limit=
export const listPlants = asyncHandler(async (req, res) => {
  const filter = {};
  // Only accept known enum values, and force strings, so query-operator injection ({ $ne: ... }) is impossible.
  for (const key of Object.keys(ENUMS)) {
    const value = req.query[key];
    if (typeof value === "string" && ENUMS[key].includes(value)) filter[key] = value;
  }
  if (typeof req.query.search === "string" && req.query.search.trim()) {
    filter.$text = { $search: req.query.search.trim().slice(0, 100) };
  }

  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 12, 1), 50);

  const [plants, total] = await Promise.all([
    Plant.find(filter)
      .select("name slug category image sunlight water difficulty")
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Plant.countDocuments(filter),
  ]);

  res.json({ plants, page, pages: Math.ceil(total / limit), total });
});

// GET /api/plants/:slug
export const getPlant = asyncHandler(async (req, res) => {
  const plant = await Plant.findOne({ slug: String(req.params.slug).toLowerCase() }).lean();
  if (!plant) return res.status(404).json({ message: "Plant not found" });
  res.json(plant);
});
