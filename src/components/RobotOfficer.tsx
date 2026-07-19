"use client";

interface RobotOfficerProps {
  size?: "small" | "large";
}

export default function RobotOfficer({ size = "small" }: RobotOfficerProps) {
  const sizeClasses =
    size === "large" ? "w-[120px] h-[172px]" : "w-16 h-[92px]";

  return (
    <div
      className={`relative ${sizeClasses} animate-robot-bob drop-shadow-[0_10px_16px_rgba(19,33,61,0.16)]`}
    >
      {/* Cap */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[26%] bg-[#cad6ef] rounded-[50%_50%_10px_10px_/_60%_60%_10px_10px] border-b-3 border-gold">
        <div className="absolute left-1/2 top-[18%] -translate-x-1/2 w-[22%] h-[22%] rounded-full bg-gold shadow-[0_0_0_4px_rgba(242,201,76,0.18)]" />
      </div>
      {/* Head */}
      <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[78%] h-[38%] bg-[#f8faff] rounded-[22px] border-2 border-[#9aa8c6]">
        <div className="absolute top-[38%] left-[16%] w-[22%] h-[22%] rounded-full bg-[#1e293b]">
          <div className="absolute inset-[22%] rounded-full bg-masthead-sub shadow-[0_0_8px_rgba(49,89,199,0.55)] animate-blink-glow" />
        </div>
        <div className="absolute top-[38%] right-[16%] w-[22%] h-[22%] rounded-full bg-[#1e293b]">
          <div className="absolute inset-[22%] rounded-full bg-masthead-sub shadow-[0_0_8px_rgba(49,89,199,0.55)] animate-blink-glow" />
        </div>
      </div>
      {/* Arms */}
      <div className="absolute bottom-[20%] left-[2%] w-[14%] h-[34%] bg-[#a8b6d6] rounded-[8px] rotate-[12deg]" />
      <div className="absolute bottom-[20%] right-[2%] w-[14%] h-[34%] bg-[#a8b6d6] rounded-[8px] animate-wave-arm" />
      {/* Body */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[88%] h-[42%] bg-[#dfe8ff] rounded-[16px_16px_10px_10px] border-2 border-[#9aa8c6]">
        <div className="absolute bottom-[38%] left-1/2 -translate-x-1/2 w-[26%] h-[16%] rounded-[4px] bg-gold" />
      </div>
    </div>
  );
}
