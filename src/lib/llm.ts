/**
 * LLM Provider Router
 *
 * Switch provider by setting LLM_PROVIDER in .env:
 *   LLM_PROVIDER=gemini    (default — uses GEMINI_API_KEY)
 *   LLM_PROVIDER=deepseek  (uses DEEPSEEK_API_KEY)
 *
 * To switch, edit .env on GitHub → Vercel redeploys automatically.
 */

import type { EvaluateRequest, EvaluateResponse } from "./llm-types";
import { evaluateAnswer as geminiEval } from "./llm-gemini";
import { evaluateAnswer as deepseekEval } from "./llm-deepseek";

const PROVIDER = (process.env.LLM_PROVIDER || "gemini").toLowerCase();

export type { EvaluateRequest, EvaluateResponse };

export async function evaluateAnswer(
  req: EvaluateRequest,
  ip: string
): Promise<EvaluateResponse> {
  if (PROVIDER === "deepseek") {
    return deepseekEval(req, ip);
  }
  return geminiEval(req, ip);
}
