"use client";

import { useState, useEffect, useCallback } from "react";
import { useApp } from "@/lib/AppContext";
import { ASSESSMENT_QUESTIONS, type AssessmentQuestion } from "@/lib/assessment-questions";
import { playSound } from "@/lib/playSound";

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
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

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

  const handleSelect = useCallback((opt: string) => {
    if (answered || submitting) return;
    setSelected(opt);
  }, [answered, submitting]);

  const handleSubmit = useCallback(async () => {
    if (!selected || !q || submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/assessment/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          sessionId,
          question: q.question,
          userAnswer: selected,
          category: q.category,
          questionIndex: currentIdx,
          totalQuestions: total,
        }),
      });
      const data = await res.json();
      const correct = data.evalResult?.score === 100;
      setIsCorrect(correct);
      setAnswered(true);
      if (correct) {
        playSound("correct");
        setCorrectCount(p => p + 1);
      } else {
        playSound("incorrect");
      }
    } catch {
      setAnswered(true);
      setIsCorrect(false);
      playSound("incorrect");
    }
    setSubmitting(false);
  }, [selected, q, submitting, userId, sessionId, currentIdx, total]);

  const handleNext = useCallback(async () => {
    const next = currentIdx + 1;
    if (next >= total) {
      // Fetch final results
      try {
        const res = await fetch("/api/assessment/result?userId=" + userId);
        const resultData = await res.json();
        if (!resultData.error) onComplete(resultData);
      } catch {}
      return;
    }
    setCurrentIdx(next);
    setSelected(null);
    setAnswered(false);
    setIsCorrect(false);
  }, [currentIdx, total, userId, onComplete]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-[12px] bg-white">
        <div className="w-[48px] h-[48px] rounded-full bg-slate-100 flex items-center justify-center text-[22px] animate-pulse">🛡️</div>
        <p className="text-slate-400 text-[13px] font-semibold">Mempersiapkan soal...</p>
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
          SOAL {currentIdx + 1} / {total} • {catLabel}
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

              if (selected === opt && !answered) {
                optClass = "bg-[#eef5fc] border-[#2258a5] text-[#2258a5] ring-2 ring-[#2258a5]/10 font-bold";
              }
              if (answered && opt === q.correctAnswer) {
                optClass = "bg-[#eefbf0] border-[#34a853] text-[#1e7e34] font-bold";
              }
              if (answered && selected === opt && opt !== q.correctAnswer) {
                optClass = "bg-[#fdf2f2] border-[#ea4335] text-[#c23b22] font-bold";
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  disabled={answered}
                  className={`w-full text-left px-[18px] py-[15px] rounded-[16px] border-[1.5px] text-[14px] font-medium transition-all duration-200 cursor-pointer disabled:cursor-default ${optClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Correct/Incorrect Feedback banner */}
          {answered && (
            <div className={`px-[16px] py-[12px] rounded-[14px] text-[12.5px] leading-[1.5] font-semibold animate-slide-fade ${
              isCorrect
                ? "bg-[#eefbf0] text-[#1e7e34] border border-[#a3e4b3]"
                : "bg-[#fdf2f2] text-[#c23b22] border border-[#f9c2c2]"
            }`}>
              {isCorrect ? "👍 Benar!" : "😅 Belum tepat."}
              <p className="mt-[4px] font-normal text-[12px] opacity-90">
                {isCorrect
                  ? q.explanation
                  : `Jawaban yang benar: "${q.correctAnswer}". ${q.explanation}`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ─── Bottom Action Button Area ─── */}
      <div className="w-full px-[24px] pb-[32px] pt-[16px] bg-white border-t border-slate-100 shrink-0">
        {!answered ? (
          <button
            onClick={handleSubmit}
            disabled={!selected || submitting}
            className={`w-full h-[52px] rounded-[16px] text-[15px] font-extrabold tracking-wide transition-all duration-200 border-none cursor-pointer ${
              selected
                ? "bg-[#2258a5] text-white shadow-[0_6px_20px_rgba(34,88,165,0.25)] hover:bg-[#1a4785] active:translate-y-[1px]"
                : "bg-[#e2e7ef] text-[#9ca7b6] cursor-not-allowed"
            }`}
          >
            {submitting ? "Memeriksa..." : "Lanjut →"}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full h-[52px] rounded-[16px] text-[15px] font-extrabold tracking-wide bg-[#2258a5] text-white shadow-[0_6px_20px_rgba(34,88,165,0.25)] hover:bg-[#1a4785] active:translate-y-[1px] transition-all duration-200 border-none cursor-pointer"
          >
            {currentIdx + 1 >= total ? "Lihat Hasil →" : "Lanjut →"}
          </button>
        )}
      </div>
    </div>
  );
}
