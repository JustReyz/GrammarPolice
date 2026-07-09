export interface EvaluateRequest {
  question: string;
  userAnswer: string;
  category: string;
}

export interface EvaluateResponse {
  isCorrect: boolean;
  explanation: string;
  correctedSentence: string | null;
  advice: string;
}
