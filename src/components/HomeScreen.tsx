"use client";

import { useState } from "react";
import { useApp } from "@/lib/AppContext";
import Masthead from "./Masthead";
import StatusBar from "./StatusBar";
import SideNav from "./SideNav";
import GateScene from "./GateScene";

export default function HomeScreen() {
  const { user, pulseKey, startJourney, logout } = useApp();
  const [navMsg, setNavMsg] = useState("");

  if (!user) return null;

  const handleNavClick = (label: string) => {
    if (label === "Journey") {
      startJourney();
      return;
    }
    setNavMsg(`${label} — coming soon!`);
    setTimeout(() => setNavMsg(""), 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white border-t-[2px] border-[#355cc6]">
      <div className="w-full max-w-[1280px] flex-1 bg-white relative mx-auto">
        <StatusBar
          level={user.level}
          xp={user.xp}
          xpMax={user.xp_max}
          stars={user.stars}
          coins={user.coins}
          hearts={user.hearts}
          rank={user.current_rank}
          pulseKey={pulseKey}
        />
        <div className="flex h-full min-h-[calc(100vh-190px)] relative">
          <SideNav activeItem="Journey" onNavClick={handleNavClick} />
          <main className="flex-1 p-[18px] md:p-[24px] relative overflow-hidden">
            <div className="animate-slide-fade flex flex-col items-center justify-center h-full min-h-[calc(100vh-238px)] text-center relative">
              <div
                className="inline-flex flex-col items-center bg-badge-bg border-2 border-line px-[42px] py-[16px] rounded-[24px] shadow-[0_16px_30px_rgba(19,33,61,.12)] animate-hero-pop"
                style={{
                  fontSize: "clamp(24px,4vw,42px)",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  color: "#13213d",
                  lineHeight: 1.05,
                }}
              >
                <small className="text-[10px] text-masthead-sub tracking-[2px] font-black mb-[6px]">
                  AI JUDGE • XP TRACKER • GRAMMAR QUEST
                </small>
                GRAMMAR
                <br />
                POLICE
              </div>
              <p className="text-ink-dim text-[13px] max-w-[420px] mt-[12px] leading-[1.55]">
                Ready to improve your grammar? Each mission feels like a game, and the
                AI scores your answers with instant feedback.
              </p>
              <button
                onClick={startJourney}
                className="mt-[18px] bg-masthead-sub text-white border-none px-[32px] py-[12px] rounded-[999px] text-[14px] font-extrabold tracking-[.4px] cursor-pointer shadow-green-btn transition-all duration-[0.18s] hover:translate-y-[-2px] hover:bg-[#2749a5] active:translate-y-0"
              >
                Start Mission →
              </button>
            </div>

            {/* Nav feedback toast */}
            {navMsg && (
              <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 bg-gold text-[#1e293b] px-[16px] py-[8px] rounded-[8px] text-[12px] font-bold animate-pop-in whitespace-nowrap">
                {navMsg}
              </div>
            )}
          </main>
        </div>
      </div>
      <footer className="w-full max-w-[1280px] flex justify-between items-center mt-[12px] pb-[14px] text-[10.5px] text-white/85 mx-auto px-[14px]">
        <span>
          Interactive grammar academy prototype
        </span>
        <button
          onClick={logout}
          className="bg-white/15 border border-white/20 text-white px-[10px] py-[4px] rounded-[999px] cursor-pointer text-[10.5px] hover:bg-white/20"
        >
          Logout ({user.username})
        </button>
      </footer>
    </div>
  );
}
