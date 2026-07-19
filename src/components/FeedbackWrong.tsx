"use client";

import { useEffect } from "react";
import { playSound } from "@/lib/playSound";

interface FeedbackWrongProps {
  userAnswer: string;
  wrongExplain: string;
  advice?: string;
  onRemedial: () => void;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default function FeedbackWrong({
  userAnswer,
  wrongExplain,
  advice,
  onRemedial,
}: FeedbackWrongProps) {
  useEffect(() => {
    playSound("incorrect");
  }, []);

  return (
    <div
      className="animate-slide-fade bg-navy-card border border-line rounded-[14px] p-[14px] shadow-[0_8px_18px_rgba(0,0,0,.08)]"
      style={{ maxWidth: "600px" }}
    >
      <div className="flex items-center gap-[10px] mb-[10px]">
        <div className="w-[36px] h-[36px] rounded-full bg-red flex items-center justify-center text-[18px] text-white animate-pop-in shadow-[0_0_0_5px_rgba(241,99,99,.15)]">
          ✕
        </div>
        <div>
          <div className="text-[15px] font-extrabold text-ink">Oops! Not quite.</div>
          <div className="text-[11.5px] text-ink-dim mt-[1px]">
            There is a mistake in your sentence.
          </div>
        </div>
      </div>
      <span className="bg-[rgba(255,255,255,0.06)] inline-block px-[12px] py-[5px] rounded-[16px] text-[11px] text-ink-dim mb-[6px]">
        Your Answer
      </span>
      <div className="bg-[rgba(239,68,68,.08)] border border-[rgba(239,68,68,.25)] rounded-[7px] px-[12px] py-[8px] mt-[4px] text-[12.5px] text-ink">
        {userAnswer}
      </div>
      <div className="mt-[10px] font-bold text-[12px] text-gold">
        Explanation
      </div>
      <div className="bg-[rgba(255,255,255,0.05)] border-l-3 border-gold rounded-[7px] px-[12px] py-[10px] mt-[8px] text-[12px] leading-[1.5] text-ink-dim">
        {wrongExplain}
      </div>
      {advice && (
        <div className="bg-[rgba(244,192,149,0.12)] border border-[rgba(244,192,149,0.3)] text-[#f4c095] px-[12px] py-[8px] rounded-[7px] text-[11.5px] mt-[8px]">
          💡 {advice}
        </div>
      )}
      <button
        onClick={onRemedial}
        className="w-full mt-[8px] bg-masthead-sub text-white border-none px-[12px] py-[10px] rounded-[8px] font-extrabold cursor-pointer text-[12.5px] transition-transform duration-[0.15s] hover:translate-y-[-2px]"
        style={{ maxWidth: "220px" }}
      >
        Practice a bit more →
      </button>
    </div>
  );
}
