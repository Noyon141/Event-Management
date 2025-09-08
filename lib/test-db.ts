"use server";

import pool from "./db";

export async function testDB() {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ DB Connected:", (rows as any)[0].result);
    return true;
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
    return false;
  }
}
