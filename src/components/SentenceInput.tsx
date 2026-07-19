"use client";

import { useState } from "react";

interface SentenceInputProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function SentenceInput({
  onSubmit,
  placeholder = "Type your sentence in the box below.",
  disabled = false,
}: SentenceInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (disabled) return;
    const trimmed = value.trim();
    if (!trimmed) return;
    setValue("");
    onSubmit(trimmed);
  };

  return (
    <div className="bg-white border border-[#dbe4fb] rounded-[20px] p-[14px] shadow-[0_8px_18px_rgba(19,33,61,0.06)]">
      <span className="bg-[rgba(49,89,199,0.08)] inline-block px-[12px] py-[5px] rounded-[999px] text-[11px] text-masthead-sub font-bold mb-[6px]">
        {disabled ? "AI is evaluating..." : "Your answer"}
      </span>
      <div className="flex gap-[8px] mt-[10px]">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          placeholder={disabled ? "Please wait..." : placeholder}
          autoComplete="off"
          disabled={disabled}
          className="flex-1 bg-[#f7f9ff] border border-[#dbe4fb] text-ink px-[14px] py-[12px] rounded-[16px] text-[13px] outline-none placeholder:text-ink-dim disabled:opacity-40 disabled:cursor-wait"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled}
          className="bg-masthead-sub text-white border-none px-[18px] rounded-[16px] font-bold cursor-pointer text-[13px] transition-transform duration-[0.15s] hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {disabled ? (
            <span className="inline-flex items-center gap-[6px]">
              <span className="inline-block w-[4px] h-[4px] rounded-full bg-white animate-thinking-dot" />
              <span
                className="inline-block w-[4px] h-[4px] rounded-full bg-white animate-thinking-dot"
                style={{ animationDelay: "0.2s" }}
              />
              <span
                className="inline-block w-[4px] h-[4px] rounded-full bg-white animate-thinking-dot"
                style={{ animationDelay: "0.4s" }}
              />
            </span>
          ) : (
            "Submit ➤"
          )}
        </button>
      </div>
    </div>
  );
}
