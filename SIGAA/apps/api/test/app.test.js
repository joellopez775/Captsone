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
  assert.equal(body.studentPortal.studentId, "est-001");
  assert.equal(body.meta.school, "Liceo Bicentenario Los Arrayanes");
  assert.equal(body.students[0].course, "2° Medio A");
  assert.equal(body.studentPortal.courses.length, 4);
  assert.equal(body.studentPortal.courses[0].grades.length, 3);
  assert.equal(body.teacherWorkspace.assignments.length, 3);
});

test("teacher workspace rejects requests without the teacher role", async () => {
  const response = await fetch(`${baseUrl}/teacher/workspace`);
  assert.equal(response.status, 403);
  assert.deepEqual(await response.json(), { error: "teacher_role_required" });
});

test("student workspace requires the student role and matching identity", async () => {
  const missingRole = await fetch(`${baseUrl}/student/workspace/est-001`);
  assert.equal(missingRole.status, 403);

  const crossStudent = await fetch(`${baseUrl}/student/workspace/est-002`, {
    headers: { "x-demo-role": "student", "x-demo-student-id": "est-001" },
  });
  assert.equal(crossStudent.status, 403);
  assert.deepEqual(await crossStudent.json(), { error: "student_scope_violation" });
});

test("student workspace exposes only published, self-scoped academic information", async () => {
  const response = await fetch(`${baseUrl}/student/workspace/est-001`, {
    headers: { "x-demo-role": "student", "x-demo-student-id": "est-001" },
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.student.id, "est-001");
  assert.equal(body.subjects.length, 4);
  assert.ok(body.subjects.every(({ grades }) => grades.every(({ published }) => published)));
  assert.ok(body.annotations.every(({ id }) => ["note-003", "note-004"].includes(id)));
  const serialized = JSON.stringify(body);
  assert.equal(serialized.includes("alerts"), false);
  assert.equal(serialized.includes("ASISTENCIA_MENOR_75_V1"), false);
  assert.equal(serialized.includes("Diego Morales"), false);
});

test("teacher can schedule a class and record attendance", async () => {
  const headers = { "content-type": "application/json", "x-demo-role": "teacher" };
  const createResponse = await fetch(`${baseUrl}/teacher/classes`, {
    method: "POST",
    headers,
    body: JSON.stringify({ courseSubjectId: "ca-mat-2a", date: "2026-09-09", startTime: "08:00", block: "Bloque 1", title: "Sistemas de ecuaciones", objective: "Resolver sistemas de ecuaciones lineales." }),
  });
  assert.equal(createResponse.status, 201);
  const created = await createResponse.json();
  assert.equal(created.classSession.status, "planned");

  const attendanceResponse = await fetch(`${baseUrl}/teacher/classes/${created.classSession.id}/attendance`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ records: [{ studentId: "est-001", status: "present" }, { studentId: "est-002", status: "late" }, { studentId: "est-003", status: "absent" }] }),
  });
  assert.equal(attendanceResponse.status, 200);
  const attendance = await attendanceResponse.json();
  assert.equal(attendance.classSession.status, "completed");
  assert.equal(attendance.classSession.attendance["est-003"], "absent");
});

test("teacher can create an evaluation and enter grades only in scope", async () => {
  const headers = { "content-type": "application/json", "x-demo-role": "teacher" };
  const createResponse = await fetch(`${baseUrl}/teacher/evaluations`, {
    method: "POST",
    headers,
    body: JSON.stringify({ courseSubjectId: "ca-mat-2b", name: "Prueba de funciones", date: "2026-09-12", weight: 30 }),
  });
  assert.equal(createResponse.status, 201);
  const created = await createResponse.json();

  const gradeResponse = await fetch(`${baseUrl}/teacher/evaluations/${created.evaluation.id}/grades`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ records: [{ studentId: "est-004", value: 4.8 }, { studentId: "est-005", value: 6.1 }] }),
  });
  assert.equal(gradeResponse.status, 200);
  const graded = await gradeResponse.json();
  assert.equal(graded.evaluation.grades["est-005"], 6.1);
});

test("teacher can add a positive or negative annotation", async () => {
  const response = await fetch(`${baseUrl}/teacher/annotations`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-demo-role": "teacher" },
    body: JSON.stringify({ courseSubjectId: "ca-mat-2a", studentId: "est-002", type: "positive", category: "Esfuerzo", text: "Mostró perseverancia durante toda la actividad." }),
  });
  assert.equal(response.status, 201);
  const body = await response.json();
  assert.equal(body.annotation.type, "positive");
  assert.equal(body.annotation.studentId, "est-002");
});

test("POST /auth/demo-login resolves the teacher role", async () => {
  const response = await fetch(`${baseUrl}/auth/demo-login`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "docente@sigaa.demo", password: "Docente2026!" }) });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.synthetic, true);
  assert.equal(body.role, "teacher");
  assert.equal(body.profile.title, "Profesora jefe");
});

test("POST /auth/demo-login resolves the student role", async () => {
  const response = await fetch(`${baseUrl}/auth/demo-login`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "estudiante@sigaa.demo", password: "Estudiante2026!" }) });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.role, "student");
  assert.equal(body.profile.studentId, "est-001");
});

test("POST /auth/demo-login rejects invalid credentials", async () => {
  const response = await fetch(`${baseUrl}/auth/demo-login`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "estudiante@sigaa.demo", password: "incorrecta" }) });
  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { error: "invalid_credentials" });
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
