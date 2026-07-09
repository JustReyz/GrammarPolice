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
    <div className="animate-slide-fade flex gap-[18px] flex-wrap">
      <div className="flex-1 min-w-[240px] bg-navy-card border border-line rounded-[16px] p-[18px]">
        <h4 className="m-0 mb-[4px] text-[14px] tracking-[.4px]">
          WORD SCRAMBLE
        </h4>
        <p className="m-0 mb-[12px] text-[12px] text-ink-dim">
          Arrange the words below to make a correct sentence.
        </p>
        <div className="min-h-[42px] bg-[rgba(255,255,255,.05)] border border-dashed border-line rounded-[8px] px-[12px] py-[8px] text-[13.5px] mb-[10px] text-white">
          <span className="text-gold-light">{built.join(" ")}</span>
        </div>
        <div className="flex gap-[8px] flex-wrap mb-[10px]">
          {words.map((w, i) => (
            <button
              key={i}
              onClick={() => handleTileClick(i)}
              disabled={used[i]}
              className={`px-[14px] py-[8px] rounded-[8px] font-bold text-[13px] cursor-pointer transition-all duration-[0.15s] border ${
                used[i]
                  ? "opacity-25 pointer-events-none bg-[rgba(255,255,255,.08)] border-line"
                  : "bg-[rgba(255,255,255,.08)] border-line text-white hover:bg-[rgba(255,255,255,.16)]"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-btn-grad text-white border-none px-[22px] py-[10px] rounded-[10px] font-bold cursor-pointer text-[14px] transition-transform duration-[0.15s] hover:translate-y-[-2px]"
        >
          Submit
        </button>
        <button
          onClick={handleReset}
          className="bg-[rgba(255,255,255,.06)] border border-line text-white px-[20px] py-[10px] rounded-[10px] font-bold cursor-pointer text-[13px] ml-[8px]"
        >
          Reset
        </button>
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
