import { dramas, type Drama } from "@/data/dramas";

export interface GameState {
  targetDrama: Drama;
  guesses: string[];
  maxGuesses: number;
  status: "playing" | "won" | "lost";
  puzzleNumber: number;
}

/** Get a consistent daily puzzle number based on date */
export function getPuzzleNumber(): number {
  const start = new Date("2026-02-06");
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/** Get today's drama deterministically */
export function getTodaysDrama(): Drama {
  const puzzleNum = getPuzzleNumber();
  const index = puzzleNum % dramas.length;
  return dramas[index];
}

/** Generate hints for a drama based on attempt number (0-indexed) */
export function getHints(drama: Drama, revealedCount: number): string[] {
  const allHints = [
    `📌 Genre: ${drama.genre.join(", ")} • Year: ${drama.year}`,
    `📺 Network: ${drama.network} • Episodes: ${drama.episodes}`,
    `🔑 Keywords: ${drama.synopsisKeywords.join(", ")}`,
    `👤 Lead actor initials: ${drama.cast.slice(0, 2).map((name) => name.split(" ").map((n) => n[0]).join(".")).join(", ")}`,
    `💬 "${drama.famousQuote}"`,
    `🌟 Starring: ${drama.cast.slice(0, 2).join(", ")}`,
  ];
  return allHints.slice(0, revealedCount);
}

/** Check if a guess is correct */
export function checkGuess(guess: string, target: Drama): boolean {
  return (
    guess.toLowerCase().trim() === target.title.toLowerCase().trim() ||
    guess.toLowerCase().trim() === target.titleKo.trim()
  );
}

/** Get all drama titles for autocomplete */
export function getAllDramaTitles(): { title: string; titleKo: string }[] {
  return dramas.map((d) => ({ title: d.title, titleKo: d.titleKo }));
}

/** Generate share text */
export function generateShareText(
  puzzleNumber: number,
  guesses: string[],
  won: boolean,
  maxGuesses: number
): string {
  const score = won ? `${guesses.length}/${maxGuesses}` : `X/${maxGuesses}`;
  const squares = guesses
    .map((_, i) => (i === guesses.length - 1 && won ? "🟩" : "🟥"))
    .join("");

  return `🎬 K-Dle #${puzzleNumber} Drama-dle ${score}\n\n${squares}\n\n🔥 k-dle.com`;
}

const STORAGE_KEY = "k-dle-state";
const STATS_KEY = "k-dle-stats";

export interface StoredStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
  lastPlayedDate: string;
}

export function getDefaultStats(): StoredStats {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0],
    lastPlayedDate: "",
  };
}

export function loadStats(): StoredStats {
  if (typeof window === "undefined") return getDefaultStats();
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? JSON.parse(raw) : getDefaultStats();
  } catch {
    return getDefaultStats();
  }
}

export function saveStats(stats: StoredStats): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function loadGameState(puzzleNumber: number): {
  guesses: string[];
  status: "playing" | "won" | "lost";
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw);
    if (state.puzzleNumber !== puzzleNumber) return null;
    return { guesses: state.guesses, status: state.status };
  } catch {
    return null;
  }
}

export function saveGameState(
  puzzleNumber: number,
  guesses: string[],
  status: "playing" | "won" | "lost"
): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ puzzleNumber, guesses, status })
  );
}
