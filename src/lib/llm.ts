import type { EvaluateRequest, EvaluateResponse } from "./llm-types";
import { evaluateAnswer as geminiEval, evaluateAssessment as geminiAssessment } from "./llm-gemini";
import { evaluateAnswer as deepseekEval, evaluateAssessment as deepseekAssessment } from "./llm-deepseek";

const PROVIDER = (process.env.LLM_PROVIDER || "gemini").toLowerCase();

export type { EvaluateRequest, EvaluateResponse };

export async function evaluateAnswer(
  req: EvaluateRequest,
  ip: string
): Promise<EvaluateResponse> {
  if (PROVIDER === "deepseek") return deepseekEval(req, ip);
  return geminiEval(req, ip);
}

export async function evaluateAssessmentAnswer(
  question: string,
  answer: string,
  category: string
): Promise<{ score: number; feedback: string; mistakes: string[] }> {
  if (PROVIDER === "deepseek") return deepseekAssessment(question, answer, category);
  return geminiAssessment(question, answer, category);
}
