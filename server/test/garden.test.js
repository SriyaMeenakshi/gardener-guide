import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret-test-secret-test-secret-123456";
process.env.AUTH_RATE_LIMIT = "1000";

const { default: app } = await import("../src/app.js");
const { default: Plant } = await import("../src/models/Plant.js");
const { default: MyPlant } = await import("../src/models/MyPlant.js");

let mongod, server, base, rose, mint, cactus;
let alice, bob; // { token, id }

before(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
  await Promise.all([Plant.init(), MyPlant.init()]);
  server = app.listen(0);
  base = `http://localhost:${server.address().port}/api`;

  const mk = (name, water) => Plant.create({ name, slug: name.toLowerCase(), category: "flowering", image: `/plants/${name}.jpg`, water });
  [rose, mint, cactus] = await Promise.all([mk("Rose", "moderate"), mk("Mint", "high"), mk("Cactus", "low")]);

  const signup = async (name) => {
    const res = await fetch(`${base}/auth/register`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email: `${name.toLowerCase()}@example.com`, password: "password123" }),
    });
    const body = await res.json();
    return { token: body.token, id: body.user.id };
  };
  alice = await signup("Alice");
  bob = await signup("Bob");
});

after(async () => {
  server?.close();
  await mongoose.disconnect();
  await mongod?.stop();
});

const call = (who, method, path, body) =>
  fetch(base + path, {
    method,
    headers: { "content-type": "application/json", ...(who ? { authorization: `Bearer ${who.token}` } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
const json = async (res) => res.json();

test("every garden route requires login", async () => {
  const id = new mongoose.Types.ObjectId().toString();
  for (const [method, path, body] of [
    ["GET", "/garden"],
    ["POST", "/garden", { plantId: rose.id }],
    ["PUT", `/garden/${id}`, { nickname: "x" }],
    ["POST", `/garden/${id}/water`],
    ["DELETE", `/garden/${id}`],
  ]) {
    assert.equal((await call(null, method, path, body)).status, 401, `${method} ${path}`);
  }
});

test("adding a plant sets a default watering interval from its water need", async () => {
  const cases = [[rose, 4], [mint, 2], [cactus, 10]];
  for (const [plant, days] of cases) {
    const res = await call(alice, "POST", "/garden", { plantId: plant.id });
    assert.equal(res.status, 201);
    const entry = await json(res);
    assert.equal(entry.wateringEveryDays, days, plant.name);
    assert.equal(entry.plant.name, plant.name);
    assert.equal(entry.lastWateredAt, null);
    assert.ok(entry.nextWateringAt);
  }
});

test("a custom interval, nickname and notes are accepted", async () => {
  const res = await call(alice, "POST", "/garden", { plantId: rose.id, nickname: "  Balcony rose ", wateringEveryDays: 3, notes: "Needs pruning" });
  assert.equal(res.status, 201);
  const entry = await json(res);
  assert.equal(entry.nickname, "Balcony rose");
  assert.equal(entry.wateringEveryDays, 3);
});

test("the same plant can be added more than once", async () => {
  const before = (await json(await call(alice, "GET", "/garden"))).filter((e) => e.plant.name === "Rose").length;
  await call(alice, "POST", "/garden", { plantId: rose.id });
  const after = (await json(await call(alice, "GET", "/garden"))).filter((e) => e.plant.name === "Rose").length;
  assert.equal(after, before + 1);
});

test("add validates its input", async () => {
  const cases = [
    [{}, /plantId is required/i],
    [{ plantId: "not-an-id" }, /invalid plant id/i],
    [{ plantId: { $ne: null } }, /plantId is invalid/i],
    [{ plantId: rose.id, wateringEveryDays: 0 }, /at least 1/i],
    [{ plantId: rose.id, wateringEveryDays: 61 }, /at most 60/i],
    [{ plantId: rose.id, wateringEveryDays: 2.5 }, /whole number/i],
    [{ plantId: rose.id, wateringEveryDays: "3" }, /must be a number/i],
    [{ plantId: rose.id, notes: "x".repeat(501) }, /too long/i],
  ];
  for (const [body, pattern] of cases) {
    const res = await call(alice, "POST", "/garden", body);
    assert.equal(res.status, 400, JSON.stringify(body));
    assert.match((await json(res)).message, pattern);
  }
});

test("adding a plant that does not exist is a 404", async () => {
  const res = await call(alice, "POST", "/garden", { plantId: new mongoose.Types.ObjectId().toString() });
  assert.equal(res.status, 404);
});

test("the client cannot set the owner or schedule fields when adding", async () => {
  const res = await call(alice, "POST", "/garden", { plantId: rose.id, user: bob.id, lastWateredAt: "2000-01-01", plantedOn: "2000-01-01" });
  assert.equal(res.status, 201);
  const entry = await json(res);
  assert.equal(entry.user, alice.id);
  assert.equal(entry.lastWateredAt, null);
  assert.ok(new Date(entry.plantedOn).getFullYear() >= 2024);
});

test("you only ever see your own garden", async () => {
  const bobEntry = await json(await call(bob, "POST", "/garden", { plantId: mint.id, nickname: "Bob's mint" }));
  const aliceList = await json(await call(alice, "GET", "/garden"));
  assert.ok(aliceList.length >= 4);
  assert.equal(aliceList.some((e) => e._id === bobEntry._id), false);
  assert.equal(aliceList.every((e) => e.user === alice.id), true);
  const bobList = await json(await call(bob, "GET", "/garden"));
  assert.deepEqual(bobList.map((e) => e._id), [bobEntry._id]);
});

test("other users cannot update, water or delete your plants (they look missing)", async () => {
  const mine = await json(await call(alice, "POST", "/garden", { plantId: rose.id, nickname: "Alice only" }));
  for (const [method, path, body] of [
    ["PUT", `/garden/${mine._id}`, { nickname: "hacked" }],
    ["POST", `/garden/${mine._id}/water`],
    ["DELETE", `/garden/${mine._id}`],
  ]) {
    assert.equal((await call(bob, method, path, body)).status, 404, `${method} as other user`);
  }
  // and nothing changed
  const still = await MyPlant.findById(mine._id);
  assert.equal(still.nickname, "Alice only");
  assert.equal(still.lastWateredAt, null);
});

test("watering records the time and pushes the next watering out", async () => {
  const entry = await json(await call(alice, "POST", "/garden", { plantId: rose.id, wateringEveryDays: 5 }));
  const res = await call(alice, "POST", `/garden/${entry._id}/water`);
  assert.equal(res.status, 200);
  const watered = await json(res);
  assert.ok(Math.abs(Date.now() - new Date(watered.lastWateredAt)) < 5000);
  const gapDays = (new Date(watered.nextWateringAt) - new Date(watered.lastWateredAt)) / 86400000;
  assert.equal(gapDays, 5);
});

test("update changes only the allowed fields", async () => {
  const entry = await json(await call(alice, "POST", "/garden", { plantId: mint.id }));
  const res = await call(alice, "PUT", `/garden/${entry._id}`, { nickname: "Kitchen mint", wateringEveryDays: 1, user: bob.id, plant: rose.id, lastWateredAt: "2000-01-01" });
  assert.equal(res.status, 200);
  const updated = await json(res);
  assert.equal(updated.nickname, "Kitchen mint");
  assert.equal(updated.wateringEveryDays, 1);
  assert.equal(updated.user, alice.id);
  assert.equal(updated.plant.name, "Mint");
  assert.equal(updated.lastWateredAt, null);
});

test("update rejects empty or invalid changes", async () => {
  const entry = await json(await call(alice, "POST", "/garden", { plantId: mint.id }));
  assert.equal((await call(alice, "PUT", `/garden/${entry._id}`, {})).status, 400);
  assert.equal((await call(alice, "PUT", `/garden/${entry._id}`, { user: bob.id })).status, 400);
  assert.equal((await call(alice, "PUT", `/garden/${entry._id}`, { wateringEveryDays: 0 })).status, 400);
});

test("a malformed id is a clean 404, not a server error", async () => {
  for (const [method, path] of [["PUT", "/garden/nope"], ["POST", "/garden/nope/water"], ["DELETE", "/garden/nope"]]) {
    const res = await call(alice, method, path, method === "PUT" ? { nickname: "x" } : undefined);
    assert.equal(res.status, 404, `${method} ${path}`);
  }
});

test("deleting removes the entry", async () => {
  const entry = await json(await call(alice, "POST", "/garden", { plantId: cactus.id }));
  assert.equal((await call(alice, "DELETE", `/garden/${entry._id}`)).status, 204);
  assert.equal(await MyPlant.findById(entry._id), null);
  assert.equal((await call(alice, "DELETE", `/garden/${entry._id}`)).status, 404);
});

test("the list is ordered by most urgent watering first", async () => {
  const list = await json(await call(alice, "GET", "/garden"));
  const times = list.map((e) => new Date(e.nextWateringAt).getTime());
  assert.deepEqual(times, [...times].sort((a, b) => a - b));
});

test("a garden is capped per user", async () => {
  const { MAX_PLANTS_PER_USER } = await import("../src/controllers/gardenController.js");
  const carol = await (async () => {
    const res = await fetch(`${base}/auth/register`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: "Carol", email: "carol@example.com", password: "password123" }) });
    const b = await res.json();
    return { token: b.token, id: b.user.id };
  })();
  await MyPlant.insertMany(Array.from({ length: MAX_PLANTS_PER_USER }, () => ({ user: carol.id, plant: rose._id, wateringEveryDays: 4 })));
  const res = await call(carol, "POST", "/garden", { plantId: rose.id });
  assert.equal(res.status, 400);
  assert.match((await json(res)).message, /full/i);
});
