"use client";

import RobotOfficer from "./RobotOfficer";

interface GateSceneProps {
  title?: string;
  gateOpen?: boolean;
  showBubble?: string | null;
  categoryLabel?: string;
}

export default function GateScene({
  title = "GRAMMAR POLICE",
  gateOpen = false,
  showBubble = null,
  categoryLabel = "PRESENT TENSE",
}: GateSceneProps) {
  return (
    <div className="relative w-full max-w-[680px] rounded-[24px] overflow-hidden min-h-[280px] bg-scene-sky border border-line shadow-[0_16px_30px_rgba(19,33,61,0.12)] mb-[14px]">
      {/* Hills */}
      <div className="absolute w-[180px] h-[180px] rounded-full bg-[#bdd0ff] opacity-80 -left-[50px] bottom-[32%]" />
      <div className="absolute w-[180px] h-[180px] rounded-full bg-[#a9c0ff] opacity-80 -right-[60px] bottom-[34%]" />

      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-[38%] bg-scene-road" />

      {/* Lane markings */}
      <div className="absolute bottom-[14%] left-[8%] right-[8%] h-0 border-t-[4px] border-dashed border-lane-stripe opacity-75" />

      {/* Gate towers */}
      <div className="absolute bottom-[16%] left-[14%] w-[28px] h-[34%] bg-tower-grad rounded-[8px] border border-[rgba(19,33,61,0.08)] before:content-[''] before:absolute before:-top-[14px] before:-left-[10px] before:-right-[10px] before:h-[16px] before:bg-tower-top-grad before:rounded-[6px] before:border before:border-[rgba(19,33,61,0.08)]" />
      <div className="absolute bottom-[16%] right-[14%] w-[28px] h-[34%] bg-tower-grad rounded-[8px] border border-[rgba(19,33,61,0.08)] before:content-[''] before:absolute before:-top-[14px] before:-left-[10px] before:-right-[10px] before:h-[16px] before:bg-tower-top-grad before:rounded-[6px] before:border before:border-[rgba(19,33,61,0.08)]" />

      {/* Gate sign */}
      <div className="absolute top-[6%] left-1/2 -translate-x-1/2 bg-gate-sign-bg border border-line text-ink px-[18px] py-[8px] rounded-[18px] font-extrabold text-[12px] tracking-[1px] text-center shadow-[0_10px_20px_rgba(19,33,61,0.12)]">
        <small className="block text-[9px] text-masthead-sub tracking-[2px] font-black">
          {categoryLabel}
        </small>
        {title}
      </div>

      {/* Barrier */}
      <div
        className={`absolute bottom-[24.5%] left-1/2 -translate-x-1/2 w-[180px] h-[10px] bg-red rounded-[999px] border-2 border-[#13213d] shadow-[0_4px_10px_rgba(19,33,61,0.18)] transition-all duration-[0.9s] ease-[cubic-bezier(.5,-0.2,.4,1.3)] z-[5] origin-left ${
          gateOpen
            ? "translate-x-[-50%] translate-y-[-46px] rotate-[-72deg]"
            : ""
        }`}
      />

      {/* Car */}
      <div className="absolute bottom-[6%] left-[14%] w-[96px] h-[46px] animate-car-idle">
        <div className="absolute bottom-[10px] left-0 right-0 h-[26px] bg-masthead-sub rounded-[12px_12px_6px_6px]" />
        <div className="absolute bottom-[24px] left-[16px] right-[22px] h-[18px] bg-[#5c7fe6] rounded-[10px_10px_3px_3px]" />
        <div className="absolute bottom-[2px] left-[10px] w-[16px] h-[16px] rounded-full bg-[#13213d] border-[3px] border-[#8fa0c6]" />
        <div className="absolute bottom-[2px] right-[10px] w-[16px] h-[16px] rounded-full bg-[#13213d] border-[3px] border-[#8fa0c6]" />
      </div>

      {/* Officer */}
      <div className="absolute bottom-[5%] right-[8%] w-16">
        <RobotOfficer size="small" />
      </div>

      {/* Speech bubble */}
      {showBubble && (
        <div className="absolute top-[4%] right-[2%] w-[200px] animate-pop-in">
          <div className="relative bg-white text-ink rounded-[18px] px-3 py-2.5 text-[12px] leading-[1.4] font-semibold shadow-[0_10px_20px_rgba(19,33,61,0.12)] max-w-[230px] border border-line">
            {showBubble}
            <div className="absolute -bottom-[6px] left-[26px] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white" />
          </div>
        </div>
      )}
    </div>
  );
}
