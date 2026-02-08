"use client";

import { useState, useEffect } from "react";
import { fetchDailyStats, type GameMode, type DisplayStats } from "@/lib/daily-stats";
import { useTranslation } from "@/lib/i18n";

interface Props {
  mode: GameMode;
  userGuessCount?: number; // pass user's guess count to show percentile
  userWon?: boolean;
}

function computePercentile(dist: number[], guessCount: number): number {
  // Players who used MORE guesses than you (worse) = you beat them
  const totalWins = dist.reduce((sum, c) => sum + c, 0);
  if (totalWins === 0) return 0;
  let worseCount = 0;
  for (let i = guessCount; i < dist.length; i++) {
    worseCount += dist[i];
  }
  return Math.round((worseCount / totalWins) * 100);
}

export default function DailyStatsCard({ mode, userGuessCount, userWon }: Props) {
  const [stats, setStats] = useState<DisplayStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchDailyStats(mode)
      .then((data) => setStats(data))
      .finally(() => setLoading(false));
  }, [mode]);

  if (loading) {
    return (
      <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
        <p className="text-xs text-[var(--color-muted)] text-center">{t("daily.loading")}</p>
      </div>
    );
  }

  if (!stats || stats.totalPlays === 0) return null;

  const maxCount = Math.max(...stats.guessDistribution, 1);
  const percentile = userWon && userGuessCount ? computePercentile(stats.guessDistribution, userGuessCount) : null;

  return (
    <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 animate-slide-up">
      <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-3 text-center">
        {t("daily.title")}
      </p>

      {/* Percentile Banner */}
      {percentile !== null && percentile > 0 && (
        <div className="mb-3 rounded-lg bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 px-4 py-2.5 text-center">
          <p className="text-sm font-semibold text-[var(--color-accent)]">
            {t("daily.percentile", { n: percentile })}
          </p>
        </div>
      )}

      {/* Summary */}
      <div className="flex justify-center gap-6 mb-4 text-center">
        <div>
          <p className="text-lg font-bold">{stats.totalPlays.toLocaleString()}</p>
          <p className="text-[10px] text-[var(--color-muted)] uppercase">{t("daily.players")}</p>
        </div>
        <div>
          <p className="text-lg font-bold">{stats.winRate}%</p>
          <p className="text-[10px] text-[var(--color-muted)] uppercase">{t("stats.winRate")}</p>
        </div>
        <div>
          <p className="text-lg font-bold">{stats.averageGuesses}</p>
          <p className="text-[10px] text-[var(--color-muted)] uppercase">{t("daily.avgGuesses")}</p>
        </div>
      </div>

      {/* Guess Distribution */}
      <p className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider mb-2">
        {t("stats.guessDistribution")}
      </p>
      <div className="space-y-1.5">
        {stats.guessDistribution.map((count, i) => {
          const pct = stats.totalPlays > 0 ? Math.round((count / stats.totalPlays) * 100) : 0;
          const isTop = count === maxCount && count > 0;
          const isUserRow = userWon && userGuessCount === i + 1;
          return (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className={`w-4 text-center font-mono shrink-0 ${isUserRow ? "text-[var(--color-accent)] font-bold" : isTop ? "text-[var(--color-accent)] font-bold" : "text-[var(--color-muted)]"}`}>
                {i + 1}
              </span>
              <div className="flex-1 h-7 bg-[var(--color-border)]/20 rounded-md overflow-hidden relative">
                <div
                  className={`h-full rounded-md transition-all duration-500 ${isUserRow ? "bg-[var(--color-accent)]" : isTop ? "bg-[var(--color-accent)]" : "bg-[var(--color-success)]/40"}`}
                  style={{ width: `${Math.max((count / maxCount) * 100, count > 0 ? 6 : 0)}%` }}
                />
              </div>
              <span className={`w-16 text-right tabular-nums shrink-0 ${isUserRow ? "text-[var(--color-accent)] font-bold text-xs" : isTop ? "text-[var(--color-accent)] font-bold text-xs" : "text-[var(--color-muted)] text-[11px]"}`}>
                {count > 0 ? `${count} (${pct}%)` : "-"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
