"use client";

interface StatusBarProps {
  level: number;
  xp: number;
  xpMax: number;
  stars: number;
  coins: number;
  hearts: number;
  rank?: string;
  pulseKey?: string | null;
}

export default function StatusBar({
  level,
  xp,
  xpMax,
  stars,
  coins,
  hearts,
  rank,
  pulseKey,
}: StatusBarProps) {
  const xpPct = Math.min(100, Math.round((xp / xpMax) * 100));

  return (
    <div className="flex items-center justify-between gap-[8px] px-[14px] py-[12px] bg-statusbar-bg border-b border-line flex-wrap">
      {/* Level chip */}
      <div className="flex items-center gap-[8px] bg-[rgba(19,33,61,0.03)] border border-line px-[10px] py-[6px] pl-[8px] rounded-[18px] text-[11px]">
        <div className="w-[24px] h-[24px] rounded-full bg-gold flex items-center justify-center text-[11px] text-[#13213d] font-extrabold shadow-[inset_0_-2px_3px_rgba(255,255,255,.4)]">
          🛡️
        </div>
        <div className="leading-[1.15]">
          <b className="block text-[11.5px] text-ink">Level {level}</b>
          <span className="text-ink-dim text-[10px]">{rank || "Explorer"}</span>
        </div>
      </div>

      {/* XP bar */}
      <div className="flex-1 min-w-[120px] max-w-[200px] flex items-center gap-[6px]">
        <div className="flex-1 h-[8px] rounded-[999px] bg-[rgba(19,33,61,0.08)] overflow-hidden border border-line">
          <div
            className="h-full rounded-[999px] bg-gold transition-[width] duration-[0.6s] ease-[cubic-bezier(.4,1.4,.4,1)]"
            style={{ width: `${xpPct}%` }}
          />
        </div>
        <span className="text-[10px] text-ink-dim whitespace-nowrap font-semibold">
          {xp}/{xpMax}
        </span>
      </div>

      {/* Stat pills */}
      <div className="flex gap-[6px] flex-wrap">
        <div
          className={`flex items-center gap-[5px] bg-[rgba(19,33,61,0.03)] border border-line px-[9px] py-[5px] rounded-[16px] text-[11.5px] font-semibold text-ink transition-transform duration-[0.25s] ${
            pulseKey === "star" ? "animate-pill-pulse" : ""
          }`}
        >
          <span className="text-[13px] text-gold">⭐</span>
          {stars}
        </div>
        <div
          className={`flex items-center gap-[5px] bg-[rgba(19,33,61,0.03)] border border-line px-[9px] py-[5px] rounded-[16px] text-[11.5px] font-semibold text-ink transition-transform duration-[0.25s] ${
            pulseKey === "coin" ? "animate-pill-pulse" : ""
          }`}
        >
          <span className="text-[13px] text-[#f2c94c]">🪙</span>
          {coins}
        </div>
        <div
          className={`flex items-center gap-[5px] bg-[rgba(19,33,61,0.03)] border border-line px-[9px] py-[5px] rounded-[16px] text-[11.5px] font-semibold text-ink transition-transform duration-[0.25s] ${
            pulseKey === "heart" ? "animate-pill-pulse" : ""
          }`}
        >
          <span className="text-[13px] text-[#f16363]">❤️</span>
          {hearts}
        </div>
      </div>
    </div>
  );
}
