import { ensureDatabase, pool } from "../db/pool.js";

const main = async () => {
  await ensureDatabase();
  console.log("Database schema is ready.");
  await pool.end();
};

main().catch((error) => {
  console.error("Failed to initialize database", error);
  process.exit(1);
});
