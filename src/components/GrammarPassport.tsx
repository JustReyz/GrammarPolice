"use client";

interface Props {
  overallMastery: number;
  rank: string;
  categories: { name: string; score: number }[];
  district: string;
  correctCount?: number;
  totalQuestions?: number;
  correctPct?: number;
  weakCategories?: string[];
  onContinue: () => void;
}

const TIER_DESCRIPTIONS: Record<string, string> = {
  "Rookie / Pemula": "Mulai dari gate paling dasar; seluruh kategori grammar diperkenalkan ulang.",
  "Trainee / Mulai Mahir": "Mulai dari gate menengah-bawah; fokus pada kategori yang salah.",
  "Officer / Mahir": "Mulai dari gate menengah-atas; remedial hanya pada kategori spesifik.",
  "Senior Officer / Sangat Mahir": "Langsung ke gate lanjutan/kontekstual; assessment berfungsi sebagai validasi.",
};

const TIER_COLORS: Record<string, string> = {
  "Rookie / Pemula": "bg-[#fff3e0] text-[#e65100] border-[#ffcc80]",
  "Trainee / Mulai Mahir": "bg-[#e3f2fd] text-[#1565c0] border-[#90caf9]",
  "Officer / Mahir": "bg-[#e8f5e9] text-[#2e7d32] border-[#a5d6a7]",
  "Senior Officer / Sangat Mahir": "bg-[#fce4ec] text-[#c62828] border-[#ef9a9a]",
};

export default function GrammarPassport({
  overallMastery,
  rank,
  categories,
  district,
  correctCount,
  totalQuestions = 15,
  weakCategories = [],
  onContinue,
}: Props) {
  const tierDesc = TIER_DESCRIPTIONS[rank] || "";
  const tierColor = TIER_COLORS[rank] || "bg-[#f0f4ff] text-[#4a6fb5] border-[#a8bde8]";

  return (
    <div className="animate-slide-fade max-w-[560px] mx-auto">
      <div className="text-center mb-[14px]">
        <div className="text-[40px] mb-[3px]">🛂</div>
        <h2 className="text-[20px] font-extrabold text-gold m-0">Grammar Passport</h2>
        <p className="text-[11px] text-ink-dim mt-[3px]">Profil grammar pribadi Anda</p>
      </div>

      {/* Passport card */}
      <div className="bg-white border border-line rounded-[24px] p-[20px] shadow-[0_14px_32px_rgba(19,33,61,.12)]">
        <div className="flex items-center gap-[12px] border-b border-line pb-[10px] mb-[10px]">
          <div className="w-[50px] h-[50px] rounded-full bg-gold flex items-center justify-center text-[20px] font-black text-[#13213d]">
            🛡️
          </div>
          <div>
            <div className="text-[16px] font-black text-ink">Grammar Police</div>
            <div className="text-[10.5px] text-masthead-sub font-semibold">{rank}</div>
          </div>
        </div>

        {/* Score summary */}
        <div className="text-center mb-[10px]">
          <div className="text-[36px] font-black text-masthead-sub leading-none">{overallMastery}%</div>
          <div className="text-[10.5px] text-ink-dim mt-[3px]">
            Overall Mastery
            {correctCount !== undefined && (
              <span className="ml-[6px]">
                ({correctCount}/{totalQuestions} benar)
              </span>
            )}
          </div>
        </div>

        {/* Tier badge */}
        <div className={`text-center mb-[10px] mx-auto max-w-[400px] rounded-[12px] border px-[14px] py-[8px] ${tierColor}`}>
          <div className="text-[12px] font-extrabold">{rank}</div>
          {tierDesc && <div className="text-[10px] mt-[2px] opacity-80">{tierDesc}</div>}
        </div>

        {/* Category scores */}
        <div className="space-y-[6px]">
          {categories.map((c) => (
            <div key={c.name} className="flex items-center gap-[8px]">
              <span className="text-[11px] text-ink-dim w-[100px] truncate">{formatCat(c.name)}</span>
              <div className="flex-1 h-[7px] rounded-full bg-[#eef1f8] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-[0.6s] ${
                    c.score === 100 ? "bg-[#4caf50]" : c.score >= 50 ? "bg-gold" : "bg-[#f16363]"
                  }`}
                  style={{ width: `${c.score}%` }}
                />
              </div>
              <span className={`text-[11px] font-bold w-[28px] text-right ${
                c.score === 100 ? "text-[#4caf50]" : c.score >= 50 ? "text-gold" : "text-[#f16363]"
              }`}>{c.score}</span>
            </div>
          ))}
        </div>

        {/* Weak categories */}
        {weakCategories.length > 0 && (
          <div className="mt-[10px] border-t border-line pt-[10px]">
            <div className="text-[10.5px] text-ink-dim mb-[4px] font-semibold">⚠️ Area yang perlu ditingkatkan:</div>
            <div className="flex flex-wrap gap-[4px]">
              {weakCategories.map((w) => (
                <span
                  key={w}
                  className="inline-block bg-[#ffeef0] text-[#c62828] text-[9.5px] font-semibold px-[7px] py-[2px] rounded-[6px] border border-[#ef9a9a]"
                >
                  {formatCat(w)}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-[10px] text-center text-[10.5px] text-ink-dim border-t border-line pt-[10px]">
          Starting Point: <span className="text-gold font-bold">{district}</span>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="mx-auto mt-[14px] block w-full max-w-[560px] bg-[#4a6fb5] text-white border-none px-[28px] py-[12px] rounded-[14px] font-extrabold text-[13px] cursor-pointer transition-all duration-200 hover:bg-[#3d5fa3] shadow-[0_6px_20px_rgba(49,89,199,0.25)]"
      >
        Pilih Topik Belajar →
      </button>
    </div>
  );
}

function formatCat(name: string): string {
  const customNames: Record<string, string> = {
    tenses: "Tenses",
    subject_verb_agreement: "Subject-Verb Agreement",
    articles: "Articles (a/an/the)",
    prepositions: "Prepositions",
    word_order_question_formation: "Word Order / Question Formation",
    plural_singular_countable_uncountable: "Countable/Uncountable Nouns",
    pronouns: "Pronouns",
    modal_verbs: "Modal Verbs",
    comparative_superlative: "Comparative/Superlative"
  };
  return customNames[name] || name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
