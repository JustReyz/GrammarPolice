"use client";

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
    setScreen,
    handleCorrect,
    handleWrong,
    nextGate,
    showAnalyzing,
    showSummary,
    completeSession,
    logout,
    startJourney,
  } = useApp();

  if (!user) return null;
  const u = user;

  const gate = gates[currentGateIdx];
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
        return null;
    }
  };

  function renderGateScreen() {
    if (!gate) {
      return (
        <div className="text-center py-[60px]">
          <p className="text-ink-dim">No gates available.</p>
          <button
            onClick={startJourney}
            className="mt-[16px] bg-green-btn-grad text-white border-none px-[24px] py-[12px] rounded-[10px] font-extrabold cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      );
    }

    if (gate.type === "sentence") {
      const pattern = gate.check_regex;
      return (
        <div className="animate-slide-fade">
          <GateScene
            title={gate.title.replace(" GATE", "")}
            showBubble={gate.npc_text}
            categoryLabel={getCatLabel(gate)}
          />
          <SentenceInput
            onSubmit={(val) => {
              if (pattern) {
                const re = new RegExp(pattern, "i");
                re.test(val) ? handleCorrect(val) : handleWrong(val);
              } else {
                handleCorrect(val);
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
      <div className="text-center py-[60px]">
        <p className="text-ink-dim">Unknown gate type: {gate.type}</p>
        <button
          onClick={nextGate}
          className="mt-[16px] bg-blue-btn-grad text-white border-none px-[24px] py-[12px] rounded-[10px] font-bold cursor-pointer"
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
        correctExplain={gate.correct_explain || "Correct!"}
        onNext={nextGate}
      />
    );
  }

  function renderFeedbackWrongScreen() {
    if (!gate) return null;
    const wExplain =
      gate.wrong_explain ||
      (gate.correct_answer
        ? `Not quite — the correct answer is: "${gate.correct_answer}".`
        : "Take another look at the grammar rule for this gate.");
    return (
      <FeedbackWrong
        userAnswer={lastUserAnswer}
        wrongExplain={wExplain}
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
        onContinue={() => window.location.reload()}
      />
    );
  }

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
        <div className="flex min-h-[520px]">
          <main className="flex-1 p-[26px_26px_30px] relative overflow-hidden">
            {renderContent()}
          </main>
        </div>
      </div>
      <footer className="w-full max-w-[1040px] flex justify-between items-center mt-[16px] text-[11.5px] text-ink-dim">
        <span>Grammar Police — Interactive Session</span>
        <button
          onClick={logout}
          className="bg-transparent border border-line text-ink-dim px-[12px] py-[4px] rounded-[8px] cursor-pointer text-[11px] hover:text-white"
        >
          Logout ({u.username})
        </button>
      </footer>
    </>
  );
}
