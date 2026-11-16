import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Plant from "../models/Plant.js";
import CareGuide from "../models/CareGuide.js";
import Method from "../models/Method.js";
import DIY from "../models/DIY.js";
import { plants, careGuides, methods, diyProjects } from "./data.js";

// Validate everything before touching the database.
async function validateAll(Model, docs) {
  for (const d of docs) {
    try {
      await new Model(d).validate();
    } catch (err) {
      throw new Error(`${Model.modelName} "${d.slug || d.title}": ${err.message}`);
    }
  }
}

async function run() {
  await validateAll(Plant, plants);
  await validateAll(CareGuide, careGuides);
  await validateAll(Method, methods);
  await validateAll(DIY, diyProjects);
  if (process.argv.includes("--check")) {
    console.log("Seed data is valid (--check: database untouched).");
    return;
  }

  await connectDB(process.env.MONGO_URI);
  // Upsert by slug so re-running the seed is safe and never duplicates.
  const upsert = (Model, docs) =>
    Model.bulkWrite(docs.map((d) => ({ updateOne: { filter: { slug: d.slug }, update: { $set: d }, upsert: true } })));

  await upsert(Plant, plants);
  await upsert(CareGuide, careGuides);
  await upsert(Method, methods);
  // DIY has no slug, so replace the collection (it only holds seed content).
  await DIY.deleteMany({});
  await DIY.insertMany(diyProjects);

  console.log(`Seeded ${plants.length} plants, ${careGuides.length} care guides, ${methods.length} methods, ${diyProjects.length} DIY projects.`);
}

try {
  await run();
} catch (err) {
  console.error("Seed failed:", err.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
