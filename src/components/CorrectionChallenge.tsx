"use client";

import { useState } from "react";
import RobotOfficer from "./RobotOfficer";

interface CorrectionChallengeProps {
  sentence: string;
  correct: string;
  onCorrect: (val: string) => void;
  onWrong: (val: string) => void;
}

function norm(s: string) {
  return s.toLowerCase().replace(/[.!?]/g, "").replace(/\s+/g, " ").trim();
}

export default function CorrectionChallenge({
  sentence,
  correct,
  onCorrect,
  onWrong,
}: CorrectionChallengeProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const val = value.trim();
    if (!val) return;
    if (norm(val) === norm(correct)) {
      onCorrect(val);
    } else {
      onWrong(val);
    }
  };

  return (
    <div className="animate-slide-fade flex gap-[12px] flex-wrap">
      <div className="flex-1 min-w-[220px] bg-navy-card border border-line rounded-[14px] p-[14px]">
        <h4 className="m-0 mb-[3px] text-[13px] tracking-[.3px] text-ink">
          CORRECTION MODE
        </h4>
        <p className="m-0 mb-[10px] text-[11px] text-ink-dim">
          Find and correct the mistake in the sentence.
        </p>
        <div className="bg-[rgba(239,68,68,.06)] border border-[rgba(239,68,68,.2)] px-[12px] py-[8px] rounded-[7px] font-bold text-[12.5px] text-ink mb-[8px]">
          {sentence}
        </div>
        <div className="flex gap-[8px]">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            placeholder="Type the correct sentence here..."
            className="flex-1 bg-[rgba(255,255,255,0.06)] border border-line text-ink px-[12px] py-[10px] rounded-[8px] text-[13px] outline-none placeholder:text-ink-dim"
          />
          <button
            onClick={handleSubmit}
          className="bg-masthead-sub text-white border-none px-[18px] rounded-[8px] font-bold cursor-pointer text-[13px] transition-transform duration-[0.15s] hover:translate-y-[-2px]"
          >
            Submit
          </button>
        </div>
      </div>
      <div
        className="flex items-center justify-center"
        style={{ maxWidth: "200px" }}
      >
        <RobotOfficer size="large" />
      </div>
    </div>
  );
}
