export default function Masthead() {
  return (
    <header className="w-full max-w-[1040px] text-center mb-[12px]">
      <h1 className="text-[clamp(20px,4vw,34px)] tracking-[1.4px] m-0 font-black text-white drop-shadow-[0_6px_18px_rgba(19,33,61,0.18)]">
        <span className="inline-block mr-[6px]">🛡️</span>
        GRAMMAR POLICE
        <span className="text-gold ml-[8px]">ACADEMY</span>
      </h1>
      <div className="mt-[8px] inline-flex items-center gap-[8px] bg-white text-ink px-[16px] py-[6px] rounded-[999px] text-[11.5px] font-bold tracking-[.2px] shadow-[0_10px_22px_rgba(19,33,61,0.12)]">
        <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-masthead-sub text-white text-[10px]">
          AI
        </span>
        Mission-based grammar learning with live scoring
      </div>
    </header>
  );
}
