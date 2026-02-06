"use client";

import { useState, useEffect } from "react";
import { fetchDailyStats, type GameMode, type DisplayStats } from "@/lib/daily-stats";
import { useTranslation } from "@/lib/i18n";

interface Props {
  mode: GameMode;
}

export default function DailyStatsCard({ mode }: Props) {
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

  return (
    <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 animate-slide-up">
      <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-3 text-center">
        {t("daily.title")}
      </p>

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
      <div className="space-y-1">
        {stats.guessDistribution.map((count, i) => {
          const pct = stats.totalPlays > 0 ? Math.round((count / stats.totalPlays) * 100) : 0;
          return (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className="w-8 text-right text-[var(--color-muted)] font-mono shrink-0">
                {i + 1}try
              </span>
              <div className="flex-1 h-6 bg-[var(--color-border)]/30 rounded overflow-hidden">
                <div
                  className="h-full bg-[var(--color-success)]/60 rounded flex items-center justify-end pr-2 transition-all duration-500"
                  style={{ width: `${Math.max((count / maxCount) * 100, count > 0 ? 12 : 0)}%` }}
                >
                  {count > 0 && (
                    <span className="text-[10px] font-bold text-[var(--color-foreground)]">
                      {count}
                    </span>
                  )}
                </div>
              </div>
              <span className="w-8 text-right text-[10px] text-[var(--color-muted)] shrink-0">
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
