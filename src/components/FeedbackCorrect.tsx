"use client";

interface FeedbackCorrectProps {
  userAnswer: string;
  correctExplain: string;
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
  xpGained = 20,
  coinsGained = 10,
  onNext,
}: FeedbackCorrectProps) {
  return (
    <div className="animate-slide-fade flex gap-[18px] flex-wrap">
      <div className="flex-1 min-w-[240px] bg-navy-card border border-line rounded-[16px] p-[20px] shadow-[0_10px_22px_rgba(0,0,0,.28)]">
        <div className="flex items-center gap-[12px] mb-[14px]">
          <div className="w-[42px] h-[42px] rounded-full bg-fb-ok flex items-center justify-center text-[20px] text-white animate-pop-in shadow-[0_0_0_6px_rgba(60,177,95,.18)]">
            ✓
          </div>
          <div>
            <div className="text-[16.5px] font-extrabold">Great job!</div>
            <div className="text-[12.5px] text-ink-dim mt-[2px]">
              Your sentence is correct.
            </div>
          </div>
        </div>
        <span className="bg-[rgba(255,255,255,0.06)] inline-block px-[14px] py-[6px] rounded-[20px] text-[12px] text-ink-dim mb-[8px]">
          Your Answer
        </span>
        <div className="bg-[rgba(255,255,255,.04)] rounded-[8px] px-[14px] py-[10px] mt-[6px] text-[13.5px]">
          <b className="text-white">{escapeHtml(userAnswer)}</b>
        </div>
        <div className="mt-[14px] font-bold text-[13px] text-gold-light">
          Explanation
        </div>
        <div className="bg-[rgba(255,255,255,0.05)] border-l-3 border-gold rounded-[8px] px-[14px] py-[12px] mt-[12px] text-[13px] leading-[1.5] text-ink-dim">
          {correctExplain}
        </div>
      </div>
      <div className="bg-rewards-card-bg border border-[rgba(60,177,95,.35)] rounded-[16px] p-[18px] min-w-[190px]">
        <h4 className="m-0 mb-[12px] text-[13px] tracking-[.5px] text-[#cfe9d8]">
          REWARDS
        </h4>
        <div className="flex items-center gap-[10px] mb-[10px] font-bold text-[14px]">
          <span className="w-[30px] h-[30px] rounded-full bg-[rgba(255,255,255,.08)] flex items-center justify-center text-[15px]">
            ⭐
          </span>
          +{xpGained} XP
        </div>
        <div className="flex items-center gap-[10px] mb-[10px] font-bold text-[14px]">
          <span className="w-[30px] h-[30px] rounded-full bg-[rgba(255,255,255,.08)] flex items-center justify-center text-[15px]">
            🪙
          </span>
          +{coinsGained} Coins
        </div>
        <button
          onClick={onNext}
          className="w-full mt-[10px] bg-green-btn-grad text-white border-none px-[12px] py-[12px] rounded-[10px] font-extrabold cursor-pointer text-[13.5px] transition-transform duration-[0.15s] hover:translate-y-[-2px]"
        >
          Next Gate ›
        </button>
      </div>
    </div>
  );
}
