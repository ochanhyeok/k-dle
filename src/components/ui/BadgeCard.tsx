"use client";

import type { Badge, BadgeTier, EarnedBadge } from "@/lib/achievements";
import { useTranslation, type TranslationKey } from "@/lib/i18n";

/* ── Tier-based gradient & glow colors ── */

const TIER_STYLES: Record<
  BadgeTier,
  {
    ring: string;
    bg: string;
    glow: string;
    iconColor: string;
    label: string;
  }
> = {
  trainee: {
    ring: "from-amber-700 via-amber-500 to-amber-700",
    bg: "from-amber-900/80 to-amber-950/90",
    glow: "shadow-[0_0_20px_rgba(217,119,6,0.25)]",
    iconColor: "text-amber-400",
    label: "text-amber-400",
  },
  rookie: {
    ring: "from-slate-400 via-slate-200 to-slate-400",
    bg: "from-slate-700/80 to-slate-800/90",
    glow: "shadow-[0_0_20px_rgba(148,163,184,0.25)]",
    iconColor: "text-slate-300",
    label: "text-slate-300",
  },
  star: {
    ring: "from-yellow-600 via-yellow-300 to-yellow-600",
    bg: "from-yellow-900/80 to-yellow-950/90",
    glow: "shadow-[0_0_24px_rgba(234,179,8,0.35)]",
    iconColor: "text-yellow-300",
    label: "text-yellow-400",
  },
  legend: {
    ring: "from-purple-500 via-pink-400 via-cyan-400 to-purple-500",
    bg: "from-purple-900/80 to-indigo-950/90",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.4)]",
    iconColor: "text-purple-300",
    label: "text-purple-300",
  },
};

/* ── Light mode overrides ── */
const TIER_STYLES_LIGHT: Record<BadgeTier, { bg: string; glow: string }> = {
  trainee: {
    bg: "from-amber-50 to-amber-100",
    glow: "shadow-[0_0_20px_rgba(217,119,6,0.15)]",
  },
  rookie: {
    bg: "from-slate-50 to-slate-100",
    glow: "shadow-[0_0_20px_rgba(100,116,139,0.15)]",
  },
  star: {
    bg: "from-yellow-50 to-amber-100",
    glow: "shadow-[0_0_24px_rgba(234,179,8,0.2)]",
  },
  legend: {
    bg: "from-purple-50 to-indigo-100",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.2)]",
  },
};

interface Props {
  badge: Badge;
  earned?: EarnedBadge;
  compact?: boolean;
}

export default function BadgeCard({ badge, earned, compact }: Props) {
  const { t } = useTranslation();
  const isLocked = !earned;
  const style = TIER_STYLES[badge.tier];
  const lightStyle = TIER_STYLES_LIGHT[badge.tier];
  const progress = !earned && badge.getProgress ? badge.getProgress() : null;

  if (compact) {
    return (
      <div className="flex flex-col items-center gap-1">
        <div
          className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isLocked ? "opacity-30 grayscale" : style.glow
          }`}
        >
          {/* Gradient ring */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${style.ring} p-[2px]`}
          >
            <div className="w-full h-full rounded-full bg-[var(--color-card)] flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isLocked ? "text-[var(--color-muted)]" : style.iconColor}
              >
                <path d={badge.iconPath} />
              </svg>
            </div>
          </div>
        </div>
        <span className={`text-[9px] font-medium text-center leading-tight max-w-[60px] ${isLocked ? "text-[var(--color-muted)]" : ""}`}>
          {t(badge.nameKey as TranslationKey)}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
        isLocked
          ? "border-[var(--color-border)] opacity-60"
          : "border-transparent"
      }`}
    >
      {/* Outer glow border for unlocked badges */}
      {!isLocked && (
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${style.ring} -z-10`} />
      )}

      <div
        className={`m-[1px] rounded-2xl p-4 ${
          isLocked
            ? "bg-[var(--color-card)]"
            : `bg-gradient-to-br ${style.bg} dark-badge ${style.glow}`
        }`}
        style={!isLocked ? { ["--light-bg" as string]: lightStyle.bg } : undefined}
      >
        <div className="flex items-start gap-3">
          {/* Badge icon circle */}
          <div className="relative shrink-0">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                isLocked ? "bg-[var(--color-border)]/30" : ""
              }`}
            >
              {/* Ring gradient */}
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${style.ring} p-[2px] ${
                  isLocked ? "opacity-20 grayscale" : ""
                }`}
              >
                <div className={`w-full h-full rounded-full flex items-center justify-center ${
                  isLocked ? "bg-[var(--color-card)]" : "bg-[var(--color-background)]/80"
                }`}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isLocked ? "text-[var(--color-muted)] opacity-40" : style.iconColor}
                  >
                    <path d={badge.iconPath} />
                  </svg>
                </div>
              </div>
            </div>

            {/* Lock overlay */}
            {isLocked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-[var(--color-muted)] opacity-60 drop-shadow-sm"
                >
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z" />
                </svg>
              </div>
            )}
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h4 className={`text-sm font-semibold ${isLocked ? "" : ""}`}>
                {t(badge.nameKey as TranslationKey)}
              </h4>
              <span
                className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                  isLocked
                    ? "bg-[var(--color-border)] text-[var(--color-muted)]"
                    : `bg-gradient-to-r ${style.ring} text-black/80`
                }`}
              >
                {t(`badge.tier.${badge.tier}` as TranslationKey)}
              </span>
            </div>
            <p className="text-xs text-[var(--color-muted)] mb-2">
              {t(badge.descKey as TranslationKey)}
            </p>

            {/* Progress bar for locked badges */}
            {isLocked && progress && (
              <div>
                <div className="flex justify-between text-[10px] text-[var(--color-muted)] mb-1">
                  <span>{t("badge.progress")}</span>
                  <span className="tabular-nums">{progress.current}/{progress.target}</span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--color-border)]/40 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${style.ring} transition-all duration-500`}
                    style={{ width: `${Math.round((progress.current / progress.target) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Earned date */}
            {earned && (
              <p className="text-[10px] text-[var(--color-muted)]">
                {t("badge.earned")} {new Date(earned.earnedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
