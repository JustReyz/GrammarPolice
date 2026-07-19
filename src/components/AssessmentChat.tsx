"use client";

import { useState, useEffect, useCallback } from "react";
import { useApp } from "@/lib/AppContext";
import { ASSESSMENT_QUESTIONS, type AssessmentQuestion } from "@/lib/assessment-questions";

interface Props {
  onComplete: (results: any) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  tenses: "TENSES",
  subject_verb_agreement: "SUBJECT-VERB AGREEMENT",
  articles: "ARTICLES",
  prepositions: "PREPOSITIONS",
  word_order_question_formation: "WORD ORDER",
  plural_singular_countable_uncountable: "COUNTABLE / UNCOUNTABLE",
  pronouns: "PRONOUNS",
  modal_verbs: "MODAL VERBS",
  comparative_superlative: "COMPARATIVE / SUPERLATIVE",
};

export default function AssessmentChat({ onComplete }: Props) {
  const { user } = useApp();
  const userId = user?.id || 1;

  const [sessionId, setSessionId] = useState("");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const questions = ASSESSMENT_QUESTIONS;
  const q = questions[currentIdx] as AssessmentQuestion | undefined;
  const total = questions.length;
  const catLabel = q ? (CATEGORY_LABELS[q.category] || q.category.replace(/_/g, " ").toUpperCase()) : "";

  // Start assessment session
  useEffect(() => {
    (async () => {
      try {
        await fetch("/api/assessment/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }).then(r => r.json()).then(d => setSessionId(d.sessionId));
      } catch {}
      setLoading(false);
    })();
  }, [userId]);

  const handlePick = useCallback(async (opt: string) => {
    if (submitting || !q) return;
    setSelected(opt);
    setSubmitting(true);

    // Submit answer silently
    try {
      await fetch("/api/assessment/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          sessionId,
          question: q.question,
          userAnswer: opt,
          category: q.category,
          questionIndex: currentIdx,
          totalQuestions: total,
        }),
      });
    } catch {}

    // Brief pause then advance
    setTimeout(() => {
      const next = currentIdx + 1;
      if (next >= total) {
        (async () => {
          try {
            const res = await fetch("/api/assessment/result?userId=" + userId);
            const resultData = await res.json();
            if (!resultData.error) onComplete(resultData);
          } catch {}
        })();
        return;
      }
      setCurrentIdx(next);
      setSelected(null);
      setSubmitting(false);
    }, 350);
  }, [q, submitting, userId, sessionId, currentIdx, total, onComplete]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-[12px] bg-white">
        <div className="w-[48px] h-[48px] rounded-full bg-slate-100 flex items-center justify-center text-[22px] animate-pulse">🛡️</div>
        <p className="text-slate-400 text-[13px] font-semibold">Preparing questions...</p>
      </div>
    );
  }

  if (!q) return null;

  // Progress Bar percentage based on current question index (currentIdx / total * 100)
  const progressPct = Math.min(100, Math.round((currentIdx / total) * 100));

  return (
    <div className="flex flex-col h-screen w-full bg-white justify-between overflow-hidden">
      {/* ─── Top Bar (Dark Navy Header, spans full width) ─── */}
      <div className="w-full bg-[#1c355e] px-[20px] py-[15px] flex items-center justify-between shrink-0">
        {/* Left: Rank Chip */}
        <div className="flex items-center gap-[6px]">
          <span className="text-[14px]">🚗</span>
          <span className="text-[12px] font-bold text-white tracking-wide">Learner</span>
        </div>
        
        {/* Middle: Progress Bar */}
        <div className="flex-1 max-w-[200px] h-[10px] rounded-full bg-[#2d466d] overflow-hidden mx-[12px] relative">
          <div
            className="h-full rounded-full bg-[#51a2e9] transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Right: Stats & Hearts */}
        <div className="flex items-center gap-[10px]">
          <div className="flex items-center gap-[3px] text-white">
            <span className="text-[14px] text-orange-400">⚡</span>
            <span className="text-[12px] font-bold">0</span>
          </div>
          <div className="flex gap-[2px]">
            <span className="text-[14px] text-red-500">❤️</span>
            <span className="text-[14px] text-red-500">❤️</span>
            <span className="text-[14px] text-red-500">❤️</span>
          </div>
        </div>
      </div>

      {/* ─── Main Content Container (with proper padding) ─── */}
      <div className="flex-1 w-full flex flex-col justify-start px-[24px] pt-[28px] overflow-y-auto">
        {/* Question step indicator */}
        <p className="text-[13px] font-extrabold tracking-[.08em] text-[#3b66a6] mb-[12px] uppercase">
          Question {currentIdx + 1} / {total} • {catLabel}
        </p>

        {/* 15 Progress Dots */}
        <div className="flex gap-[6px] flex-wrap mb-[24px]">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-[9px] w-[9px] rounded-full transition-all duration-300 ${
                idx === currentIdx
                  ? "bg-[#2258a5] scale-[1.15]"
                  : idx < currentIdx
                    ? "bg-[#8bb4eb]"
                    : "bg-[#e2e7ef]"
              }`}
            />
          ))}
        </div>

        {/* Question Card */}
        <div className="bg-[#f3f7fa] border border-[#e4eef5] rounded-[22px] p-[24px] shadow-[0_4px_16px_rgba(28,53,94,0.03)] flex flex-col gap-[18px]">
          {/* Question Prompt */}
          <p className="text-[17px] leading-[1.5] font-bold text-[#1c355e] m-0">
            {q.question}
          </p>

          {/* Options */}
          <div className="flex flex-col gap-[10px]">
            {q.options.map((opt) => {
              let optClass = "bg-white border-[#dbe4fb] text-[#1c355e] hover:border-[#b4c9f7] hover:bg-[#fbfdff]";

              if (submitting || selected === opt) {
                optClass = "bg-[#eef5fc] border-[#2258a5] text-[#2258a5] ring-2 ring-[#2258a5]/10 font-bold";
              }

              return (
                <button
                  key={opt}
                  onClick={() => handlePick(opt)}
                  disabled={submitting}
                  className={`w-full text-left px-[18px] py-[15px] rounded-[16px] border-[1.5px] text-[14px] font-medium transition-all duration-200 cursor-pointer disabled:cursor-default ${optClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Bottom Area ─── */}
      <div className="w-full px-[24px] pb-[32px] pt-[16px] bg-white border-t border-slate-100 shrink-0 text-center">
        <p className="text-[12px] text-slate-400 m-0">
          {submitting ? "Submitting..." : "Tap your answer above"}
        </p>
      </div>
    </div>
  );
}
