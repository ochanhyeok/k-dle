"use client";

import { useState, useEffect } from "react";
import {
  BADGES,
  getEarnedBadges,
  CATEGORY_META,
  type BadgeCategory,
  type EarnedBadge,
} from "@/lib/achievements";
import { useTranslation, type TranslationKey } from "@/lib/i18n";
import BadgeCard from "./BadgeCard";

interface Props {
  /** If true, shows a compact inline preview (e.g., on result screen) */
  inline?: boolean;
}

export default function BadgeCollection({ inline }: Props) {
  const [earned, setEarned] = useState<EarnedBadge[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    setEarned(getEarnedBadges());
  }, []);

  const earnedMap = new Map(earned.map((b) => [b.id, b]));
  const earnedCount = earned.length;
  const totalCount = BADGES.length;
  const pct = totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0;

  if (inline) {
    // Compact preview: show earned badges as small circles
    const recentEarned = [...earned].sort((a, b) => b.earnedAt - a.earnedAt).slice(0, 5);
    const recentBadges = recentEarned.map((e) => BADGES.find((b) => b.id === e.id)).filter(Boolean);

    if (recentBadges.length === 0) return null;

    return (
      <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 animate-slide-up">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider">
            {t("badge.collection")}
          </p>
          <span className="text-[10px] text-[var(--color-muted)] tabular-nums">
            {earnedCount}/{totalCount}
          </span>
        </div>
        <div className="flex justify-center gap-3 flex-wrap">
          {recentBadges.map((badge) => (
            <BadgeCard
              key={badge!.id}
              badge={badge!}
              earned={earnedMap.get(badge!.id)}
              compact
            />
          ))}
        </div>
      </div>
    );
  }

  // Full collection view
  const categories: BadgeCategory[] = ["streak", "skill", "discovery", "social"];

  return (
    <div className="space-y-6">
      {/* Overall progress */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 px-6 py-4">
          <div>
            <p className="text-3xl font-bold text-[var(--color-accent)] tabular-nums">
              {earnedCount}<span className="text-lg text-[var(--color-muted)]">/{totalCount}</span>
            </p>
            <p className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider">
              {t("badge.collected")}
            </p>
          </div>
          <div className="w-16 h-16 relative">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle
                cx="18" cy="18" r="16"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="3"
                opacity="0.3"
              />
              <circle
                cx="18" cy="18" r="16"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${pct} ${100 - pct}`}
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[var(--color-accent)]">
              {pct}%
            </span>
          </div>
        </div>
      </div>

      {/* Badges by category */}
      {categories.map((cat) => {
        const catBadges = BADGES.filter((b) => b.category === cat);
        const meta = CATEGORY_META[cat];

        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{meta.icon}</span>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                {t(meta.labelKey as TranslationKey)}
              </h3>
              <span className="text-[10px] text-[var(--color-muted)] tabular-nums">
                {catBadges.filter((b) => earnedMap.has(b.id)).length}/{catBadges.length}
              </span>
            </div>
            <div className="space-y-2">
              {catBadges.map((badge) => (
                <BadgeCard
                  key={badge.id}
                  badge={badge}
                  earned={earnedMap.get(badge.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
