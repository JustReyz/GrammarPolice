"use client";

interface Props {
  district: string;
  overallMastery: number;
  rank: string;
  onStartJourney: () => void;
}

const TOPIC_META: Record<string, { icon: string; name: string; desc: string; grammar: string[] }> = {
  "Daily Life District": {
    icon: "🏡",
    name: "Daily Life",
    desc: "Percakapan sehari-hari — mengobrol dengan teman, keluarga, atau tetangga.",
    grammar: ["present simple/continuous", "past simple", "question formation", "pronouns"],
  },
  "Travel District": {
    icon: "✈️",
    name: "Travel",
    desc: "Situasi di bandara, hotel, memesan makanan, dan bertanya arah di luar negeri.",
    grammar: ["modal verbs", "future tense", "prepositions of place", "polite requests"],
  },
  "Interview District": {
    icon: "💼",
    name: "Job Interview / Professional",
    desc: "Wawancara kerja, email formal, dan komunikasi di lingkungan kantor.",
    grammar: ["present perfect", "past simple", "comparative/superlative", "formal tone"],
  },
};

export default function PersonalizedJourney({ district, overallMastery, rank, onStartJourney }: Props) {
  const meta = TOPIC_META[district] || { icon: "🗺️", name: district, desc: "", grammar: [] };

  return (
    <div className="animate-slide-fade max-w-[600px] mx-auto">
      <div className="text-center mb-[14px]">
        <div className="text-[34px] mb-[3px]">🗺️</div>
        <h2 className="text-[20px] font-extrabold text-gold m-0">Perjalanan Personalmu</h2>
        <p className="text-[11px] text-ink-dim mt-[3px]">Dibuat berdasarkan hasil asesmen</p>
      </div>

      {/* District card */}
      <div className="bg-navy-card border border-line rounded-[16px] p-[16px] text-center mb-[12px]">
        <div className="text-[40px] mb-[6px]">{meta.icon}</div>
        <h3 className="text-[16px] font-extrabold text-ink m-0">{meta.name}</h3>
        <p className="text-[11px] text-ink-dim mt-[3px] max-w-[360px] mx-auto">{meta.desc}</p>
        {meta.grammar.length > 0 && (
          <div className="mt-[8px] flex flex-wrap justify-center gap-[4px]">
            {meta.grammar.map((g) => (
              <span
                key={g}
                className="inline-block bg-[#f0f4ff] text-[#4a6fb5] text-[9.5px] font-semibold px-[7px] py-[2px] rounded-[6px]"
              >
                {g}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-[10px] mb-[16px]">
        <div className="bg-navy-card border border-line rounded-[10px] p-[12px] text-center">
          <div className="text-[22px] font-black text-gold">{overallMastery}%</div>
          <div className="text-[10.5px] text-ink-dim">Grammar Mastery</div>
        </div>
        <div className="bg-navy-card border border-line rounded-[10px] p-[12px] text-center">
          <div className="text-[14px] font-black text-gold leading-tight">{rank}</div>
          <div className="text-[10.5px] text-ink-dim">Starting Tier</div>
        </div>
      </div>

      {/* Roadmap preview */}
      <div className="bg-navy-card border border-line rounded-[14px] p-[14px] mb-[16px]">
        <h4 className="text-[12px] font-bold text-ink m-0 mb-[8px]">Roadmap Belajar</h4>
        <div className="flex items-center gap-[6px] text-[11px] flex-wrap">
          <span className="bg-[rgba(74,111,181,0.1)] text-[#4a6fb5] px-[8px] py-[3px] rounded-[7px] font-bold">{meta.name}</span>
          <span className="text-ink-dim">→</span>
          <span className="text-ink-dim">10 Gate</span>
          <span className="text-ink-dim">→</span>
          <span className="text-gold font-bold">Graduation 🎓</span>
        </div>
        <p className="text-[10px] text-ink-dim mt-[6px] leading-[1.4]">
          Setiap gate berisi 10–15 soal kontekstual. Tingkat kesulitan akan menyesuaikan secara adaptif berdasarkan performamu.
        </p>
      </div>

      <button
        onClick={onStartJourney}
        className="mx-auto block w-full max-w-[600px] bg-[#4a6fb5] text-white border-none px-[28px] py-[12px] rounded-[14px] font-extrabold text-[13px] cursor-pointer transition-all duration-200 hover:bg-[#3d5fa3] shadow-[0_6px_20px_rgba(49,89,199,0.25)]"
      >
        Mulai Perjalanan 🚗
      </button>
    </div>
  );
}
