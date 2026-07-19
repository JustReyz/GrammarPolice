"use client";

import RobotOfficer from "./RobotOfficer";

interface Props {
  overallMastery: number;
  rank: string;
  categories: { name: string; score: number }[];
  district: string;
  correctCount?: number;
  totalQuestions?: number;
  weakCategories?: string[];
  onContinue: () => void;
}

export default function AnalysisScreen({
  overallMastery,
  rank,
  categories,
  district,
  correctCount,
  totalQuestions = 15,
  weakCategories = [],
  onContinue,
}: Props) {
  return (
    <div className="animate-slide-fade">
      <div className="flex flex-col items-center mb-[14px]">
        <RobotOfficer size="large" />
        <h3 className="text-[16px] font-extrabold text-gold mt-[8px] m-0">Analisis AI Selesai</h3>
        <p className="text-[11.5px] text-ink-dim mt-[3px]">Assessment kamu sudah dievaluasi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px] max-w-[700px] mx-auto">
        {/* Overall Score */}
        <div className="bg-navy-card border border-line rounded-[14px] p-[14px] text-center">
          <div className="text-[30px] font-black text-gold">{overallMastery}%</div>
          <div className="text-[11px] text-ink-dim mt-[3px]">Overall Mastery</div>
          {correctCount !== undefined && (
            <div className="text-[10.5px] text-ink-dim mt-[2px]">
              {correctCount}/{totalQuestions} soal benar
            </div>
          )}
          <div className="mt-[6px] inline-block bg-[rgba(74,111,181,0.1)] text-[#4a6fb5] px-[14px] py-[3px] rounded-[16px] text-[11px] font-bold">
            {rank}
          </div>
        </div>

        {/* Category Scores */}
        <div className="bg-navy-card border border-line rounded-[14px] p-[14px]">
          <h4 className="text-[12px] font-bold text-ink m-0 mb-[6px]">Skor per Kategori</h4>
          {categories.map((c) => (
            <div key={c.name} className="flex items-center gap-[6px] mb-[5px]">
              <span className="text-[10.5px] text-ink-dim w-[90px] truncate">{formatCat(c.name)}</span>
              <div className="flex-1 h-[5px] rounded-full bg-[#eef1f8] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-[0.6s] ${
                    c.score === 100 ? "bg-[#4caf50]" : c.score >= 50 ? "bg-gold" : "bg-[#f16363]"
                  }`}
                  style={{ width: `${c.score}%` }}
                />
              </div>
              <span className={`text-[10.5px] font-bold w-[28px] text-right ${
                c.score === 100 ? "text-[#4caf50]" : "text-gold"
              }`}>{c.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weak areas notification */}
      {weakCategories.length > 0 && (
        <div className="text-center mt-[12px] mb-[8px] max-w-[600px] mx-auto">
          <div className="bg-[rgba(241,99,99,0.08)] border border-[rgba(241,99,99,0.2)] rounded-[10px] px-[14px] py-[8px] text-[11.5px] text-[#c62828]">
            ⚠️ Area lemah terdeteksi: <b>{weakCategories.map(formatCat).join(", ")}</b>
            — akan diprioritaskan di gate awal.
          </div>
        </div>
      )}

      <div className="text-center mt-[12px] mb-[16px] max-w-[600px] mx-auto">
        <div className="bg-[rgba(74,111,181,0.08)] border border-[rgba(74,111,181,0.2)] rounded-[10px] px-[14px] py-[10px] text-[12px] text-[#2f57c7]">
          Grammar Passport kamu sudah siap.
          Kamu akan memulai sebagai <b className="text-gold">{rank}</b>.
        </div>
      </div>

      <button
        onClick={onContinue}
        className="mx-auto block w-full max-w-[600px] bg-[#4a6fb5] text-white border-none px-[28px] py-[12px] rounded-[14px] font-extrabold text-[13px] cursor-pointer transition-all duration-200 hover:bg-[#3d5fa3] shadow-[0_6px_20px_rgba(49,89,199,0.25)]"
      >
        Lihat Grammar Passport →
      </button>
    </div>
  );
}

function formatCat(name: string): string {
  const customNames: Record<string, string> = {
    tenses: "Tenses",
    subject_verb_agreement: "Subject-Verb Agreement",
    articles: "Articles",
    prepositions: "Prepositions",
    word_order_question_formation: "Word Order",
    plural_singular_countable_uncountable: "Countable/Uncountable",
    pronouns: "Pronouns",
    modal_verbs: "Modal Verbs",
    comparative_superlative: "Comparative/Superlative"
  };
  return customNames[name] || name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
