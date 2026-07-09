"use client";

interface Props {
  overallMastery: number;
  rank: string;
  categories: { name: string; score: number }[];
  district: string;
  onContinue: () => void;
}

export default function GrammarPassport({ overallMastery, rank, categories, district, onContinue }: Props) {
  return (
    <div className="animate-slide-fade max-w-[600px] mx-auto">
      <div className="text-center mb-[20px]">
        <div className="text-[48px] mb-[4px]">🛂</div>
        <h2 className="text-[22px] font-extrabold text-gold m-0">Grammar Passport</h2>
        <p className="text-[12px] text-ink-dim mt-[4px]">Your personal grammar profile</p>
      </div>

      {/* Passport card */}
      <div className="bg-[linear-gradient(160deg,#0f2a1e,#0a1f14)] border-2 border-gold rounded-[20px] p-[24px] shadow-[0_14px_30px_rgba(0,0,0,.4)]">
        <div className="flex items-center gap-[14px] border-b border-[rgba(245,197,66,.3)] pb-[14px] mb-[14px]">
          <div className="w-[60px] h-[60px] rounded-full bg-shield-grad flex items-center justify-center text-[24px] font-black text-[#5a3d05]">
            🛡️
          </div>
          <div>
            <div className="text-[18px] font-extrabold text-white">Grammar Police</div>
            <div className="text-[11px] text-gold-light font-semibold">{rank}</div>
          </div>
        </div>

        <div className="text-center mb-[14px]">
          <div className="text-[42px] font-black text-gold leading-none">{overallMastery}%</div>
          <div className="text-[11px] text-ink-dim mt-[4px]">Overall Mastery</div>
        </div>

        <div className="space-y-[8px]">
          {categories.map((c) => (
            <div key={c.name} className="flex items-center gap-[10px]">
              <span className="text-[12px] text-ink-dim w-[110px] truncate">{formatCat(c.name)}</span>
              <div className="flex-1 h-[8px] rounded-full bg-[rgba(255,255,255,.08)] overflow-hidden">
                <div className="h-full rounded-full bg-gold-btn transition-all duration-[0.6s]" style={{ width: `${c.score}%` }} />
              </div>
              <span className="text-[12px] text-gold-light font-bold w-[32px] text-right">{c.score}</span>
            </div>
          ))}
        </div>

        <div className="mt-[14px] text-center text-[11px] text-ink-dim border-t border-[rgba(245,197,66,.3)] pt-[12px]">
          District Assignment: <span className="text-gold-light font-bold">{district}</span>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="mx-auto mt-[18px] block bg-green-btn-grad text-white border-none px-[36px] py-[12px] rounded-[12px] font-extrabold text-[14px] cursor-pointer transition-transform duration-[0.15s] hover:translate-y-[-2px]"
      >
        Start My Journey →
      </button>
    </div>
  );
}

function formatCat(name: string): string {
  return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
