"use client";

import { useState } from "react";

interface SentenceInputProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
}

export default function SentenceInput({
  onSubmit,
  placeholder = "Type your sentence in the box below.",
}: SentenceInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  return (
    <div className="bg-navy-card border border-line rounded-[16px] p-[20px] shadow-[0_10px_22px_rgba(0,0,0,.28)]">
      <span className="bg-[rgba(255,255,255,0.06)] inline-block px-[14px] py-[6px] rounded-[20px] text-[12px] text-ink-dim mb-[8px]">
        Your answer
      </span>
      <div className="flex gap-[10px] mt-[14px]">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          placeholder={placeholder}
          autoComplete="off"
          className="flex-1 bg-[rgba(255,255,255,0.06)] border border-line text-white px-[14px] py-[12px] rounded-[10px] text-[14px] outline-none placeholder:text-ink-dim"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-btn-grad text-white border-none px-[22px] rounded-[10px] font-bold cursor-pointer text-[14px] transition-transform duration-[0.15s] hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit ➤
        </button>
      </div>
    </div>
  );
}
