import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
});

async function run() {
  try {
    const id = "clk1234567890abcdef"; // fake cuid
    const now = new Date().toISOString();
    await client.execute({
      sql: `INSERT INTO "Pack" ("id", "title", "description", "image", "category", "tags", "ageRange", "pages", "format", "fileSize", "downloadUrl", "isNew", "type", "kiwifyId", "modulesJson", "createdAt", "updatedAt") 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id, 
        "Alfabetização Divertida", 
        "Um pacote completo para alfabetização.", 
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80", 
        "Alfabetização", 
        "Alfabeto, Vogais", 
        "4-7", 
        50, 
        "PDF Alta Qualidade", 
        "15 MB", 
        "#", 
        1, 
        "pack", 
        "teste-123", 
        "[]", 
        now, 
        now
      ]
    });
    console.log("Pack de teste inserido com sucesso!");
  } catch (error) {
    console.error("Check failed:", error);
  }
}

run();
