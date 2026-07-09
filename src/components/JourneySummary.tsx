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
      <div className="bg-navy-card border border-line rounded-[16px] p-[20px]">
        <h4 className="m-0 mb-[6px]">Journey Summary</h4>
        <p className="text-[12.5px] text-ink-dim m-0 mb-[10px]">
          Great work, Driver!
        </p>
        <div className="flex justify-between text-[13.5px] px-0 py-[8px] border-b border-dashed border-line">
          Gates Cleared{" "}
          <b className="text-gold-light">
            {gatesCleared} / {gatesTotal}
          </b>
        </div>
        <div className="flex justify-between text-[13.5px] px-0 py-[8px] border-b border-dashed border-line">
          Accuracy Rate <b className="text-gold-light">{accuracy}%</b>
        </div>
        <div className="flex justify-between text-[13.5px] px-0 py-[8px] border-b border-dashed border-line">
          Total XP <b className="text-gold-light">{xp}</b>
        </div>
        <div className="flex justify-between text-[13.5px] px-0 py-[8px] border-b border-dashed border-line">
          Coins Earned <b className="text-gold-light">{coins}</b>
        </div>
        <button
          onClick={onContinue}
          className="w-full mt-[10px] bg-green-btn-grad text-white border-none px-[12px] py-[12px] rounded-[10px] font-extrabold cursor-pointer text-[13.5px] transition-transform duration-[0.15s] hover:translate-y-[-2px]"
        >
          Continue Journey ›
        </button>
      </div>
    </div>
  );
}
