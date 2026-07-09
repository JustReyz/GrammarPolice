import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { userId, goal } = await req.json();
    if (!userId || !goal) {
      return NextResponse.json({ error: "userId and goal required" }, { status: 400 });
    }
    await pool.execute("UPDATE users SET learning_goal = ? WHERE id = ?", [goal, userId]);
    return NextResponse.json({ success: true, goal });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
