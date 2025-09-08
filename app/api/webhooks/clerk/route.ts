import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const payload = await req.text();
  const headers = Object.fromEntries(req.headers.entries());

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let evt: any;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Clerk event data
  const { type, data } = evt;

  if (type === "user.created" || type === "user.updated") {
    const clerkId = data.id;
    const email = data.email_addresses[0]?.email_address || "";
    const name = data.first_name || "User";

    // Sync user into DB
    await pool.query(
      `INSERT INTO users (clerk_id, name, email, role)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name = VALUES(name), email = VALUES(email)`,
      [clerkId, name, email, "user"]
    );
  }

  return NextResponse.json({ success: true });
}
