import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
});

async function run() {
  try {
    const result = await client.execute("SELECT id, title, kiwifyId FROM Pack ORDER BY createdAt DESC LIMIT 3;");
    for (const row of result.rows) {
      console.log("---");
      console.log("ID:", row.id);
      console.log("Title:", row.title);
      console.log("KiwifyId:", row.kiwifyId);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
