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
    <div className="animate-slide-fade flex gap-[18px] flex-wrap">
      <div className="flex-1 min-w-[240px] bg-navy-card border border-line rounded-[16px] p-[18px]">
        <h4 className="m-0 mb-[4px] text-[14px] tracking-[.4px]">
          CORRECTION MODE
        </h4>
        <p className="m-0 mb-[12px] text-[12px] text-ink-dim">
          Find and correct the mistake in the sentence.
        </p>
        <div className="bg-[rgba(224,69,90,.1)] border border-[rgba(224,69,90,.35)] px-[14px] py-[10px] rounded-[8px] font-bold text-[13.5px] mb-[10px]">
          {sentence}
        </div>
        <div className="flex gap-[10px]">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            placeholder="Type the correct sentence here..."
            className="flex-1 bg-[rgba(255,255,255,0.06)] border border-line text-white px-[14px] py-[12px] rounded-[10px] text-[14px] outline-none placeholder:text-ink-dim"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-btn-grad text-white border-none px-[22px] rounded-[10px] font-bold cursor-pointer text-[14px] transition-transform duration-[0.15s] hover:translate-y-[-2px]"
          >
            Submit
          </button>
        </div>
      </div>
      <div
        className="flex items-center justify-center"
        style={{ maxWidth: "240px" }}
      >
        <RobotOfficer size="large" />
      </div>
    </div>
  );
}
