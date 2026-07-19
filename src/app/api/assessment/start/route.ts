import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { ASSESSMENT_QUESTIONS } from "@/lib/assessment-questions";

const TOTAL_QUESTIONS = ASSESSMENT_QUESTIONS.length;
const FIRST_QUESTION = ASSESSMENT_QUESTIONS[0].question;
const FIRST_CATEGORY = ASSESSMENT_QUESTIONS[0].category;

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

