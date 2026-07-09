import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

const TOTAL_QUESTIONS = 8;
const FIRST_QUESTION = "Tell me about your daily routine. What do you usually do every day?";
const FIRST_CATEGORY = "present_tense";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    const sessionId = crypto.randomUUID();

    // Reset previous assessment results for this user
    await pool.execute("DELETE FROM assessment_results WHERE user_id = ?", [userId]);

    return NextResponse.json({
      sessionId,
      totalQuestions: TOTAL_QUESTIONS,
      currentQuestion: 0,
      question: FIRST_QUESTION,
      category: FIRST_CATEGORY,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
