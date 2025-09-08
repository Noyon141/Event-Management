import pool from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, description, date, location } = body;

    // find user in DB
    const [users] = await pool.query(
      "SELECT id, role FROM users WHERE clerk_id = ?",
      [userId]
    );
    const user = (users as any[])[0];
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await pool.query(
      "INSERT INTO events (title, description, date, location, created_by) VALUES (?, ?, ?, ?, ?)",
      [title, description, date, location, user.id]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
