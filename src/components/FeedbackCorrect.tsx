"use client";

import { useEffect } from "react";
import { playSound } from "@/lib/playSound";

interface FeedbackCorrectProps {
  userAnswer: string;
  correctExplain: string;
  advice?: string;
  xpGained?: number;
  coinsGained?: number;
  onNext: () => void;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default function FeedbackCorrect({
  userAnswer,
  correctExplain,
  advice,
  xpGained = 20,
  coinsGained = 10,
  onNext,
}: FeedbackCorrectProps) {
  useEffect(() => {
    playSound("correct");
  }, []);

  return (
    <div className="animate-slide-fade flex gap-[12px] flex-wrap">
      <div className="flex-1 min-w-[220px] bg-navy-card border border-line rounded-[14px] p-[14px] shadow-[0_8px_18px_rgba(0,0,0,.08)]">
        <div className="flex items-center gap-[10px] mb-[10px]">
          <div className="w-[36px] h-[36px] rounded-full bg-masthead-sub flex items-center justify-center text-[18px] text-white animate-pop-in shadow-[0_0_0_5px_rgba(49,89,199,0.15)]">
            ✓
          </div>
          <div>
            <div className="text-[15px] font-extrabold text-ink">Great job!</div>
            <div className="text-[11.5px] text-ink-dim mt-[1px]">
              Your sentence is correct.
            </div>
          </div>
        </div>
        <span className="bg-[rgba(255,255,255,0.06)] inline-block px-[12px] py-[5px] rounded-[16px] text-[11px] text-ink-dim mb-[6px]">
          Your Answer
        </span>
        <div className="bg-[rgba(255,255,255,0.05)] rounded-[7px] px-[12px] py-[8px] mt-[4px] text-[12.5px]">
          <b className="text-ink">{userAnswer}</b>
        </div>
        <div className="mt-[10px] font-bold text-[12px] text-gold">
          Explanation
        </div>
        <div className="bg-[rgba(255,255,255,0.05)] border-l-3 border-gold rounded-[7px] px-[12px] py-[10px] mt-[8px] text-[12px] leading-[1.5] text-ink-dim">
          {correctExplain}
        </div>
        {advice && (
          <div className="bg-[rgba(244,192,149,0.12)] border border-[rgba(244,192,149,0.3)] text-[#f4c095] px-[12px] py-[8px] rounded-[7px] text-[11.5px] mt-[8px]">
            💡 {advice}
          </div>
        )}
      </div>
      <div className="bg-[#f4f7ff] border border-[#dbe4fb] rounded-[14px] p-[14px] min-w-[160px]">
        <h4 className="m-0 mb-[8px] text-[11.5px] tracking-[.5px] text-masthead-sub">
          REWARDS
        </h4>
        <div className="flex items-center gap-[8px] mb-[8px] font-bold text-[13px] text-ink">
          <span className="w-[26px] h-[26px] rounded-full bg-[rgba(255,255,255,0.07)] flex items-center justify-center text-[14px]">
            ⭐
          </span>
          +{xpGained} XP
        </div>
        <div className="flex items-center gap-[8px] mb-[8px] font-bold text-[13px] text-ink">
          <span className="w-[26px] h-[26px] rounded-full bg-[rgba(255,255,255,0.07)] flex items-center justify-center text-[14px]">
            🪙
          </span>
          +{coinsGained} Coins
        </div>
        <button
          onClick={onNext}
        className="w-full mt-[8px] bg-masthead-sub text-white border-none px-[12px] py-[10px] rounded-[8px] font-extrabold cursor-pointer text-[12.5px] transition-transform duration-[0.15s] hover:translate-y-[-2px]"
        >
          Next Gate ›
        </button>
      </div>
    </div>
  );
}
