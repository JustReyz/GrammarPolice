"use client";

import { useEffect } from "react";
import RobotOfficer from "./RobotOfficer";

interface Mistakes {
  tense: number;
  agreement: number;
  preposition: number;
}

interface AIAnalyzingProps {
  mistakes: Mistakes;
  onComplete: () => void;
  delay?: number;
}

export default function AIAnalyzing({
  mistakes,
  onComplete,
  delay = 2200,
}: AIAnalyzingProps) {
  const allEntries: [string, number][] = [
    ["Verb tense (present continuous)", mistakes.tense],
    ["Subject-verb agreement", mistakes.agreement],
    ["Preposition usage", mistakes.preposition],
  ];
  const entries = allEntries.filter(([, count]) => count > 0);

  useEffect(() => {
    const timer = setTimeout(onComplete, delay);
    return () => clearTimeout(timer);
  }, [onComplete, delay]);

  return (
    <div className="animate-slide-fade flex gap-[18px] flex-wrap">
      <div className="flex-1 text-center" style={{ maxWidth: "220px" }}>
        <RobotOfficer size="large" />
        <div className="relative bg-white text-[#1a2b45] rounded-[16px] px-4 py-3 text-[13.5px] leading-[1.4] font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.3)] mt-[10px] animate-pop-in">
          AI Grammar Police analyzing your performance
          <span className="thinking-dots">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-gold mx-[2px] animate-thinking-dot" />
            <span
              className="inline-block w-[6px] h-[6px] rounded-full bg-gold mx-[2px] animate-thinking-dot"
              style={{ animationDelay: "0.2s" }}
            />
            <span
              className="inline-block w-[6px] h-[6px] rounded-full bg-gold mx-[2px] animate-thinking-dot"
              style={{ animationDelay: "0.4s" }}
            />
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-[240px] bg-navy-card border border-line rounded-[16px] p-[20px] shadow-[0_10px_22px_rgba(0,0,0,.28)]">
        <h4 className="m-0 mb-[10px]">Common Mistakes Detected</h4>
        <ul className="list-none m-[10px_0] p-0">
          {entries.length === 0 ? (
            <li className="flex justify-between px-[12px] py-[9px] rounded-[8px] bg-[rgba(255,255,255,.04)] mb-[6px] text-[13px]">
              No major mistakes detected <b className="text-gold-light">🎉</b>
            </li>
          ) : (
            entries.map(([label, count]) => (
              <li
                key={label}
                className="flex justify-between px-[12px] py-[9px] rounded-[8px] bg-[rgba(255,255,255,.04)] mb-[6px] text-[13px]"
              >
                {label} <b className="text-gold-light">{count}x</b>
              </li>
            ))
          )}
        </ul>
        <div className="bg-[rgba(245,197,66,.12)] border border-[rgba(245,197,66,.4)] text-gold-light px-[14px] py-[10px] rounded-[8px] text-[12.5px]">
          Don&apos;t worry! We will adjust the next challenges for you.
        </div>
      </div>
    </div>
  );
}
