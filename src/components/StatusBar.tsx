"use client";

interface StatusBarProps {
  level: number;
  xp: number;
  xpMax: number;
  stars: number;
  coins: number;
  hearts: number;
  pulseKey?: string | null;
}

export default function StatusBar({
  level,
  xp,
  xpMax,
  stars,
  coins,
  hearts,
  pulseKey,
}: StatusBarProps) {
  const xpPct = Math.min(100, Math.round((xp / xpMax) * 100));

  return (
    <div className="flex items-center justify-between gap-[10px] px-[18px] py-[14px] bg-statusbar-bg border-b border-line flex-wrap">
      {/* Level chip */}
      <div className="flex items-center gap-[8px] bg-[rgba(255,255,255,0.05)] border border-line px-[12px] py-[6px] pl-[8px] rounded-[30px] text-[12px]">
        <div className="w-[26px] h-[26px] rounded-full bg-shield-grad flex items-center justify-center text-[13px] text-[#5a3d05] font-extrabold shadow-[inset_0_-2px_3px_rgba(0,0,0,.25)]">
          🛡️
        </div>
        <div className="leading-[1.15]">
          <b className="block text-[12.5px] text-white">Level {level}</b>
          <span className="text-ink-dim text-[10.5px]">Explorer</span>
        </div>
      </div>

      {/* XP bar */}
      <div className="flex-1 min-w-[140px] max-w-[220px] flex items-center gap-[8px]">
        <div className="flex-1 h-[9px] rounded-[6px] bg-[rgba(255,255,255,0.08)] overflow-hidden border border-line">
          <div
            className="h-full rounded-[6px] bg-gold-btn transition-[width] duration-[0.6s] ease-[cubic-bezier(.4,1.4,.4,1)]"
            style={{ width: `${xpPct}%` }}
          />
        </div>
        <span className="text-[10.5px] text-ink-dim whitespace-nowrap">
          {xp}/{xpMax}
        </span>
      </div>

      {/* Stat pills */}
      <div className="flex gap-[8px] flex-wrap">
        <div
          className={`flex items-center gap-[5px] bg-[rgba(255,255,255,0.05)] border border-line px-[10px] py-[5px] rounded-[20px] text-[12.5px] font-semibold transition-transform duration-[0.25s] ${
            pulseKey === "star" ? "animate-pill-pulse" : ""
          }`}
        >
          <span className="text-[14px] text-gold">⭐</span>
          {stars}
        </div>
        <div
          className={`flex items-center gap-[5px] bg-[rgba(255,255,255,0.05)] border border-line px-[10px] py-[5px] rounded-[20px] text-[12.5px] font-semibold transition-transform duration-[0.25s] ${
            pulseKey === "coin" ? "animate-pill-pulse" : ""
          }`}
        >
          <span className="text-[14px] text-[#ffd54f]">🪙</span>
          {coins}
        </div>
        <div
          className={`flex items-center gap-[5px] bg-[rgba(255,255,255,0.05)] border border-line px-[10px] py-[5px] rounded-[20px] text-[12.5px] font-semibold transition-transform duration-[0.25s] ${
            pulseKey === "heart" ? "animate-pill-pulse" : ""
          }`}
        >
          <span className="text-[14px] text-[#ff5d6c]">❤️</span>
          {hearts}
        </div>
      </div>
    </div>
  );
}
