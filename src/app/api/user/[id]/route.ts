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
    // Calculate XP-based rank based on cumulative XP: (level - 1)*100 + xp
    const hasXp = body.xp !== undefined;
    const hasLevel = body.level !== undefined;
    if (hasXp || hasLevel) {
      const [currentRows] = await pool.execute("SELECT * FROM users WHERE id = ?", [params.id]);
      const userRows = currentRows as any[];
      const curUser = userRows[0];
      const xpVal = hasXp ? body.xp : curUser.xp;
      const lvlVal = hasLevel ? body.level : curUser.level;
      const cumulativeXp = (lvlVal - 1) * 100 + xpVal;

      let xpRank = "🚗 Learner";
      if (cumulativeXp >= 3500) xpRank = "👑 Grammar Legend";
      else if (cumulativeXp >= 2500) xpRank = "⭐ Grammar Champion";
      else if (cumulativeXp >= 1800) xpRank = "🏆 Certified Driver";
      else if (cumulativeXp >= 1200) xpRank = "🚔 Elite Driver";
      else if (cumulativeXp >= 700) xpRank = "🚖 Advanced Driver";
      else if (cumulativeXp >= 300) xpRank = "🚙 Skilled Driver";
      else if (cumulativeXp >= 100) xpRank = "🚘 Rookie Driver";
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
