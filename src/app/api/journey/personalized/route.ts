export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

    const [rows] = await pool.execute(
      "SELECT district, status, started_at, completed_at FROM journeys WHERE user_id = ? ORDER BY started_at ASC",
      [userId]
    );

    return NextResponse.json({ journeys: rows });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
