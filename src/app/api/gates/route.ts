import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM gate_templates ORDER BY sort_order ASC"
    );
    return NextResponse.json({ gates: rows });
  } catch (err) {
    console.error("Get gates error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
