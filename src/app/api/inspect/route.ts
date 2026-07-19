import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [users] = await pool.execute("SELECT * FROM users LIMIT 10");
    const [gates] = await pool.execute("SELECT COUNT(*) as count FROM gate_templates");
    const [gateThemes] = await pool.execute("SELECT theme, COUNT(*) as count FROM gate_templates GROUP BY theme");
    const [journeys] = await pool.execute("SELECT * FROM journeys LIMIT 10");

    return NextResponse.json({
      users,
      gatesCount: (gates as any)[0]?.count || 0,
      gateThemes,
      journeys,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
