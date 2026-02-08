import { loadUnifiedStats } from "./unified-stats";

// ─── Types ──────────────────────────────────────────

export type BadgeTier = "trainee" | "rookie" | "star" | "legend";
export type BadgeCategory = "streak" | "skill" | "discovery" | "social";

export interface Badge {
  id: string;
  nameKey: string;
  descKey: string;
  category: BadgeCategory;
  tier: BadgeTier;
  /** SVG viewBox path data for the badge icon */
  iconPath: string;
  /** Check if badge condition is met */
  check: () => boolean;
  /** Optional progress towards the badge */
  getProgress?: () => { current: number; target: number };
}

export interface EarnedBadge {
  id: string;
  earnedAt: number; // timestamp
}

// ─── SVG Icon Paths ─────────────────────────────────

const ICONS = {
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  fire: "M12 23c-3.6 0-8-3.13-8-8.38C4 9.52 8.26 4.48 11.13 2c.33-.29.87-.04.87.41v2.98c0 1.42 1.7 2.13 2.7 1.13l1.1-1.1c.26-.26.7-.1.73.27.28 3.39-1.34 6.23-3.43 7.9-.3.24-.1.7.27.7h2.05c.34 0 .56.36.4.65C14.33 18.1 12.26 23 12 23z",
  bolt: "M13 2L3 14h9l-1 10 10-12h-9l1-10z",
  trophy: "M5 3h14v2.5c0 3.47-2.61 6.33-6 6.93V17h3v2H8v-2h3v-4.57C7.61 11.83 5 8.97 5 5.5V3zm2 2v.5c0 2.47 1.79 4.53 4.14 4.97L12 10.5l.86-.03C15.21 10.03 17 7.97 17 5.5V5H7z",
  crown: "M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm0 2h14v2H5v-2z",
  diamond: "M12 2L2 12l10 10 10-10L12 2zm0 3.5L18.5 12 12 18.5 5.5 12 12 5.5z",
  target: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12zm0 4a2 2 0 100 4 2 2 0 000-4z",
  music: "M12 3v10.55A4 4 0 1014 17V7h4V3h-6z",
  grid: "M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z",
  compass: "M12 2a10 10 0 100 20 10 10 0 000-20zm3.5 6.5l-2 5-5 2 2-5 5-2z",
  archive: "M21 8V21H3V8l2-5h14l2 5zM5.62 5L4.38 8h15.24l-1.24-3H5.62zM12 12a2 2 0 100 4 2 2 0 000-4z",
  link: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  heart: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z",
  globe: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c1.25 0 2.86 2.02 3.63 6H8.37C9.14 6.02 10.75 4 12 4zM4.26 10h3.38c-.1.65-.14 1.32-.14 2s.05 1.35.14 2H4.26a8 8 0 010-4zm4.11 6c.77 3.98 2.38 6 3.63 6s2.86-2.02 3.63-6H8.37z",
  users: "M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.87M13 7a4 4 0 11-8 0 4 4 0 018 0zM5 21v-2a4 4 0 014-4h4a4 4 0 014 4v2",
  sparkle: "M12 1l2.09 6.26L22 9.27l-4.5 3.63L18.18 20 12 16.77 5.82 20l.68-7.1L2 9.27l7.91-2.01L12 1z",
};

// ─── Badge Definitions ──────────────────────────────

export const BADGES: Badge[] = [
  // === STREAK ===
  {
    id: "debut",
    nameKey: "badge.debut.name",
    descKey: "badge.debut.desc",
    category: "streak",
    tier: "trainee",
    iconPath: ICONS.star,
    check: () => loadUnifiedStats().currentStreak >= 1 || loadUnifiedStats().maxStreak >= 1,
  },
  {
    id: "comeback",
    nameKey: "badge.comeback.name",
    descKey: "badge.comeback.desc",
    category: "streak",
    tier: "rookie",
    iconPath: ICONS.fire,
    check: () => loadUnifiedStats().maxStreak >= 7,
    getProgress: () => ({ current: Math.min(loadUnifiedStats().maxStreak, 7), target: 7 }),
  },
  {
    id: "allkill",
    nameKey: "badge.allkill.name",
    descKey: "badge.allkill.desc",
    category: "streak",
    tier: "star",
    iconPath: ICONS.bolt,
    check: () => loadUnifiedStats().maxStreak >= 30,
    getProgress: () => ({ current: Math.min(loadUnifiedStats().maxStreak, 30), target: 30 }),
  },
  {
    id: "daesang",
    nameKey: "badge.daesang.name",
    descKey: "badge.daesang.desc",
    category: "streak",
    tier: "legend",
    iconPath: ICONS.trophy,
    check: () => loadUnifiedStats().maxStreak >= 100,
    getProgress: () => ({ current: Math.min(loadUnifiedStats().maxStreak, 100), target: 100 }),
  },

  // === SKILL ===
  {
    id: "center",
    nameKey: "badge.center.name",
    descKey: "badge.center.desc",
    category: "skill",
    tier: "star",
    iconPath: ICONS.target,
    check: () => loadUnifiedStats().guessDistribution[0] >= 1,
  },
  {
    id: "encore",
    nameKey: "badge.encore.name",
    descKey: "badge.encore.desc",
    category: "skill",
    tier: "rookie",
    iconPath: ICONS.music,
    check: () => loadUnifiedStats().gamesWon >= 10,
    getProgress: () => ({ current: Math.min(loadUnifiedStats().gamesWon, 10), target: 10 }),
  },
  {
    id: "triple-crown",
    nameKey: "badge.tripleCrown.name",
    descKey: "badge.tripleCrown.desc",
    category: "skill",
    tier: "star",
    iconPath: ICONS.crown,
    check: () => loadUnifiedStats().gamesWon >= 50,
    getProgress: () => ({ current: Math.min(loadUnifiedStats().gamesWon, 50), target: 50 }),
  },
  {
    id: "maxlevel",
    nameKey: "badge.maxlevel.name",
    descKey: "badge.maxlevel.desc",
    category: "skill",
    tier: "legend",
    iconPath: ICONS.diamond,
    check: () => loadUnifiedStats().gamesWon >= 100,
    getProgress: () => ({ current: Math.min(loadUnifiedStats().gamesWon, 100), target: 100 }),
  },

  // === DISCOVERY ===
  {
    id: "trainee",
    nameKey: "badge.trainee.name",
    descKey: "badge.trainee.desc",
    category: "discovery",
    tier: "trainee",
    iconPath: ICONS.music,
    check: () => loadUnifiedStats().gamesPlayed >= 1,
  },
  {
    id: "multi",
    nameKey: "badge.multi.name",
    descKey: "badge.multi.desc",
    category: "discovery",
    tier: "rookie",
    iconPath: ICONS.grid,
    check: () => {
      if (typeof window === "undefined") return false;
      const modes = ["k-dle-drama-state", "k-dle-idol-state", "k-dle-lyric-state", "k-dle-scene-state"];
      return modes.every((key) => localStorage.getItem(key) !== null);
    },
  },
  {
    id: "allrounder",
    nameKey: "badge.allrounder.name",
    descKey: "badge.allrounder.desc",
    category: "discovery",
    tier: "star",
    iconPath: ICONS.compass,
    check: () => {
      if (typeof window === "undefined") return false;
      const today = new Date().toISOString().split("T")[0];
      const keys = [
        { key: "k-dle-drama-state", puzzle: "drama" },
        { key: "k-dle-idol-state", puzzle: "idol" },
        { key: "k-dle-lyric-state", puzzle: "lyric" },
        { key: "k-dle-scene-state", puzzle: "scene" },
      ];
      return keys.every(({ key }) => {
        try {
          const raw = localStorage.getItem(key);
          if (!raw) return false;
          const data = JSON.parse(raw);
          if (data.status !== "won") return false;
          // Check if last played date is today using submitted key
          const submitted = localStorage.getItem(`k-dle-submitted-${key.replace("k-dle-", "").replace("-state", "")}-${today}`);
          return submitted !== null;
        } catch {
          return false;
        }
      });
    },
  },
  {
    id: "explorer",
    nameKey: "badge.explorer.name",
    descKey: "badge.explorer.desc",
    category: "discovery",
    tier: "rookie",
    iconPath: ICONS.archive,
    check: () => {
      if (typeof window === "undefined") return false;
      let count = 0;
      const archiveKeys = [
        "k-dle-archive-drama",
        "k-dle-archive-idol",
        "k-dle-archive-lyric",
        "k-dle-archive-scene",
      ];
      for (const key of archiveKeys) {
        try {
          const raw = localStorage.getItem(key);
          if (raw) count += Object.keys(JSON.parse(raw)).length;
        } catch { /* skip */ }
      }
      return count >= 5;
    },
    getProgress: () => {
      if (typeof window === "undefined") return { current: 0, target: 5 };
      let count = 0;
      const archiveKeys = [
        "k-dle-archive-drama",
        "k-dle-archive-idol",
        "k-dle-archive-lyric",
        "k-dle-archive-scene",
      ];
      for (const key of archiveKeys) {
        try {
          const raw = localStorage.getItem(key);
          if (raw) count += Object.keys(JSON.parse(raw)).length;
        } catch { /* skip */ }
      }
      return { current: Math.min(count, 5), target: 5 };
    },
  },

  // === SOCIAL ===
  {
    id: "challenger",
    nameKey: "badge.challenger.name",
    descKey: "badge.challenger.desc",
    category: "social",
    tier: "trainee",
    iconPath: ICONS.link,
    check: () => {
      if (typeof window === "undefined") return false;
      return localStorage.getItem("k-dle-challenge-shared") === "1";
    },
  },
  {
    id: "fandom-rep",
    nameKey: "badge.fandomRep.name",
    descKey: "badge.fandomRep.desc",
    category: "social",
    tier: "trainee",
    iconPath: ICONS.heart,
    check: () => {
      if (typeof window === "undefined") return false;
      return localStorage.getItem("k-dle-fandom") !== null;
    },
  },
  {
    id: "kculture",
    nameKey: "badge.kculture.name",
    descKey: "badge.kculture.desc",
    category: "social",
    tier: "legend",
    iconPath: ICONS.globe,
    check: () => loadUnifiedStats().gamesPlayed >= 200,
    getProgress: () => ({ current: Math.min(loadUnifiedStats().gamesPlayed, 200), target: 200 }),
  },
];

// ─── State Management ────────────────────────────────

const EARNED_KEY = "k-dle-achievements";

export function getEarnedBadges(): EarnedBadge[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(EARNED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEarnedBadges(badges: EarnedBadge[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(EARNED_KEY, JSON.stringify(badges));
}

/**
 * Check all badges and return newly earned badge IDs.
 * Call this after each game completion.
 */
export function checkAndAwardBadges(): string[] {
  const earned = getEarnedBadges();
  const earnedIds = new Set(earned.map((b) => b.id));
  const newlyEarned: string[] = [];

  for (const badge of BADGES) {
    if (earnedIds.has(badge.id)) continue;
    try {
      if (badge.check()) {
        earned.push({ id: badge.id, earnedAt: Date.now() });
        newlyEarned.push(badge.id);
      }
    } catch {
      // Skip failed checks
    }
  }

  if (newlyEarned.length > 0) {
    saveEarnedBadges(earned);
  }

  return newlyEarned;
}

export function getBadgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}

// ─── Tier Metadata ───────────────────────────────────

export const TIER_META: Record<BadgeTier, { labelKey: string; order: number }> = {
  trainee: { labelKey: "badge.tier.trainee", order: 0 },
  rookie: { labelKey: "badge.tier.rookie", order: 1 },
  star: { labelKey: "badge.tier.star", order: 2 },
  legend: { labelKey: "badge.tier.legend", order: 3 },
};

export const CATEGORY_META: Record<BadgeCategory, { labelKey: string; icon: string }> = {
  streak: { labelKey: "badge.cat.streak", icon: "🔥" },
  skill: { labelKey: "badge.cat.skill", icon: "⭐" },
  discovery: { labelKey: "badge.cat.discovery", icon: "🎯" },
  social: { labelKey: "badge.cat.social", icon: "💫" },
};
