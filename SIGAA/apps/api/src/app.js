import cors from "cors";
import express from "express";

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

  app.use((_request, response) => {
    response.status(404).json({ error: "not_found" });
  });

  app.use((error, _request, response, _next) => {
    console.error("Unhandled API error", error);
    response.status(500).json({ error: "internal_error" });
  });

  return app;
}
