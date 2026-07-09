import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

    const [passRows] = await pool.execute(
      "SELECT * FROM grammar_passports WHERE user_id = ? ORDER BY generated_at DESC LIMIT 1",
      [userId]
    );
    const passports = passRows as any[];
    if (passports.length === 0) {
      return NextResponse.json({ error: "No passport found" }, { status: 404 });
    }

    const passport = passports[0];
    const [catRows] = await pool.execute(
      "SELECT category, score FROM passport_categories WHERE passport_id = ?",
      [passport.id]
    );

    return NextResponse.json({
      passport: {
        id: passport.id,
        overallMastery: passport.overall_mastery,
        generatedAt: passport.generated_at,
        categories: catRows,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
