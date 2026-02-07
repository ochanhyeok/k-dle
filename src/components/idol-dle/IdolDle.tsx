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
import { useTranslation, type TranslationKey } from "@/lib/i18n";
import { translateIdolAttr } from "@/data/i18n/idol-enums";
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

const ATTR_KEYS: readonly { key: "gender" | "group" | "position" | "nationality" | "debutYear" | "company" | "generation"; labelKey: TranslationKey }[] = [
  { key: "gender", labelKey: "idol.gender" },
  { key: "group", labelKey: "idol.group" },
  { key: "position", labelKey: "idol.position" },
  { key: "nationality", labelKey: "idol.nationality" },
  { key: "debutYear", labelKey: "idol.debut" },
  { key: "company", labelKey: "idol.company" },
  { key: "generation", labelKey: "idol.generation" },
];

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
  const { t, locale } = useTranslation();

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
        <div className="text-[var(--color-muted)]">{t("game.loading")}</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-1">Idol-dle #{puzzleNumber}</p>
        <p className="text-sm text-[var(--color-muted)]">{t("game.idolGuessIn", { n: MAX_GUESSES })}</p>
      </div>

      {/* Comparison Table */}
      {rows.length > 0 && (
        <div className="relative overflow-x-auto mb-6">
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--color-background)] to-transparent z-10 sm:hidden" />
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left py-2 px-1 text-[var(--color-muted)] font-medium">{t("idol.name")}</th>
                {ATTR_KEYS.map((a) => (
                  <th key={a.key} className="text-center py-2 px-1 text-[var(--color-muted)] font-medium">{t(a.labelKey)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <td className="py-1.5 px-1 font-medium whitespace-nowrap">{row.guess.name}</td>
                  {ATTR_KEYS.map((a) => {
                    const result = row.results[a.key];
                    const rawValue = row.guess[a.key];
                    const translatableKeys = ["gender", "position", "nationality", "generation"] as const;
                    const displayValue = translatableKeys.includes(a.key as typeof translatableKeys[number])
                      ? translateIdolAttr(a.key as "gender" | "position" | "nationality" | "generation", String(rawValue), locale)
                      : rawValue;
                    const indicator =
                      result === "correct" ? " ✓"
                      : result === "higher" ? " ▲"
                      : result === "lower" ? " ▼"
                      : result === "partial" ? " ~"
                      : "";
                    const label = t(a.labelKey);
                    const ariaLabel =
                      result === "correct" ? `${label}: ${displayValue} (correct)`
                      : result === "higher" ? `${label}: ${displayValue} (too low, go higher)`
                      : result === "lower" ? `${label}: ${displayValue} (too high, go lower)`
                      : result === "partial" ? `${label}: ${displayValue} (partial match)`
                      : `${label}: ${displayValue} (wrong)`;
                    return (
                      <td key={a.key} className="py-1.5 px-1">
                        <span
                          className={`inline-block w-full text-center rounded px-1.5 py-1 border text-[10px] ${RESULT_COLOR[result]}`}
                          aria-label={ariaLabel}
                          role="cell"
                        >
                          {displayValue}{indicator}
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
              placeholder={t("game.placeholder.idol")}
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
              <p className="font-semibold text-lg mb-1">{t("result.gotIt")}</p>
              <p className="text-sm text-[var(--color-muted)]">
                {t("result.idolGuessedIn", {
                  name: target.name,
                  group: target.group,
                  n: rows.length,
                  tries: rows.length === 1 ? t("result.try") : t("result.tries"),
                })}
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl mb-2">😔</p>
              <p className="font-semibold text-lg mb-1">{t("result.betterLuck")}</p>
              <div className="my-3 rounded-lg border-2 border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-4 py-3">
                <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-1">{t("result.answerLabel")}</p>
                <p className="text-lg font-bold text-[var(--color-accent)]">{target.name}</p>
                <p className="text-sm text-[var(--color-muted)]">{target.group}</p>
              </div>
            </>
          )}
          {/* Stats mini */}
          {stats && (
            <div className="flex justify-center gap-6 my-4 text-center">
              <div>
                <p className="text-xl font-bold">{stats.gamesPlayed}</p>
                <p className="text-[10px] text-[var(--color-muted)] uppercase">{t("stats.played")}</p>
              </div>
              <div>
                <p className="text-xl font-bold">
                  {stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0}%
                </p>
                <p className="text-[10px] text-[var(--color-muted)] uppercase">{t("stats.winRate")}</p>
              </div>
              <div>
                <p className="text-xl font-bold">🔥 {stats.currentStreak}</p>
                <p className="text-[10px] text-[var(--color-muted)] uppercase">{t("stats.streak")}</p>
              </div>
              <div>
                <p className="text-xl font-bold">{stats.maxStreak}</p>
                <p className="text-[10px] text-[var(--color-muted)] uppercase">{t("stats.max")}</p>
              </div>
            </div>
          )}

          <button onClick={handleShare} className="cta-btn mt-2 w-full rounded-lg bg-[var(--color-success)] text-black font-semibold py-3 text-sm">
            {t("result.shareResult")} 📋
          </button>
          {friendResult && friendResult.puzzleNum === puzzleNumber && (
            <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
              <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-3 text-center">
                👥 {t("compare.title")}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-muted)]">{t("compare.friend")}</span>
                  <span className={friendResult.won ? "text-[var(--color-success)] font-medium" : "text-[var(--color-error)] font-medium"}>
                    {friendResult.won ? `${friendResult.guessCount}/6 ✓` : "X/6"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-muted)]">{t("compare.you")}</span>
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
      <Toast message={`${t("toast.copied")} 📋`} show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
}
