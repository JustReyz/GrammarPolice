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
  const { screen, assessmentData, setScreen, setAssessmentData, startJourney, user, refreshUser } = useApp();

  const handleMissionSelect = async (goal: string) => {
    if (!user) return;
    const res = await fetch("/api/mission/select", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, goal }),
    });
    if (res.ok) {
      const resData = await res.json();
      const updatedDistrict = resData.district;
      await refreshUser();
      if (assessmentData) {
        setAssessmentData({
          ...assessmentData,
          district: updatedDistrict
        });
      }
      setScreen("personalized-journey");
    }
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

  // ─── Assessment: full-screen clean layout (matches reference) ───
  if (screen === "assessment") {
    return (
      <div className="min-h-screen w-full bg-white flex justify-center">
        <div className="w-full max-w-[520px] h-screen flex flex-col relative bg-white md:shadow-2xl md:border-x md:border-slate-100">
          <AssessmentChat onComplete={handleAssessmentComplete} />
        </div>
      </div>
    );
  }

  // ─── Post-assessment screens (analysis, passport, topic select, journey) ───
  if (screen === "mission-select" || (screen === "analysis" && data) || (screen === "passport" && data) || (screen === "personalized-journey" && data)) {
    const inner = () => {
      if (screen === "mission-select") return <MissionSelect onSelect={handleMissionSelect} />;
      if (screen === "analysis" && data) return <AnalysisScreen {...data} onContinue={() => setScreen("passport")} />;
      if (screen === "passport" && data) return <GrammarPassport {...data} onContinue={() => setScreen("mission-select")} />;
      if (screen === "personalized-journey" && data) return <PersonalizedJourney {...data} onStartJourney={handleStartJourney} />;
      return null;
    };
    return (
      <div className="min-h-screen w-full flex flex-col bg-white border-t-[2px] border-[#355cc6]">
        <div className="w-full max-w-[1280px] flex-1 bg-white relative mx-auto">
          <div className="flex h-full min-h-[calc(100vh-190px)]">
            <main className="flex-1 p-[18px] md:p-[24px] relative overflow-hidden">
              {inner()}
            </main>
          </div>
        </div>
        <footer className="w-full max-w-[1280px] text-center mt-[12px] pb-[14px] text-[10.5px] text-white/85 mx-auto">
          Grammar Police Academy
        </footer>
      </div>
    );
  }

  return <GameScreen />;
}
