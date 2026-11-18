import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret-test-secret-test-secret-123456";
process.env.AUTH_RATE_LIMIT = "1000"; // rate limiting has its own test file

const { default: app } = await import("../src/app.js");
const { default: User } = await import("../src/models/User.js");

let mongod, server, base;

before(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
  await User.init(); // make sure the unique email index exists before tests rely on it
  server = app.listen(0);
  base = `http://localhost:${server.address().port}/api`;
});

after(async () => {
  server?.close();
  await mongoose.disconnect();
  await mongod?.stop();
});

const post = (path, body, headers = {}) =>
  fetch(base + path, { method: "POST", headers: { "content-type": "application/json", ...headers }, body: JSON.stringify(body) });
const me = (token) => fetch(base + "/auth/me", { headers: token ? { authorization: `Bearer ${token}` } : {} });

const alice = { name: "Alice", email: "alice@example.com", password: "correct horse battery" };

test("register creates an account and returns a token without leaking the hash", async () => {
  const res = await post("/auth/register", alice);
  assert.equal(res.status, 201);
  const body = await res.json();
  assert.ok(body.token);
  assert.deepEqual(Object.keys(body.user).sort(), ["email", "id", "name", "role"]);
  assert.equal(body.user.role, "user");
  assert.equal(JSON.stringify(body).includes("passwordHash"), false);
});

test("password is stored hashed (bcrypt), never in plain text", async () => {
  const user = await User.findOne({ email: alice.email }).select("+passwordHash");
  assert.notEqual(user.passwordHash, alice.password);
  assert.match(user.passwordHash, /^\$2[aby]\$12\$/);
  // and it is excluded from normal queries
  const plain = await User.findOne({ email: alice.email });
  assert.equal(plain.passwordHash, undefined);
});

test("duplicate email is rejected, case-insensitively", async () => {
  const res = await post("/auth/register", { ...alice, email: "ALICE@Example.com" });
  assert.equal(res.status, 409);
});

test("a client cannot make themselves admin", async () => {
  const res = await post("/auth/register", { name: "Mallory", email: "mallory@example.com", password: "password123", role: "admin" });
  assert.equal(res.status, 201);
  assert.equal((await res.json()).user.role, "user");
});

test("register validates its input", async () => {
  const cases = [
    [{ ...alice, email: "not-an-email" }, /valid email/i],
    [{ ...alice, email: "x@example.com", password: "short" }, /at least 8/i],
    [{ ...alice, email: "y@example.com", password: "a".repeat(73) }, /at most 72/i],
    [{ email: "z@example.com", password: "password123" }, /name/i],
  ];
  for (const [body, pattern] of cases) {
    const res = await post("/auth/register", body);
    assert.equal(res.status, 400);
    assert.match((await res.json()).message, pattern);
  }
});

test("login succeeds with the right password and normalises the email", async () => {
  const res = await post("/auth/login", { email: "  ALICE@example.com ", password: alice.password });
  assert.equal(res.status, 200);
  assert.ok((await res.json()).token);
});

test("wrong password and unknown email give the same generic error", async () => {
  const wrong = await post("/auth/login", { email: alice.email, password: "wrong password!" });
  const unknown = await post("/auth/login", { email: "nobody@example.com", password: "wrong password!" });
  assert.equal(wrong.status, 401);
  assert.equal(unknown.status, 401);
  assert.deepEqual(await wrong.json(), await unknown.json());
});

test("login rejects NoSQL operator injection", async () => {
  const res = await post("/auth/login", { email: { $ne: null }, password: { $ne: null } });
  assert.equal(res.status, 400);
});

test("/auth/me returns the current user for a valid token", async () => {
  const { token } = await (await post("/auth/login", { email: alice.email, password: alice.password })).json();
  const res = await me(token);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).user.email, alice.email);
});

test("/auth/me rejects missing, malformed, tampered, expired and unsigned tokens", async () => {
  const user = await User.findOne({ email: alice.email });
  const secret = process.env.JWT_SECRET;
  const good = jwt.sign({ sub: user.id, role: "user" }, secret, { algorithm: "HS256" });

  const attempts = {
    "no header": undefined,
    garbage: "not.a.token",
    "wrong secret": jwt.sign({ sub: user.id }, "another-secret-another-secret-123456", { algorithm: "HS256" }),
    expired: jwt.sign({ sub: user.id }, secret, { algorithm: "HS256", expiresIn: -10 }),
    "alg none": `${Buffer.from('{"alg":"none","typ":"JWT"}').toString("base64url")}.${Buffer.from(JSON.stringify({ sub: user.id })).toString("base64url")}.`,
    tampered: good.slice(0, -2) + (good.endsWith("aa") ? "bb" : "aa"),
  };
  for (const [name, token] of Object.entries(attempts)) {
    const res = await me(token);
    assert.equal(res.status, 401, `${name} should be rejected`);
  }
});

test("a valid token stops working once the account is deleted", async () => {
  const reg = await (await post("/auth/register", { name: "Temp", email: "temp@example.com", password: "password123" })).json();
  assert.equal((await me(reg.token)).status, 200);
  await User.deleteOne({ email: "temp@example.com" });
  assert.equal((await me(reg.token)).status, 401);
});

test("role in the token is not trusted: the database role wins", async () => {
  const user = await User.findOne({ email: alice.email });
  const forged = jwt.sign({ sub: user.id, role: "admin" }, process.env.JWT_SECRET, { algorithm: "HS256" });
  const res = await me(forged);
  assert.equal((await res.json()).user.role, "user");
});
