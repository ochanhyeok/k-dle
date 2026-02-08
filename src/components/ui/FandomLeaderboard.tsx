"use client";

import { useState, useEffect } from "react";
import { fetchFandomLeaderboard, getSelectedFandom, type FandomLeaderboardEntry } from "@/lib/fandom";
import { useTranslation } from "@/lib/i18n";

interface Props {
  mode: string;
}

export default function FandomLeaderboard({ mode }: Props) {
  const [entries, setEntries] = useState<FandomLeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const myFandom = getSelectedFandom();

  useEffect(() => {
    fetchFandomLeaderboard(mode)
      .then(setEntries)
      .finally(() => setLoading(false));
  }, [mode]);

  if (loading) {
    return (
      <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
        <p className="text-xs text-[var(--color-muted)] text-center">{t("fandom.loading")}</p>
      </div>
    );
  }

  if (entries.length === 0) return null;

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 animate-slide-up">
      <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-3 text-center">
        {t("fandom.leaderboardTitle")}
      </p>

      <div className="space-y-1.5">
        {entries.slice(0, 10).map((entry, i) => {
          const isMine = entry.id === myFandom;
          return (
            <div
              key={entry.id}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs ${
                isMine
                  ? "bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30"
                  : "border border-transparent"
              }`}
            >
              <span className="w-6 text-center font-mono shrink-0">
                {i < 3 ? medals[i] : `#${i + 1}`}
              </span>
              <span className={`flex-1 font-medium ${isMine ? "text-[var(--color-accent)]" : ""}`}>
                {entry.label}
                {entry.group && (
                  <span className="text-[var(--color-muted)] font-normal ml-1">
                    {entry.group}
                  </span>
                )}
              </span>
              <span className="tabular-nums text-[var(--color-muted)]">
                {entry.winRate}% {t("stats.winRate")}
              </span>
              <span className="tabular-nums text-[var(--color-muted)] w-12 text-right">
                {entry.plays} {t("fandom.plays")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
