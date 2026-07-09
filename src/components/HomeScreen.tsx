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
    <>
      <Masthead />
      <div className="w-full max-w-[1040px] bg-frame-bg border border-line rounded-[22px] shadow-app overflow-hidden relative">
        <StatusBar
          level={user.level}
          xp={user.xp}
          xpMax={user.xp_max}
          stars={user.stars}
          coins={user.coins}
          hearts={user.hearts}
          pulseKey={pulseKey}
        />
        <div className="flex min-h-[520px] relative">
          <SideNav activeItem="Journey" onNavClick={handleNavClick} />
          <main className="flex-1 p-[26px_26px_30px] relative overflow-hidden">
            <div className="animate-slide-fade flex flex-col items-center justify-center min-h-[280px] text-center relative">
              <GateScene title="" showBubble={null} />
              <div
                className="mt-[-100px] inline-flex flex-col items-center bg-badge-bg border-3 border-gold px-[46px] py-[18px] rounded-[16px] shadow-[0_14px_30px_rgba(0,0,0,.4)] animate-hero-pop"
                style={{
                  fontSize: "clamp(30px,5vw,52px)",
                  fontWeight: 900,
                  letterSpacing: "1px",
                  color: "#f5c542",
                  textShadow:
                    "0 4px 0 #6b4e0c, 0 8px 16px rgba(0,0,0,.4)",
                  lineHeight: 1.05,
                }}
              >
                <small className="text-[12px] text-[#bfe8cd] tracking-[3px] font-bold mb-[4px]">
                  ★ ★ ★
                </small>
                GRAMMAR
                <br />
                POLICE
              </div>
              <p className="text-ink-dim text-[13px] max-w-[420px] mt-[14px]">
                Ready to improve your grammar? Let&apos;s hit the road — setiap
                gerbang menguji satu aturan tata bahasa lewat percakapan nyata.
              </p>
              <button
                onClick={startJourney}
                className="mt-[22px] bg-green-btn-grad text-white border-none px-[40px] py-[14px] rounded-[14px] text-[15px] font-extrabold tracking-[.5px] cursor-pointer shadow-green-btn transition-all duration-[0.18s] hover:translate-y-[-3px] hover:shadow-green-btn-hover active:translate-y-0"
              >
                Start Journey 🚗
              </button>
            </div>

            {/* Nav feedback toast */}
            {navMsg && (
              <div className="absolute bottom-[16px] left-1/2 -translate-x-1/2 bg-gold text-[#1a2b45] px-[20px] py-[10px] rounded-[10px] text-[13px] font-bold animate-pop-in whitespace-nowrap">
                {navMsg}
              </div>
            )}
          </main>
        </div>
      </div>
      <footer className="w-full max-w-[1040px] flex justify-between items-center mt-[16px] text-[11.5px] text-ink-dim">
        <span>
          Interactive prototype based on the 9-panel &quot;Grammar
                    Police&quot; storyboard
        </span>
        <button
          onClick={logout}
          className="bg-transparent border border-line text-ink-dim px-[12px] py-[4px] rounded-[8px] cursor-pointer text-[11px] hover:text-white"
        >
          Logout ({user.username})
        </button>
      </footer>
    </>
  );
}
