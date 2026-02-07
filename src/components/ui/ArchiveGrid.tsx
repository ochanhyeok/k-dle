"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPuzzleNumber } from "@/lib/game";
import { loadAllArchiveStates } from "@/lib/game";
import { loadAllIdolArchiveStates } from "@/lib/idol-game";
import { loadAllLyricArchiveStates } from "@/lib/lyric-game";
import { loadAllSceneArchiveStates } from "@/lib/scene-game";
import { useTranslation } from "@/lib/i18n";

type GameMode = "drama-dle" | "idol-dle" | "lyric-dle" | "scene-dle";

interface ArchiveGridProps {
  mode: GameMode;
  emoji: string;
  title: string;
}

function getBaseDate(): Date {
  return new Date(2026, 1, 6); // Feb 6, 2026
}

function formatDate(puzzleNum: number): string {
  const base = getBaseDate();
  const date = new Date(base.getTime() + puzzleNum * 24 * 60 * 60 * 1000);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function loadStatesForMode(mode: GameMode): Record<number, { status: string }> {
  switch (mode) {
    case "drama-dle":
      return loadAllArchiveStates();
    case "idol-dle":
      return loadAllIdolArchiveStates();
    case "lyric-dle":
      return loadAllLyricArchiveStates();
    case "scene-dle":
      return loadAllSceneArchiveStates();
  }
}

export default function ArchiveGrid({ mode, emoji, title }: ArchiveGridProps) {
  const { t } = useTranslation();
  const [archiveStates, setArchiveStates] = useState<Record<number, { status: string }>>({});
  const [todayNum, setTodayNum] = useState(0);

  useEffect(() => {
    setTodayNum(getPuzzleNumber());
    setArchiveStates(loadStatesForMode(mode));
  }, [mode]);

  // Build puzzle list from 0 to today-1 (reverse order — newest first)
  const puzzles = [];
  for (let i = todayNum - 1; i >= 0; i--) {
    puzzles.push(i);
  }

  if (todayNum === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p className="text-[var(--color-muted)]">{t("archive.noPastPuzzles")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Today link */}
      <Link
        href={`/${mode}`}
        className="block mb-4 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 p-4 text-center hover:border-[var(--color-accent)]/60 transition-colors"
      >
        <span className="text-2xl">{emoji}</span>
        <p className="font-semibold mt-1">{t("archive.today")}</p>
        <p className="text-xs text-[var(--color-muted)]">
          {title} #{todayNum}
        </p>
      </Link>

      {/* Archive grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {puzzles.map((num) => {
          const state = archiveStates[num];
          const statusText = state?.status;
          const isWon = statusText === "won";
          const isLost = statusText === "lost";
          const isPlayed = isWon || isLost;

          return (
            <Link
              key={num}
              href={`/${mode}/archive/${num}`}
              className={`rounded-lg border p-3 text-center transition-colors hover:border-[var(--color-accent)]/50 ${
                isWon
                  ? "border-[var(--color-success)]/30 bg-[var(--color-success)]/10"
                  : isLost
                  ? "border-[var(--color-error)]/30 bg-[var(--color-error)]/10"
                  : "border-[var(--color-border)] bg-[var(--color-card)]"
              }`}
            >
              <p className="text-xs font-medium text-[var(--color-foreground)]">
                #{num}
              </p>
              <p className="text-[10px] text-[var(--color-muted)] mt-0.5">
                {formatDate(num)}
              </p>
              <p className="text-sm mt-1">
                {isWon ? "🟩" : isLost ? "🟥" : "⬜"}
              </p>
              {isPlayed && (
                <p className="text-[9px] text-[var(--color-muted)] mt-0.5">
                  {t("archive.played")}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
