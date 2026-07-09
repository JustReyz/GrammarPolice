"use client";

import { useState } from "react";

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
    "Mode remedial muncul otomatis berdasarkan kesalahanmu. Ayo kuasai materinya sebelum lanjut ke gerbang berikutnya!"
  );

  const handleClick = (val: string) => {
    if (disabled) return;
    setDisabled(true);
    setChosen(val);

    if (norm(val) === norm(correct)) {
      setNotice(
        "Correct! Materi dikuasai — melanjutkan ke gerbang berikutnya..."
      );
      setTimeout(onCorrect, 900);
    } else {
      setNotice(
        "Belum tepat — perhatikan jawaban yang benar di atas, lalu lanjut ke gerbang berikutnya."
      );
      setTimeout(onIncorrect, 1300);
    }
  };

  return (
    <div
      className="animate-slide-fade bg-navy-card border border-line rounded-[16px] p-[20px] shadow-[0_10px_22px_rgba(0,0,0,.28)]"
      style={{ maxWidth: "680px" }}
    >
      <div className="text-[16.5px] font-extrabold mb-[2px]">
        Let&apos;s practice a bit more!
      </div>
      <div className="text-[12.5px] text-ink-dim mb-[14px]">
        Complete the sentence using the correct form.
      </div>
      <div className="bg-[rgba(255,255,255,.04)] rounded-[8px] px-[14px] py-[10px] text-[15px]">
        {prompt}
      </div>
      <div className="flex gap-[10px] flex-wrap my-[16px]">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleClick(opt)}
            disabled={disabled}
            className={`px-[18px] py-[10px] rounded-[10px] text-[13.5px] font-semibold cursor-pointer transition-all duration-[0.15s] border ${
              chosen === opt
                ? norm(opt) === norm(correct)
                  ? "bg-opt-correct border-transparent text-white"
                  : "bg-opt-wrong border-transparent text-white"
                : disabled && norm(opt) === norm(correct)
                ? "bg-opt-correct border-transparent text-white"
                : "bg-[rgba(255,255,255,.06)] border-line text-white hover:bg-[rgba(255,255,255,.12)] hover:translate-y-[-2px]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="bg-[rgba(245,197,66,.12)] border border-[rgba(245,197,66,.4)] text-gold-light px-[14px] py-[10px] rounded-[8px] text-[12.5px] mt-[12px]">
        {notice}
      </div>
    </div>
  );
}
