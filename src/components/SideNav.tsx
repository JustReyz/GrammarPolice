"use client";

interface SideNavProps {
  activeItem?: string;
  hidden?: boolean;
  onNavClick?: (label: string) => void;
}

const items = [
  { icon: "🧭", label: "Journey" },
  { icon: "🚗", label: "Garage" },
  { icon: "🏆", label: "Achievements" },
  { icon: "🎒", label: "Backpack" },
  { icon: "⚙️", label: "Settings" },
];

export default function SideNav({
  activeItem = "Journey",
  hidden = false,
  onNavClick,
}: SideNavProps) {
  if (hidden) return null;

  return (
    <nav className="w-[136px] bg-[rgba(255,255,255,0.55)] border-r border-line px-[8px] py-[12px] flex flex-col gap-[4px] max-md:hidden backdrop-blur-sm">
      {items.map((item) => (
        <div
          key={item.label}
          onClick={() => onNavClick?.(item.label)}
          className={`flex items-center gap-[8px] px-[10px] py-[10px] rounded-[14px] text-[11.5px] font-bold transition-colors ${
            item.label === activeItem
              ? "bg-masthead-sub text-white shadow-[0_8px_16px_rgba(49,89,199,0.18)] cursor-default"
              : "text-ink-dim cursor-pointer hover:bg-[rgba(19,33,61,0.05)]"
          }`}
        >
          <span className="w-[18px] text-center">{item.icon}</span>
          {item.label}
        </div>
      ))}
    </nav>
  );
}
