import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          deep: "#081426",
          DEFAULT: "#0e2242",
          card: "#14335e",
          "card-2": "#1a3d6d",
        },
        gold: {
          DEFAULT: "#f5c542",
          light: "#ffdf7a",
        },
        green: {
          DEFAULT: "#2e9e52",
          dark: "#1f7a3d",
        },
        blue: {
          btn: "#2f6fed",
          "btn-2": "#5b8dff",
        },
        red: {
          DEFAULT: "#e0455a",
        },
        ink: {
          DEFAULT: "#eef3fb",
          dim: "#9fb2cf",
        },
        line: "rgba(255,255,255,0.09)",
      },
      fontFamily: {
        sans: ['"Segoe UI"', "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        app: "0 18px 40px rgba(0,0,0,0.45)",
        "green-glow": "0 6px 14px rgba(35,124,62,0.4)",
        "green-btn": "0 10px 22px rgba(31,122,61,0.45)",
        "green-btn-hover": "0 16px 28px rgba(31,122,61,0.55)",
      },
      backgroundImage: {
        "navy-radial":
          "radial-gradient(circle at 20% -10%, #163057 0%, transparent 55%), radial-gradient(circle at 100% 10%, #12294c 0%, transparent 45%), linear-gradient(180deg, #081426 0%, #060d1a 100%)",
        "masthead-sub": "linear-gradient(180deg, #3cb15f, #237c3e)",
        "frame-bg": "linear-gradient(160deg, #0e2242 0%, #081426 100%)",
        "statusbar-bg":
          "linear-gradient(180deg, rgba(255,255,255,0.04), transparent)",
        "scene-sky":
          "linear-gradient(180deg, #2a5c8f 0%, #3f7fae 38%, #4d9a63 55%, #3a7a4d 100%)",
        "scene-road": "linear-gradient(180deg, #5b5f66, #3d3f44)",
        "lane-stripe":
          "repeating-linear-gradient(90deg, #ffd54f 0 34px, transparent 34px 64px)",
        "gold-gradient": "linear-gradient(180deg, #ffdf7a, #f5c542)",
        "blue-btn-grad": "linear-gradient(180deg, #5b8dff, #2f6fed)",
        "green-btn-grad": "linear-gradient(180deg, #3cb15f, #1f7a3d)",
        "rewards-card-bg": "linear-gradient(160deg, #173a29, #0e2419)",
        "gate-sign-bg": "linear-gradient(160deg, #144a2a, #0d2e19)",
        "tower-grad": "linear-gradient(180deg, #cfa93a, #a5811f)",
        "tower-top-grad": "linear-gradient(180deg, #f5c542, #c79c26)",
        "shield-grad":
          "radial-gradient(circle at 35% 30%, #ffdf7a, #f5c542 60%, #b98a12 100%)",
        "shield-big-grad":
          "radial-gradient(circle at 35% 25%, #ffdf7a, #f5c542 55%, #a97e11 100%)",
        "badge-bg": "linear-gradient(160deg, #123a24, #0b2818)",
        "gold-btn": "linear-gradient(180deg, #ffe27a, #f5c542)",
        "fb-ok": "linear-gradient(180deg, #3cb15f, #1f7a3d)",
        "fb-bad": "linear-gradient(180deg, #ef5c6d, #c8283b)",
        "opt-correct": "linear-gradient(180deg, #3cb15f, #1f7a3d)",
        "opt-wrong": "linear-gradient(180deg, #ef5c6d, #c8283b)",
      },
      keyframes: {
        spinStar: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pillPulse: {
          "0%": { transform: "scale(1)" },
          "35%": { transform: "scale(1.25)" },
          "100%": { transform: "scale(1)" },
        },
        laneMove: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-96px 0" },
        },
        carIdle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        blinkGlow: {
          "0%, 92%, 100%": { opacity: "1" },
          "95%": { opacity: "0.15" },
        },
        wave: {
          "0%, 100%": { transform: "rotate(-18deg)" },
          "50%": { transform: "rotate(-36deg)" },
        },
        popIn: {
          from: {
            opacity: "0",
            transform: "translateY(8px) scale(0.94)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        slideFade: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        heroPop: {
          from: { opacity: "0", transform: "scale(0.85)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        tdots: {
          "0%, 80%, 100%": { opacity: "0.25", transform: "translateY(0)" },
          "40%": { opacity: "1", transform: "translateY(-3px)" },
        },
        shieldPop: {
          "0%": {
            transform: "scale(0) rotate(-20deg)",
            opacity: "0",
          },
          "70%": { transform: "scale(1.15) rotate(4deg)" },
          "100%": { transform: "scale(1) rotate(0)", opacity: "1" },
        },
      },
      animation: {
        "spin-star": "spinStar 6s linear infinite",
        "pill-pulse": "pillPulse 0.5s",
        "lane-move": "laneMove 1.4s linear infinite",
        "car-idle": "carIdle 2.4s ease-in-out infinite",
        "robot-bob": "bob 2.6s ease-in-out infinite",
        "blink-glow": "blinkGlow 3.4s infinite",
        "wave-arm": "wave 1.6s ease-in-out infinite",
        "pop-in": "popIn 0.35s ease",
        "slide-fade": "slideFade 0.45s ease",
        "hero-pop": "heroPop 0.6s ease",
        "thinking-dot": "tdots 1.2s infinite",
        "shield-pop": "shieldPop 0.6s ease",
      },
    },
  },
  plugins: [],
};
export default config;
