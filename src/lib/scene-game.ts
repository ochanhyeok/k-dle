import { scenes, type Scene } from "@/data/scenes";
import { dramas } from "@/data/dramas";
import { encodeCompareData } from "@/lib/compare";

/** Scramble index for mixed difficulty distribution */
function mixIndex(num: number, len: number): number {
  let x = num % len;
  x = (x * 37 + 13) % len;
  x = (x * 41 + 7) % len;
  return x;
}

export function getTodaysScene(): Scene {
  const now = new Date();
  const start = new Date(2026, 1, 6);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const puzzleNum = Math.round((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const index = mixIndex(puzzleNum + 7, scenes.length);
  return scenes[index];
}

export function getScenePuzzleNumber(): number {
  const now = new Date();
  const start = new Date(2026, 1, 6);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export function getSceneHints(scene: Scene, revealedCount: number): string[] {
  return scene.descriptions.slice(0, revealedCount);
}

export function checkSceneGuess(guess: string, target: Scene): boolean {
  const g = guess.toLowerCase().trim();
  return (
    g === target.dramaTitle.toLowerCase().trim() ||
    g === target.dramaTitleKo.trim()
  );
}

export function getAllDramaTitlesForScene(): { title: string; titleKo: string }[] {
  return dramas.map((d) => ({ title: d.title, titleKo: d.titleKo }));
}

export function generateSceneShareText(
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
  return `🎭 K-Dle #${puzzleNumber} Scene-dle ${score}\n\n${squares}\n\nk-dle.vercel.app/scene-dle?r=${r}`;
}
