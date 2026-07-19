import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { userId, goal } = await req.json();
    if (!userId || !goal) {
      return NextResponse.json({ error: "userId and goal required" }, { status: 400 });
    }

    const districtMap: Record<string, string> = {
      daily_life: "Daily Life District",
      travel: "Travel District",
      interview: "Interview District",
    };
    const district = districtMap[goal] || "Daily Life District";

    // Update user goal
    await pool.execute("UPDATE users SET learning_goal = ? WHERE id = ?", [goal, userId]);

    // Update active journey
    await pool.execute("DELETE FROM journeys WHERE user_id = ?", [userId]);
    await pool.execute(
      "INSERT INTO journeys (user_id, district, status) VALUES (?, ?, 'active')",
      [userId, district]
    );

    return NextResponse.json({ success: true, goal, district });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
