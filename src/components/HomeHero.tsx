"use client";

import GateScene from "./GateScene";

export default function HomeHero() {
  return (
    <div className="animate-slide-fade flex flex-col items-center justify-center min-h-[280px] text-center relative">
      <GateScene title="" showBubble={null} />
      <div
        className="mt-[-100px] inline-flex flex-col items-center bg-badge-bg border-3 border-gold px-[46px] py-[18px] rounded-[16px] shadow-[0_14px_30px_rgba(0,0,0,.4)] animate-hero-pop"
        style={{
          fontSize: "clamp(30px,5vw,52px)",
          fontWeight: 900,
          letterSpacing: "1px",
          color: "#f5c542",
          textShadow: "0 4px 0 #6b4e0c, 0 8px 16px rgba(0,0,0,.4)",
          lineHeight: 1.05,
        }}
      >
        <small className="text-[12px] text-[#bfe8cd] tracking-[3px] font-bold mb-[4px]">
          ★ ★ ★
        </small>
        GRAMMAR<br />
        POLICE
      </div>
      <p className="text-ink-dim text-[13px] max-w-[420px] mt-[14px]">
        Ready to improve your grammar? Let&apos;s hit the road — setiap gerbang
        menguji satu aturan tata bahasa lewat percakapan nyata.
      </p>
      <button className="mt-[22px] bg-green-btn-grad text-white border-none px-[40px] py-[14px] rounded-[14px] text-[15px] font-extrabold tracking-[.5px] cursor-pointer shadow-green-btn transition-all duration-[0.18s] hover:translate-y-[-3px] hover:shadow-green-btn-hover active:translate-y-0">
        Start Journey 🚗
      </button>
    </div>
  );
}
