import { scenes, type Scene } from "@/data/scenes";
import { dramas } from "@/data/dramas";

export function getTodaysScene(): Scene {
  const start = new Date("2026-02-06");
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  const puzzleNum = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = (puzzleNum + 7) % scenes.length;
  return scenes[index];
}

export function getScenePuzzleNumber(): number {
  const start = new Date("2026-02-06");
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
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
  return `🎭 K-Dle #${puzzleNumber} Scene-dle ${score}\n\n${squares}\n\n🔥 k-dle.com`;
}
