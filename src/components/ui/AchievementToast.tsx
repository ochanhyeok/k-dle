"use client";

import { useState, useEffect } from "react";
import { getBadgeById, type BadgeTier } from "@/lib/achievements";
import { useTranslation, type TranslationKey } from "@/lib/i18n";

const TIER_COLORS: Record<BadgeTier, string> = {
  trainee: "from-amber-600 to-amber-800 border-amber-500/40",
  rookie: "from-slate-500 to-slate-700 border-slate-400/40",
  star: "from-yellow-500 to-amber-700 border-yellow-400/40",
  legend: "from-purple-600 to-indigo-800 border-purple-400/40",
};

const TIER_ICON_COLORS: Record<BadgeTier, string> = {
  trainee: "text-amber-300",
  rookie: "text-slate-200",
  star: "text-yellow-200",
  legend: "text-purple-200",
};

interface Props {
  badgeIds: string[];
  onDone: () => void;
}

export default function AchievementToast({ badgeIds, onDone }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"enter" | "show" | "exit">("enter");
  const { t } = useTranslation();

  const currentBadgeId = badgeIds[currentIndex];
  const badge = currentBadgeId ? getBadgeById(currentBadgeId) : null;

  useEffect(() => {
    if (!badge) { onDone(); return; }

    // Enter animation
    const enterTimer = setTimeout(() => setPhase("show"), 100);
    // Hold for 2.5 seconds
    const exitTimer = setTimeout(() => setPhase("exit"), 2600);
    // Move to next or finish
    const nextTimer = setTimeout(() => {
      if (currentIndex < badgeIds.length - 1) {
        setCurrentIndex((i) => i + 1);
        setPhase("enter");
      } else {
        onDone();
      }
    }, 3100);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(nextTimer);
    };
  }, [currentIndex, badge, badgeIds.length, onDone]);

  if (!badge) return null;

  const colors = TIER_COLORS[badge.tier];
  const iconColor = TIER_ICON_COLORS[badge.tier];

  return (
    <div
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ease-out ${
        phase === "enter"
          ? "opacity-0 -translate-y-4 scale-95"
          : phase === "show"
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-95"
      }`}
    >
      <div
        className={`flex items-center gap-3 rounded-2xl border bg-gradient-to-r ${colors} px-5 py-3.5 shadow-2xl backdrop-blur-sm min-w-[280px]`}
      >
        {/* Animated badge icon */}
        <div className="relative shrink-0">
          <div className={`w-11 h-11 rounded-full bg-white/10 flex items-center justify-center ${
            phase === "show" ? "animate-[badge-pop_0.5s_ease-out]" : ""
          }`}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={iconColor}
            >
              <path d={badge.iconPath} />
            </svg>
          </div>
          {/* Sparkle effect */}
          {phase === "show" && (
            <div className="absolute -top-1 -right-1 w-3 h-3 animate-ping">
              <svg viewBox="0 0 12 12" fill="currentColor" className="text-yellow-300">
                <path d="M6 0l1.5 4.5L12 6l-4.5 1.5L6 12l-1.5-4.5L0 6l4.5-1.5z" />
              </svg>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">
            {t("badge.unlocked")}
          </p>
          <p className="text-sm font-bold text-white truncate">
            {t(badge.nameKey as TranslationKey)}
          </p>
        </div>
      </div>
    </div>
  );
}
