"use server";

import pool from "./db";

export async function testDB() {
  try {
    const [rows] = await pool.query("SELECT NOW() AS currentTime");
    return (rows as Array<{ currentTime: Date }>)[0].currentTime;
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
    return null;
  }
}
