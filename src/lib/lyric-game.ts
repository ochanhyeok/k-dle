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

export function getTodaysLyric(): LyricSong {
  const now = new Date();
  const start = new Date(2026, 1, 6);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const puzzleNum = Math.round((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const index = mixIndex(puzzleNum + 31, lyrics.length);
  return lyrics[index];
}

export function getLyricPuzzleNumber(): number {
  const now = new Date();
  const start = new Date(2026, 1, 6);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export function getLyricHints(song: LyricSong, revealedCount: number, locale?: string): string[] {
  const lines = getLocalizedLyrics(song.id, locale ?? "en") ?? song.lyrics;
  return lines.slice(0, revealedCount);
}

export function checkLyricGuess(guess: string, target: LyricSong): boolean {
  const g = guess.toLowerCase().trim();
  return (
    g === target.title.toLowerCase().trim() ||
    g === target.titleKo.trim()
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
  return `📝 K-Dle #${puzzleNumber} Lyric-dle ${score}\n\n${squares}\n\nk-dle.vercel.app/lyric-dle?r=${r}`;
}
