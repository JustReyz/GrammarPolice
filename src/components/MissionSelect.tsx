"use client";

import { useState } from "react";

const MISSIONS = [
  { id: "academic", label: "Academic", icon: "📚", desc: "Essays, lectures, academic writing" },
  { id: "job_interview", label: "Job Interview", icon: "💼", desc: "Interviews, resumes, professional talk" },
  { id: "traveling", label: "Traveling", icon: "✈️", desc: "Directions, hotels, ordering food" },
  { id: "daily_conversation", label: "Daily Conversation", icon: "🗣️", desc: "Small talk, daily life, friends" },
  { id: "business_english", label: "Business English", icon: "📊", desc: "Meetings, emails, presentations" },
];

interface Props {
  onSelect: (goal: string) => void;
}

export default function MissionSelect({ onSelect }: Props) {
  const [selected, setSelected] = useState("");

  return (
    <div className="animate-slide-fade flex flex-col items-center py-[20px]">
      <div className="text-center mb-[20px]">
        <div className="text-[40px] mb-[8px]">🎯</div>
        <h2 className="text-[22px] font-extrabold text-gold m-0">Choose Your Mission</h2>
        <p className="text-[13px] text-ink-dim mt-[6px]">
          Pick your learning goal. This shapes your assessment and journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px] w-full max-w-[600px]">
        {MISSIONS.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            className={`text-left p-[16px] rounded-[14px] border-2 transition-all duration-[0.15s] cursor-pointer ${
              selected === m.id
                ? "bg-[rgba(47,111,237,.2)] border-blue-btn-2"
                : "bg-navy-card border-line hover:border-[rgba(255,255,255,.2)]"
            }`}
          >
            <div className="text-[24px] mb-[4px]">{m.icon}</div>
            <div className="font-extrabold text-[14px] text-white">{m.label}</div>
            <div className="text-[11.5px] text-ink-dim mt-[2px]">{m.desc}</div>
          </button>
        ))}
      </div>

      <button
        onClick={() => selected && onSelect(selected)}
        disabled={!selected}
        className="mt-[20px] bg-green-btn-grad text-white border-none px-[36px] py-[12px] rounded-[12px] font-extrabold text-[14px] cursor-pointer transition-transform duration-[0.15s] hover:translate-y-[-2px] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {selected ? "Start Academy Assessment →" : "Select a mission first"}
      </button>
    </div>
  );
}
