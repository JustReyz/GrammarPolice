"use client";

interface RobotOfficerProps {
  size?: "small" | "large";
}

export default function RobotOfficer({ size = "small" }: RobotOfficerProps) {
  const sizeClasses =
    size === "large" ? "w-[120px] h-[172px]" : "w-16 h-[92px]";

  return (
    <div
      className={`relative ${sizeClasses} animate-robot-bob drop-shadow-[0_6px_8px_rgba(0,0,0,0.35)]`}
    >
      {/* Cap */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[26%] bg-[linear-gradient(180deg,#1c3a63,#102544)] rounded-[50%_50%_10px_10px_/_60%_60%_10px_10px] border-b-3 border-gold">
        <div className="absolute left-1/2 top-[18%] -translate-x-1/2 w-[22%] h-[22%] rounded-full bg-gold shadow-[0_0_6px_#f5c542]" />
      </div>
      {/* Head */}
      <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[78%] h-[38%] bg-[linear-gradient(160deg,#e8edf6,#c7d2e4)] rounded-[22px] border-2 border-[#a9b7cf]">
        <div className="absolute top-[38%] left-[16%] w-[22%] h-[22%] rounded-full bg-[#0d1f38]">
          <div className="absolute inset-[22%] rounded-full bg-[#4fd7ff] shadow-[0_0_8px_#4fd7ff] animate-blink-glow" />
        </div>
        <div className="absolute top-[38%] right-[16%] w-[22%] h-[22%] rounded-full bg-[#0d1f38]">
          <div className="absolute inset-[22%] rounded-full bg-[#4fd7ff] shadow-[0_0_8px_#4fd7ff] animate-blink-glow" />
        </div>
      </div>
      {/* Arms */}
      <div className="absolute bottom-[20%] left-[2%] w-[14%] h-[34%] bg-[#254a86] rounded-[8px] rotate-[12deg]" />
      <div className="absolute bottom-[20%] right-[2%] w-[14%] h-[34%] bg-[#254a86] rounded-[8px] animate-wave-arm" />
      {/* Body */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[88%] h-[42%] bg-[linear-gradient(160deg,#3760a8,#254a86)] rounded-[16px_16px_10px_10px] border-2 border-[#1c3a63]">
        <div className="absolute bottom-[38%] left-1/2 -translate-x-1/2 w-[26%] h-[16%] rounded-[4px] bg-gold" />
      </div>
    </div>
  );
}
