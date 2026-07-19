"use client";

import { useState } from "react";
import RobotOfficer from "./RobotOfficer";

interface WordScrambleChallengeProps {
  words: string[];
  correct: string;
  onCorrect: (built: string) => void;
  onWrong: (built: string) => void;
}

export default function WordScrambleChallenge({
  words,
  correct,
  onCorrect,
  onWrong,
}: WordScrambleChallengeProps) {
  const [used, setUsed] = useState<boolean[]>(
    new Array(words.length).fill(false),
  );
  const [built, setBuilt] = useState<string[]>([]);

  const handleTileClick = (i: number) => {
    if (used[i]) return;
    const newUsed = [...used];
    newUsed[i] = true;
    setUsed(newUsed);
    setBuilt([...built, words[i]]);
  };

  const handleReset = () => {
    setUsed(new Array(words.length).fill(false));
    setBuilt([]);
  };

  const handleSubmit = () => {
    const fullSentence = built.join(" ").trim();
    const norm = (s: string) =>
      s.toLowerCase().replace(/[.!?]/g, "").replace(/\s+/g, " ").trim();
    if (norm(fullSentence) === norm(correct)) {
      onCorrect(fullSentence);
    } else {
      onWrong(fullSentence);
    }
  };

  return (
    <div className="animate-slide-fade flex gap-[12px] flex-wrap">
      <div className="flex-1 min-w-[220px] bg-navy-card border border-line rounded-[14px] p-[14px]">
        <h4 className="m-0 mb-[3px] text-[13px] tracking-[.3px] text-ink">
          WORD SCRAMBLE
        </h4>
        <p className="m-0 mb-[10px] text-[11px] text-ink-dim">
          Arrange the words below to make a correct sentence.
        </p>
        <div className="min-h-[36px] bg-[rgba(255,255,255,0.05)] border border-dashed border-line rounded-[7px] px-[10px] py-[6px] text-[12.5px] mb-[8px] text-ink">
          <span className="text-gold">{built.join(" ")}</span>
        </div>
        <div className="flex gap-[6px] flex-wrap mb-[8px]">
          {words.map((w, i) => (
            <button
              key={i}
              onClick={() => handleTileClick(i)}
              disabled={used[i]}
              className={`px-[12px] py-[6px] rounded-[7px] font-bold text-[12px] cursor-pointer transition-all duration-[0.15s] border ${
                used[i]
                  ? "opacity-25 pointer-events-none bg-[rgba(255,255,255,0.06)] border-line"
                  : "bg-[rgba(255,255,255,0.06)] border-line text-ink hover:bg-[rgba(255,255,255,0.1)]"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-masthead-sub text-white border-none px-[18px] py-[8px] rounded-[8px] font-bold cursor-pointer text-[13px] transition-transform duration-[0.15s] hover:translate-y-[-2px] hover:bg-[#2749a5]"
        >
          Submit
        </button>
        <button
          onClick={handleReset}
          className="bg-[rgba(255,255,255,0.06)] border border-line text-ink px-[16px] py-[8px] rounded-[8px] font-bold cursor-pointer text-[12px] ml-[6px]"
        >
          Reset
        </button>
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
