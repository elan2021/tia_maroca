import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
});

async function run() {
  try {
    const result = await client.execute("SELECT id, title, kiwifyId FROM Pack;");
    console.log("Packs no DB:", result.rows);
  } catch (error) {
    console.error("Check failed:", error);
  }
}

run();
