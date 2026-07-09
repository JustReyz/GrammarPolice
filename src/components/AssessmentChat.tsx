"use client";

import { useState, useEffect, useRef } from "react";
import { useApp } from "@/lib/AppContext";
import RobotOfficer from "./RobotOfficer";

interface ChatMsg {
  role: "npc" | "user";
  text: string;
  score?: number;
  feedback?: string;
}

interface Props {
  onComplete: (results: any) => void;
}

export default function AssessmentChat({ onComplete }: Props) {
  const { user } = useApp();
  const userId = user?.id || 1;
  const [sessionId, setSessionId] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/assessment/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
        const data = await res.json();
        setSessionId(data.sessionId);
        setQuestions([
          { question: "Tell me about your daily routine. What do you usually do every day?", category: "present_tense" },
          { question: "What did you do last weekend? Describe your activities.", category: "past_tense" },
          { question: "What are you going to do tomorrow? Any plans?", category: "future_tense" },
          { question: "Have you ever traveled abroad? Tell me about it.", category: "present_perfect" },
          { question: "If you had one million dollars, what would you do?", category: "conditional" },
          { question: "How do you usually ask for directions when you\'re lost?", category: "question_forms" },
          { question: "Describe how your favorite food is made. What ingredients are used?", category: "passive_voice" },
          { question: "Tell me about a book or movie you\'ve seen recently. What is it about?", category: "articles" },
        ]);
        setChat([{ role: "npc", text: data.question }]);
      } catch {}
      setLoading(false);
    })();
  }, [userId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);



  const handleSend = async () => {
    if (!input.trim() || evaluating) return;
    const q = questions[currentIdx];
    const userMsg = input.trim();
    setInput("");
    setChat((p) => [...p, { role: "user", text: userMsg }]);
    setEvaluating(true);

    try {
      const res = await fetch("/api/assessment/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          sessionId,
          question: q.question,
          userAnswer: userMsg,
          category: q.category,
          questionIndex: currentIdx,
          totalQuestions: questions.length,
        }),
      });
      const data = await res.json();
      const evalRes = data.evalResult;

      setChat((p) => [
        ...p,
        {
          role: "npc",
          text: evalRes.feedback,
          score: evalRes.score,
          feedback: evalRes.feedback,
        },
      ]);

      const next = currentIdx + 1;
      if (next >= questions.length) {
        // Assessment complete — fetch results
        setTimeout(async () => {
          const res = await fetch("/api/assessment/result?userId=" + userId);
          const resultData = await res.json();
          if (!resultData.error) onComplete(resultData);
        }, 1500);
      } else {
        setTimeout(() => {
          setCurrentIdx(next);
          setChat((p) => [...p, { role: "npc", text: questions[next].question }]);
        }, 1200);
      }
    } catch {}
    setEvaluating(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <RobotOfficer size="large" />
        <p className="text-ink-dim text-[13px] mt-[12px]">Starting assessment...</p>
      </div>
    );
  }

  return (
    <div className="animate-slide-fade flex flex-col max-w-[700px] mx-auto">
      <div className="text-center mb-[12px]">
        <h3 className="text-[16px] font-extrabold text-gold m-0">Police Academy Assessment</h3>
        <p className="text-[12px] text-ink-dim mt-[2px]">
          Question {Math.min(currentIdx + 1, questions.length)} of {questions.length}
        </p>
      </div>

      <div className="bg-navy-card border border-line rounded-[16px] p-[16px] max-h-[400px] overflow-y-auto mb-[12px]">
        {chat.map((msg, i) => (
          <div key={i} className={`mb-[10px] flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-[14px] py-[10px] rounded-[14px] text-[13px] leading-[1.4] ${
                msg.role === "user"
                  ? "bg-blue-btn-grad text-white rounded-br-[4px]"
                  : "bg-[rgba(255,255,255,.06)] text-ink rounded-bl-[4px]"
              }`}
            >
              {msg.text}
              {msg.score !== undefined && (
                <div className="mt-[6px] text-[11px] text-gold-light font-bold">
                  Score: {msg.score}/100
                </div>
              )}
            </div>
          </div>
        ))}
        {evaluating && (
          <div className="flex justify-start mb-[10px]">
            <div className="bg-[rgba(255,255,255,.06)] text-ink-dim px-[14px] py-[10px] rounded-[14px] rounded-bl-[4px] text-[13px]">
              Evaluating
              <span className="thinking-dots ml-[4px]">
                <span className="inline-block w-[4px] h-[4px] rounded-full bg-gold mx-[1px] animate-thinking-dot" />
                <span className="inline-block w-[4px] h-[4px] rounded-full bg-gold mx-[1px] animate-thinking-dot" style={{ animationDelay: "0.2s" }} />
                <span className="inline-block w-[4px] h-[4px] rounded-full bg-gold mx-[1px] animate-thinking-dot" style={{ animationDelay: "0.4s" }} />
              </span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="flex gap-[10px]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your answer..."
          disabled={evaluating || currentIdx >= questions.length}
          className="flex-1 bg-[rgba(255,255,255,0.06)] border border-line text-white px-[14px] py-[12px] rounded-[10px] text-[14px] outline-none placeholder:text-ink-dim disabled:opacity-40"
        />
        <button
          onClick={handleSend}
          disabled={evaluating || !input.trim()}
          className="bg-blue-btn-grad text-white border-none px-[20px] rounded-[10px] font-bold cursor-pointer text-[14px] transition-transform duration-[0.15s] hover:translate-y-[-2px] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
}
