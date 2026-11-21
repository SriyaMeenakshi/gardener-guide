import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret-test-secret-test-secret-123456";

const { default: app } = await import("../src/app.js");
const { default: Plant } = await import("../src/models/Plant.js");
const { plants } = await import("../src/seed/data.js");
const { morePlants } = await import("../src/seed/plants-more.js");
const newSlugs = new Set(morePlants.map((p) => p.slug));

let mongod, server, base;

before(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
  await Plant.init(); // builds the text-search index
  await Plant.insertMany(plants); // exactly what `npm run seed` loads
  server = app.listen(0);
  base = `http://localhost:${server.address().port}/api`;
});

after(async () => {
  server?.close();
  await mongoose.disconnect();
  await mongod?.stop();
});

const get = async (path) => {
  const res = await fetch(base + path);
  return { status: res.status, body: await res.json() };
};

// ---- the seed data itself (no database needed) ----

test("every plant guide is complete and consistent", () => {
  const slugs = plants.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length, "slugs must be unique");
  for (const p of plants) {
    assert.match(p.slug, /^[a-z0-9]+$/, `${p.slug}: slug must be lowercase letters and digits`);
    assert.ok(p.description.length >= 80, `${p.slug}: needs a real description`);
    assert.equal(p.careRequirements?.length, 3, `${p.slug}: expects three care cards`);
    // Every NEW guide must include problems. A few of the original v1 guides (e.g. Coriander, Guava) never had that section.
    if (newSlugs.has(p.slug)) assert.ok(p.commonProblems?.length >= 1, `${p.slug}: needs at least one common problem`);
    for (const c of p.commonProblems ?? []) assert.ok(c.title && c.fix, `${p.slug}: every problem needs a title and a fix`);
    assert.match(p.image, /^\/plants\/[a-z0-9]+\.jpg$/, `${p.slug}: card photo path should follow /plants/<slug>.jpg`);
    assert.equal(p.image, `/plants/${p.slug}.jpg`, `${p.slug}: photo file name must match the slug so it is found automatically`);
  }
});

test("the catalogue has the expected shape", () => {
  assert.ok(plants.length >= 24);
  const categories = new Set(plants.map((p) => p.category));
  for (const c of ["indoor", "flowering", "medicinal", "kitchen", "fruit"]) assert.ok(categories.has(c), `no plant in category ${c}`);
});

// ---- the API over the full catalogue ----

test("pagination covers every plant exactly once", async () => {
  const first = await get("/plants?limit=12&page=1");
  const second = await get("/plants?limit=12&page=2");
  assert.equal(first.body.total, plants.length);
  assert.equal(first.body.pages, Math.ceil(plants.length / 12));
  assert.equal(first.body.plants.length, 12);
  const seen = [...first.body.plants, ...second.body.plants].map((p) => p.slug);
  assert.equal(new Set(seen).size, seen.length, "no plant may appear on two pages");
  const rest = await get(`/plants?limit=12&page=${first.body.pages}`);
  const all = new Set(seen);
  for (let page = 3; page <= first.body.pages; page++) (await get(`/plants?limit=12&page=${page}`)).body.plants.forEach((p) => all.add(p.slug));
  assert.equal(all.size, plants.length, "every plant must be reachable through the pages");
  assert.ok(rest.body.plants.length > 0);
});

test("the Indoor category can be filtered", async () => {
  const { body } = await get("/plants?category=indoor");
  assert.deepEqual(body.plants.map((p) => p.slug).sort(), ["moneyplant", "peacelily", "snakeplant"]);
  assert.ok(body.plants.every((p) => p.category === "indoor"));
});

test("unknown or malicious category values are ignored, not trusted", async () => {
  assert.equal((await get("/plants?category=weapons")).body.total, plants.length);
  assert.equal((await get("/plants?category[$ne]=indoor")).body.total, plants.length);
});

test("filters combine", async () => {
  const { body } = await get("/plants?category=kitchen&difficulty=easy");
  assert.ok(body.total >= 3);
  assert.ok(body.plants.every((p) => p.category === "kitchen" && p.difficulty === "easy"));
});

test("search finds new plants by name and by their Hindi names", async () => {
  assert.ok((await get("/plants?search=snake")).body.plants.some((p) => p.slug === "snakeplant"));
  assert.ok((await get("/plants?search=palak")).body.plants.some((p) => p.slug === "spinach"));
  assert.ok((await get("/plants?search=bhindi")).body.plants.some((p) => p.slug === "okra"));
});

test("a plant without a video or banner photo still returns a complete guide", async () => {
  const { status, body } = await get("/plants/snakeplant");
  assert.equal(status, 200);
  assert.equal(body.name, "Snake Plant");
  assert.equal(body.video, undefined, "new guides have no video");
  assert.equal(body.heroImage, undefined);
  assert.equal(body.image, "/plants/snakeplant.jpg");
  assert.match(body.extraSections[0].heading, /toxic/i, "pet-safety note is present");
  assert.equal(body.careRequirements.length, 3);
});
