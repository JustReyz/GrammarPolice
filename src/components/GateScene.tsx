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
    <div className="relative rounded-[16px] overflow-hidden min-h-[300px] bg-scene-sky border border-[rgba(255,255,255,0.12)] shadow-[0_10px_26px_rgba(0,0,0,0.35)] mb-[18px]">
      {/* Hills */}
      <div className="absolute w-[220px] h-[220px] rounded-full bg-[#3a7a4d] opacity-70 -left-[60px] bottom-[32%]" />
      <div className="absolute w-[220px] h-[220px] rounded-full bg-[#357048] opacity-70 -right-[70px] bottom-[34%]" />

      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-[38%] bg-scene-road" />

      {/* Lane markings */}
      <div className="absolute bottom-[14%] left-0 right-0 h-[6px] bg-lane-stripe animate-lane-move opacity-90" />

      {/* Gate towers */}
      <div className="absolute bottom-[16%] left-[14%] w-[26px] h-[34%] bg-tower-grad rounded-[4px] before:content-[''] before:absolute before:-top-[14px] before:-left-[9px] before:-right-[9px] before:h-[16px] before:bg-tower-top-grad before:rounded-[4px]" />
      <div className="absolute bottom-[16%] right-[14%] w-[26px] h-[34%] bg-tower-grad rounded-[4px] before:content-[''] before:absolute before:-top-[14px] before:-left-[9px] before:-right-[9px] before:h-[16px] before:bg-tower-top-grad before:rounded-[4px]" />

      {/* Gate sign */}
      <div className="absolute top-[6%] left-1/2 -translate-x-1/2 bg-gate-sign-bg border-2 border-gold text-gold px-[22px] py-[8px] rounded-[12px] font-extrabold text-[14px] tracking-[1px] text-center shadow-[0_8px_18px_rgba(0,0,0,0.35)]">
        <small className="block text-[9px] text-[#bfe8cd] tracking-[2px] font-semibold">
          {categoryLabel}
        </small>
        {title}
      </div>

      {/* Barrier */}
      <div
        className={`absolute bottom-[24.5%] left-1/2 -translate-x-1/2 w-[170px] h-[9px] bg-[repeating-linear-gradient(90deg,#e5455a_0_18px,#fff_18px_36px)] rounded-[5px] shadow-[0_3px_6px_rgba(0,0,0,0.4)] transition-all duration-[0.9s] ease-[cubic-bezier(.5,-0.2,.4,1.3)] z-[5] origin-left ${
          gateOpen
            ? "translate-x-[-50%] translate-y-[-46px] rotate-[-72deg]"
            : ""
        }`}
      />

      {/* Car */}
      <div className="absolute bottom-[6%] left-[14%] w-[96px] h-[46px] animate-car-idle">
        <div className="absolute bottom-[10px] left-0 right-0 h-[26px] bg-[linear-gradient(180deg,#3a6fd8,#1e4bb0)] rounded-[12px_12px_6px_6px]" />
        <div className="absolute bottom-[24px] left-[16px] right-[22px] h-[18px] bg-[linear-gradient(180deg,#5a8cf0,#3a6fd8)] rounded-[10px_10px_3px_3px]" />
        <div className="absolute bottom-[2px] left-[10px] w-[16px] h-[16px] rounded-full bg-[#111] border-[3px] border-[#333]" />
        <div className="absolute bottom-[2px] right-[10px] w-[16px] h-[16px] rounded-full bg-[#111] border-[3px] border-[#333]" />
      </div>

      {/* Officer */}
      <div className="absolute bottom-[5%] right-[8%] w-16">
        <RobotOfficer size="small" />
      </div>

      {/* Speech bubble */}
      {showBubble && (
        <div className="absolute top-[4%] right-[2%] w-[230px] animate-pop-in">
          <div className="relative bg-white text-[#1a2b45] rounded-[16px] px-4 py-3 text-[13.5px] leading-[1.4] font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.3)] max-w-[260px]">
            {showBubble}
            <div className="absolute -bottom-[8px] left-[26px] w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white" />
          </div>
        </div>
      )}
    </div>
  );
}
