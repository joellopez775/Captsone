import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createApp } from "../src/app.js";

const pool = {
  async query() {
    return {
      rows: [{ database: "sigaa_test", checked_at: "2026-08-21T00:00:00.000Z" }],
    };
  },
};

const server = createApp({ pool }).listen(0, "127.0.0.1");
let baseUrl;

before(async () => {
  await new Promise((resolve) => server.once("listening", resolve));
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

test("GET /health reports a healthy API", async () => {
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok", service: "api" });
});

test("GET /db-health reports the selected database", async () => {
  const response = await fetch(`${baseUrl}/db-health`);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.status, "ok");
  assert.equal(body.database, "sigaa_test");
});

test("GET /prototype returns explicitly synthetic dashboard data", async () => {
  const response = await fetch(`${baseUrl}/prototype`);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.meta.synthetic, true);
  assert.equal(body.students.length, 5);
  assert.equal(body.alerts.length, 4);
});

test("GET /prototype/students/:id returns a contextual student view", async () => {
  const response = await fetch(`${baseUrl}/prototype/students/est-001`);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.synthetic, true);
  assert.equal(body.student.id, "est-001");
  assert.equal(body.alerts.length, 2);
});

test("GET /prototype/students/:id returns a stable not-found error", async () => {
  const response = await fetch(`${baseUrl}/prototype/students/missing`);
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "student_not_found" });
});

test("unknown routes return a stable JSON error", async () => {
  const response = await fetch(`${baseUrl}/missing`);
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "not_found" });
});
