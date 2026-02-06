"use client";

import { useEffect, useState } from "react";
import { loadUnifiedStats } from "@/lib/unified-stats";
import { useTranslation, type TFunction } from "@/lib/i18n";

function getStreakRank(streak: number, t: TFunction): { emoji: string; title: string } {
  if (streak >= 365) return { emoji: "👑", title: t("rank.hallyuLegend") };
  if (streak >= 200) return { emoji: "💥", title: t("rank.allKill") };
  if (streak >= 100) return { emoji: "⭐", title: t("rank.risingStar") };
  if (streak >= 30) return { emoji: "🎤", title: t("rank.debut") };
  if (streak >= 7) return { emoji: "🎓", title: t("rank.trainee") };
  return { emoji: "🔥", title: "" };
}

export default function StreakBanner() {
  const [streak, setStreak] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const stats = loadUnifiedStats();
    setStreak(stats.currentStreak);
    setMounted(true);
  }, []);

  const { emoji, title } = getStreakRank(streak, t);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-gradient-to-b from-[var(--color-card)] to-[var(--color-background)] p-5 text-center">
      <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-2">
        {t("streak.title")}
      </p>
      <p className="text-4xl font-bold mb-1">
        {mounted ? `${emoji} ${streak}` : "🔥 —"}
      </p>
      <p className="text-xs text-[var(--color-muted)]">
        {!mounted
          ? ""
          : streak === 0
          ? t("streak.start")
          : title
          ? t("streak.rank", { title })
          : t("streak.keepGoing")}
      </p>
    </div>
  );
}
