import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret-test-secret-test-secret-123456";
process.env.AUTH_RATE_LIMIT = "1000";
process.env.DIAGNOSE_RATE_LIMIT = "2"; // read when the router loads

const { default: app } = await import("../src/app.js");
const { setDetector } = await import("../src/services/detector/index.js");

let mongod, server, base;
let runs = 0;

before(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
  setDetector({ name: "fake", detect: async () => { runs++; return { subject: "plant", plantName: "", status: "unclear", conditionSlug: "none", confidence: 0.1, observations: "" }; } });
  server = app.listen(0);
  base = `http://localhost:${server.address().port}/api`;
});

after(async () => {
  server?.close();
  await mongoose.disconnect();
  await mongod?.stop();
});

const JPEG = Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.alloc(32)]);
const signup = async (name) => {
  const res = await fetch(`${base}/auth/register`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, email: `${name}@example.com`, password: "password123" }) });
  return (await res.json()).token;
};
const send = (token) => {
  const fd = new FormData();
  fd.append("image", new Blob([JPEG], { type: "image/jpeg" }), "leaf.jpg");
  return fetch(`${base}/diagnose`, { method: "POST", headers: { authorization: `Bearer ${token}` }, body: fd });
};

test("photo checks are limited per user, and one user's limit does not affect another", async () => {
  const a = await signup("limit-a");
  const b = await signup("limit-b");

  assert.deepEqual([(await send(a)).status, (await send(a)).status, (await send(a)).status], [201, 201, 429]);
  assert.equal(runs, 2, "the detector (which costs money) must not run once the limit is hit");
  assert.equal((await send(b)).status, 201);
});
