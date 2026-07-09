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
      <div className="flex gap-[18px] flex-wrap">
        <div className="flex-1 min-w-[240px] bg-navy-card border border-line rounded-[16px] p-[18px]">
          <h4 className="m-0 mb-[10px]">Your Progress</h4>
          <div className="flex justify-between text-[13px] px-0 py-[7px] border-b border-dashed border-line">
            Gates Cleared{" "}
            <b className="text-white">
              {gatesCleared} / {gatesTotal}
            </b>
          </div>
          <div className="flex justify-between text-[13px] px-0 py-[7px] border-b border-dashed border-line">
            Accuracy Rate <b className="text-white">{accuracy}%</b>
          </div>
          <div className="flex justify-between text-[13px] px-0 py-[7px] border-b border-dashed border-line">
            Streak <b className="text-white">{streak} 🔥</b>
          </div>
          <div className="flex justify-between text-[13px] px-0 py-[7px] border-b border-dashed border-line">
            XP Earned <b className="text-white">{xpEarned} XP</b>
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-[6px]"
          style={{ maxWidth: "200px" }}
        >
          <div className="w-[88px] h-[96px] bg-shield-big-grad clip-shield flex items-center justify-center font-black text-[11px] text-[#5a3d05] text-center leading-[1.2] animate-shield-pop shadow-[0_10px_20px_rgba(0,0,0,.35)]">
            LEVEL
            <br />
            ADJUSTED
          </div>
        </div>
        <div className="flex-1 min-w-[240px] bg-navy-card border border-line rounded-[16px] p-[18px]">
          <h4 className="m-0 mb-[10px]">Next Challenges</h4>
          <p className="text-[12px] text-ink-dim m-0 mb-[6px]">
            Based on your mistakes, the next gates will focus on:
          </p>
          <ul className="list-none m-[8px_0_0] p-0 text-[13px]">
            {focusList.map((f) => (
              <li
                key={f}
                className="px-0 py-[5px] text-[#cfe9d8] before:content-['✓_'] before:text-[#3cb15f] before:font-extrabold"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center bg-[rgba(245,197,66,.12)] border border-[rgba(245,197,66,.4)] text-gold-light px-[10px] py-[10px] rounded-[10px] text-[13px] font-semibold mt-[16px]">
        The difficulty is now adapted to help you learn more effectively!
      </div>
      <button
        onClick={onContinue}
        className="bg-green-btn-grad text-white border-none px-[12px] py-[12px] rounded-[10px] font-extrabold cursor-pointer text-[13.5px] transition-transform duration-[0.15s] hover:translate-y-[-2px] block"
        style={{ maxWidth: "260px", margin: "16px auto 0" }}
      >
        See Journey Summary ›
      </button>
    </div>
  );
}
