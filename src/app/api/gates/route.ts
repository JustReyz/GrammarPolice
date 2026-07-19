export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    let theme = "daily_life";

    if (userId) {
      const [userRows] = await pool.execute(
        "SELECT learning_goal FROM users WHERE id = ?",
        [userId]
      );
      const user = (userRows as any[])[0];
      if (user && user.learning_goal) {
        theme = user.learning_goal;
      }
    }

    const [rows] = await pool.execute(
      "SELECT * FROM gate_templates WHERE theme = ? ORDER BY sort_order ASC",
      [theme]
    );
    return NextResponse.json({ gates: rows });
  } catch (err) {
    console.error("Get gates error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
