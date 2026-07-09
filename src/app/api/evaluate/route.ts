import { NextRequest, NextResponse } from "next/server";
import { evaluateAnswer } from "@/lib/llm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, userAnswer, category } = body;

    if (!question || !userAnswer) {
      return NextResponse.json(
        { error: "question and userAnswer required" },
        { status: 400 }
      );
    }

    // Get client IP for rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const result = await evaluateAnswer(
      { question, userAnswer, category: category || "grammar" },
      ip
    );

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Evaluate error:", err.message);

    if (err.message?.includes("Rate limit")) {
      return NextResponse.json({ error: err.message }, { status: 429 });
    }

    console.error("Evaluate full error:", err.message);

    // Give user a useful message
    let explanation = "AI service unavailable. Try again.";
    if (err.message?.includes("quota") || err.message?.includes("429")) {
      explanation = "AI quota exceeded. Enable billing at ai.google.dev or add payment method.";
    } else if (err.message?.includes("503") || err.message?.includes("high demand")) {
      explanation = "AI model busy. Please try again.";
    }

    return NextResponse.json({
      isCorrect: false,
      explanation,
      correctedSentence: null,
      advice: "",
    });
  }
}
