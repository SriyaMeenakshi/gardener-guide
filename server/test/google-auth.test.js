import { test, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret-test-secret-test-secret-123456";
process.env.AUTH_RATE_LIMIT = "1000";
process.env.GOOGLE_CLIENT_ID = "test-client-id.apps.googleusercontent.com";

const { default: app } = await import("../src/app.js");
const { default: User } = await import("../src/models/User.js");
const { setGoogleVerifier } = await import("../src/services/googleAuth.js");

let mongod, server, base;

before(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
  await User.init();
  server = app.listen(0);
  base = `http://localhost:${server.address().port}/api`;
});

after(async () => {
  setGoogleVerifier(null);
  server?.close();
  await mongoose.disconnect();
  await mongod?.stop();
});

// A fake for Google's verification: returns whatever profile the test sets, or throws like an invalid token would.
let profile, seen;
beforeEach(() => {
  seen = [];
  profile = { sub: "google-sub-1", email: "gina@example.com", emailVerified: true, name: "Gina Green" };
  setGoogleVerifier(async (credential) => {
    seen.push(credential);
    if (credential.startsWith("bad")) throw new Error("Wrong number of segments / invalid signature");
    return profile;
  });
});

const CRED = "good-credential-abcdefghijklmnop"; // any string 20+ chars: the fake decides what it means
const post = (path, body) => fetch(base + path, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
const google = (credential = CRED) => post("/auth/google", { credential });

test("the website is told whether Google sign-in is available", async () => {
  const on = await (await fetch(`${base}/auth/providers`)).json();
  assert.deepEqual(on, { google: { clientId: "test-client-id.apps.googleusercontent.com" } });

  const saved = process.env.GOOGLE_CLIENT_ID;
  delete process.env.GOOGLE_CLIENT_ID;
  try {
    assert.deepEqual(await (await fetch(`${base}/auth/providers`)).json(), { google: null });
    const res = await google();
    assert.equal(res.status, 503, "must refuse cleanly when the server has no client id");
    assert.equal(seen.length, 0, "must not even try to verify");
  } finally {
    process.env.GOOGLE_CLIENT_ID = saved;
  }
});

test("a first Google sign-in creates an account and returns a working login token", async () => {
  const res = await google();
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(body.token);
  assert.deepEqual(Object.keys(body.user).sort(), ["email", "id", "name", "role"], "no internal fields leak");
  assert.equal(body.user.email, "gina@example.com");
  assert.equal(body.user.name, "Gina Green");
  assert.equal(body.user.role, "user");
  assert.deepEqual(seen, [CRED]);

  const me = await fetch(`${base}/auth/me`, { headers: { authorization: `Bearer ${body.token}` } });
  assert.equal((await me.json()).user.email, "gina@example.com");

  const stored = await User.findOne({ email: "gina@example.com" }).select("+passwordHash");
  assert.equal(stored.googleId, "google-sub-1");
  assert.equal(stored.passwordHash, undefined, "a Google account has no password");
});

test("signing in again returns the same account, never a duplicate", async () => {
  const first = await (await google()).json();
  const second = await (await google()).json();
  assert.equal(second.user.id, first.user.id);
  assert.equal(await User.countDocuments({ googleId: "google-sub-1" }), 1);
});

test("the account is found by Google's permanent id even if the email changes", async () => {
  const first = await (await google()).json();
  profile = { ...profile, email: "gina.new@example.com" };
  const again = await (await google()).json();
  assert.equal(again.user.id, first.user.id);
  assert.equal(again.user.email, "gina@example.com");
});

test("an email already used by a PASSWORD account is never merged", async () => {
  await post("/auth/register", { name: "Pat", email: "pat@example.com", password: "password123" });
  profile = { sub: "google-sub-pat", email: "Pat@Example.com", emailVerified: true, name: "Pat" };
  const res = await google();
  assert.equal(res.status, 409);
  assert.match((await res.json()).message, /log in with your email and password/i);
  const pat = await User.findOne({ email: "pat@example.com" });
  assert.equal(pat.googleId, undefined, "the existing account must not be linked");
});

test("a second Google identity with the same email is refused", async () => {
  assert.equal((await google()).status, 200);
  profile = { ...profile, sub: "google-sub-2" };
  assert.equal((await google()).status, 409);
});

test("an unverified Google email is rejected", async () => {
  profile = { ...profile, sub: "sub-unverified", email: "unverified@example.com", emailVerified: false };
  assert.equal((await google()).status, 401);
  assert.equal(await User.countDocuments({ email: "unverified@example.com" }), 0);
});

test("an invalid or forged credential is rejected without leaking details", async () => {
  const res = await google("bad-credential-abcdefghijklmnop");
  assert.equal(res.status, 401);
  assert.doesNotMatch(JSON.stringify(await res.json()), /segments|signature/i);
});

test("a verifier result without an id or email is rejected", async () => {
  profile = { sub: "", email: "x@example.com", emailVerified: true };
  assert.equal((await google()).status, 401);
  profile = { sub: "sub-no-email", email: "", emailVerified: true };
  assert.equal((await google()).status, 401);
});

test("the credential must be a reasonable string", async () => {
  for (const body of [{}, { credential: "short" }, { credential: { $ne: null } }, { credential: "x".repeat(5000) }, { credential: 12345678901234567890 }]) {
    const res = await post("/auth/google", body);
    assert.equal(res.status, 400, JSON.stringify(body).slice(0, 40));
  }
  assert.equal(seen.length, 0);
});

test("a Google-only account cannot be entered with a password, and does not crash the login", async () => {
  await google();
  for (const password of ["anything-at-all", "", "password123"]) {
    const res = await post("/auth/login", { email: "gina@example.com", password: password || "x" });
    assert.equal(res.status, 401, `password ${JSON.stringify(password)}`);
    assert.equal((await res.json()).message, "Invalid email or password");
  }
});

test("a password sign-up cannot take over an email that belongs to a Google account", async () => {
  await google();
  const res = await post("/auth/register", { name: "Impostor", email: "gina@example.com", password: "password123" });
  assert.equal(res.status, 409);
});

test("name handling: falls back to the email name and is capped at 60 characters", async () => {
  profile = { sub: "sub-noname", email: "noname@example.com", emailVerified: true };
  assert.equal((await (await google()).json()).user.name, "noname");
  profile = { sub: "sub-long", email: "long@example.com", emailVerified: true, name: "N".repeat(100) };
  assert.equal((await (await google()).json()).user.name.length, 60);
});

test("password accounts still work exactly as before", async () => {
  const reg = await post("/auth/register", { name: "Rob", email: "rob@example.com", password: "password123" });
  assert.equal(reg.status, 201);
  assert.equal((await post("/auth/login", { email: "rob@example.com", password: "password123" })).status, 200);
  assert.equal((await post("/auth/login", { email: "rob@example.com", password: "wrong-password" })).status, 401);
});
