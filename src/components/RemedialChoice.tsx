"use client";

import { useState } from "react";
import { playSound } from "@/lib/playSound";

interface RemedialChoiceProps {
  prompt: string;
  options: string[];
  correct: string;
  onCorrect: () => void;
  onIncorrect: () => void;
}

function norm(s: string) {
  return s.toLowerCase().replace(/[.!?]/g, "").replace(/\s+/g, " ").trim();
}

export default function RemedialChoice({
  prompt,
  options,
  correct,
  onCorrect,
  onIncorrect,
}: RemedialChoiceProps) {
  const [chosen, setChosen] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [notice, setNotice] = useState(
    "Remedial mode activates automatically based on your mistakes. Master the material before moving to the next gate!"
  );

  const handleClick = (val: string) => {
    if (disabled) return;
    setDisabled(true);
    setChosen(val);

    if (norm(val) === norm(correct)) {
      playSound("correct");
      setNotice(
        "Correct! Material mastered — moving to the next gate..."
      );
      setTimeout(onCorrect, 900);
    } else {
      playSound("incorrect");
      setNotice(
        "Not quite right — review the correct answer above, then proceed to the next gate."
      );
      setTimeout(onIncorrect, 1300);
    }
  };

  return (
    <div
      className="animate-slide-fade bg-navy-card border border-line rounded-[14px] p-[14px] shadow-[0_8px_18px_rgba(0,0,0,.08)]"
      style={{ maxWidth: "620px" }}
    >
      <div className="text-[15px] font-extrabold mb-[2px] text-ink">
        Let&apos;s practice a bit more!
      </div>
      <div className="text-[11.5px] text-ink-dim mb-[10px]">
        Complete the sentence using the correct form.
      </div>
      <div className="bg-[rgba(255,255,255,0.05)] rounded-[7px] px-[12px] py-[8px] text-[14px] text-ink">
        {prompt}
      </div>
      <div className="flex gap-[8px] flex-wrap my-[12px]">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleClick(opt)}
            disabled={disabled}
            className={`px-[16px] py-[8px] rounded-[8px] text-[12.5px] font-semibold cursor-pointer transition-all duration-[0.15s] border ${
              chosen === opt
                ? norm(opt) === norm(correct)
                  ? "bg-masthead-sub border-transparent text-white"
                  : "bg-red border-transparent text-white"
                : disabled && norm(opt) === norm(correct)
                ? "bg-masthead-sub border-transparent text-white"
                : "bg-[rgba(255,255,255,0.06)] border-line text-ink hover:bg-[rgba(255,255,255,0.1)] hover:translate-y-[-2px]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="bg-[rgba(244,192,149,0.12)] border border-[rgba(244,192,149,0.3)] text-[#f4c095] px-[12px] py-[8px] rounded-[7px] text-[11.5px] mt-[8px]">
        {notice}
      </div>
    </div>
  );
}
