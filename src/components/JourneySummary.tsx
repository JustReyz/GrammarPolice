"use client";

import GateScene from "./GateScene";

interface JourneySummaryProps {
  gatesCleared: number;
  gatesTotal: number;
  accuracy: number;
  xp: number;
  coins: number;
  onContinue: () => void;
}

export default function JourneySummary({
  gatesCleared,
  gatesTotal,
  accuracy,
  xp,
  coins,
  onContinue,
}: JourneySummaryProps) {
  return (
    <div className="animate-slide-fade">
      <GateScene title="PRESENT TENSE" showBubble={null} />
      <div className="bg-navy-card border border-line rounded-[14px] p-[14px]">
        <h4 className="m-0 mb-[4px] text-ink text-[14px]">Journey Summary</h4>
        <p className="text-[11.5px] text-ink-dim m-0 mb-[8px]">
          Great work, Driver!
        </p>
        <div className="flex justify-between text-[12.5px] px-0 py-[6px] border-b border-dashed border-line">
          Gates Cleared{" "}
          <b className="text-gold">
            {gatesCleared} / {gatesTotal}
          </b>
        </div>
        <div className="flex justify-between text-[12.5px] px-0 py-[6px] border-b border-dashed border-line">
          Accuracy Rate <b className="text-gold">{accuracy}%</b>
        </div>
        <div className="flex justify-between text-[12.5px] px-0 py-[6px] border-b border-dashed border-line">
          Total XP <b className="text-gold">{xp}</b>
        </div>
        <div className="flex justify-between text-[12.5px] px-0 py-[6px] border-b border-dashed border-line">
          Coins Earned <b className="text-gold">{coins}</b>
        </div>
        <button
          onClick={onContinue}
          className="w-full mt-[8px] bg-masthead-sub text-white border-none px-[12px] py-[10px] rounded-[8px] font-extrabold cursor-pointer text-[12.5px] transition-transform duration-[0.15s] hover:translate-y-[-2px] hover:bg-[#2749a5]"
        >
          Continue Journey ›
        </button>
      </div>
    </div>
  );
}
