"use client";

interface AdaptiveDifficultyResultProps {
  gatesCleared: number;
  gatesTotal: number;
  accuracy: number;
  streak: number;
  xpEarned: number;
  focusList: string[];
  onContinue: () => void;
}

export default function AdaptiveDifficultyResult({
  gatesCleared,
  gatesTotal,
  accuracy,
  streak,
  xpEarned,
  focusList,
  onContinue,
}: AdaptiveDifficultyResultProps) {
  return (
    <div className="animate-slide-fade">
      <div className="flex gap-[12px] flex-wrap">
        <div className="flex-1 min-w-[220px] bg-navy-card border border-line rounded-[14px] p-[14px]">
          <h4 className="m-0 mb-[8px] text-ink text-[14px]">Your Progress</h4>
          <div className="flex justify-between text-[12px] px-0 py-[6px] border-b border-dashed border-line">
            Gates Cleared{" "}
            <b className="text-ink">
              {gatesCleared} / {gatesTotal}
            </b>
          </div>
          <div className="flex justify-between text-[12px] px-0 py-[6px] border-b border-dashed border-line">
            Accuracy Rate <b className="text-ink">{accuracy}%</b>
          </div>
          <div className="flex justify-between text-[12px] px-0 py-[6px] border-b border-dashed border-line">
            Streak <b className="text-ink">{streak} 🔥</b>
          </div>
          <div className="flex justify-between text-[12px] px-0 py-[6px] border-b border-dashed border-line">
            XP Earned <b className="text-ink">{xpEarned} XP</b>
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-[5px]"
          style={{ maxWidth: "170px" }}
        >
          <div className="w-[72px] h-[80px] bg-gold clip-shield flex items-center justify-center font-black text-[10px] text-[#13213d] text-center leading-[1.2] animate-shield-pop shadow-[0_8px_16px_rgba(19,33,61,.08)]">
            LEVEL
            <br />
            ADJUSTED
          </div>
        </div>
        <div className="flex-1 min-w-[220px] bg-navy-card border border-line rounded-[14px] p-[14px]">
          <h4 className="m-0 mb-[8px] text-ink text-[14px]">Next Challenges</h4>
          <p className="text-[11px] text-ink-dim m-0 mb-[5px]">
            Based on your mistakes, the next gates will focus on:
          </p>
          <ul className="list-none m-[6px_0_0] p-0 text-[12px]">
            {focusList.map((f) => (
              <li
                key={f}
                className="px-0 py-[4px] text-[#3159c7] before:content-['✓_'] before:text-masthead-sub before:font-extrabold"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center bg-[rgba(244,192,149,0.12)] border border-[rgba(244,192,149,0.3)] text-[#f4c095] px-[10px] py-[8px] rounded-[8px] text-[12px] font-semibold mt-[12px]">
        The difficulty is now adapted to help you learn more effectively!
      </div>
      <button
        onClick={onContinue}
        className="bg-masthead-sub text-white border-none px-[12px] py-[10px] rounded-[8px] font-extrabold cursor-pointer text-[12.5px] transition-transform duration-[0.15s] hover:translate-y-[-2px] block"
        style={{ maxWidth: "220px", margin: "12px auto 0" }}
      >
        See Journey Summary ›
      </button>
    </div>
  );
}
