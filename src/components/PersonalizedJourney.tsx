"use client";

interface Props {
  district: string;
  overallMastery: number;
  rank: string;
  onStartJourney: () => void;
}

export default function PersonalizedJourney({ district, overallMastery, rank, onStartJourney }: Props) {
  const districtIcon: Record<string, string> = {
    "Travel District": "✈️",
    "Student District": "📚",
    "Workplace District": "💼",
    "Interview District": "🎤",
    "Presentation District": "📊",
  };

  const icon = districtIcon[district] || "🗺️";

  return (
    <div className="animate-slide-fade max-w-[650px] mx-auto">
      <div className="text-center mb-[20px]">
        <div className="text-[40px] mb-[4px]">🗺️</div>
        <h2 className="text-[22px] font-extrabold text-gold m-0">Your Personalized Journey</h2>
        <p className="text-[12px] text-ink-dim mt-[4px]">Built based on your assessment results</p>
      </div>

      {/* District card */}
      <div className="bg-navy-card border border-line rounded-[16px] p-[20px] text-center mb-[16px]">
        <div className="text-[48px] mb-[8px]">{icon}</div>
        <h3 className="text-[18px] font-extrabold text-white m-0">{district}</h3>
        <p className="text-[12px] text-ink-dim mt-[4px]">
          {district === "Travel District" && "Master travel phrases, directions, and ordering food"}
          {district === "Student District" && "Focus on academic writing, articles, and passive voice"}
          {district === "Workplace District" && "Business emails, meetings, and professional communication"}
          {district === "Interview District" && "Interview questions, answers, and professional talk"}
          {district === "Presentation District" && "Structuring presentations and public speaking"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-[12px] mb-[20px]">
        <div className="bg-navy-card border border-line rounded-[12px] p-[14px] text-center">
          <div className="text-[24px] font-black text-gold">{overallMastery}%</div>
          <div className="text-[11px] text-ink-dim">Grammar Mastery</div>
        </div>
        <div className="bg-navy-card border border-line rounded-[12px] p-[14px] text-center">
          <div className="text-[16px] font-black text-gold-light">{rank}</div>
          <div className="text-[11px] text-ink-dim">Current Rank</div>
        </div>
      </div>

      {/* Roadmap preview */}
      <div className="bg-navy-card border border-line rounded-[16px] p-[18px] mb-[20px]">
        <h4 className="text-[13px] font-bold text-white m-0 mb-[10px]">Your Roadmap</h4>
        <div className="flex items-center gap-[8px] text-[12px]">
          <span className="bg-[rgba(60,177,95,.2)] text-[#3cb15f] px-[10px] py-[4px] rounded-[8px] font-bold">{district}</span>
          <span className="text-ink-dim">→</span>
          <span className="text-ink-dim">Next District</span>
          <span className="text-ink-dim">→</span>
          <span className="text-gold-light font-bold">Graduation 🎓</span>
        </div>
      </div>

      <button
        onClick={onStartJourney}
        className="mx-auto block bg-green-btn-grad text-white border-none px-[36px] py-[12px] rounded-[12px] font-extrabold text-[14px] cursor-pointer transition-transform duration-[0.15s] hover:translate-y-[-2px]"
      >
        Start Journey 🚗
      </button>
    </div>
  );
}
