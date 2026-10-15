import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import pg from "pg";
import { randomBytes } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { sampleData } from "../src/sample-data.js";
import { digest, verifyPassword } from "../src/security.js";

const adminUrl = process.env.TEST_DATABASE_URL;
if (!adminUrl)
  throw new Error(
    "TEST_DATABASE_URL is required (isolated PostgreSQL cluster; CREATE DATABASE privilege)",
  );
const dbName = "sigaa_s3_test_" + randomBytes(6).toString("hex"),
  origin = "http://localhost:8099";
const dbUrl = new URL(adminUrl);
dbUrl.pathname = "/" + dbName;
let adminPool,
  pool,
  child,
  base,
  fixture,
  admin,
  teacher,
  teacher2,
  student,
  student2,
  created,
  enrolled;
const passwords = Object.fromEntries(
  ["admin", "teacher", "teacher2", "student", "student2"].map((k) => [
    k,
    randomBytes(20).toString("hex"),
  ]),
);
async function start(extra = {}) {
  child = spawn(process.execPath, ["src/server.js"], {
    cwd: new URL("..", import.meta.url),
    env: {
      ...process.env,
      DATABASE_URL: dbUrl.href,
      PORT: "0",
      NODE_ENV: "test",
      APP_ORIGIN: origin,
      ...extra,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let logs = "";
  child.stderr.on("data", (b) => {
    logs += b;
  });
  base = await new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("API startup timeout " + logs)),
      10000,
    );
    child.on("exit", (code) => {
      clearTimeout(timer);
      reject(new Error("API exited " + code + " " + logs));
    });
    child.stdout.on("data", (b) => {
      const match = String(b).match(/port (\d+)/);
      if (match) {
        clearTimeout(timer);
        resolve("http://127.0.0.1:" + match[1]);
      }
    });
  });
}
async function stop() {
  if (child && child.exitCode === null) {
    const exit = once(child, "exit");
    child.kill("SIGTERM");
    await exit;
  }
}
async function call(
  path,
  { session, method = "GET", body, headers = {} } = {},
) {
  const response = await fetch(base + path, {
    method,
    headers: {
      "content-type": "application/json",
      origin,
      ...(session
        ? { cookie: session.cookie, "x-csrf-token": session.csrfToken }
        : {}),
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const data = response.status === 204 ? {} : await response.json();
  return { status: response.status, data, headers: response.headers };
}
async function login(email, password, session) {
  const r = await call("/auth/login", {
    method: "POST",
    body: { email, password },
    session,
  });
  assert.equal(r.status, 200, JSON.stringify(r.data));
  return {
    cookie: r.headers.get("set-cookie").split(";")[0],
    csrfToken: r.data.csrfToken,
    user: r.data.user,
    flags: r.headers.get("set-cookie"),
  };
}
before(async () => {
  adminPool = new pg.Pool({ connectionString: adminUrl });
  await adminPool.query('CREATE DATABASE "' + dbName + '"');
  pool = new pg.Pool({ connectionString: dbUrl.href });
  const dir = new URL("../../../infra/postgres/init/", import.meta.url);
  for (const file of (await readdir(dir))
    .filter((f) => f.endsWith(".sql"))
    .sort())
    await pool.query(await readFile(new URL(file, dir), "utf8"));
  fixture = await sampleData(pool, passwords);
  await start();
  admin = await login("admin@sigaa.local", passwords.admin);
  teacher = await login("docente@sigaa.local", passwords.teacher);
  teacher2 = await login("docente2@sigaa.local", passwords.teacher2);
  student = await login("estudiante@sigaa.local", passwords.student);
  student2 = await login("estudiante2@sigaa.local", passwords.student2);
});
after(async () => {
  await stop();
  if (pool) await pool.end();
  if (adminPool) {
    await adminPool.query('DROP DATABASE IF EXISTS "' + dbName + '"');
    await adminPool.end();
  }
});
test("migration 007 is additive and repeatable", async () => {
  const source = await readFile(
    new URL(
      "../../../infra/postgres/init/007_sprint3_security.sql",
      import.meta.url,
    ),
    "utf8",
  );
  await pool.query(source);
  assert.equal(
    (await pool.query("SELECT COUNT(*)::int AS n FROM estudiante")).rows[0].n,
    2,
  );
});
test("stored passwords and session tokens are hashes; cookie is HttpOnly/SameSite", async () => {
  const row = (
    await pool.query("SELECT password_hash FROM usuario WHERE id=$1", [
      admin.user.id,
    ])
  ).rows[0];
  assert.ok(row.password_hash.startsWith("scrypt$"));
  assert.ok(await verifyPassword(passwords.admin, row.password_hash));
  assert.match(admin.flags, /HttpOnly/);
  assert.match(admin.flags, /SameSite=Strict/);
  const token = admin.cookie.split("=")[1];
  assert.equal(
    (
      await pool.query(
        "SELECT token_hash FROM sesion_usuario WHERE token_hash=$1",
        [digest(token)],
      )
    ).rows[0].token_hash,
    digest(token),
  );
  assert.equal(
    (
      await pool.query("SELECT 1 FROM sesion_usuario WHERE token_hash=$1", [
        token,
      ])
    ).rowCount,
    0,
  );
});
test("unknown, wrong password and disabled accounts receive generic errors", async () => {
  for (const [email, password] of [
    ["unknown@sigaa.local", "wrong"],
    ["admin@sigaa.local", "wrong"],
  ]) {
    const r = await call("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    assert.equal(r.status, 401);
    assert.equal(r.data.error, "invalid_credentials");
  }
  await pool.query("UPDATE usuario SET estado='bloqueado' WHERE id=$1", [
    fixture.teacher2.id,
  ]);
  assert.equal(
    (
      await call("/auth/login", {
        method: "POST",
        body: { email: "docente2@sigaa.local", password: passwords.teacher2 },
      })
    ).status,
    401,
  );
  assert.equal((await call("/courses", { session: teacher2 })).status, 403);
  await pool.query("UPDATE usuario SET estado='activo' WHERE id=$1", [
    fixture.teacher2.id,
  ]);
});
test("unauthenticated requests and spoofed demo headers cannot read school data", async () => {
  for (const path of [
    "/students",
    "/courses",
    "/enrollments",
    "/prototype",
    "/teacher/workspace",
    "/student/workspace/" + fixture.students[0],
  ])
    assert.equal(
      (
        await call(path, {
          headers: {
            "x-demo-role": "teacher",
            "x-demo-student-id": fixture.students[0],
          },
        })
      ).status,
      401,
    );
});
test("session restore and role/identity are server-derived", async () => {
  const r = await call("/auth/me", {
    session: student,
    headers: { "x-demo-role": "admin" },
  });
  assert.equal(r.status, 200);
  assert.equal(r.data.user.role, "student");
  assert.equal(r.data.user.studentId, fixture.students[0]);
  assert.equal(
    (await call("/students", { session: student, method: "POST", body: {} }))
      .status,
    403,
  );
  assert.equal(
    (await call("/students", { session: teacher, method: "POST", body: {} }))
      .status,
    403,
  );
  assert.equal(
    (await call("/enrollments", { session: teacher, method: "POST", body: {} }))
      .status,
    403,
  );
});
test("teachers only see their own courses and enrolled students", async () => {
  for (const [session, index] of [
    [teacher, 0],
    [teacher2, 1],
  ]) {
    assert.deepEqual(
      (await call("/courses", { session })).data.courses.map((c) => c.id),
      [fixture.courses[index]],
    );
    assert.deepEqual(
      (await call("/students", { session })).data.students.map((s) => s.id),
      [fixture.students[index]],
    );
    assert.equal(
      (await call("/students/" + fixture.students[1 - index], { session }))
        .status,
      403,
    );
    assert.equal(
      (await call("/students/" + fixture.students[index], { session })).status,
      200,
    );
  }
});
test("students cannot access another student, courses, enrollments or unpublished grades", async () => {
  assert.deepEqual(
    (await call("/students", { session: student })).data.students.map(
      (s) => s.id,
    ),
    [fixture.students[0]],
  );
  assert.equal(
    (await call("/students/" + fixture.students[1], { session: student }))
      .status,
    403,
  );
  assert.equal(
    (
      await call("/student/workspace/" + fixture.students[1], {
        session: student,
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await call("/student/workspace/" + fixture.students[0], {
        session: student,
      })
    ).status,
    200,
  );
  assert.deepEqual(
    (await call("/enrollments", { session: student })).data.enrollments.map(
      (m) => m.studentId,
    ),
    [fixture.students[0]],
  );
  assert.equal(
    (
      await call("/audit/estudiante/" + fixture.students[0], {
        session: student,
      })
    ).status,
    403,
  );
});
test("mutations require matching origin and CSRF; login rejects cross-origin", async () => {
  assert.equal(
    (
      await call("/auth/login", {
        method: "POST",
        body: {},
        headers: { origin: "https://evil.example" },
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await call("/students", {
        session: admin,
        method: "POST",
        body: {},
        headers: { "x-csrf-token": "fake" },
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await call("/students", {
        session: admin,
        method: "POST",
        body: {},
        headers: { origin: "https://evil.example" },
      })
    ).status,
    403,
  );
});
test("teacher writes use actual assignments; out-of-scope and student writes are denied", async () => {
  const assignments = (await call("/teacher/workspace", { session: teacher }))
    .data.assignments;
  const other = (await call("/teacher/workspace", { session: teacher2 })).data
    .assignments;
  const body = {
    courseSubjectId: assignments[0].id,
    date: "2026-10-16",
    title: "Clase de prueba",
    objective: "Validar alcance",
    block: "Bloque QA",
  };
  assert.equal(
    (await call("/teacher/classes", { session: student, method: "POST", body }))
      .status,
    403,
  );
  assert.equal(
    (
      await call("/teacher/classes", {
        session: teacher,
        method: "POST",
        body: { ...body, courseSubjectId: other[0].id },
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await call("/teacher/classes", {
        session: teacher,
        method: "POST",
        body: { ...body, date: "2026-02-31" },
      })
    ).status,
    400,
  );
  const created = await call("/teacher/classes", {
    session: teacher,
    method: "POST",
    body,
  });
  assert.equal(created.status, 201);
  const path =
    "/teacher/classes/" + created.data.classSession.id + "/attendance";
  assert.equal(
    (
      await call(path, {
        session: teacher2,
        method: "PUT",
        body: {
          records: [{ studentId: fixture.students[0], status: "present" }],
        },
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await call(path, {
        session: teacher,
        method: "PUT",
        body: {
          records: [{ studentId: fixture.students[1], status: "present" }],
        },
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await call(path, {
        session: teacher,
        method: "PUT",
        body: {
          records: [{ studentId: fixture.students[0], status: "present" }],
        },
      })
    ).status,
    200,
  );
  assert.equal(
    (
      await pool.query("SELECT estado FROM asistencia WHERE sesion_id=$1", [
        created.data.classSession.id,
      ])
    ).rows[0].estado,
    "presente",
  );
});
test("student grades require publication flags and never leak another student's rows", async () => {
  const ca = (
    await pool.query("SELECT id FROM curso_asignatura WHERE curso_id=$1", [
      fixture.courses[0],
    ])
  ).rows[0].id;
  const ev = (
    await pool.query(
      "INSERT INTO evaluacion(curso_asignatura_id,nombre,fecha,ponderacion,estado,creada_por,visible_estudiante) VALUES($1,'QA notas','2026-10-15',50,'publicada',$2,true) RETURNING id",
      [ca, fixture.teacher.id],
    )
  ).rows[0].id;
  await pool.query(
    "INSERT INTO calificacion(evaluacion_id,estudiante_id,valor,registrada_por,visible_estudiante) VALUES($1,$2,6.5,$3,false)",
    [ev, fixture.students[0], fixture.teacher.id],
  );
  const path = "/student/workspace/" + fixture.students[0];
  assert.equal((await call(path, { session: student })).data.grades.length, 0);
  await pool.query(
    "UPDATE calificacion SET visible_estudiante=true WHERE evaluacion_id=$1",
    [ev],
  );
  assert.equal(
    (await call(path, { session: student })).data.grades[0].value,
    "6.5",
  );
  assert.equal(
    (
      await call("/student/workspace/" + fixture.students[1], {
        session: student2,
      })
    ).data.grades.length,
    0,
  );
});
test("create student persists with actor/date and rejects incomplete or duplicate input", async () => {
  assert.equal(
    (await call("/students", { session: admin, method: "POST", body: {} }))
      .status,
    400,
  );
  const body = {
    identifier: "QA-NEW",
    firstName: "Ana",
    lastName: "Prueba",
    email: "ana@example.test",
  };
  const r = await call("/students", { session: admin, method: "POST", body });
  assert.equal(r.status, 201);
  created = r.data.student;
  assert.equal(created.createdBy, admin.user.id);
  assert.ok(created.createdAt);
  assert.equal(
    (await call("/students", { session: admin, method: "POST", body })).status,
    409,
  );
  assert.equal(
    (
      await call("/students", {
        session: admin,
        method: "POST",
        body: { ...body, identifier: "QA-OTHER" },
      })
    ).status,
    409,
  );
});
test("student updates are audited, validated and reject stale writes", async () => {
  const body = {
    ...created,
    firstName: "Ana María",
    expectedUpdatedAt: created.updatedAt,
  };
  const r = await call("/students/" + created.id, {
    session: admin,
    method: "PUT",
    body,
  });
  assert.equal(r.status, 200);
  created = r.data.student;
  assert.equal(
    (
      await call("/students/" + created.id, {
        session: admin,
        method: "PUT",
        body,
      })
    ).status,
    409,
  );
  assert.equal(
    (
      await call("/students/" + created.id, {
        session: admin,
        method: "PUT",
        body: { ...body, identifier: "bad!" },
      })
    ).status,
    400,
  );
  const events = (
    await call("/audit/estudiante/" + created.id, { session: admin })
  ).data.events;
  assert.equal(events.length, 2);
  assert.equal(events[0].actorId, admin.user.id);
  assert.equal(events[0].before.firstName, "Ana");
});
test("enrollment validates period, course, student status and concurrent duplicates", async () => {
  const body = {
    studentId: created.id,
    courseId: fixture.courses[0],
    periodId: fixture.periodId,
  };
  assert.equal(
    (
      await call("/enrollments", {
        session: admin,
        method: "POST",
        body: { ...body, periodId: fixture.courses[0] },
      })
    ).status,
    400,
  );
  const both = await Promise.all([
    call("/enrollments", { session: admin, method: "POST", body }),
    call("/enrollments", { session: admin, method: "POST", body }),
  ]);
  assert.deepEqual(both.map((r) => r.status).sort(), [201, 409]);
  enrolled = both.find((r) => r.status === 201).data.enrollment;
  assert.equal(
    (
      await call("/enrollments", {
        session: admin,
        method: "POST",
        body: { ...body, courseId: fixture.courses[1] },
      })
    ).status,
    409,
  );
  assert.ok(
    (await call("/students", { session: teacher })).data.students.some(
      (s) => s.id === created.id,
    ),
  );
});
test("closing enrollment retains immutable history and removes active teacher scope", async () => {
  assert.equal(
    (
      await call("/enrollments/" + enrolled.id, {
        session: student,
        method: "PATCH",
        body: { status: "retirada", reason: "Cambio de colegio" },
      })
    ).status,
    403,
  );
  const r = await call("/enrollments/" + enrolled.id, {
    session: admin,
    method: "PATCH",
    body: { status: "retirada", reason: "Cambio de colegio" },
  });
  assert.equal(r.status, 200);
  assert.ok(r.data.enrollment.finalizado_en);
  assert.equal(
    (await call("/students/" + created.id, { session: teacher })).status,
    403,
  );
  assert.equal(
    (await call("/audit/matricula/" + enrolled.id, { session: admin })).data
      .events.length,
    2,
  );
  await assert.rejects(
    pool.query("DELETE FROM evento_auditoria WHERE entidad_id=$1", [
      enrolled.id,
    ]),
  );
  assert.equal(
    (
      await call("/enrollments/" + enrolled.id, {
        session: admin,
        method: "PATCH",
        body: { status: "activa", reason: "Reabrir registro" },
      })
    ).status,
    400,
  );
});
test("capacity and inactive courses reject enrollments; re-enrollment creates a new historical record", async () => {
  await pool.query("UPDATE curso SET capacidad=1 WHERE id=$1", [
    fixture.courses[0],
  ]);
  const body = {
    studentId: created.id,
    courseId: fixture.courses[0],
    periodId: fixture.periodId,
  };
  assert.equal(
    (await call("/enrollments", { session: admin, method: "POST", body }))
      .status,
    409,
  );
  await pool.query(
    "UPDATE curso SET capacidad=35,estado='cerrado' WHERE id=$1",
    [fixture.courses[0]],
  );
  assert.equal(
    (await call("/enrollments", { session: admin, method: "POST", body }))
      .status,
    400,
  );
  await pool.query("UPDATE curso SET estado='activo' WHERE id=$1", [
    fixture.courses[0],
  ]);
  assert.equal(
    (await call("/enrollments", { session: admin, method: "POST", body }))
      .status,
    201,
  );
});
test("real API process restart preserves students, enrollments, audit and sessions", async () => {
  await stop();
  await pool.end();
  pool = new pg.Pool({ connectionString: dbUrl.href });
  await start();
  const s = await call("/students/" + created.id, { session: admin });
  assert.equal(s.status, 200);
  assert.equal(s.data.student.firstName, "Ana María");
  const m = (
    await call("/enrollments", { session: admin })
  ).data.enrollments.filter((m) => m.studentId === created.id);
  assert.equal(m.length, 2);
  assert.deepEqual(m.map((m) => m.status).sort(), ["activa", "retirada"]);
  assert.equal(
    (await call("/audit/estudiante/" + created.id, { session: admin })).data
      .events.length,
    2,
  );
});
test("sessions rotate at login and revoke on logout and logout-all", async () => {
  const first = await login("docente@sigaa.local", passwords.teacher);
  const second = await login("docente@sigaa.local", passwords.teacher, first);
  assert.notEqual(first.cookie, second.cookie);
  assert.equal((await call("/auth/me", { session: first })).status, 401);
  assert.equal(
    (await call("/auth/logout", { session: second, method: "POST", body: {} }))
      .status,
    204,
  );
  assert.equal((await call("/auth/me", { session: second })).status, 401);
  const third = await login("docente@sigaa.local", passwords.teacher);
  const fourth = await login("docente@sigaa.local", passwords.teacher);
  assert.equal(
    (
      await call("/auth/logout-all", {
        session: third,
        method: "POST",
        body: {},
      })
    ).status,
    204,
  );
  assert.equal((await call("/auth/me", { session: fourth })).status, 401);
});
test("absolute expiry and inactivity timeout reject persisted sessions", async () => {
  const s = await login("docente@sigaa.local", passwords.teacher);
  await pool.query(
    "UPDATE sesion_usuario SET creada_en=NOW()-INTERVAL '9 hours',expira_en=NOW()-INTERVAL '1 minute' WHERE token_hash=$1",
    [digest(s.cookie.split("=")[1])],
  );
  assert.equal((await call("/auth/me", { session: s })).status, 401);
  const idle = await login("docente@sigaa.local", passwords.teacher);
  await pool.query(
    "UPDATE sesion_usuario SET ultimo_uso_en=NOW()-INTERVAL '31 minutes' WHERE token_hash=$1",
    [digest(idle.cookie.split("=")[1])],
  );
  assert.equal((await call("/auth/me", { session: idle })).status, 401);
});
test("password change verifies old password, hashes new password and revokes all sessions", async () => {
  const s = await login("estudiante2@sigaa.local", passwords.student2),
    next = randomBytes(20).toString("hex");
  assert.equal(
    (
      await call("/auth/password", {
        session: s,
        method: "POST",
        body: { currentPassword: "wrong", newPassword: next },
      })
    ).status,
    401,
  );
  assert.equal(
    (
      await call("/auth/password", {
        session: s,
        method: "POST",
        body: { currentPassword: passwords.student2, newPassword: next },
      })
    ).status,
    204,
  );
  assert.equal((await call("/auth/me", { session: s })).status, 401);
  assert.equal(
    (
      await call("/auth/login", {
        method: "POST",
        body: {
          email: "estudiante2@sigaa.local",
          password: passwords.student2,
        },
      })
    ).status,
    401,
  );
  await login("estudiante2@sigaa.local", next);
});
test("login rate limiting is stored in PostgreSQL and survives restart", async () => {
  await pool.query(
    "INSERT INTO limite_login(clave,intentos,ventana) VALUES($1,20,NOW()) ON CONFLICT(clave) DO UPDATE SET intentos=20,ventana=NOW()",
    [digest("email:blocked@example.test")],
  );
  await stop();
  await start();
  const r = await call("/auth/login", {
    method: "POST",
    body: { email: "blocked@example.test", password: "wrong" },
  });
  assert.equal(r.status, 429);
  assert.equal(r.headers.get("retry-after"), "900");
});
test("removed roles are denied even with an existing session", async () => {
  const s = await login("docente2@sigaa.local", passwords.teacher2);
  await pool.query(
    "UPDATE usuario_rol SET vigente_desde=NOW()-INTERVAL '2 days',vigente_hasta=NOW()-INTERVAL '1 day' WHERE usuario_id=$1",
    [fixture.teacher2.id],
  );
  assert.equal((await call("/courses", { session: s })).status, 403);
  await pool.query(
    "UPDATE usuario_rol SET vigente_hasta=NULL WHERE usuario_id=$1",
    [fixture.teacher2.id],
  );
  assert.equal((await call("/courses", { session: s })).status, 200);
});
test("student status, invalid identifiers and unknown course IDs are rejected", async () => {
  const body = {
    studentId: created.id,
    courseId: fixture.courses[0],
    periodId: fixture.periodId,
  };
  await pool.query("UPDATE estudiante SET estado='suspendido' WHERE id=$1", [
    created.id,
  ]);
  assert.equal(
    (await call("/enrollments", { session: admin, method: "POST", body }))
      .status,
    400,
  );
  await pool.query("UPDATE estudiante SET estado='regular' WHERE id=$1", [
    created.id,
  ]);
  assert.equal(
    (await call("/students/not-a-uuid", { session: admin })).status,
    400,
  );
  assert.equal(
    (
      await call("/enrollments", {
        session: admin,
        method: "POST",
        body: { ...body, courseId: "00000000-0000-0000-0000-000000000000" },
      })
    ).status,
    400,
  );
});
test("production requires HTTPS origin and sets Secure __Host cookies", async () => {
  await stop();
  await start({
    NODE_ENV: "production",
    APP_ORIGIN: "https://sigaa.example.test",
  });
  const r = await call("/auth/login", {
    method: "POST",
    headers: { origin: "https://sigaa.example.test" },
    body: { email: "admin@sigaa.local", password: passwords.admin },
  });
  assert.equal(r.status, 200);
  assert.match(r.headers.get("set-cookie"), /^__Host-sigaa_session=/);
  assert.match(r.headers.get("set-cookie"), /; Secure/);
  const cookie = r.headers.get("set-cookie").split(";")[0];
  assert.equal((await call("/auth/me", { headers: { cookie } })).status, 200);
});
