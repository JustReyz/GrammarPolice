"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/lib/AppContext";
import Masthead from "./Masthead";
import StatusBar from "./StatusBar";
import GateScene from "./GateScene";
import SentenceInput from "./SentenceInput";
import FeedbackCorrect from "./FeedbackCorrect";
import FeedbackWrong from "./FeedbackWrong";
import RemedialChoice from "./RemedialChoice";
import WordScrambleChallenge from "./WordScrambleChallenge";
import CorrectionChallenge from "./CorrectionChallenge";
import AIAnalyzing from "./AIAnalyzing";
import AdaptiveDifficultyResult from "./AdaptiveDifficultyResult";
import JourneySummary from "./JourneySummary";

function parseOptions(g: any): string[] {
  if (Array.isArray(g.remedial_options)) return g.remedial_options;
  try {
    if (typeof g.remedial_options === "string")
      return JSON.parse(g.remedial_options);
  } catch {}
  return [];
}

function getCatLabel(g: any): string {
  return g.category ? g.category.toUpperCase().replace("_", " ") : "GRAMMAR";
}

export default function GameScreen() {
  const {
    user,
    screen,
    gates,
    currentGateIdx,
    lastUserAnswer,
    pulseKey,
    sessionGatesCleared,
    sessionCorrectFirstTry,
    sessionAttempts,
    sessionMistakes,
    llmExplanation,
    llmCorrectedSentence,
    llmAdvice,
    setScreen,
    setLlmExplanation,
    setLlmCorrectedSentence,
    setLlmAdvice,
    handleCorrect,
    handleWrong,
    nextGate,
    showAnalyzing,
    showSummary,
    completeSession,
    logout,
    startJourney,
  } = useApp();

  const [isEvaluating, setIsEvaluating] = useState(false);

  useEffect(() => {
    if (screen === "gate") {
      setLlmExplanation("");
      setLlmAdvice("");
      setLlmCorrectedSentence(null);
    }
  }, [currentGateIdx, screen, setLlmExplanation, setLlmAdvice, setLlmCorrectedSentence]);

  if (!user) return null;
  const u = user;

  const gate = gates[currentGateIdx];
  console.log("GameScreen state:", { screen, gatesCount: gates?.length, currentGateIdx, gate });
  const accuracy = sessionAttempts
    ? Math.round((sessionCorrectFirstTry / sessionAttempts) * 100)
    : 100;
  const xpEarned = sessionGatesCleared * 20;

  const focusList: string[] = [];
  if (sessionMistakes.tense > 0)
    focusList.push("Present Continuous & Future Plans");
  if (sessionMistakes.agreement > 0) focusList.push("Subject-Verb Agreement");
  if (sessionMistakes.preposition > 0) focusList.push("Preposition Usage");
  if (focusList.length === 0) focusList.push("Wh-Questions", "Advanced Tenses");

  const goRemedial = () => setScreen("remedial");
  const handleGoToSummary = async () => {
    await completeSession();
    showSummary();
  };

  const renderContent = () => {
    try {
      switch (screen) {
        case "gate":
          return renderGateScreen();
        case "feedback-correct":
          return renderFeedbackCorrectScreen();
        case "feedback-wrong":
          return renderFeedbackWrongScreen();
        case "remedial":
          return renderRemedialScreen();
        case "ai-analyzing":
          return renderAnalyzingScreen();
        case "adaptive":
          return renderAdaptiveScreen();
        case "summary":
          return renderSummaryScreen();
        default:
          console.warn("Unknown screen in GameScreen:", screen);
          return null;
      }
    } catch (err: any) {
      console.error("CRITICAL RENDER ERROR IN GAMESCREEN:", err);
      return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-[14px]">
          <h4 className="font-bold">Render Error:</h4>
          <p className="text-xs">{err.message}</p>
        </div>
      );
    }
  };

  function renderGateScreen() {
    if (!gate) {
      return (
        <div className="text-center py-[40px]">
          <p className="text-ink-dim">No gates available.</p>
          <button
            onClick={startJourney}
            className="mt-[12px] bg-masthead-sub text-white border-none px-[20px] py-[10px] rounded-[8px] font-extrabold cursor-pointer text-[13px] hover:bg-[#2749a5]"
          >
            Back to Home
          </button>
        </div>
      );
    }

    if (gate.type === "sentence") {
      return (
        <div className="animate-slide-fade">
          <GateScene
            title={(gate.title || "Gate").replace(" GATE", "")}
            showBubble={gate.npc_text}
            categoryLabel={getCatLabel(gate)}
          />
          <SentenceInput
            disabled={isEvaluating}
            onSubmit={async (val) => {
              setIsEvaluating(true);
              try {
                const res = await fetch("/api/evaluate", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    question: gate.npc_text || gate.title,
                    userAnswer: val,
                    category: gate.category,
                  }),
                });
                const data = await res.json();
                if (data.error) {
                  setLlmExplanation(data.error);
                  handleWrong(val);
                  return;
                }
                setLlmExplanation(data.explanation);
                setLlmCorrectedSentence(data.correctedSentence);
                setLlmAdvice(data.advice || "");
                if (data.isCorrect) {
                  handleCorrect(val);
                } else {
                  handleWrong(val);
                }
              } catch {
                setLlmExplanation("Unable to evaluate. Try again.");
                handleWrong(val);
              } finally {
                setIsEvaluating(false);
              }
            }}
          />
        </div>
      );
    }

    if (gate.type === "scramble" && gate.correct_answer) {
      const words = gate.correct_answer
        .split(" ")
        .sort(() => Math.random() - 0.5);
      return (
        <WordScrambleChallenge
          words={words}
          correct={gate.correct_answer}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      );
    }

    if (gate.type === "correction" && gate.correct_answer) {
      return (
        <CorrectionChallenge
          sentence={
            gate.sentence || gate.npc_text || "She are watching a movie now."
          }
          correct={gate.correct_answer}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      );
    }

    return (
      <div className="text-center py-[40px]">
        <p className="text-ink-dim">Unknown gate type: {gate.type}</p>
        <button
          onClick={nextGate}
          className="mt-[12px] bg-[#5c7fe6] text-white border-none px-[20px] py-[10px] rounded-[8px] font-bold cursor-pointer text-[13px] hover:bg-[#4f72dd]"
        >
          Skip to Next
        </button>
      </div>
    );
  }

  function renderFeedbackCorrectScreen() {
    if (!gate) return null;
    return (
      <FeedbackCorrect
        userAnswer={lastUserAnswer}
        correctExplain={llmExplanation || gate.correct_explain || "Correct!"}
        advice={llmAdvice}
        onNext={nextGate}
      />
    );
  }

  function renderFeedbackWrongScreen() {
    if (!gate) return null;
    const wExplain =
      llmExplanation ||
      gate.wrong_explain ||
      (gate.correct_answer
        ? `Not quite — the correct answer is: "${gate.correct_answer}".`
        : "Take another look at the grammar rule for this gate.");
    const correctedInfo = llmCorrectedSentence
      ? `Corrected: "${llmCorrectedSentence}"`
      : null;
    return (
      <FeedbackWrong
        userAnswer={lastUserAnswer}
        wrongExplain={correctedInfo ? wExplain + " " + correctedInfo : wExplain}
        advice={llmAdvice}
        onRemedial={goRemedial}
      />
    );
  }

  function renderRemedialScreen() {
    if (!gate || !gate.remedial_prompt) {
      nextGate();
      return null;
    }
    return (
      <RemedialChoice
        prompt={gate.remedial_prompt}
        options={parseOptions(gate)}
        correct={gate.remedial_correct || ""}
        onCorrect={nextGate}
        onIncorrect={nextGate}
      />
    );
  }

  function renderAnalyzingScreen() {
    return (
      <AIAnalyzing
        mistakes={{
          tense: sessionMistakes.tense + u.mistake_tense,
          agreement: sessionMistakes.agreement + u.mistake_agreement,
          preposition: sessionMistakes.preposition + u.mistake_preposition,
        }}
        onComplete={showAnalyzing}
      />
    );
  }

  function renderAdaptiveScreen() {
    return (
      <AdaptiveDifficultyResult
        gatesCleared={sessionGatesCleared}
        gatesTotal={gates.length || u.gates_total}
        accuracy={accuracy}
        streak={u.streak}
        xpEarned={xpEarned}
        focusList={focusList}
        onContinue={handleGoToSummary}
      />
    );
  }

  function renderSummaryScreen() {
    return (
      <JourneySummary
        gatesCleared={sessionGatesCleared}
        gatesTotal={gates.length || u.gates_total}
        accuracy={accuracy}
        xp={u.xp}
        coins={u.coins}
        onContinue={() => setScreen("home")}
      />
    );
  }

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
        <div className="flex h-full min-h-[calc(100vh-190px)]">
          <main className="flex-1 p-[18px] md:p-[24px] relative overflow-hidden">
            <div className="h-full min-h-[calc(100vh-238px)] flex flex-col justify-center max-w-[720px] mx-auto w-full">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
      <footer className="w-full max-w-[1280px] flex justify-between items-center mt-[12px] pb-[14px] text-[10.5px] text-white/85 mx-auto px-[14px]">
        <span>Grammar Police — Interactive Session</span>
        <button
          onClick={logout}
          className="bg-white/15 border border-white/20 text-white px-[10px] py-[4px] rounded-[999px] cursor-pointer text-[10.5px] hover:bg-white/20"
        >
          Logout ({u.username})
        </button>
      </footer>
    </div>
  );
}
