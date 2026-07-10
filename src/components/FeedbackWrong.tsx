"use client";

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
  return (
    <div
      className="animate-slide-fade bg-navy-card border border-line rounded-[16px] p-[20px] shadow-[0_10px_22px_rgba(0,0,0,.28)]"
      style={{ maxWidth: "640px" }}
    >
      <div className="flex items-center gap-[12px] mb-[14px]">
        <div className="w-[42px] h-[42px] rounded-full bg-fb-bad flex items-center justify-center text-[20px] text-white animate-pop-in shadow-[0_0_0_6px_rgba(239,92,109,.18)]">
          ✕
        </div>
        <div>
          <div className="text-[16.5px] font-extrabold">Oops! Not quite.</div>
          <div className="text-[12.5px] text-ink-dim mt-[2px]">
            There is a mistake in your sentence.
          </div>
        </div>
      </div>
      <span className="bg-[rgba(255,255,255,0.06)] inline-block px-[14px] py-[6px] rounded-[20px] text-[12px] text-ink-dim mb-[8px]">
        Your Answer
      </span>
      <div className="bg-[rgba(224,69,90,.12)] border border-[rgba(224,69,90,.4)] rounded-[8px] px-[14px] py-[10px] mt-[6px] text-[13.5px]">
        {userAnswer}
      </div>
      <div className="mt-[14px] font-bold text-[13px] text-gold-light">
        Explanation
      </div>
      <div className="bg-[rgba(255,255,255,0.05)] border-l-3 border-gold rounded-[8px] px-[14px] py-[12px] mt-[12px] text-[13px] leading-[1.5] text-ink-dim">
        {wrongExplain}
      </div>
      {advice && (
        <div className="bg-[rgba(245,197,66,.12)] border border-[rgba(245,197,66,.4)] text-gold-light px-[14px] py-[10px] rounded-[8px] text-[12.5px] mt-[12px]">
          💡 {advice}
        </div>
      )}
      <button
        onClick={onRemedial}
        className="w-full mt-[10px] bg-green-btn-grad text-white border-none px-[12px] py-[12px] rounded-[10px] font-extrabold cursor-pointer text-[13.5px] transition-transform duration-[0.15s] hover:translate-y-[-2px]"
        style={{ maxWidth: "240px" }}
      >
        Practice a bit more →
      </button>
    </div>
  );
}
