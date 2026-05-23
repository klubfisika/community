// Seed script for KF13 Community platform
// This script simply imports the DB module which triggers `runAutoMigration`
// and data seeding if the database is empty.

import { getDb } from "./apps/platform/src/lib/db";

(async () => {
  console.log("[seed] Initializing database and running auto‑migration/seeding...");
  try {
    // The call to getDb() will run runAutoMigration and seed data when needed.
    getDb();
    console.log("[seed] Done. Database is ready.");
  } catch (e) {
    console.error("[seed] Failed:", e);
    process.exit(1);
  }
})();
