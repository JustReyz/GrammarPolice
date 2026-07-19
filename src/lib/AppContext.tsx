"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface UserData {
  id: number;
  username: string;
  level: number;
  xp: number;
  xp_max: number;
  stars: number;
  coins: number;
  hearts: number;
  correct_first_try: number;
  attempts: number;
  streak: number;
  mistake_tense: number;
  mistake_agreement: number;
  mistake_preposition: number;
  gates_cleared: number;
  gates_total: number;
  current_rank: string;
}

export interface GateData {
  id: number;
  type: "sentence" | "scramble" | "correction";
  title: string;
  npc_text: string | null;
  check_regex: string | null;
  correct_answer: string | null;
  prefix: string | null;
  sentence: string | null;
  correct_explain: string | null;
  wrong_explain: string | null;
  remedial_prompt: string | null;
  remedial_options: string | null;
  remedial_correct: string | null;
  category: string;
  sort_order: number;
}

type Screen =
  | "login"
  | "home"
  | "mission-select"
  | "assessment"
  | "analysis"
  | "passport"
  | "personalized-journey"
  | "gate"
  | "feedback-correct"
  | "feedback-wrong"
  | "remedial"
  | "ai-analyzing"
  | "adaptive"
  | "summary";

interface AssessmentData {
  overallMastery: number;
  rank: string;
  categories: { name: string; score: number }[];
  district: string;
}

interface AppState {
  user: UserData | null;
  screen: Screen;
  assessmentData: AssessmentData | null;
  gates: GateData[];
  currentGateIdx: number;
  lastUserAnswer: string;
  llmExplanation: string;
  llmCorrectedSentence: string | null;
  llmAdvice: string;
  pulseKey: string | null;
  sessionGatesCleared: number;
  sessionCorrectFirstTry: number;
  sessionAttempts: number;
  sessionHeartsLost: number;
  sessionMistakes: { tense: number; agreement: number; preposition: number };
}

interface AppContextType extends AppState {
  login: (username: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  setScreen: (screen: Screen) => void;
  setLlmExplanation: (text: string) => void;
  setAssessmentData: (data: AssessmentData) => void;
  setLlmCorrectedSentence: (text: string | null) => void;
  setLlmAdvice: (text: string) => void;
  startJourney: () => Promise<void>;
  goToGate: (idx?: number) => void;
  handleCorrect: (answer: string) => Promise<void>;
  handleWrong: (answer: string) => Promise<void>;
  nextGate: () => void;
  showAnalyzing: () => void;
  showSummary: () => void;
  completeSession: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [screen, setScreen] = useState<Screen>("login");
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [gates, setGates] = useState<GateData[]>([]);
  const [currentGateIdx, setCurrentGateIdx] = useState(0);
  const [lastUserAnswer, setLastUserAnswer] = useState("");
  const [llmExplanation, setLlmExplanation] = useState("");
  const [llmCorrectedSentence, setLlmCorrectedSentence] = useState<string | null>(null);
  const [llmAdvice, setLlmAdvice] = useState("");
  const [pulseKey, setPulseKey] = useState<string | null>(null);
  const [sessionGatesCleared, setSessionGatesCleared] = useState(0);
  const [sessionCorrectFirstTry, setSessionCorrectFirstTry] = useState(0);
  const [sessionAttempts, setSessionAttempts] = useState(0);
  const [sessionHeartsLost, setSessionHeartsLost] = useState(0);
  const [sessionMistakes, setSessionMistakes] = useState({
    tense: 0,
    agreement: 0,
    preposition: 0,
  });

  const resetSession = useCallback(() => {
    setSessionGatesCleared(0);
    setSessionCorrectFirstTry(0);
    setSessionAttempts(0);
    setSessionHeartsLost(0);
    setSessionMistakes({ tense: 0, agreement: 0, preposition: 0 });
  }, []);

  const login = useCallback(
    async (username: string) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setUser(data.user);
      resetSession();
      // Always start with diagnostic assessment
      setScreen("assessment");
    },
    [resetSession],
  );

  const logout = useCallback(() => {
    setUser(null);
    setScreen("login");
    setGates([]);
    setCurrentGateIdx(0);
    resetSession();
  }, [resetSession]);

  const refreshUser = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/user/${user.id}`);
      const data = await res.json();
      if (data.user) setUser(data.user);
    } catch (err) {
      console.error("Refresh user error:", err);
    }
  }, [user]);

  const startJourney = useCallback(async () => {
    if (!user) return;
    const res = await fetch(`/api/gates?userId=${user.id}`);
    const data = await res.json();
    setGates(data.gates);
    setCurrentGateIdx(0);
    resetSession();
    setScreen("gate");
  }, [user, resetSession]);

  const goToGate = useCallback(
    (idx?: number) => {
      const i = idx ?? currentGateIdx;
      if (i >= gates.length) {
        setScreen("ai-analyzing");
        return;
      }
      setCurrentGateIdx(i);
      setScreen("gate");
    },
    [currentGateIdx, gates.length],
  );

  const handleCorrect = useCallback(async (answer: string) => {
    setLastUserAnswer(answer);
    setSessionCorrectFirstTry((p) => p + 1);
    setSessionAttempts((p) => p + 1);
    setPulseKey("coin");

    // Update local user state immediately for real-time UI/progress feedback!
    setUser((prev) => {
      if (!prev) return null;
      let newXp = prev.xp + 20;
      let newLevel = prev.level;
      const newXpMax = prev.xp_max;
      if (newXp >= newXpMax) {
        newXp -= newXpMax;
        newLevel += 1;
      }
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        coins: prev.coins + 10,
        attempts: prev.attempts + 1,
        correct_first_try: prev.correct_first_try + 1,
      };
    });

    setSessionGatesCleared((p) => p + 1);
    setScreen("feedback-correct");
  }, []);

  const handleWrong = useCallback(
    async (answer: string) => {
      setLastUserAnswer(answer);
      setSessionAttempts((p) => p + 1);
      setSessionHeartsLost((p) => p + 1);

      const gate = gates[currentGateIdx];
      const category = gate?.category || "tense";
      setSessionMistakes((prev) => ({
        ...prev,
        tense: prev.tense + (category === "tense" ? 1 : 0),
        agreement: prev.agreement + (category === "agreement" ? 1 : 0),
        preposition: prev.preposition + (category === "preposition" ? 1 : 0),
      }));

      // Update local user state immediately for real-time heart reduction feedback!
      setUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          hearts: Math.max(0, prev.hearts - 1),
          attempts: prev.attempts + 1,
          mistake_tense: prev.mistake_tense + (category === "tense" ? 1 : 0),
          mistake_agreement: prev.mistake_agreement + (category === "agreement" ? 1 : 0),
          mistake_preposition: prev.mistake_preposition + (category === "preposition" ? 1 : 0),
        };
      });

      setPulseKey("heart");
      setScreen("feedback-wrong");
    },
    [currentGateIdx, gates],
  );

  const nextGate = useCallback(() => {
    const next = currentGateIdx + 1;
    if (next >= gates.length) {
      setScreen("ai-analyzing");
      return;
    }
    setCurrentGateIdx(next);
    setScreen("gate");
  }, [currentGateIdx, gates.length]);

  const showAnalyzing = useCallback(() => {
    setScreen("adaptive");
  }, []);

  const showSummary = useCallback(() => {
    setScreen("summary");
  }, []);

  const completeSession = useCallback(async () => {
    if (!user) return;

    const finalStreak = sessionHeartsLost > 0 ? 0 : user.streak + sessionCorrectFirstTry;

    await fetch(`/api/user/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        xp: user.xp,
        level: user.level,
        coins: user.coins,
        hearts: user.hearts,
        correct_first_try: user.correct_first_try,
        attempts: user.attempts,
        streak: finalStreak,
        mistake_tense: user.mistake_tense,
        mistake_agreement: user.mistake_agreement,
        mistake_preposition: user.mistake_preposition,
      }),
    });

    // Refresh user data
    const res = await fetch(`/api/user/${user.id}`);
    const data = await res.json();
    if (data.user) setUser(data.user);
  }, [
    user,
    sessionCorrectFirstTry,
    sessionHeartsLost,
  ]);

  return (
    <AppContext.Provider
      value={{
        user,
        screen,
        assessmentData,
        gates,
        currentGateIdx,
        lastUserAnswer,
        llmExplanation,
        llmCorrectedSentence,
        llmAdvice,
        pulseKey,
        sessionGatesCleared,
        sessionCorrectFirstTry,
        sessionAttempts,
        sessionHeartsLost,
        sessionMistakes,
        login,
        logout,
        refreshUser,
        setScreen,
        setAssessmentData,
        setLlmExplanation,
        setLlmCorrectedSentence,
        setLlmAdvice,
        startJourney,
        goToGate,
        handleCorrect,
        handleWrong,
        nextGate,
        showAnalyzing,
        showSummary,
        completeSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
