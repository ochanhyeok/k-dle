"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchDailyStats, type GameMode, type DisplayStats } from "@/lib/daily-stats";
import { useTranslation } from "@/lib/i18n";
import GameHeader from "@/components/ui/GameHeader";

const MODES: { id: GameMode; slug: string; emoji: string; label: string }[] = [
  { id: "drama", slug: "drama-dle", emoji: "🎬", label: "Drama-dle" },
  { id: "idol", slug: "idol-dle", emoji: "🎤", label: "Idol-dle" },
  { id: "lyric", slug: "lyric-dle", emoji: "📝", label: "Lyric-dle" },
  { id: "scene", slug: "scene-dle", emoji: "🎭", label: "Scene-dle" },
];

export default function GlobalStatsContent() {
  const [statsMap, setStatsMap] = useState<Record<string, DisplayStats | null>>({});
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    Promise.all(
      MODES.map(async (mode) => {
        const data = await fetchDailyStats(mode.id);
        return [mode.id, data] as const;
      })
    ).then((results) => {
      const map: Record<string, DisplayStats | null> = {};
      for (const [id, data] of results) {
        map[id] = data;
      }
      setStatsMap(map);
      setLoading(false);
    });
  }, []);

  // Overall totals
  const totalPlays = Object.values(statsMap).reduce((sum, s) => sum + (s?.totalPlays || 0), 0);
  const totalWins = Object.values(statsMap).reduce((sum, s) => {
    if (!s) return sum;
    return sum + Math.round((s.winRate / 100) * s.totalPlays);
  }, 0);
  const overallWinRate = totalPlays > 0 ? Math.round((totalWins / totalPlays) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col page-enter">
      <GameHeader emoji="📊" title="Global Stats" subtitle={t("globalStats.subtitle")} />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-6 animate-stagger-in">
            <p className="text-4xl mb-2">📊</p>
            <h2 className="text-xl font-bold mb-1">{t("globalStats.title")}</h2>
            <p className="text-sm text-[var(--color-muted)]">{t("globalStats.description")}</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-sm text-[var(--color-muted)]">{t("daily.loading")}</p>
            </div>
          ) : totalPlays === 0 ? (
            <div className="text-center py-12">
              <p className="text-3xl mb-3">🌙</p>
              <p className="text-sm text-[var(--color-muted)]">{t("globalStats.noData")}</p>
            </div>
          ) : (
            <>
              {/* Overall Summary */}
              <div className="rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-5 mb-6 animate-stagger-in" style={{ animationDelay: "0.05s" }}>
                <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-3 text-center">
                  {t("globalStats.overall")}
                </p>
                <div className="flex justify-center gap-8 text-center">
                  <div>
                    <p className="text-2xl font-bold text-[var(--color-accent)]">{totalPlays.toLocaleString()}</p>
                    <p className="text-[10px] text-[var(--color-muted)] uppercase">{t("globalStats.totalPlays")}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[var(--color-accent)]">{overallWinRate}%</p>
                    <p className="text-[10px] text-[var(--color-muted)] uppercase">{t("stats.winRate")}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[var(--color-accent)]">{MODES.filter((m) => (statsMap[m.id]?.totalPlays || 0) > 0).length}</p>
                    <p className="text-[10px] text-[var(--color-muted)] uppercase">{t("globalStats.activeModes")}</p>
                  </div>
                </div>
              </div>

              {/* Per-Mode Cards */}
              <div className="space-y-4">
                {MODES.map((mode, i) => {
                  const stats = statsMap[mode.id];
                  if (!stats || stats.totalPlays === 0) {
                    return (
                      <div
                        key={mode.id}
                        className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 animate-stagger-in"
                        style={{ animationDelay: `${0.1 + i * 0.07}s` }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{mode.emoji}</span>
                          <h3 className="font-semibold">{mode.label}</h3>
                        </div>
                        <p className="text-sm text-[var(--color-muted)]">{t("globalStats.noPlaysYet")}</p>
                        <Link
                          href={`/${mode.slug}`}
                          className="inline-block mt-3 text-xs text-[var(--color-accent)] hover:underline"
                        >
                          {t("globalStats.playNow")} →
                        </Link>
                      </div>
                    );
                  }

                  const maxCount = Math.max(...stats.guessDistribution, 1);

                  return (
                    <div
                      key={mode.id}
                      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 animate-stagger-in"
                      style={{ animationDelay: `${0.1 + i * 0.07}s` }}
                    >
                      {/* Mode Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{mode.emoji}</span>
                          <h3 className="font-semibold">{mode.label}</h3>
                        </div>
                        <Link
                          href={`/${mode.slug}`}
                          className="text-xs text-[var(--color-accent)] hover:underline"
                        >
                          {t("globalStats.playNow")} →
                        </Link>
                      </div>

                      {/* Stats Row */}
                      <div className="flex justify-between gap-4 mb-4 text-center">
                        <div className="flex-1 rounded-lg bg-[var(--color-card-hover)] py-2">
                          <p className="text-lg font-bold">{stats.totalPlays.toLocaleString()}</p>
                          <p className="text-[10px] text-[var(--color-muted)] uppercase">{t("daily.players")}</p>
                        </div>
                        <div className="flex-1 rounded-lg bg-[var(--color-card-hover)] py-2">
                          <p className="text-lg font-bold">{stats.winRate}%</p>
                          <p className="text-[10px] text-[var(--color-muted)] uppercase">{t("stats.winRate")}</p>
                        </div>
                        <div className="flex-1 rounded-lg bg-[var(--color-card-hover)] py-2">
                          <p className="text-lg font-bold">{stats.averageGuesses}</p>
                          <p className="text-[10px] text-[var(--color-muted)] uppercase">{t("daily.avgGuesses")}</p>
                        </div>
                      </div>

                      {/* Guess Distribution */}
                      <p className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider mb-2">
                        {t("stats.guessDistribution")}
                      </p>
                      <div className="space-y-1.5">
                        {stats.guessDistribution.map((count, gi) => {
                          const pct = stats.totalPlays > 0 ? Math.round((count / stats.totalPlays) * 100) : 0;
                          const isTop = count === maxCount && count > 0;
                          return (
                            <div key={gi} className="flex items-center gap-2 text-xs">
                              <span className={`w-4 text-center font-mono shrink-0 ${isTop ? "text-[var(--color-accent)] font-bold" : "text-[var(--color-muted)]"}`}>
                                {gi + 1}
                              </span>
                              <div className="flex-1 h-6 bg-[var(--color-border)]/20 rounded-md overflow-hidden">
                                <div
                                  className={`h-full rounded-md transition-all duration-500 ${isTop ? "bg-[var(--color-accent)]" : "bg-[var(--color-success)]/40"}`}
                                  style={{ width: `${Math.max((count / maxCount) * 100, count > 0 ? 6 : 0)}%` }}
                                />
                              </div>
                              <span className={`w-14 text-right tabular-nums shrink-0 ${isTop ? "text-[var(--color-accent)] font-bold" : "text-[var(--color-muted)]"} text-[11px]`}>
                                {count > 0 ? `${count} (${pct}%)` : "-"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Refresh note */}
              <p className="text-[10px] text-[var(--color-muted)] text-center mt-6">
                {t("globalStats.refreshNote")}
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
