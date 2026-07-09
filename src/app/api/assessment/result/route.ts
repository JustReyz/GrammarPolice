import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

    // Get all assessment results
    const [rows] = await pool.execute(
      "SELECT category, score FROM assessment_results WHERE user_id = ? ORDER BY created_at ASC",
      [userId]
    );
    const results = rows as any[];

    if (results.length === 0) {
      return NextResponse.json({ error: "No assessment found" }, { status: 404 });
    }

    // Calculate per-category scores
    const categoryMap: Record<string, { total: number; count: number }> = {};
    for (const r of results) {
      if (!categoryMap[r.category]) categoryMap[r.category] = { total: 0, count: 0 };
      categoryMap[r.category].total += r.score;
      categoryMap[r.category].count++;
    }

    const categories: { name: string; score: number }[] = [];
    let overallTotal = 0;
    let overallCount = 0;

    for (const [name, data] of Object.entries(categoryMap)) {
      const avg = Math.round(data.total / data.count);
      categories.push({ name, score: avg });
      overallTotal += avg;
      overallCount++;
    }

    const overallMastery = overallCount > 0 ? Math.round(overallTotal / overallCount) : 0;

    // Determine rank
    let rank = "Grammar Cadet";
    if (overallMastery >= 90) rank = "Elite Cadet";
    else if (overallMastery >= 75) rank = "Senior Cadet";
    else if (overallMastery >= 60) rank = "Cadet II";
    else if (overallMastery >= 40) rank = "Cadet I";

    // Create passport
    const [pass] = await pool.execute(
      "INSERT INTO grammar_passports (user_id, overall_mastery) VALUES (?, ?)",
      [userId, overallMastery]
    );
    const passportId = (pass as any).insertId;

    for (const cat of categories) {
      await pool.execute(
        "INSERT INTO passport_categories (passport_id, category, score) VALUES (?, ?, ?)",
        [passportId, cat.name, cat.score]
      );
    }

    // Update user rank + mastery
    await pool.execute(
      "UPDATE users SET overall_mastery = ?, current_rank = ? WHERE id = ?",
      [overallMastery, rank, userId]
    );

    // Determine district
    const goals = await pool.execute("SELECT learning_goal FROM users WHERE id = ?", [userId]);
    const goal = (goals[0] as any[])[0]?.learning_goal || "";
    const district = mapGoalToDistrict(goal, categories);

    // Create journey
    await pool.execute(
      "INSERT INTO journeys (user_id, district, status) VALUES (?, ?, 'active')",
      [userId, district]
    );

    // Award beginner badge
    await pool.execute(
      "INSERT IGNORE INTO badges (user_id, badge_name) VALUES (?, 'Assessment Completed')",
      [userId]
    );

    return NextResponse.json({
      overallMastery,
      rank,
      categories,
      district,
      passportId,
    });
  } catch (err: any) {
    console.error("Assessment result error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

function mapGoalToDistrict(goal: string, categories: { name: string; score: number }[]): string {
  const districts: Record<string, string> = {
    academic: "Student District",
    job_interview: "Interview District",
    traveling: "Travel District",
    daily_conversation: "Travel District",
    business_english: "Workplace District",
  };

  // Find weakest category to prioritize
  const weakest = categories.reduce((min, c) => (c.score < min.score ? c : min), categories[0]);

  if (goal && districts[goal]) return districts[goal];
  if (weakest.name.includes("passive") || weakest.name.includes("articles")) return "Student District";
  if (weakest.name.includes("present") || weakest.name.includes("past")) return "Travel District";
  return "Travel District";
}
