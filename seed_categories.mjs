import { createClient } from '@libsql/client';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
});

async function run() {
  const categories = [
    { name: "Alfabetização", icon: "apparel", color: "primary" },
    { name: "Matemática", icon: "calculate", color: "secondary" },
    { name: "Artes", icon: "brush", color: "tertiary" },
    { name: "Datas Comemorativas", icon: "celebration", color: "neutral" },
    { name: "Atividades Gratuitas", icon: "auto_awesome", color: "transparent" },
  ];

  try {
    for (const cat of categories) {
      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      await client.execute({
        sql: `INSERT OR IGNORE INTO "Category" ("id", "name", "icon", "color", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?)`,
        args: [id, cat.name, cat.icon, cat.color, now, now]
      });
      console.log(`Seeded: ${cat.name}`);
    }
    console.log("Seed complete");
  } catch (error) {
    console.error("Seed failed:", error);
  }
}

run();
