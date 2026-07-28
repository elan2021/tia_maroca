import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
});

async function run() {
  try {
    const packsResult = await client.execute("SELECT id, title, kiwifyId FROM Pack ORDER BY createdAt DESC LIMIT 1;");
    const pack = packsResult.rows[0];
    
    if (!pack) {
      console.log("No packs found in DB.");
      return;
    }
    console.log("Found Pack:", pack);

    const webhookUrl = "https://tia-maroca.vercel.app/api/webhooks/kiwify";
    const payload = {
      order_status: "paid",
      Customer: {
        email: "elanbarbosa2017@gmail.com"
      },
      Product: {
        product_id: pack.kiwifyId
      }
    };

    console.log("Sending payload to webhook:", webhookUrl);
    console.log(payload);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("Webhook Response Status:", response.status);
    console.log("Webhook Response Data:", data);

    const usersResult = await client.execute("SELECT * FROM User WHERE email = 'elanbarbosa2017@gmail.com';");
    const user = usersResult.rows[0];
    if (user) {
      console.log("User found in DB:", user.email, "ID:", user.id);
      // Wait a moment for Prisma to insert the relationship
      await new Promise(r => setTimeout(r, 2000));
      const userPacks = await client.execute({
        sql: "SELECT A, B FROM _PackToUser WHERE A = ?",
        args: [pack.id]
      });
      console.log("_PackToUser query result:", userPacks.rows);
      console.log("Is pack connected to user? ", userPacks.rows.some(r => r.B === user.id) ? "YES" : "NO");
    } else {
      console.log("User not found in DB.");
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

run();
