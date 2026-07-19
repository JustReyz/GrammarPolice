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
    <div className="min-h-screen w-full flex flex-col bg-white border-t-[2px] border-[#355cc6]">
      <div className="w-full max-w-[1280px] flex-1 bg-white relative mx-auto">
        <div className="flex items-center justify-center h-full min-h-[calc(100vh-80px)] p-[18px] md:p-[24px]">
          <div className="bg-white border border-[#dbe4fb] rounded-[24px] p-[24px] shadow-[0_12px_28px_rgba(19,33,61,0.06)] w-full max-w-[400px] animate-slide-fade">
            <div className="text-center mb-[20px]">
              <div className="inline-flex items-center justify-center w-[72px] h-[72px] rounded-[22px] bg-masthead-sub text-white text-[32px] mb-[10px] shadow-[0_14px_24px_rgba(49,89,199,.2)]">
                🛡️
              </div>
              <h2 className="text-[20px] font-black text-ink m-0">
                Welcome to Grammar Police
              </h2>
              <p className="text-[12.5px] text-ink-dim mt-[6px] leading-[1.5]">
                Sign in to begin your mission. AI will score every answer and keep
                your progress moving like a game.
              </p>
            </div>

            <div className="flex flex-col gap-[10px]">
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
                className="w-full bg-[rgba(19,33,61,0.03)] border border-line text-ink px-[14px] py-[12px] rounded-[14px] text-[13px] outline-none placeholder:text-ink-dim"
                autoFocus
                maxLength={30}
              />
              {error && (
                <p className="text-red text-[11px] m-0 font-semibold">{error}</p>
              )}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-masthead-sub text-white border-none px-[12px] py-[12px] rounded-[999px] font-extrabold cursor-pointer text-[13px] transition-transform duration-[0.15s] hover:translate-y-[-2px] hover:bg-[#2749a5] disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Enter Academy"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full max-w-[1280px] text-center mt-[12px] pb-[14px] text-[10.5px] text-white/85 mx-auto px-[14px]">
      </footer>
    </div>
  );
}
