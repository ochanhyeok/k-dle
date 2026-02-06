"use client";

import { useState } from "react";
import { loadUnifiedStats, generateStatsShareText, type UnifiedStats } from "@/lib/unified-stats";
import { shareResult } from "@/lib/share";
import Modal from "./Modal";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function getStreakTitle(streak: number): { title: string; emoji: string } {
  if (streak >= 365) return { title: "Hallyu Legend", emoji: "👑" };
  if (streak >= 200) return { title: "All-Kill", emoji: "💥" };
  if (streak >= 100) return { title: "Rising Star", emoji: "⭐" };
  if (streak >= 30) return { title: "Debut", emoji: "🎤" };
  if (streak >= 7) return { title: "Trainee", emoji: "🎓" };
  return { title: "Newcomer", emoji: "🌱" };
}

export default function StatsModal({ isOpen, onClose }: StatsModalProps) {
  const stats: UnifiedStats = loadUnifiedStats();
  const [shareStatus, setShareStatus] = useState<"shared" | "copied" | null>(null);

  const handleShareStats = async () => {
    if (!stats) return;
    const text = generateStatsShareText(stats);
    try {
      const result = await shareResult(text);
      setShareStatus(result);
      setTimeout(() => setShareStatus(null), 2000);
    } catch {
      // user cancelled
    }
  };

  const winPct =
    stats.gamesPlayed > 0
      ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
      : 0;

  const maxDist = Math.max(...stats.guessDistribution, 1);
  const { title: rankTitle, emoji: rankEmoji } = getStreakTitle(
    stats.currentStreak
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Statistics">
      {/* Rank Badge */}
      <div className="text-center mb-5 py-3 rounded-xl bg-gradient-to-b from-[var(--color-accent)]/10 to-transparent border border-[var(--color-accent)]/20">
        <p className="text-3xl mb-1">{rankEmoji}</p>
        <p className="text-sm font-semibold text-[var(--color-accent)]">
          {rankTitle}
        </p>
        <p className="text-[10px] text-[var(--color-muted)] mt-0.5">
          {stats.currentStreak} day streak
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-3 mb-6 text-center">
        <div>
          <p className="text-2xl font-bold">{stats.gamesPlayed}</p>
          <p className="text-[10px] text-[var(--color-muted)] uppercase">
            Played
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold">{winPct}%</p>
          <p className="text-[10px] text-[var(--color-muted)] uppercase">
            Win %
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.currentStreak}</p>
          <p className="text-[10px] text-[var(--color-muted)] uppercase">
            Streak
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.maxStreak}</p>
          <p className="text-[10px] text-[var(--color-muted)] uppercase">
            Max
          </p>
        </div>
      </div>

      {/* Guess Distribution */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-3">
          Guess Distribution
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
          Streak Ranks
        </p>
        <div className="grid grid-cols-5 gap-1 text-center">
          {[
            { d: 7, t: "Trainee", e: "🎓" },
            { d: 30, t: "Debut", e: "🎤" },
            { d: 100, t: "Rising", e: "⭐" },
            { d: 200, t: "All-Kill", e: "💥" },
            { d: 365, t: "Legend", e: "👑" },
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
              <p className="font-medium">{r.t}</p>
              <p className="opacity-60">{r.d}d</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleShareStats}
        className="mt-4 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] py-2.5 text-sm font-medium hover:bg-[var(--color-card-hover)] transition-colors"
      >
        {shareStatus === "copied" ? "Copied! ✓" : shareStatus === "shared" ? "Shared! ✓" : "Share My Stats 📤"}
      </button>
    </Modal>
  );
}
