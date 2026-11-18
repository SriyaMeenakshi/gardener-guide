import mongoose from "mongoose";
import { z } from "zod";
import MyPlant from "../models/MyPlant.js";
import Plant from "../models/Plant.js";
import { asyncHandler } from "../middleware/errorHandler.js";

export const MAX_PLANTS_PER_USER = 100;

// Sensible default watering interval from the plant's water need; the user can change it.
const DEFAULT_INTERVAL = { high: 2, moderate: 4, low: 10 };

const objectId = z.string().refine((v) => mongoose.isValidObjectId(v), "Invalid plant id");
const interval = z.number({ error: "Watering interval must be a number" }).int("Watering interval must be a whole number of days").min(1, "Watering interval must be at least 1 day").max(60, "Watering interval must be at most 60 days");

export const addSchema = z.object({
  plantId: objectId,
  nickname: z.string().trim().max(60, "Nickname is too long").optional(),
  wateringEveryDays: interval.optional(),
  notes: z.string().trim().max(500, "Notes are too long").optional(),
});

// Only these fields can ever be changed by the client (no mass assignment of user, plant, dates...).
export const updateSchema = z
  .object({
    nickname: z.string().trim().max(60, "Nickname is too long"),
    wateringEveryDays: interval,
    notes: z.string().trim().max(500, "Notes are too long"),
  })
  .partial()
  .refine((o) => Object.keys(o).length > 0, "Nothing to update");

const POPULATE = { path: "plant", select: "name slug image water" };

// Looks up a garden entry that belongs to the current user. Someone else's entry looks exactly like a missing one.
async function findOwned(req) {
  const { id } = req.params;
  const doc = mongoose.isValidObjectId(id) ? await MyPlant.findOne({ _id: id, user: req.user._id }) : null;
  if (!doc) throw Object.assign(new Error("Garden entry not found"), { status: 404 });
  return doc;
}

// GET /api/garden: most urgent watering first
export const listGarden = asyncHandler(async (req, res) => {
  const items = await MyPlant.find({ user: req.user._id }).populate(POPULATE);
  items.sort((a, b) => a.nextWateringAt - b.nextWateringAt);
  res.json(items);
});

// POST /api/garden
export const addToGarden = asyncHandler(async (req, res) => {
  const { plantId, nickname, wateringEveryDays, notes } = req.body;

  const plant = await Plant.findById(plantId).select("water");
  if (!plant) return res.status(404).json({ message: "Plant not found" });

  if ((await MyPlant.countDocuments({ user: req.user._id })) >= MAX_PLANTS_PER_USER) {
    return res.status(400).json({ message: `Your garden is full (${MAX_PLANTS_PER_USER} plants max)` });
  }

  const doc = await MyPlant.create({
    user: req.user._id,
    plant: plant._id,
    nickname,
    notes,
    wateringEveryDays: wateringEveryDays ?? DEFAULT_INTERVAL[plant.water] ?? 4,
  });
  await doc.populate(POPULATE);
  res.status(201).json(doc);
});

// PUT /api/garden/:id
export const updateEntry = asyncHandler(async (req, res) => {
  const doc = await findOwned(req);
  Object.assign(doc, req.body);
  await doc.save();
  await doc.populate(POPULATE);
  res.json(doc);
});

// POST /api/garden/:id/water
export const waterEntry = asyncHandler(async (req, res) => {
  const doc = await findOwned(req);
  doc.lastWateredAt = new Date();
  await doc.save();
  await doc.populate(POPULATE);
  res.json(doc);
});

// DELETE /api/garden/:id
export const removeEntry = asyncHandler(async (req, res) => {
  const doc = await findOwned(req);
  await doc.deleteOne();
  res.status(204).end();
});
