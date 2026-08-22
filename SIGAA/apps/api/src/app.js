import cors from "cors";
import express from "express";
import { randomUUID } from "node:crypto";
import { prototypeData } from "./prototype-data.js";

const demoAccounts = [
  { email: "docente@sigaa.demo", password: "Docente2026!", role: "teacher", profile: { name: "Daniela Rojas", title: "Profesora jefe", course: "2° Medio A" } },
  { email: "estudiante@sigaa.demo", password: "Estudiante2026!", role: "student", profile: { name: "Camila Soto", title: "Estudiante", studentId: "est-001" } },
];

const attendanceStates = new Set(["present", "absent", "late", "excused"]);

function requireDemoTeacher(request, response, next) {
  if (request.get("x-demo-role") !== "teacher") {
    response.status(403).json({ error: "teacher_role_required" });
    return;
  }
  next();
}

function assignmentById(id) {
  return prototypeData.teacherWorkspace.assignments.find((assignment) => assignment.id === id);
}

function studentBelongsToAssignment(assignment, studentId) {
  return Boolean(assignment?.studentIds.includes(studentId));
}

export function createApp({ pool }) {
  const app = express();

  app.disable("x-powered-by");
  app.use(cors({ origin: false }));
  app.use(express.json({ limit: "1mb" }));

  app.get("/", (_request, response) => {
    response.json({
      service: "SIGAA API",
      version: "0.2.0",
      documentation: "/health",
    });
  });

  app.get("/health", (_request, response) => {
    response.json({ status: "ok", service: "api" });
  });

  app.get("/db-health", async (_request, response, next) => {
    try {
      const result = await pool.query(
        "SELECT current_database() AS database, NOW() AS checked_at",
      );
      response.json({ status: "ok", ...result.rows[0] });
    } catch (error) {
      next(error);
    }
  });

  app.get("/prototype", (_request, response) => {
    response.json(prototypeData);
  });

  app.get("/teacher/workspace", requireDemoTeacher, (_request, response) => {
    response.json({ synthetic: true, ...prototypeData.teacherWorkspace });
  });

  app.post("/teacher/classes", requireDemoTeacher, (request, response) => {
    const courseSubjectId = String(request.body?.courseSubjectId ?? "");
    const assignment = assignmentById(courseSubjectId);
    const date = String(request.body?.date ?? "");
    const title = String(request.body?.title ?? "").trim();
    const objective = String(request.body?.objective ?? "").trim();

    if (!assignment) {
      response.status(403).json({ error: "assignment_out_of_scope" });
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !title || !objective) {
      response.status(400).json({ error: "invalid_class_data" });
      return;
    }

    const classSession = {
      id: `class-${randomUUID()}`,
      courseSubjectId,
      date,
      startTime: String(request.body?.startTime ?? "08:00"),
      block: String(request.body?.block ?? "Bloque por definir"),
      title,
      objective,
      status: "planned",
      attendance: {},
    };
    prototypeData.teacherWorkspace.classSessions.push(classSession);
    response.status(201).json({ synthetic: true, classSession, workspace: prototypeData.teacherWorkspace });
  });

  app.put("/teacher/classes/:id/attendance", requireDemoTeacher, (request, response) => {
    const classSession = prototypeData.teacherWorkspace.classSessions.find(({ id }) => id === request.params.id);
    const assignment = assignmentById(classSession?.courseSubjectId);
    const records = Array.isArray(request.body?.records) ? request.body.records : [];

    if (!classSession || !assignment) {
      response.status(404).json({ error: "class_not_found" });
      return;
    }
    if (!records.length || records.some(({ studentId, status }) => !studentBelongsToAssignment(assignment, studentId) || !attendanceStates.has(status))) {
      response.status(400).json({ error: "invalid_attendance_data" });
      return;
    }

    classSession.attendance = Object.fromEntries(records.map(({ studentId, status }) => [studentId, status]));
    classSession.status = "completed";
    response.json({ synthetic: true, classSession, workspace: prototypeData.teacherWorkspace });
  });

  app.post("/teacher/evaluations", requireDemoTeacher, (request, response) => {
    const courseSubjectId = String(request.body?.courseSubjectId ?? "");
    const assignment = assignmentById(courseSubjectId);
    const name = String(request.body?.name ?? "").trim();
    const date = String(request.body?.date ?? "");
    const weight = Number(request.body?.weight);

    if (!assignment) {
      response.status(403).json({ error: "assignment_out_of_scope" });
      return;
    }
    if (!name || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(weight) || weight <= 0 || weight > 100) {
      response.status(400).json({ error: "invalid_evaluation_data" });
      return;
    }

    const evaluation = { id: `eval-${randomUUID()}`, courseSubjectId, name, date, weight, grades: {} };
    prototypeData.teacherWorkspace.evaluations.push(evaluation);
    response.status(201).json({ synthetic: true, evaluation, workspace: prototypeData.teacherWorkspace });
  });

  app.put("/teacher/evaluations/:id/grades", requireDemoTeacher, (request, response) => {
    const evaluation = prototypeData.teacherWorkspace.evaluations.find(({ id }) => id === request.params.id);
    const assignment = assignmentById(evaluation?.courseSubjectId);
    const records = Array.isArray(request.body?.records) ? request.body.records : [];

    if (!evaluation || !assignment) {
      response.status(404).json({ error: "evaluation_not_found" });
      return;
    }
    if (!records.length || records.some(({ studentId, value }) => !studentBelongsToAssignment(assignment, studentId) || !Number.isFinite(Number(value)) || Number(value) < 1 || Number(value) > 7)) {
      response.status(400).json({ error: "invalid_grade_data" });
      return;
    }

    evaluation.grades = { ...evaluation.grades, ...Object.fromEntries(records.map(({ studentId, value }) => [studentId, Number(value)])) };
    response.json({ synthetic: true, evaluation, workspace: prototypeData.teacherWorkspace });
  });

  app.post("/teacher/annotations", requireDemoTeacher, (request, response) => {
    const courseSubjectId = String(request.body?.courseSubjectId ?? "");
    const assignment = assignmentById(courseSubjectId);
    const studentId = String(request.body?.studentId ?? "");
    const type = String(request.body?.type ?? "");
    const category = String(request.body?.category ?? "").trim();
    const text = String(request.body?.text ?? "").trim();

    if (!assignment || !studentBelongsToAssignment(assignment, studentId)) {
      response.status(403).json({ error: "student_out_of_scope" });
      return;
    }
    if (!new Set(["positive", "negative"]).has(type) || !category || text.length < 8) {
      response.status(400).json({ error: "invalid_annotation_data" });
      return;
    }

    const annotation = {
      id: `note-${randomUUID()}`,
      courseId: assignment.courseId,
      studentId,
      courseSubjectId,
      type,
      category,
      text,
      author: prototypeData.teacherWorkspace.teacher.name,
      createdAt: new Date().toISOString(),
    };
    prototypeData.teacherWorkspace.annotations.unshift(annotation);
    response.status(201).json({ synthetic: true, annotation, workspace: prototypeData.teacherWorkspace });
  });

  app.post("/auth/demo-login", (request, response) => {
    const email = String(request.body?.email ?? "").trim().toLowerCase();
    const password = String(request.body?.password ?? "");
    const account = demoAccounts.find((candidate) => candidate.email === email && candidate.password === password);

    if (!account) {
      response.status(401).json({ error: "invalid_credentials" });
      return;
    }

    response.json({ synthetic: true, role: account.role, profile: account.profile });
  });

  app.get("/prototype/students/:id", (request, response) => {
    const student = prototypeData.students.find(({ id }) => id === request.params.id);

    if (!student) {
      response.status(404).json({ error: "student_not_found" });
      return;
    }

    response.json({
      synthetic: true,
      student,
      alerts: prototypeData.alerts.filter(({ studentId }) => studentId === student.id),
      interventions: prototypeData.interventions.filter(({ studentId }) => studentId === student.id),
    });
  });

  app.use((_request, response) => {
    response.status(404).json({ error: "not_found" });
  });

  app.use((error, _request, response, _next) => {
    console.error("Unhandled API error", error);
    response.status(500).json({ error: "internal_error" });
  });

  return app;
}
