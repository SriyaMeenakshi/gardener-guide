import { test } from "node:test";
import assert from "node:assert/strict";

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret-test-secret-test-secret-123456";
process.env.AUTH_RATE_LIMIT = "3"; // read when the router loads, so set it before importing the app

const { default: app } = await import("../src/app.js");

test("auth routes are rate limited per client", async () => {
  const server = app.listen(0);
  const url = `http://localhost:${server.address().port}/api/auth/login`;
  try {
    const statuses = [];
    // An empty body fails validation (400) before touching the database, but still counts toward the limit.
    for (let i = 0; i < 5; i++) {
      const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
      statuses.push(res.status);
    }
    assert.deepEqual(statuses, [400, 400, 400, 429, 429]);
  } finally {
    server.close();
  }
});
