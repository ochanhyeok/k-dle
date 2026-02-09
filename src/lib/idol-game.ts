import { idols, type Idol } from "@/data/idols";
import { encodeCompareData } from "@/lib/compare";

/** Scramble index for mixed difficulty distribution */
function mixIndex(num: number, len: number): number {
  let x = num % len;
  x = (x * 37 + 13) % len;
  x = (x * 41 + 7) % len;
  return x;
}

export type CompareResult = "correct" | "partial" | "wrong";

export interface CompareRow {
  guess: Idol;
  results: {
    gender: CompareResult;
    group: CompareResult;
    position: CompareResult;
    nationality: CompareResult;
    debutYear: "correct" | "higher" | "lower";
    company: CompareResult;
    generation: CompareResult;
  };
}

/** Get a globally famous idol for new user onboarding */
export function getWelcomeIdol(): Idol {
  return idols.find((i) => i.id === "jungkook")!;
}

export function getTodaysIdol(): Idol {
  const now = new Date();
  const start = new Date(2026, 1, 6);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const puzzleNum = Math.round((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const index = mixIndex(puzzleNum + 17, idols.length);
  return idols[index];
}

export function getIdolPuzzleNumber(): number {
  const now = new Date();
  const start = new Date(2026, 1, 6);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

/** Get idol for a specific puzzle number (used by archive) */
export function getIdolByPuzzleNumber(puzzleNum: number): Idol {
  const index = mixIndex(puzzleNum + 17, idols.length);
  return idols[index];
}

export function compareIdols(guess: Idol, target: Idol): CompareRow["results"] {
  return {
    gender: guess.gender === target.gender ? "correct" : "wrong",
    group: guess.group === target.group ? "correct" : "wrong",
    position:
      guess.position === target.position
        ? "correct"
        : guess.position.split(" ").some((w) => target.position.includes(w))
        ? "partial"
        : "wrong",
    nationality:
      guess.nationality === target.nationality ? "correct" : "wrong",
    debutYear:
      guess.debutYear === target.debutYear
        ? "correct"
        : guess.debutYear > target.debutYear
        ? "lower"
        : "higher",
    company: guess.company === target.company ? "correct" : "wrong",
    generation: guess.generation === target.generation ? "correct" : "wrong",
  };
}

export function findIdolByName(name: string): Idol | undefined {
  return idols.find(
    (i) =>
      i.name.toLowerCase() === name.toLowerCase() || i.nameKo === name
  );
}

export function getAllIdolNames(): { name: string; nameKo: string; group: string }[] {
  return idols.map((i) => ({ name: i.name, nameKo: i.nameKo, group: i.group }));
}

export function generateIdolShareText(
  puzzleNumber: number,
  rows: CompareRow[],
  won: boolean,
  maxGuesses: number
): string {
  const score = won ? `${rows.length}/${maxGuesses}` : `X/${maxGuesses}`;
  const grid = rows
    .map((r) => {
      const res = r.results;
      const cells = [
        res.gender,
        res.group,
        res.position,
        res.nationality,
        res.debutYear === "correct" ? "correct" : "wrong",
        res.company,
        res.generation,
      ];
      return cells
        .map((c) => (c === "correct" ? "🟩" : c === "partial" ? "🟨" : "🟥"))
        .join("");
    })
    .join("\n");

  const r = encodeCompareData({ puzzleNum: puzzleNumber, guessCount: rows.length, won });
  return `🎤 K-Dle #${puzzleNumber} Idol-dle ${score}\n\n${grid}\n\nhttps://k-dle.vercel.app/idol-dle?r=${r}`;
}

// Archive state management
const ARCHIVE_KEY = "k-dle-archive-idol";

export function loadIdolArchiveState(puzzleNum: number): {
  guessNames: string[];
  status: "playing" | "won" | "lost";
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ARCHIVE_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw);
    const entry = map[puzzleNum];
    if (!entry) return null;
    return { guessNames: entry.guessNames, status: entry.status };
  } catch {
    return null;
  }
}

export function saveIdolArchiveState(
  puzzleNum: number,
  guessNames: string[],
  status: "playing" | "won" | "lost"
): void {
  if (typeof window === "undefined") return;
  let map: Record<number, { guessNames: string[]; status: string }> = {};
  try {
    const raw = localStorage.getItem(ARCHIVE_KEY);
    if (raw) map = JSON.parse(raw);
  } catch { /* ignore */ }
  map[puzzleNum] = { guessNames, status };
  localStorage.setItem(ARCHIVE_KEY, JSON.stringify(map));
}

export function loadAllIdolArchiveStates(): Record<number, { guessNames: string[]; status: string }> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(ARCHIVE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
