"use client";

import { useEffect, useState } from "react";
import { loadStats } from "@/lib/game";

function getStreakRank(streak: number): { emoji: string; title: string } {
  if (streak >= 365) return { emoji: "👑", title: "Hallyu Legend" };
  if (streak >= 200) return { emoji: "💥", title: "All-Kill" };
  if (streak >= 100) return { emoji: "⭐", title: "Rising Star" };
  if (streak >= 30) return { emoji: "🎤", title: "Debut" };
  if (streak >= 7) return { emoji: "🎓", title: "Trainee" };
  return { emoji: "🔥", title: "" };
}

export default function StreakBanner() {
  const [streak, setStreak] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stats = loadStats();
    setStreak(stats.currentStreak);
    setMounted(true);
  }, []);

  const { emoji, title } = getStreakRank(streak);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-center">
      <p className="text-sm text-[var(--color-muted)] mb-1">
        Your Daily Streak
      </p>
      <p className="text-3xl font-bold">
        {mounted ? `${emoji} ${streak}` : "🔥 —"}
      </p>
      <p className="text-xs text-[var(--color-muted)] mt-1">
        {!mounted
          ? ""
          : streak === 0
          ? "Play any mode to start your streak"
          : title
          ? `Rank: ${title}`
          : "Keep going!"}
      </p>
    </div>
  );
}
