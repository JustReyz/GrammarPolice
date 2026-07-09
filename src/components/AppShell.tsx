"use client";

import { useApp } from "@/lib/AppContext";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import GameScreen from "./GameScreen";

export default function AppShell() {
  const { screen } = useApp();

  if (screen === "login") return <LoginScreen />;

  // For home, render HomeScreen
  if (screen === "home") return <HomeScreen />;

  // All other screens are part of the game flow
  return <GameScreen />;
}
