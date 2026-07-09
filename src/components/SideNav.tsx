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
    <nav className="w-[150px] bg-[rgba(0,0,0,0.18)] border-r border-line px-[10px] py-[16px] flex flex-col gap-[4px] max-md:hidden">
      {items.map((item) => (
        <div
          key={item.label}
          onClick={() => onNavClick?.(item.label)}
          className={`flex items-center gap-[10px] px-[10px] py-[10px] rounded-[10px] text-[12.5px] font-semibold ${
            item.label === activeItem
              ? "bg-[linear-gradient(90deg,rgba(47,111,237,.35),rgba(47,111,237,.08))] text-white shadow-[inset_3px_0_0_#5b8dff] cursor-default"
              : "text-ink-dim cursor-pointer hover:bg-[rgba(255,255,255,0.05)]"
          }`}
        >
          <span className="w-[20px] text-center">{item.icon}</span>
          {item.label}
        </div>
      ))}
    </nav>
  );
}
