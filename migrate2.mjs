import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
});

async function run() {
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS "User" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "email" TEXT NOT NULL,
          "password" TEXT NOT NULL
      );
    `);
    
    await client.execute(`
      CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
    `);

    // Add kiwifyId to Pack, ignore error if column already exists
    try {
      await client.execute(`ALTER TABLE "Pack" ADD COLUMN "kiwifyId" TEXT;`);
    } catch (e) {
      // Column might already exist, ignore
    }

    await client.execute(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Pack_kiwifyId_key" ON "Pack"("kiwifyId");
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS "_PackToUser" (
          "A" TEXT NOT NULL,
          "B" TEXT NOT NULL,
          CONSTRAINT "_PackToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Pack" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT "_PackToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    await client.execute(`
      CREATE UNIQUE INDEX IF NOT EXISTS "_PackToUser_AB_unique" ON "_PackToUser"("A", "B");
    `);

    await client.execute(`
      CREATE INDEX IF NOT EXISTS "_PackToUser_B_index" ON "_PackToUser"("B");
    `);

    console.log("Migration 2 successful");
  } catch (error) {
    console.error("Migration 2 failed:", error);
  }
}

run();
