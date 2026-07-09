"use client";

import RobotOfficer from "./RobotOfficer";

interface Props {
  overallMastery: number;
  rank: string;
  categories: { name: string; score: number }[];
  district: string;
  onContinue: () => void;
}

export default function AnalysisScreen({ overallMastery, rank, categories, district, onContinue }: Props) {
  return (
    <div className="animate-slide-fade">
      <div className="flex flex-col items-center mb-[20px]">
        <RobotOfficer size="large" />
        <h3 className="text-[18px] font-extrabold text-gold mt-[10px] m-0">AI Analysis Complete</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] max-w-[700px] mx-auto">
        {/* Overall Score */}
        <div className="bg-navy-card border border-line rounded-[16px] p-[18px] text-center">
          <div className="text-[36px] font-black text-gold">{overallMastery}%</div>
          <div className="text-[12px] text-ink-dim mt-[4px]">Overall Mastery</div>
          <div className="mt-[8px] inline-block bg-[rgba(245,197,66,.15)] text-gold px-[16px] py-[4px] rounded-[20px] text-[12px] font-bold">
            {rank}
          </div>
        </div>

        {/* Weakest Area */}
        <div className="bg-navy-card border border-line rounded-[16px] p-[18px]">
          <h4 className="text-[13px] font-bold text-white m-0 mb-[8px]">Category Scores</h4>
          {categories.map((c) => (
            <div key={c.name} className="flex items-center gap-[8px] mb-[6px]">
              <span className="text-[11px] text-ink-dim w-[100px] truncate">{formatCat(c.name)}</span>
              <div className="flex-1 h-[6px] rounded-full bg-[rgba(255,255,255,.08)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gold-btn transition-all duration-[0.6s]"
                  style={{ width: `${c.score}%` }}
                />
              </div>
              <span className="text-[11px] text-gold-light font-bold w-[30px] text-right">{c.score}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-[16px] mb-[20px] max-w-[600px] mx-auto">
        <div className="bg-[rgba(60,177,95,.12)] border border-[rgba(60,177,95,.35)] rounded-[12px] px-[16px] py-[12px] text-[13px] text-[#bfe8cd]">
          Based on your assessment, you&apos;re assigned to <b className="text-gold-light">{district}</b>.
          Your Grammar Passport is ready.
        </div>
      </div>

      <button
        onClick={onContinue}
        className="mx-auto block bg-green-btn-grad text-white border-none px-[36px] py-[12px] rounded-[12px] font-extrabold text-[14px] cursor-pointer transition-transform duration-[0.15s] hover:translate-y-[-2px]"
      >
        View Grammar Passport →
      </button>
    </div>
  );
}

function formatCat(name: string): string {
  return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
