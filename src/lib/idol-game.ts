import { idols, type Idol } from "@/data/idols";

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

export function getTodaysIdol(): Idol {
  const start = new Date("2026-02-06");
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  const puzzleNum = Math.floor(diff / (1000 * 60 * 60 * 24));
  // Offset so it's different from drama
  const index = (puzzleNum + 17) % idols.length;
  return idols[index];
}

export function getIdolPuzzleNumber(): number {
  const start = new Date("2026-02-06");
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
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

  return `🎤 K-Dle #${puzzleNumber} Idol-dle ${score}\n\n${grid}\n\n🔥 k-dle.com`;
}
