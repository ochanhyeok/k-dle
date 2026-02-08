import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, increment } from "firebase/firestore";

const FANDOM_KEY = "k-dle-fandom";

export const FANDOMS = [
  { id: "army", label: "ARMY", group: "BTS" },
  { id: "blink", label: "BLINK", group: "BLACKPINK" },
  { id: "once", label: "ONCE", group: "TWICE" },
  { id: "stay", label: "STAY", group: "Stray Kids" },
  { id: "carat", label: "CARAT", group: "SEVENTEEN" },
  { id: "engene", label: "ENGENE", group: "ENHYPEN" },
  { id: "moa", label: "MOA", group: "TXT" },
  { id: "atiny", label: "ATINY", group: "ATEEZ" },
  { id: "nctzen", label: "NCTzen", group: "NCT" },
  { id: "midzy", label: "MIDZY", group: "ITZY" },
  { id: "fearnot", label: "FEARLESS", group: "LE SSERAFIM" },
  { id: "nswer", label: "Nswer", group: "(G)I-DLE" },
  { id: "kdrama", label: "K-Drama Fan", group: "" },
  { id: "casual", label: "Casual Fan", group: "" },
] as const;

export type FandomId = typeof FANDOMS[number]["id"];

export interface FandomStats {
  plays: number;
  wins: number;
  totalGuesses: number;
}

export interface FandomLeaderboardEntry {
  id: FandomId;
  label: string;
  group: string;
  plays: number;
  wins: number;
  winRate: number;
  avgGuesses: number;
}

export function getSelectedFandom(): FandomId | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(FANDOM_KEY) as FandomId | null;
}

export function setSelectedFandom(fandomId: FandomId): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(FANDOM_KEY, fandomId);
}

function getTodayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getSubmittedKey(mode: string): string {
  return `k-dle-fandom-submitted-${mode}-${getTodayKey()}`;
}

const VALID_MODES = ["drama", "idol", "lyric", "scene"];
const VALID_FANDOM_IDS = FANDOMS.map(f => f.id);

export async function recordFandomResult(
  mode: string,
  fandomId: FandomId,
  won: boolean,
  guessCount: number
): Promise<void> {
  try {
    if (typeof window === "undefined") return;
    if (!VALID_MODES.includes(mode)) return;
    if (!VALID_FANDOM_IDS.includes(fandomId)) return;
    if (!Number.isInteger(guessCount) || guessCount < 1 || guessCount > 6) return;
    if (localStorage.getItem(getSubmittedKey(mode))) return;

    const docRef = doc(db, "fandom-stats", `${getTodayKey()}_${mode}`);
    const data: Record<string, ReturnType<typeof increment>> = {
      [`${fandomId}_plays`]: increment(1),
    };
    if (won) {
      data[`${fandomId}_wins`] = increment(1);
      data[`${fandomId}_guesses`] = increment(guessCount);
    }

    await setDoc(docRef, data, { merge: true });
    localStorage.setItem(getSubmittedKey(mode), "1");
  } catch {
    // Silent fail
  }
}

export async function fetchFandomLeaderboard(mode: string): Promise<FandomLeaderboardEntry[]> {
  try {
    const docRef = doc(db, "fandom-stats", `${getTodayKey()}_${mode}`);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return [];

    const data = snap.data();
    const entries: FandomLeaderboardEntry[] = [];

    for (const fandom of FANDOMS) {
      const plays = data[`${fandom.id}_plays`] || 0;
      const wins = data[`${fandom.id}_wins`] || 0;
      const totalGuesses = data[`${fandom.id}_guesses`] || 0;

      if (plays > 0) {
        entries.push({
          id: fandom.id,
          label: fandom.label,
          group: fandom.group,
          plays,
          wins,
          winRate: Math.round((wins / plays) * 100),
          avgGuesses: wins > 0 ? Math.round((totalGuesses / wins) * 10) / 10 : 0,
        });
      }
    }

    // Sort by win rate desc, then avg guesses asc
    entries.sort((a, b) => {
      if (b.winRate !== a.winRate) return b.winRate - a.winRate;
      if (a.avgGuesses !== b.avgGuesses) return a.avgGuesses - b.avgGuesses;
      return b.plays - a.plays;
    });

    return entries;
  } catch {
    return [];
  }
}
