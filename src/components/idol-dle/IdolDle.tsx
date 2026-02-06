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
import { shareResult } from "@/lib/share";
import { recordGameResult, loadUnifiedStats, type UnifiedStats } from "@/lib/unified-stats";
import { recordDailyResult } from "@/lib/daily-stats";
import CountdownTimer from "@/components/ui/CountdownTimer";
import NextGameBanner from "@/components/ui/NextGameBanner";
import DailyStatsCard from "@/components/ui/DailyStatsCard";
import Toast from "@/components/ui/Toast";
import { decodeCompareData, type CompareData } from "@/lib/compare";

const MAX_GUESSES = 6;
const STORAGE_KEY = "k-dle-idol-state";

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

function saveIdolState(puzzleNumber: number, guessNames: string[], status: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ puzzleNumber, guessNames, status }));
}

function loadIdolState(puzzleNumber: number): { guessNames: string[]; status: "playing" | "won" | "lost" } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw);
    if (state.puzzleNumber !== puzzleNumber) return null;
    return { guessNames: state.guessNames, status: state.status };
  } catch {
    return null;
  }
}

export default function IdolDle() {
  const [target, setTarget] = useState<Idol | null>(null);
  const [puzzleNumber, setPuzzleNumber] = useState(0);
  const [rows, setRows] = useState<CompareRow[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const [stats, setStats] = useState<UnifiedStats | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [friendResult, setFriendResult] = useState<CompareData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const allNames = getAllIdolNames();

  // Close autocomplete on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowAutocomplete(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const idol = getTodaysIdol();
    const num = getIdolPuzzleNumber();
    setTarget(idol);
    setPuzzleNumber(num);
    setStats(loadUnifiedStats());

    // Restore saved state
    const saved = loadIdolState(num);
    if (saved && idol) {
      const restoredRows: CompareRow[] = [];
      for (const name of saved.guessNames) {
        const guessIdol = findIdolByName(name);
        if (guessIdol) {
          restoredRows.push({ guess: guessIdol, results: compareIdols(guessIdol, idol) });
        }
      }
      setRows(restoredRows);
      setStatus(saved.status);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("r");
    if (r) {
      const data = decodeCompareData(r);
      if (data) setFriendResult(data);
      window.history.replaceState({}, "", window.location.pathname);
    }
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
          .slice(0, 20)
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
    const newStatus = won ? "won" : lost ? "lost" : "playing";
    setStatus(newStatus);

    saveIdolState(puzzleNumber, newRows.map((r) => r.guess.name), newStatus);

    if (won || lost) {
      const newStats = recordGameResult(won, newRows.length);
      setStats(newStats);
      recordDailyResult("idol", won, newRows.length);
    }
  };

  const handleShare = async () => {
    const text = generateIdolShareText(puzzleNumber, rows, status === "won", MAX_GUESSES);
    await shareResult(text);
    setShowToast(true);
  };

  if (!target) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-[var(--color-muted)]">Loading...</div>
      </div>
    );
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
                    const value = row.guess[a.key];
                    const indicator =
                      result === "correct" ? " ✓"
                      : result === "higher" ? " ▲"
                      : result === "lower" ? " ▼"
                      : result === "partial" ? " ~"
                      : "";
                    const ariaLabel =
                      result === "correct" ? `${a.label}: ${value} (correct)`
                      : result === "higher" ? `${a.label}: ${value} (too low, go higher)`
                      : result === "lower" ? `${a.label}: ${value} (too high, go lower)`
                      : result === "partial" ? `${a.label}: ${value} (partial match)`
                      : `${a.label}: ${value} (wrong)`;
                    return (
                      <td key={a.key} className="py-1.5 px-1">
                        <span
                          className={`inline-block w-full text-center rounded px-1.5 py-1 border text-[10px] ${RESULT_COLOR[result]}`}
                          aria-label={ariaLabel}
                          role="cell"
                        >
                          {value}{indicator}
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
        <div className="relative mb-6" ref={wrapperRef}>
          <div className={shakeInput ? "animate-shake" : ""}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => { setInput(e.target.value); setShowAutocomplete(true); setSelectedIndex(-1); }}
              onFocus={() => setShowAutocomplete(true)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSelectedIndex((prev) => Math.min(prev + 1, filteredNames.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setSelectedIndex((prev) => Math.max(prev - 1, -1));
                } else if (e.key === "Enter") {
                  if (selectedIndex >= 0 && filteredNames[selectedIndex]) {
                    const selected = filteredNames[selectedIndex].name;
                    setInput(selected);
                    setShowAutocomplete(false);
                    setSelectedIndex(-1);
                    handleGuess(selected);
                  } else {
                    handleGuess(input);
                  }
                } else if (e.key === "Escape") {
                  setShowAutocomplete(false);
                  setSelectedIndex(-1);
                }
              }}
              placeholder="Type an idol name..."
              className="input-focus w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm placeholder:text-[var(--color-muted)] focus:outline-none"
            />
          </div>
          {showAutocomplete && filteredNames.length > 0 && (
            <div ref={listRef} className="absolute z-10 w-full mt-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] shadow-xl overflow-hidden max-h-64 overflow-y-auto">
              {filteredNames.map((idol, idx) => (
                <button
                  key={idol.name}
                  ref={(el) => { if (idx === selectedIndex && el) el.scrollIntoView({ block: "nearest" }); }}
                  onClick={() => { setInput(idol.name); setShowAutocomplete(false); setSelectedIndex(-1); handleGuess(idol.name); }}
                  className={`autocomplete-item w-full text-left px-4 py-2.5 text-sm border-b border-[var(--color-border)] last:border-0 ${idx === selectedIndex ? "bg-[var(--color-card-hover)]" : "hover:bg-[var(--color-card-hover)]"}`}
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
          {/* Stats mini */}
          {stats && (
            <div className="flex justify-center gap-6 my-4 text-center">
              <div>
                <p className="text-xl font-bold">{stats.gamesPlayed}</p>
                <p className="text-[10px] text-[var(--color-muted)] uppercase">Played</p>
              </div>
              <div>
                <p className="text-xl font-bold">
                  {stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0}%
                </p>
                <p className="text-[10px] text-[var(--color-muted)] uppercase">Win Rate</p>
              </div>
              <div>
                <p className="text-xl font-bold">🔥 {stats.currentStreak}</p>
                <p className="text-[10px] text-[var(--color-muted)] uppercase">Streak</p>
              </div>
              <div>
                <p className="text-xl font-bold">{stats.maxStreak}</p>
                <p className="text-[10px] text-[var(--color-muted)] uppercase">Max</p>
              </div>
            </div>
          )}

          <button onClick={handleShare} className="cta-btn mt-2 w-full rounded-lg bg-[var(--color-success)] text-black font-semibold py-3 text-sm">
            Share Result 📋
          </button>
          {friendResult && friendResult.puzzleNum === puzzleNumber && (
            <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
              <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-3 text-center">
                👥 Compare
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-muted)]">Friend</span>
                  <span className={friendResult.won ? "text-[var(--color-success)] font-medium" : "text-[var(--color-error)] font-medium"}>
                    {friendResult.won ? `${friendResult.guessCount}/6 ✓` : "X/6"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-muted)]">You</span>
                  <span className={status === "won" ? "text-[var(--color-success)] font-medium" : "text-[var(--color-error)] font-medium"}>
                    {status === "won" ? `${rows.length}/6 ✓` : "X/6"}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DailyStatsCard mode="idol" />
          <CountdownTimer />
        </div>
      )}

      <div className="mt-6 flex gap-1.5 justify-center">
        {Array.from({ length: MAX_GUESSES }).map((_, i) => (
          <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${
            i < rows.length ? (i === rows.length - 1 && status === "won" ? "bg-[var(--color-success)]" : "bg-[var(--color-error)]") : "bg-[var(--color-border)]"
          }`} />
        ))}
      </div>

      {status !== "playing" && <NextGameBanner currentMode="idol-dle" />}
      <Toast message="Copied to clipboard! 📋" show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
}
