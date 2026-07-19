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
    <div className="animate-slide-fade flex gap-[12px] flex-wrap">
      <div className="flex-1 text-center" style={{ maxWidth: "200px" }}>
        <RobotOfficer size="large" />
        <div className="relative bg-white text-[#1e293b] rounded-[14px] px-3 py-2.5 text-[12.5px] leading-[1.4] font-semibold shadow-[0_6px_16px_rgba(0,0,0,0.08)] mt-[8px] animate-pop-in border border-[rgba(0,0,0,0.08)]">
          AI Grammar Police analyzing your performance
          <span className="thinking-dots">
            <span className="inline-block w-[5px] h-[5px] rounded-full bg-gold mx-[1.5px] animate-thinking-dot" />
            <span
              className="inline-block w-[5px] h-[5px] rounded-full bg-gold mx-[1.5px] animate-thinking-dot"
              style={{ animationDelay: "0.2s" }}
            />
            <span
              className="inline-block w-[5px] h-[5px] rounded-full bg-gold mx-[1.5px] animate-thinking-dot"
              style={{ animationDelay: "0.4s" }}
            />
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-[220px] bg-navy-card border border-line rounded-[14px] p-[14px] shadow-[0_8px_18px_rgba(0,0,0,.08)]">
        <h4 className="m-0 mb-[8px] text-ink text-[14px]">Common Mistakes Detected</h4>
        <ul className="list-none m-[6px_0] p-0">
          {entries.length === 0 ? (
            <li className="flex justify-between px-[10px] py-[7px] rounded-[7px] bg-[rgba(255,255,255,0.05)] mb-[5px] text-[12px] text-ink">
              No major mistakes detected <b className="text-gold">🎉</b>
            </li>
          ) : (
            entries.map(([label, count]) => (
              <li
                key={label}
                className="flex justify-between px-[10px] py-[7px] rounded-[7px] bg-[rgba(255,255,255,0.05)] mb-[5px] text-[12px] text-ink"
              >
                {label} <b className="text-gold">{count}x</b>
              </li>
            ))
          )}
        </ul>
        <div className="bg-[rgba(244,192,149,0.12)] border border-[rgba(244,192,149,0.3)] text-[#f4c095] px-[12px] py-[8px] rounded-[7px] text-[11.5px]">
          Don&apos;t worry! We will adjust the next challenges for you.
        </div>
      </div>
    </div>
  );
}
