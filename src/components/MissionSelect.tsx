"use client";

import { useState } from "react";

const MISSIONS = [
  {
    id: "daily_life",
    label: "Daily Life",
    icon: "🏡",
    desc: "Percakapan sehari-hari — mengobrol dengan teman, keluarga, atau tetangga",
    grammar: "present simple/continuous, past simple, question formation, pronouns",
  },
  {
    id: "travel",
    label: "Travel",
    icon: "✈️",
    desc: "Situasi di bandara, hotel, memesan makanan, dan bertanya arah di luar negeri",
    grammar: "modal verbs, future tense, prepositions of place, polite requests",
  },
  {
    id: "interview",
    label: "Job Interview / Professional",
    icon: "💼",
    desc: "Wawancara kerja, email formal, dan komunikasi di lingkungan kantor",
    grammar: "present perfect, past simple, comparative/superlative, formal tone",
  },
];

interface Props {
  onSelect: (goal: string) => void;
}

export default function MissionSelect({ onSelect }: Props) {
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (!selected || loading) return;
    setLoading(true);
    await onSelect(selected);
    setLoading(false);
  };

  return (
    <div className="animate-slide-fade flex flex-col items-center py-[14px]">
      <div className="text-center mb-[18px]">
        <div className="text-[38px] mb-[6px]">🎯</div>
        <h2 className="text-[22px] font-extrabold text-ink m-0">Pilih Topik Belajar</h2>
        <p className="text-[12.5px] text-ink-dim mt-[5px] max-w-[400px] mx-auto leading-[1.5]">
          Topik yang kamu pilih akan menentukan konteks skenario latihan. Kamu bisa ganti nanti.
        </p>
      </div>

      <div className="flex flex-col gap-[10px] w-full max-w-[480px]">
        {MISSIONS.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            className={`text-left p-[16px] rounded-[16px] border-2 transition-all duration-200 cursor-pointer ${
              selected === m.id
                ? "bg-[#eef3ff] border-[#4a6fb5] shadow-[0_4px_16px_rgba(49,89,199,0.12)]"
                : "bg-white border-[#e2e8f4] hover:border-[#a8bde8] hover:bg-[#fafbff]"
            }`}
          >
            <div className="flex items-start gap-[12px]">
              <div className="text-[28px] shrink-0 mt-[2px]">{m.icon}</div>
              <div className="min-w-0">
                <div className="font-extrabold text-[14px] text-ink">{m.label}</div>
                <div className="text-[11.5px] text-ink-dim mt-[3px] leading-[1.4]">{m.desc}</div>
                <div className="mt-[6px] flex flex-wrap gap-[4px]">
                  {m.grammar.split(", ").map((g) => (
                    <span
                      key={g}
                      className="inline-block bg-[#f0f4ff] text-[#4a6fb5] text-[9.5px] font-semibold px-[7px] py-[2px] rounded-[6px]"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleStart}
        disabled={!selected || loading}
        className={`mt-[18px] w-full max-w-[480px] py-[14px] rounded-[14px] text-[14px] font-extrabold tracking-[.02em] transition-all duration-200 border-none cursor-pointer ${
          selected
            ? "bg-[#4a6fb5] text-white shadow-[0_6px_20px_rgba(49,89,199,0.25)] hover:bg-[#3d5fa3]"
            : "bg-[#d0d8e8] text-white/70 cursor-not-allowed"
        }`}
      >
        {loading ? "Memuat..." : selected ? "Mulai Learning Session →" : "Pilih topik terlebih dahulu"}
      </button>
    </div>
  );
}
