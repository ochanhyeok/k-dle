const UNIFIED_STATS_KEY = "k-dle-unified-stats";

export interface UnifiedStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
  lastWinDate: string;
}

function getDefaultStats(): UnifiedStats {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0],
    lastWinDate: "",
  };
}

export function loadUnifiedStats(): UnifiedStats {
  if (typeof window === "undefined") return getDefaultStats();
  try {
    const raw = localStorage.getItem(UNIFIED_STATS_KEY);
    if (raw) {
      const stats: UnifiedStats = JSON.parse(raw);
      if (stats.lastWinDate && stats.currentStreak > 0) {
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        if (stats.lastWinDate !== today && stats.lastWinDate !== yesterday) {
          stats.currentStreak = 0;
          localStorage.setItem(UNIFIED_STATS_KEY, JSON.stringify(stats));
        }
      }
      return stats;
    }
    // Migrate from old Drama-dle only stats
    const oldRaw = localStorage.getItem("k-dle-stats");
    if (oldRaw) {
      const old = JSON.parse(oldRaw);
      const migrated: UnifiedStats = {
        gamesPlayed: old.gamesPlayed || 0,
        gamesWon: old.gamesWon || 0,
        currentStreak: old.currentStreak || 0,
        maxStreak: old.maxStreak || 0,
        guessDistribution: old.guessDistribution || [0, 0, 0, 0, 0, 0],
        lastWinDate: old.lastPlayedDate || "",
      };
      localStorage.setItem(UNIFIED_STATS_KEY, JSON.stringify(migrated));
      return migrated;
    }
    return getDefaultStats();
  } catch {
    return getDefaultStats();
  }
}

export function recordGameResult(won: boolean, guessCount: number): UnifiedStats {
  const stats = loadUnifiedStats();
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  stats.gamesPlayed += 1;

  if (won) {
    stats.gamesWon += 1;
    if (guessCount >= 1 && guessCount <= 6) {
      stats.guessDistribution[guessCount - 1] += 1;
    }
    if (stats.lastWinDate !== today) {
      stats.currentStreak = stats.lastWinDate === yesterday ? stats.currentStreak + 1 : 1;
      stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
      stats.lastWinDate = today;
    }
  }

  localStorage.setItem(UNIFIED_STATS_KEY, JSON.stringify(stats));
  return stats;
}

export function generateStatsShareText(stats: UnifiedStats): string {
  const winRate = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0;
  const lines = [
    "🏆 My K-dle Stats",
    "",
    `📊 ${stats.gamesPlayed} games played | ${winRate}% win rate`,
    `🔥 ${stats.currentStreak}-day streak (best: ${stats.maxStreak})`,
    "",
    "k-dle.vercel.app",
  ];
  return lines.join("\n");
}
