import cors from "cors";
import express from "express";
import { prototypeData } from "./prototype-data.js";

const demoAccounts = [
  { email: "docente@sigaa.demo", password: "Docente2026!", role: "teacher", profile: { name: "Daniela Rojas", title: "Profesora jefe", course: "2° Medio A" } },
  { email: "estudiante@sigaa.demo", password: "Estudiante2026!", role: "student", profile: { name: "Camila Soto", title: "Estudiante", studentId: "est-001" } },
];

export function createApp({ pool }) {
  const app = express();

  app.disable("x-powered-by");
  app.use(cors({ origin: false }));
  app.use(express.json({ limit: "1mb" }));

  app.get("/", (_request, response) => {
    response.json({
      service: "SIGAA API",
      version: "0.1.0",
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
