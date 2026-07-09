import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { evaluateAssessmentAnswer } from "@/lib/llm";

export async function POST(req: NextRequest) {
  try {
    const { userId, sessionId, question, userAnswer, category, questionIndex, totalQuestions } = await req.json();
    if (!userId || !question || !userAnswer || !category) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Evaluate via LLM
    const evalResult = await evaluateAssessmentAnswer(question, userAnswer, category);

    // Save to DB
    await pool.execute(
      "INSERT INTO assessment_results (user_id, session_id, question, user_answer, category, score, feedback) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [userId, sessionId, question, userAnswer, category, evalResult.score, evalResult.feedback]
    );

    const isLast = questionIndex >= totalQuestions - 1;

    return NextResponse.json({
      evalResult,
      isLast,
      nextQuestion: isLast ? null : null, // Client uses question index
    });
  } catch (err: any) {
    console.error("Assessment answer error:", err.message);
    return NextResponse.json({
      evalResult: { score: 50, feedback: "Evaluation unavailable. Moving to next question.", mistakes: [] },
      isLast: false,
    }, { status: 200 });
  }
}
