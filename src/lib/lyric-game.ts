import { lyrics, type LyricSong } from "@/data/lyrics";
import { encodeCompareData } from "@/lib/compare";
import { getLocalizedLyrics } from "@/data/i18n/lyric-i18n";

/** Scramble index for mixed difficulty distribution */
function mixIndex(num: number, len: number): number {
  let x = num % len;
  x = (x * 37 + 13) % len;
  x = (x * 41 + 7) % len;
  return x;
}

/** Get a globally famous song for new user onboarding */
export function getWelcomeLyric(): LyricSong {
  return lyrics.find((l) => l.id === "dynamite")!;
}

export function getTodaysLyric(): LyricSong {
  const now = new Date();
  const start = new Date(2026, 1, 6);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const puzzleNum = Math.max(0, Math.round((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const index = mixIndex(puzzleNum + 31, lyrics.length);
  return lyrics[index];
}

/** Get lyric for a specific puzzle number (used by archive) */
export function getLyricByPuzzleNumber(puzzleNum: number): LyricSong {
  const index = mixIndex(puzzleNum + 31, lyrics.length);
  return lyrics[index];
}

export function getLyricPuzzleNumber(): number {
  const now = new Date();
  const start = new Date(2026, 1, 6);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
}

export function getLyricHints(song: LyricSong, revealedCount: number): string[] {
  // Show lyrics in the song's original language (English for eng songs, Korean for the rest)
  if (song.lang === "en") {
    return song.lyrics.slice(0, revealedCount);
  }
  // Korean originals: use Korean paraphrases
  const koLines = getLocalizedLyrics(song.id, "ko");
  return (koLines ?? song.lyrics).slice(0, revealedCount);
}

export function checkLyricGuess(guess: string, target: LyricSong): boolean {
  const g = guess.toLowerCase().trim();
  return (
    g === target.title.toLowerCase().trim() ||
    g === target.titleKo.toLowerCase().trim()
  );
}

export function getAllSongTitles(): { title: string; titleKo: string; artist: string }[] {
  return lyrics.map((l) => ({ title: l.title, titleKo: l.titleKo, artist: l.artist }));
}

export function generateLyricShareText(
  puzzleNumber: number,
  guesses: string[],
  won: boolean,
  maxGuesses: number
): string {
  const score = won ? `${guesses.length}/${maxGuesses}` : `X/${maxGuesses}`;
  const squares = guesses
    .map((_, i) => (i === guesses.length - 1 && won ? "🟩" : "🟥"))
    .join("");
  const r = encodeCompareData({ puzzleNum: puzzleNumber, guessCount: guesses.length, won });
  return `📝 K-Dle #${puzzleNumber} Lyric-dle ${score}\n\n${squares}\n\nhttps://k-dle.vercel.app/lyric-dle?r=${r}`;
}

// Archive state management
const ARCHIVE_KEY = "k-dle-archive-lyric";

export function loadLyricArchiveState(puzzleNum: number): {
  guesses: string[];
  status: "playing" | "won" | "lost";
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ARCHIVE_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw);
    const entry = map[puzzleNum];
    if (!entry) return null;
    return { guesses: entry.guesses, status: entry.status };
  } catch {
    return null;
  }
}

export function saveLyricArchiveState(
  puzzleNum: number,
  guesses: string[],
  status: "playing" | "won" | "lost"
): void {
  if (typeof window === "undefined") return;
  let map: Record<number, { guesses: string[]; status: string }> = {};
  try {
    const raw = localStorage.getItem(ARCHIVE_KEY);
    if (raw) map = JSON.parse(raw);
  } catch { /* ignore */ }
  map[puzzleNum] = { guesses, status };
  localStorage.setItem(ARCHIVE_KEY, JSON.stringify(map));
}

export function loadAllLyricArchiveStates(): Record<number, { guesses: string[]; status: string }> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(ARCHIVE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
