import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, increment } from "firebase/firestore";

export type GameMode = "drama" | "idol" | "lyric" | "scene";

export interface DailyStatsData {
  plays: number;
  wins: number;
  g1: number;
  g2: number;
  g3: number;
  g4: number;
  g5: number;
  g6: number;
}

export interface DisplayStats {
  totalPlays: number;
  winRate: number;
  averageGuesses: number;
  guessDistribution: number[];
}

function getTodayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getDocId(mode: GameMode): string {
  return `${getTodayKey()}_${mode}`;
}

function getSubmittedKey(mode: GameMode): string {
  return `k-dle-submitted-${mode}-${getTodayKey()}`;
}

const VALID_MODES: GameMode[] = ["drama", "idol", "lyric", "scene"];

export async function recordDailyResult(
  mode: GameMode,
  won: boolean,
  guessCount: number
): Promise<void> {
  try {
    if (typeof window === "undefined") return;
    if (!VALID_MODES.includes(mode)) return;
    if (!Number.isInteger(guessCount) || guessCount < 1 || guessCount > 6) return;
    if (localStorage.getItem(getSubmittedKey(mode))) return;

    const docRef = doc(db, "daily-stats", getDocId(mode));
    const data: Record<string, ReturnType<typeof increment>> = {
      plays: increment(1),
    };
    if (won) {
      data.wins = increment(1);
      const guessKey = `g${guessCount}` as keyof DailyStatsData;
      data[guessKey] = increment(1);
    }

    await setDoc(docRef, data, { merge: true });
    localStorage.setItem(getSubmittedKey(mode), "1");
  } catch {
    // Silent fail — 게임 기능에 영향 없음
  }
}

export function computeDisplayStats(raw: DailyStatsData): DisplayStats {
  const dist = [raw.g1 || 0, raw.g2 || 0, raw.g3 || 0, raw.g4 || 0, raw.g5 || 0, raw.g6 || 0];
  const totalWinGuesses = dist.reduce((sum, count, i) => sum + count * (i + 1), 0);
  const totalWins = raw.wins || 0;

  return {
    totalPlays: raw.plays || 0,
    winRate: raw.plays > 0 ? Math.round((totalWins / raw.plays) * 100) : 0,
    averageGuesses: totalWins > 0 ? Math.round((totalWinGuesses / totalWins) * 10) / 10 : 0,
    guessDistribution: dist,
  };
}

export async function fetchDailyStats(mode: GameMode): Promise<DisplayStats | null> {
  try {
    const docRef = doc(db, "daily-stats", getDocId(mode));
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;

    const data = snap.data() as DailyStatsData;
    return computeDisplayStats(data);
  } catch {
    return null;
  }
}
