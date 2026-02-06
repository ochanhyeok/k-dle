"use client";

import { useState, useEffect, useRef } from "react";
import {
  getTodaysIdol,
  getIdolPuzzleNumber,
  compareIdols,
  findIdolByName,
  getAllIdolNames,
  generateIdolShareText,
  type CompareRow,
} from "@/lib/idol-game";
import type { Idol } from "@/data/idols";

const MAX_GUESSES = 6;

const RESULT_COLOR = {
  correct: "bg-[var(--color-success)]/20 text-[var(--color-success)] border-[var(--color-success)]/30",
  partial: "bg-[var(--color-warning)]/20 text-[var(--color-warning)] border-[var(--color-warning)]/30",
  wrong: "bg-[var(--color-error)]/10 text-[var(--color-error)] border-[var(--color-error)]/20",
  higher: "bg-[var(--color-warning)]/20 text-[var(--color-warning)] border-[var(--color-warning)]/30",
  lower: "bg-[var(--color-warning)]/20 text-[var(--color-warning)] border-[var(--color-warning)]/30",
};

const ATTRS = [
  { key: "gender", label: "Gender" },
  { key: "group", label: "Group" },
  { key: "position", label: "Position" },
  { key: "nationality", label: "Nation" },
  { key: "debutYear", label: "Debut" },
  { key: "company", label: "Company" },
  { key: "generation", label: "Gen" },
] as const;

export default function IdolDle() {
  const [target, setTarget] = useState<Idol | null>(null);
  const [puzzleNumber, setPuzzleNumber] = useState(0);
  const [rows, setRows] = useState<CompareRow[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const allNames = getAllIdolNames();

  useEffect(() => {
    setTarget(getTodaysIdol());
    setPuzzleNumber(getIdolPuzzleNumber());
  }, []);

  const filteredNames =
    input.length >= 1
      ? allNames
          .filter(
            (n) =>
              n.name.toLowerCase().includes(input.toLowerCase()) ||
              n.nameKo.includes(input) ||
              n.group.toLowerCase().includes(input.toLowerCase())
          )
          .slice(0, 8)
      : [];

  const handleGuess = (guessName: string) => {
    if (!target || status !== "playing") return;
    const idol = findIdolByName(guessName);
    if (!idol) {
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 400);
      return;
    }
    if (rows.some((r) => r.guess.id === idol.id)) {
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 400);
      return;
    }

    const results = compareIdols(idol, target);
    const newRows = [...rows, { guess: idol, results }];
    setRows(newRows);
    setInput("");
    setShowAutocomplete(false);

    const won = idol.id === target.id;
    const lost = !won && newRows.length >= MAX_GUESSES;
    setStatus(won ? "won" : lost ? "lost" : "playing");
  };

  const handleShare = async () => {
    const text = generateIdolShareText(puzzleNumber, rows, status === "won", MAX_GUESSES);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (!target) {
    return <div className="flex items-center justify-center min-h-[60vh] text-[var(--color-muted)]">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-1">Idol-dle #{puzzleNumber}</p>
        <p className="text-sm text-[var(--color-muted)]">Guess the K-Pop idol in {MAX_GUESSES} tries</p>
      </div>

      {/* Comparison Table */}
      {rows.length > 0 && (
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left py-2 px-1 text-[var(--color-muted)] font-medium">Name</th>
                {ATTRS.map((a) => (
                  <th key={a.key} className="text-center py-2 px-1 text-[var(--color-muted)] font-medium">{a.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <td className="py-1.5 px-1 font-medium whitespace-nowrap">{row.guess.name}</td>
                  {ATTRS.map((a) => {
                    const result = row.results[a.key];
                    const value =
                      a.key === "debutYear"
                        ? `${row.guess.debutYear}${result === "higher" ? " ↑" : result === "lower" ? " ↓" : ""}`
                        : row.guess[a.key];
                    const colorKey = result === "higher" || result === "lower" ? result : result;
                    return (
                      <td key={a.key} className="py-1.5 px-1">
                        <span className={`inline-block w-full text-center rounded px-1.5 py-1 border text-[10px] ${RESULT_COLOR[colorKey]}`}>
                          {value}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Input */}
      {status === "playing" && (
        <div className="relative mb-6">
          <div className={shakeInput ? "animate-shake" : ""}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => { setInput(e.target.value); setShowAutocomplete(true); }}
              onFocus={() => setShowAutocomplete(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleGuess(input);
                if (e.key === "Escape") setShowAutocomplete(false);
              }}
              placeholder="Type an idol name..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </div>
          {showAutocomplete && filteredNames.length > 0 && (
            <div className="absolute z-10 w-full mt-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] shadow-xl overflow-hidden">
              {filteredNames.map((idol) => (
                <button
                  key={idol.name}
                  onClick={() => { setInput(idol.name); setShowAutocomplete(false); handleGuess(idol.name); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-[var(--color-card-hover)] transition-colors border-b border-[var(--color-border)] last:border-0"
                >
                  <span>{idol.name}</span>
                  <span className="text-[var(--color-muted)] ml-2 text-xs">{idol.group}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Result */}
      {status !== "playing" && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-center animate-slide-up">
          {status === "won" ? (
            <>
              <p className="text-2xl mb-2">🎉</p>
              <p className="font-semibold text-lg mb-1">You got it!</p>
              <p className="text-sm text-[var(--color-muted)]">
                <span className="text-[var(--color-foreground)] font-medium">{target.name}</span>
                {" "}({target.group}) in {rows.length} {rows.length === 1 ? "try" : "tries"}
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl mb-2">😔</p>
              <p className="font-semibold text-lg mb-1">Better luck tomorrow!</p>
              <p className="text-sm text-[var(--color-muted)]">
                The answer was <span className="text-[var(--color-foreground)] font-medium">{target.name}</span> ({target.group})
              </p>
            </>
          )}
          <button onClick={handleShare} className="mt-4 w-full rounded-lg bg-[var(--color-success)] text-black font-semibold py-3 text-sm hover:opacity-90 transition-opacity">
            {copied ? "Copied to clipboard! ✓" : "Share Result 📋"}
          </button>
        </div>
      )}

      <div className="mt-6 flex gap-1.5 justify-center">
        {Array.from({ length: MAX_GUESSES }).map((_, i) => (
          <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${
            i < rows.length ? (i === rows.length - 1 && status === "won" ? "bg-[var(--color-success)]" : "bg-[var(--color-error)]") : "bg-[var(--color-border)]"
          }`} />
        ))}
      </div>
    </div>
  );
}
