import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
});

async function run() {
  try {
    const result = await client.execute("PRAGMA table_info('Pack');");
    console.log("Columns in Pack:", result.rows.map(r => r.name));
  } catch (error) {
    console.error("Check failed:", error);
  }
}

run();
