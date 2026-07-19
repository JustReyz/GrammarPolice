"use client";

import GateScene from "./GateScene";

export default function HomeHero() {
  return (
    <div className="animate-slide-fade flex flex-col items-center justify-center min-h-[240px] text-center relative">
      <GateScene title="" showBubble={null} />
      <div
        className="mt-[-86px] inline-flex flex-col items-center bg-badge-bg border-2 border-line px-[40px] py-[16px] rounded-[24px] shadow-[0_16px_30px_rgba(19,33,61,.12)] animate-hero-pop"
        style={{
          fontSize: "clamp(24px,4vw,42px)",
          fontWeight: 800,
          letterSpacing: "1px",
          color: "#13213d",
          lineHeight: 1.05,
        }}
      >
        <small className="text-[10px] text-masthead-sub tracking-[2px] font-black mb-[6px]">
          AI JUDGE • XP TRACKER • GRAMMAR QUEST
        </small>
        GRAMMAR<br />
        POLICE
      </div>
      <p className="text-ink-dim text-[13px] max-w-[420px] mt-[12px] leading-[1.55]">
        Ready to improve your grammar? Each mission feels like a game, and the AI
        scores your answers with instant feedback.
      </p>
      <button className="mt-[18px] bg-masthead-sub text-white border-none px-[32px] py-[12px] rounded-[999px] text-[14px] font-extrabold tracking-[.4px] cursor-pointer shadow-green-btn transition-all duration-[0.18s] hover:translate-y-[-2px] hover:bg-[#2749a5] active:translate-y-0">
        Start Mission →
      </button>
    </div>
  );
}
