import { lyrics, type LyricSong } from "@/data/lyrics";

/** Scramble index for mixed difficulty distribution */
function mixIndex(num: number, len: number): number {
  let x = num % len;
  x = (x * 37 + 13) % len;
  x = (x * 41 + 7) % len;
  return x;
}

export function getTodaysLyric(): LyricSong {
  const start = new Date("2026-02-06");
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  const puzzleNum = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = mixIndex(puzzleNum + 31, lyrics.length);
  return lyrics[index];
}

export function getLyricPuzzleNumber(): number {
  const start = new Date("2026-02-06");
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export function getLyricHints(song: LyricSong, revealedCount: number): string[] {
  return song.lyrics.slice(0, revealedCount);
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
  return `📝 K-Dle #${puzzleNumber} Lyric-dle ${score}\n\n${squares}\n\nPlay at k-dle.vercel.app 🎮`;
}
