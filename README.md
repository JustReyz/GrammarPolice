# Grammar Police 🛡️

AI-based English communication simulation platform for EFL learners. Practice grammar through real conversation scenarios with adaptive difficulty.

Built with Next.js, Tailwind CSS, MySQL, and OpenAI-compatible LLMs.

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js, React, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | MySQL (Aiven / Laragon) |
| LLM | OpenAI GPT-4o / Gemini 2.5 Flash (planned) |

## Getting Started

```sh
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database

Create the `grammar_police` database and run `setup.sql` to create tables.

### Local (Laragon)

```sh
mysql -u root -e "CREATE DATABASE grammar_police"
mysql -u root grammar_police < path/to/setup.sql
```

### Aiven

Set env vars in `.env` (see `.env.example`) or Vercel Dashboard:
- `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`
- `MYSQL_DATABASE`, `MYSQL_SSL=true`, `MYSQL_CA` (base64 of `ca.pem`)

## Project Structure

```
src/
├── app/
│   ├── api/               # API routes (auth, gates, user)
│   └── page.tsx           # Entry point
├── components/            # React components
│   ├── LoginScreen.tsx     # Username-only login
│   ├── HomeScreen.tsx      # Dashboard
│   ├── GameScreen.tsx      # Gate/feedback/remedial orchestrator
│   ├── GateScene.tsx       # Animated toll gate backdrop
│   ├── SentenceInput.tsx   # Free-text answer input
│   ├── WordScrambleChallenge.tsx
│   ├── CorrectionChallenge.tsx
│   ├── FeedbackCorrect/FeedbackWrong.tsx
│   ├── RemedialChoice.tsx  # Multiple-choice practice
│   ├── AIAnalyzing.tsx     # Thinking-dots loading screen
│   ├── AdaptiveDifficultyResult.tsx
│   └── JourneySummary.tsx
└── lib/
    ├── db.ts               # MySQL connection pool
    └── AppContext.tsx       # Global state management
```

## Features

- **Gate Checkpoints** — Sentence, scramble, and correction challenges
- **LLM Evaluation** — Contextual grammar analysis (replaces regex)
- **Remedial Mode** — Adaptive practice based on error patterns
- **Gamification** — XP, coins, hearts, levels, streaks
- **Session Persistence** — Progress saved on session completion
