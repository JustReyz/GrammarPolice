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
          deep: "#355cc6",
          DEFAULT: "#2f57c7",
          card: "#ffffff",
          "card-2": "#f1f5ff",
        },
        gold: {
          DEFAULT: "#f2c94c",
          light: "#ffe79a",
          btn: "#f2c94c",
        },
        green: {
          DEFAULT: "#3159c7",
          dark: "#2749a5",
          btn: {
            grad: "#3159c7",
            hover: "#2749a5",
          },
        },
        blue: {
          btn: {
            grad: "#5c7fe6",
          },
          "btn-2": "#5c7fe6",
        },
        red: {
          DEFAULT: "#f16363",
        },
        ink: {
          DEFAULT: "#13213d",
          dim: "#667085",
        },
        line: "rgba(19,33,61,0.12)",
        frame: {
          bg: "#f8faff",
        },
        statusbar: {
          bg: "#ffffff",
        },
        masthead: {
          sub: "#3159c7",
        },
        badge: {
          bg: "#ffffff",
        },
        scene: {
          sky: "#dfe8ff",
          road: "#c6d2ef",
        },
        lane: {
          stripe: "#3159c7",
        },
        gate: {
          sign: "#ffffff",
        },
        tower: {
          grad: "#d8e2fb",
          top: "#ebf0ff",
        },
        shield: {
          grad: "#f2c94c",
          big: {
            grad: "#f2c94c",
          },
        },
        rewards: {
          card: {
            bg: "#f4f7ff",
          },
        },
        fb: {
          ok: "#3159c7",
          bad: "#f16363",
        },
        opt: {
          correct: "#3159c7",
          wrong: "#f16363",
        },
      },
      fontFamily: {
        sans: ['"Nunito"', '"Segoe UI"', "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        app: "0 18px 40px rgba(19,33,61,0.14)",
        "green-glow": "0 8px 20px rgba(49,89,199,0.15)",
        "green-btn": "0 12px 24px rgba(49,89,199,0.18)",
        "green-btn-hover": "0 16px 30px rgba(49,89,199,0.24)",
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
