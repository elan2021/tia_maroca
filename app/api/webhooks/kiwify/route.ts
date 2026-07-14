import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail, sendPackAddedEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Kiwify webhook validation
    const status = payload?.order_status || payload?.status;
    
    if (status === "paid" || status === "approved") {
      const customerEmail = payload?.Customer?.email || payload?.customer?.email || payload?.email;
      const productId = payload?.Product?.product_id || payload?.Product?.id || payload?.product?.id || payload?.product_id;

      if (!customerEmail || !productId) {
        return NextResponse.json({ error: "Missing email or product ID in payload" }, { status: 400 });
      }

      // Find pack associated with Kiwify Product ID
      const pack = await db.pack.findUnique({
        where: { kiwifyId: String(productId) }
      });

      if (!pack) {
        console.warn(`Webhook ignored: no Pack found with kiwifyId ${productId}`);
        return NextResponse.json({ status: "ignored - no matching pack" });
      }

      // Check if user exists
      let user = await db.user.findUnique({
        where: { email: customerEmail }
      });

      let passwordGenerated = false;
      let rawPassword = "";

      if (!user) {
        // Generate a simple 8-character alphanumeric password
        rawPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = bcrypt.hashSync(rawPassword, 10);

        user = await db.user.create({
          data: {
            email: customerEmail,
            password: hashedPassword
          }
        });
        passwordGenerated = true;
      }

      // Link pack to user (if not already linked)
      await db.user.update({
        where: { id: user.id },
        data: {
          packs: {
            connect: { id: pack.id }
          }
        }
      });

      // Send emails (don't block the response if email fails)
      if (passwordGenerated) {
        sendWelcomeEmail(customerEmail, rawPassword, pack.title).catch(err => {
          console.error("Failed to send welcome email:", err);
        });
      } else {
        sendPackAddedEmail(customerEmail, pack.title).catch(err => {
          console.error("Failed to send pack added email:", err);
        });
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
