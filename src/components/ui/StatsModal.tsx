"use client";

import { useState } from "react";
import { loadUnifiedStats, generateStatsShareText, type UnifiedStats } from "@/lib/unified-stats";
import { shareResult } from "@/lib/share";
import { useTranslation, type TFunction } from "@/lib/i18n";
import Modal from "./Modal";
import Toast from "./Toast";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function getStreakTitle(streak: number, t: TFunction): { title: string; emoji: string } {
  if (streak >= 365) return { title: t("rank.hallyuLegend"), emoji: "👑" };
  if (streak >= 200) return { title: t("rank.allKill"), emoji: "💥" };
  if (streak >= 100) return { title: t("rank.risingStar"), emoji: "⭐" };
  if (streak >= 30) return { title: t("rank.debut"), emoji: "🎤" };
  if (streak >= 7) return { title: t("rank.trainee"), emoji: "🎓" };
  return { title: t("rank.newcomer"), emoji: "🌱" };
}

export default function StatsModal({ isOpen, onClose }: StatsModalProps) {
  const stats: UnifiedStats = loadUnifiedStats();
  const [showToast, setShowToast] = useState(false);
  const { t } = useTranslation();

  const handleShareStats = async () => {
    if (!stats) return;
    const text = generateStatsShareText(stats);
    await shareResult(text);
    setShowToast(true);
  };

  const winPct =
    stats.gamesPlayed > 0
      ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
      : 0;

  const maxDist = Math.max(...stats.guessDistribution, 1);
  const { title: rankTitle, emoji: rankEmoji } = getStreakTitle(stats.currentStreak, t);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("stats.title")}>
      {/* Rank Badge */}
      <div className="text-center mb-5 py-3 rounded-xl bg-gradient-to-b from-[var(--color-accent)]/10 to-transparent border border-[var(--color-accent)]/20">
        <p className="text-3xl mb-1">{rankEmoji}</p>
        <p className="text-sm font-semibold text-[var(--color-accent)]">
          {rankTitle}
        </p>
        <p className="text-[10px] text-[var(--color-muted)] mt-0.5">
          {t("stats.dayStreak", { n: stats.currentStreak })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-3 mb-6 text-center">
        <div>
          <p className="text-2xl font-bold">{stats.gamesPlayed}</p>
          <p className="text-[10px] text-[var(--color-muted)] uppercase">
            {t("stats.played")}
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold">{winPct}%</p>
          <p className="text-[10px] text-[var(--color-muted)] uppercase">
            {t("stats.winPct")}
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.currentStreak}</p>
          <p className="text-[10px] text-[var(--color-muted)] uppercase">
            {t("stats.streak")}
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.maxStreak}</p>
          <p className="text-[10px] text-[var(--color-muted)] uppercase">
            {t("stats.max")}
          </p>
        </div>
      </div>

      {/* Guess Distribution */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-3">
          {t("stats.guessDistribution")}
        </p>
        <div className="space-y-1.5">
          {stats.guessDistribution.map((count, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-[var(--color-muted)] w-3 text-right">
                {i + 1}
              </span>
              <div className="flex-1 h-6 flex items-center">
                <div
                  className="h-full rounded-sm bg-[var(--color-accent)]/70 flex items-center justify-end px-2 min-w-[24px] transition-all"
                  style={{
                    width: `${Math.max((count / maxDist) * 100, 8)}%`,
                  }}
                >
                  <span className="text-[10px] font-bold">{count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rank Progression */}
      <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-3">
          {t("stats.streakRanks")}
        </p>
        <div className="grid grid-cols-5 gap-1 text-center">
          {[
            { d: 7, rankKey: "rank.trainee" as const, e: "🎓" },
            { d: 30, rankKey: "rank.debut" as const, e: "🎤" },
            { d: 100, rankKey: "rank.rising" as const, e: "⭐" },
            { d: 200, rankKey: "rank.allKill" as const, e: "💥" },
            { d: 365, rankKey: "rank.legend" as const, e: "👑" },
          ].map((r) => (
            <div
              key={r.d}
              className={`rounded-lg py-2 text-[10px] ${
                stats.currentStreak >= r.d
                  ? "bg-[var(--color-accent)]/20 text-[var(--color-accent)]"
                  : "bg-zinc-800/50 text-[var(--color-muted)]"
              }`}
            >
              <p className="text-base">{r.e}</p>
              <p className="font-medium">{t(r.rankKey)}</p>
              <p className="opacity-60">{r.d}d</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleShareStats}
        className="mt-4 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] py-2.5 text-sm font-medium hover:bg-[var(--color-card-hover)] transition-colors"
      >
        {t("result.shareStats")} 📋
      </button>
      <Toast message={`${t("toast.copied")} 📋`} show={showToast} onClose={() => setShowToast(false)} />
    </Modal>
  );
}
