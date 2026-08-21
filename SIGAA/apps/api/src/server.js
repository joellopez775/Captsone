import pg from "pg";
import { createApp } from "./app.js";

const { Pool } = pg;
const port = Number(process.env.PORT ?? 3000);

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

const app = createApp({ pool });
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`SIGAA API listening on port ${port}`);
});

async function shutdown(signal) {
  console.log(`Received ${signal}; shutting down`);
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
