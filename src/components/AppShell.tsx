"use client";

import { useApp } from "@/lib/AppContext";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import GameScreen from "./GameScreen";
import MissionSelect from "./MissionSelect";
import AssessmentChat from "./AssessmentChat";
import AnalysisScreen from "./AnalysisScreen";
import GrammarPassport from "./GrammarPassport";
import PersonalizedJourney from "./PersonalizedJourney";

export default function AppShell() {
  const { screen, assessmentData, setScreen, setAssessmentData, startJourney } = useApp();

  const handleMissionSelect = async (goal: string) => {
    const res = await fetch("/api/mission/select", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: 1, goal }),
    });
    if (res.ok) setScreen("assessment");
  };

  const handleAssessmentComplete = (data: any) => {
    setAssessmentData(data);
    setScreen("analysis");
  };

  const handleStartJourney = () => {
    startJourney();
  };

  const data = assessmentData;

  if (screen === "login") return <LoginScreen />;
  if (screen === "home") return <HomeScreen />;
  if (screen === "mission-select" || screen === "assessment" || (screen === "analysis" && data) || (screen === "passport" && data) || (screen === "personalized-journey" && data)) {
    const inner = () => {
      if (screen === "mission-select") return <MissionSelect onSelect={handleMissionSelect} />;
      if (screen === "assessment") return <AssessmentChat onComplete={handleAssessmentComplete} />;
      if (screen === "analysis" && data) return <AnalysisScreen {...data} onContinue={() => setScreen("passport")} />;
      if (screen === "passport" && data) return <GrammarPassport {...data} onContinue={() => setScreen("personalized-journey")} />;
      if (screen === "personalized-journey" && data) return <PersonalizedJourney {...data} onStartJourney={handleStartJourney} />;
      return null;
    };
    return (
      <>
        <header className="w-full max-w-[1040px] text-center mb-[18px] mx-auto">
          <h1 className="text-[clamp(22px,4vw,38px)] tracking-[2px] m-0 font-extrabold [text-shadow:0_2px_0_rgba(0,0,0,0.3)]">
            <span className="inline-block drop-shadow-[0_2px_4px_rgba(0,0,0,.4)] animate-spin-star">🛡️</span>{" "}
            <span className="text-white">GRAMMAR</span>{" "}
            <span className="text-gold">POLICE</span>{" "}
            <span className="inline-block drop-shadow-[0_2px_4px_rgba(0,0,0,.4)] animate-spin-star">🛡️</span>
          </h1>
          <div className="mt-[10px] inline-block bg-masthead-sub text-white px-[22px] py-[7px] rounded-[20px] text-[13px] font-semibold tracking-[.4px] shadow-green-glow">
            Police Academy Assessment
          </div>
        </header>
        <div className="w-full max-w-[1040px] bg-frame-bg border border-line rounded-[22px] shadow-app overflow-hidden relative mx-auto">
          <div className="flex min-h-[520px]">
            <main className="flex-1 p-[26px_26px_30px] relative overflow-hidden">
              {inner()}
            </main>
          </div>
        </div>
        <footer className="w-full max-w-[1040px] text-center mt-[16px] text-[11.5px] text-ink-dim mx-auto">
          Grammar Police — Police Academy
        </footer>
      </>
    );
  }

  return <GameScreen />;
}
