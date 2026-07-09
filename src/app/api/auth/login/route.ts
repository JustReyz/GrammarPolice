import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { username } = await req.json();
    if (!username || typeof username !== "string" || !username.trim()) {
      return NextResponse.json({ error: "Username required" }, { status: 400 });
    }

    const clean = username.trim().toLowerCase();
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE username = ?",
      [clean]
    );
    const users = rows as any[];

    if (users.length === 0) {
      // Create new user
      const [result] = await pool.execute(
        "INSERT INTO users (username, xp_max, hearts) VALUES (?, 100, 3)",
        [clean]
      );
      const insertResult = result as any;
      const [newRows] = await pool.execute(
        "SELECT * FROM users WHERE id = ?",
        [insertResult.insertId]
      );
      const newUsers = newRows as any[];
      return NextResponse.json({ user: newUsers[0] });
    }

    return NextResponse.json({ user: users[0] });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
