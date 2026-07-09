import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [
      params.id,
    ]);
    const users = rows as any[];
    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user: users[0] });
  } catch (err) {
    console.error("Get user error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const allowed = [
      "level",
      "xp",
      "xp_max",
      "stars",
      "coins",
      "hearts",
      "correct_first_try",
      "attempts",
      "streak",
      "mistake_tense",
      "mistake_agreement",
      "mistake_preposition",
      "gates_cleared",
      "gates_total",
    ];
    const sets: string[] = [];
    const vals: any[] = [];
    for (const key of allowed) {
      if (body[key] !== undefined) {
        sets.push(`${key} = ?`);
        vals.push(body[key]);
      }
    }
    if (sets.length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 },
      );
    }
    vals.push(params.id);
    // Calculate XP-based rank
    const xpIndex = vals.findIndex((_, i) => sets[i]?.startsWith('xp'));
    if (xpIndex !== -1) {
      const newXp = body.xp;
      let xpRank = "🚗 Learner";
      if (newXp >= 3500) xpRank = "👑 Grammar Legend";
      else if (newXp >= 2500) xpRank = "⭐ Grammar Champion";
      else if (newXp >= 1800) xpRank = "🏆 Certified Driver";
      else if (newXp >= 1200) xpRank = "🚔 Elite Driver";
      else if (newXp >= 700) xpRank = "🚖 Advanced Driver";
      else if (newXp >= 300) xpRank = "🚙 Skilled Driver";
      else if (newXp >= 100) xpRank = "🚘 Rookie Driver";
      sets.push('current_rank = ?');
      vals.splice(vals.length - 1, 0, xpRank);
    }
    await pool.execute(
      `UPDATE users SET ${sets.join(", ")} WHERE id = ?`,
      vals,
    );
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [
      params.id,
    ]);
    const users = rows as any[];
    return NextResponse.json({ user: users[0] });
  } catch (err) {
    console.error("Update user error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
