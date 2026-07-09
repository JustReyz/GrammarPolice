"use client";

import { useState } from "react";
import { useApp } from "@/lib/AppContext";
import Masthead from "./Masthead";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useApp();

  const handleSubmit = async () => {
    const trimmed = username.trim().toLowerCase();
    if (!trimmed) {
      setError("Please enter a username.");
      return;
    }
    if (trimmed.length < 2) {
      setError("Username must be at least 2 characters.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login(trimmed);
    } catch (e: any) {
      setError(e.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Masthead />
      <div className="w-full max-w-[1040px] bg-frame-bg border border-line rounded-[22px] shadow-app overflow-hidden relative">
        <div className="flex items-center justify-center min-h-[520px] p-[26px]">
          <div className="bg-navy-card border border-line rounded-[16px] p-[32px] shadow-[0_10px_22px_rgba(0,0,0,.28)] w-full max-w-[400px] animate-slide-fade">
            <div className="text-center mb-[24px]">
              <div className="text-[48px] mb-[8px]">🛡️</div>
              <h2 className="text-[22px] font-extrabold text-gold m-0">
                GRAMMAR POLICE
              </h2>
              <p className="text-[13px] text-ink-dim mt-[8px]">
                Enter your username to start your journey
              </p>
            </div>

            <div className="flex flex-col gap-[12px]">
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
                placeholder="Your username..."
                className="w-full bg-[rgba(255,255,255,0.06)] border border-line text-white px-[14px] py-[12px] rounded-[10px] text-[14px] outline-none placeholder:text-ink-dim"
                autoFocus
                maxLength={30}
              />
              {error && (
                <p className="text-red text-[12px] m-0">{error}</p>
              )}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-green-btn-grad text-white border-none px-[12px] py-[12px] rounded-[10px] font-extrabold cursor-pointer text-[14px] transition-transform duration-[0.15s] hover:translate-y-[-2px] disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Enter Grammar Police 🛡️"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full max-w-[1040px] text-center mt-[16px] text-[11.5px] text-ink-dim">
        Grammar Police — Conversation Simulation • Contextual Evaluation • AI-Powered Adaptive Learning
      </footer>
    </>
  );
}
