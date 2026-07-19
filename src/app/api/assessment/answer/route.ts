import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyAnswer } from "@/lib/assessment-questions";

export async function POST(req: NextRequest) {
  try {
    const { userId, sessionId, question, userAnswer, category, questionIndex, totalQuestions } = await req.json();
    if (!userId || !userAnswer || !category) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Evaluate programmatically using verifyAnswer
    const qId = questionIndex + 1;
    const { isCorrect, score, feedback } = verifyAnswer(userAnswer, qId);

    // Save to DB
    await pool.execute(
      "INSERT INTO assessment_results (user_id, session_id, question, user_answer, category, score, feedback) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [userId, sessionId, question, userAnswer, category, score, feedback]
    );

    const isLast = questionIndex >= totalQuestions - 1;

    return NextResponse.json({
      evalResult: {
        score,
        feedback,
        mistakes: isCorrect ? [] : [category]
      },
      isLast,
      nextQuestion: null
    });
  } catch (err: any) {
    console.error("Assessment answer error:", err.message);
    return NextResponse.json({
      evalResult: { score: 0, feedback: "Error evaluating answer.", mistakes: [] },
      isLast: false,
    }, { status: 200 });
  }
}
