import { test } from "node:test";
import assert from "node:assert/strict";
import Anthropic from "@anthropic-ai/sdk";
import { createClaudeDetector } from "../src/services/detector/claude.js";
import { createMockDetector } from "../src/services/detector/mock.js";
import { buildJsonSchema, normalize, DetectorError } from "../src/services/detector/result.js";

const conditions = [
  { slug: "aphids", name: "Aphids", kind: "pest" },
  { slug: "black-spot", name: "Black spot", kind: "disease" },
];
const slugs = conditions.map((c) => c.slug);
const good = { subject: "plant", plantName: "Rose", status: "issue", conditionSlug: "black-spot", confidence: 0.82, observations: "Dark spots." };
const input = { buffer: Buffer.from("fake-image-bytes"), mediaType: "image/png", conditions };

// A stand-in for the Anthropic client that records the request and returns a canned response.
const fakeClient = (response) => {
  const seen = [];
  return {
    seen,
    messages: { create: async (req) => { seen.push(req); if (response instanceof Error) throw response; return response; } },
  };
};
const reply = (text, stop_reason = "end_turn") => ({ stop_reason, content: [{ type: "thinking", thinking: "" }, { type: "text", text }] });

test("claude detector builds a correct structured-output vision request", async () => {
  const client = fakeClient(reply(JSON.stringify(good)));
  const out = await createClaudeDetector({ client, model: "test-model" }).detect(input);
  assert.deepEqual(out, good);

  const req = client.seen[0];
  assert.equal(req.model, "test-model");
  assert.ok(req.max_tokens >= 1024);
  assert.equal(req.tool_choice, undefined, "forced tool use is rejected by this model, so it must not be sent");
  assert.equal(req.temperature, undefined);

  // image first, as a base64 block with the verified media type
  const [image, text] = req.messages[0].content;
  assert.deepEqual(image, { type: "image", source: { type: "base64", media_type: "image/png", data: input.buffer.toString("base64") } });
  assert.match(text.text, /aphids: Aphids \(pest\)/);
  assert.match(text.text, /black-spot: Black spot \(disease\)/);

  // the reply is constrained to the schema, and the model can only name listed problems (or "none")
  const { format } = req.output_config;
  assert.equal(format.type, "json_schema");
  assert.deepEqual(format.schema.properties.conditionSlug.enum, [...slugs, "none"]);
  assert.equal(format.schema.additionalProperties, false);
  assert.deepEqual(format.schema.required.sort(), Object.keys(format.schema.properties).sort());

  // the system prompt treats the photo as untrusted
  assert.match(req.system, /untrusted/i);
});

test("a safety refusal becomes an 'unclear' result, not an error", async () => {
  const out = await createClaudeDetector({ client: fakeClient(reply("", "refusal")) }).detect(input);
  assert.equal(normalize(out, slugs).outcome, "unclear");
});

test("truncated or unreadable replies raise a safe error", async () => {
  await assert.rejects(createClaudeDetector({ client: fakeClient(reply("{", "max_tokens")) }).detect(input), DetectorError);
  await assert.rejects(createClaudeDetector({ client: fakeClient(reply("not json at all")) }).detect(input), (e) => e instanceof DetectorError && /unreadable/.test(e.message));
  await assert.rejects(createClaudeDetector({ client: fakeClient({ stop_reason: "end_turn", content: [] }) }).detect(input), DetectorError);
});

test("API errors are translated and never leak their details", async () => {
  const api = (status, message) => Anthropic.APIError.generate(status, { type: "error", error: { type: "x", message } }, message, new Headers());
  const run = (err) => createClaudeDetector({ client: fakeClient(err) }).detect(input).catch((e) => e);

  const auth = await run(api(401, "invalid x-api-key sk-ant-SECRET"));
  assert.ok(auth instanceof DetectorError);
  assert.equal(auth.status, 503);
  assert.doesNotMatch(auth.message, /sk-ant|SECRET/);

  const limited = await run(api(429, "rate limited"));
  assert.equal(limited.status, 503);
  assert.match(limited.message, /busy/i);

  const other = await run(api(500, "boom internal"));
  assert.ok(other instanceof DetectorError);
  assert.doesNotMatch(other.message, /boom/);
});

test("normalize: confidence threshold, clamping and knowledge-base membership", () => {
  assert.equal(normalize(good, slugs).outcome, "issue");
  assert.equal(normalize({ ...good, confidence: 0.49 }, slugs).outcome, "unclear");
  assert.equal(normalize({ ...good, confidence: 0.5 }, slugs).outcome, "issue");
  assert.equal(normalize({ ...good, conditionSlug: "none" }, slugs).outcome, "unclear");
  assert.equal(normalize({ ...good, conditionSlug: "not-in-kb" }, slugs).outcome, "unclear");
  assert.equal(normalize({ ...good, confidence: 7 }, slugs).confidence, 1);
  assert.equal(normalize({ ...good, status: "healthy" }, slugs).conditionSlug, null);
  assert.equal(normalize({ ...good, subject: "not_plant", confidence: 0.9 }, slugs).outcome, "not_plant");
  assert.equal(normalize({ ...good, subject: "not_plant", confidence: 0.2 }, slugs).outcome, "unclear");
  assert.equal(normalize(undefined, slugs).outcome, "unclear");
});

test("normalize: the confidence threshold can be tuned by env", () => {
  process.env.DIAGNOSE_MIN_CONFIDENCE = "0.8";
  try {
    assert.equal(normalize({ ...good, confidence: 0.7 }, slugs).outcome, "unclear");
    assert.equal(normalize({ ...good, confidence: 0.85 }, slugs).outcome, "issue");
  } finally {
    delete process.env.DIAGNOSE_MIN_CONFIDENCE;
  }
});

test("json schema only allows listed problems", () => {
  const schema = buildJsonSchema(["a", "b"]);
  assert.deepEqual(schema.properties.conditionSlug.enum, ["a", "b", "none"]);
});

test("mock detector is repeatable, valid, and labelled as a demo", async () => {
  const mock = createMockDetector();
  assert.equal(mock.name, "mock");
  const a = await mock.detect(input);
  const b = await mock.detect(input);
  assert.deepEqual(a, b);
  assert.match(a.observations, /demo mode/i);
  assert.notEqual(normalize(a, slugs), undefined);
  // a spread of different inputs exercises every branch and always yields a valid result
  const outcomes = new Set();
  for (let i = 0; i < 60; i++) {
    const r = await mock.detect({ ...input, buffer: Buffer.from(`image-${i}`) });
    outcomes.add(normalize(r, slugs).outcome);
  }
  assert.ok(outcomes.has("issue"));
});
