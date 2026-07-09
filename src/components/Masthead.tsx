export default function Masthead() {
  return (
    <header className="w-full max-w-[1040px] text-center mb-[18px]">
      <h1 className="text-[clamp(22px,4vw,38px)] tracking-[2px] m-0 font-extrabold [text-shadow:0_2px_0_rgba(0,0,0,0.3)]">
        <span className="inline-block drop-shadow-[0_2px_4px_rgba(0,0,0,.4)] animate-spin-star">
          🛡️
        </span>{" "}
        <span className="text-white">STORYBOARD</span>{" "}
        <span className="text-gold">GRAMMAR POLICE</span>{" "}
        <span className="inline-block drop-shadow-[0_2px_4px_rgba(0,0,0,.4)] animate-spin-star">
          🛡️
        </span>
      </h1>
      <div className="mt-[10px] inline-block bg-masthead-sub text-white px-[22px] py-[7px] rounded-[20px] text-[13px] font-semibold tracking-[.4px] shadow-green-glow">
        Conversation Simulation • Contextual Evaluation • AI-Powered Adaptive
                Learning
      </div>
    </header>
  );
}
