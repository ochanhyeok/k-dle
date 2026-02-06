"use client";

import { useState, useEffect } from "react";
import { fetchDailyStats, type GameMode, type DisplayStats } from "@/lib/daily-stats";

interface Props {
  mode: GameMode;
}

export default function DailyStatsCard({ mode }: Props) {
  const [stats, setStats] = useState<DisplayStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDailyStats(mode)
      .then((data) => setStats(data))
      .finally(() => setLoading(false));
  }, [mode]);

  if (loading) {
    return (
      <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
        <p className="text-xs text-[var(--color-muted)] text-center">Loading global stats...</p>
      </div>
    );
  }

  if (!stats || stats.totalPlays === 0) return null;

  const maxCount = Math.max(...stats.guessDistribution, 1);

  return (
    <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 animate-slide-up">
      <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-3 text-center">
        Today&apos;s Global Stats
      </p>

      {/* Summary */}
      <div className="flex justify-center gap-6 mb-4 text-center">
        <div>
          <p className="text-lg font-bold">{stats.totalPlays.toLocaleString()}</p>
          <p className="text-[10px] text-[var(--color-muted)] uppercase">Players</p>
        </div>
        <div>
          <p className="text-lg font-bold">{stats.winRate}%</p>
          <p className="text-[10px] text-[var(--color-muted)] uppercase">Win Rate</p>
        </div>
        <div>
          <p className="text-lg font-bold">{stats.averageGuesses}</p>
          <p className="text-[10px] text-[var(--color-muted)] uppercase">Avg Guesses</p>
        </div>
      </div>

      {/* Guess Distribution */}
      <div className="space-y-1.5">
        {stats.guessDistribution.map((count, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-3 text-[var(--color-muted)] text-right">{i + 1}</span>
            <div className="flex-1 h-5 bg-[var(--color-border)]/30 rounded overflow-hidden">
              <div
                className="h-full bg-[var(--color-success)]/60 rounded flex items-center justify-end pr-1.5 transition-all duration-500"
                style={{ width: `${Math.max((count / maxCount) * 100, count > 0 ? 8 : 0)}%` }}
              >
                {count > 0 && (
                  <span className="text-[10px] font-medium text-[var(--color-foreground)]">
                    {count}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
