import pg from "pg";
import { readFile } from "node:fs/promises";
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = await pool.connect();
try {
  await db.query("SELECT pg_advisory_lock(734003)");
  const profile = await db.query(
    "SELECT value FROM app_metadata WHERE key='schema_profile'",
  );
  if (profile.rows[0]?.value !== "escolar")
    throw new Error("Existing school schema 001-006 required");
  const source =
    process.env.MIGRATION_FILE ??
    new URL(
      "../../../infra/postgres/init/007_sprint3_security.sql",
      import.meta.url,
    );
  await db.query(await readFile(source, "utf8"));
  console.log(
    "Additive security migration 007 applied. Existing data preserved.",
  );
} catch (error) {
  await db.query("ROLLBACK");
  console.error("Migration failed:", error.code ?? error.message);
  process.exitCode = 1;
} finally {
  await db.query("SELECT pg_advisory_unlock(734003)");
  db.release();
  await pool.end();
}
