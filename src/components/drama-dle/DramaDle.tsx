"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  getTodaysDrama,
  getPuzzleNumber,
  getHints,
  checkGuess,
  getAllDramaTitles,
  generateShareText,
  loadGameState,
  saveGameState,
} from "@/lib/game";
import { recordGameResult, loadUnifiedStats, type UnifiedStats } from "@/lib/unified-stats";
import { recordDailyResult } from "@/lib/daily-stats";
import type { Drama } from "@/data/dramas";
import { shareResult } from "@/lib/share";
import CountdownTimer from "@/components/ui/CountdownTimer";
import NextGameBanner from "@/components/ui/NextGameBanner";
import DailyStatsCard from "@/components/ui/DailyStatsCard";
import Toast from "@/components/ui/Toast";
import { decodeCompareData, type CompareData } from "@/lib/compare";

const MAX_GUESSES = 6;

export default function DramaDle() {
  const [target, setTarget] = useState<Drama | null>(null);
  const [puzzleNumber, setPuzzleNumber] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [stats, setStats] = useState<UnifiedStats | null>(null);
  const [shakeInput, setShakeInput] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [friendResult, setFriendResult] = useState<CompareData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const allTitles = getAllDramaTitles();

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
    const drama = getTodaysDrama();
    const num = getPuzzleNumber();
    setTarget(drama);
    setPuzzleNumber(num);
    setStats(loadUnifiedStats());

    const saved = loadGameState(num);
    if (saved) {
      setGuesses(saved.guesses);
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

  const filteredTitles = input.length >= 1
    ? allTitles.filter(
        (d) =>
          d.title.toLowerCase().includes(input.toLowerCase()) ||
          d.titleKo.includes(input)
      ).slice(0, 20)
    : [];

  const handleGuess = useCallback(
    (guessTitle: string) => {
      if (!target || status !== "playing") return;
      if (!guessTitle.trim()) return;

      const isValidTitle = allTitles.some(
        (d) =>
          d.title.toLowerCase() === guessTitle.toLowerCase() ||
          d.titleKo === guessTitle
      );

      if (!isValidTitle) {
        setShakeInput(true);
        setTimeout(() => setShakeInput(false), 400);
        return;
      }

      const alreadyGuessed = guesses.some(
        (g) => g.toLowerCase() === guessTitle.toLowerCase()
      );
      if (alreadyGuessed) {
        setShakeInput(true);
        setTimeout(() => setShakeInput(false), 400);
        return;
      }

      const newGuesses = [...guesses, guessTitle];
      setGuesses(newGuesses);
      setInput("");
      setShowAutocomplete(false);

      const won = checkGuess(guessTitle, target);
      const lost = !won && newGuesses.length >= MAX_GUESSES;
      const newStatus = won ? "won" : lost ? "lost" : "playing";
      setStatus(newStatus);

      saveGameState(puzzleNumber, newGuesses, newStatus);

      if (won || lost) {
        const newStats = recordGameResult(won, newGuesses.length);
        setStats(newStats);
        recordDailyResult("drama", won, newGuesses.length);
      }
    },
    [target, status, guesses, puzzleNumber, allTitles]
  );

  const handleShare = async () => {
    const text = generateShareText(
      puzzleNumber,
      guesses,
      status === "won",
      MAX_GUESSES
    );
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

  const hints = getHints(target, guesses.length + (status === "playing" ? 1 : 0));

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* Puzzle Info */}
      <div className="text-center mb-6">
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-1">
          Drama-dle #{puzzleNumber}
        </p>
        <p className="text-sm text-[var(--color-muted)]">
          Guess the K-Drama in {MAX_GUESSES} tries
        </p>
      </div>

      {/* Hints */}
      <div className="space-y-2 mb-6">
        {hints.map((hint, i) => (
          <div
            key={i}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm animate-slide-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {hint}
          </div>
        ))}
      </div>

      {/* Guesses */}
      {guesses.length > 0 && (
        <div className="space-y-2 mb-6">
          {guesses.map((guess, i) => {
            const isCorrect = checkGuess(guess, target);
            return (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium animate-slide-up ${
                  isCorrect
                    ? "bg-[var(--color-success)]/15 border border-[var(--color-success)]/30 text-[var(--color-success)]"
                    : "bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 text-[var(--color-error)]"
                }`}
              >
                <span>{isCorrect ? "✓" : "✗"}</span>
                <span>{guess}</span>
                <span className="ml-auto text-xs opacity-60">
                  {i + 1}/{MAX_GUESSES}
                </span>
              </div>
            );
          })}
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
              onChange={(e) => {
                setInput(e.target.value);
                setShowAutocomplete(true);
                setSelectedIndex(-1);
              }}
              onFocus={() => setShowAutocomplete(true)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSelectedIndex((prev) => Math.min(prev + 1, filteredTitles.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setSelectedIndex((prev) => Math.max(prev - 1, -1));
                } else if (e.key === "Enter") {
                  if (selectedIndex >= 0 && filteredTitles[selectedIndex]) {
                    const selected = filteredTitles[selectedIndex].title;
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
              placeholder="Type a K-Drama title..."
              className="input-focus w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm placeholder:text-[var(--color-muted)] focus:outline-none"
            />
          </div>

          {/* Autocomplete */}
          {showAutocomplete && filteredTitles.length > 0 && (
            <div ref={listRef} className="absolute z-10 w-full mt-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] shadow-xl overflow-hidden max-h-64 overflow-y-auto">
              {filteredTitles.map((drama, idx) => (
                <button
                  key={drama.title}
                  ref={(el) => { if (idx === selectedIndex && el) el.scrollIntoView({ block: "nearest" }); }}
                  onClick={() => {
                    setInput(drama.title);
                    setShowAutocomplete(false);
                    setSelectedIndex(-1);
                    handleGuess(drama.title);
                  }}
                  className={`autocomplete-item w-full text-left px-4 py-2.5 text-sm border-b border-[var(--color-border)] last:border-0 ${idx === selectedIndex ? "bg-[var(--color-card-hover)]" : "hover:bg-[var(--color-card-hover)]"}`}
                >
                  <span className="text-[var(--color-foreground)]">
                    {drama.title}
                  </span>
                  <span className="text-[var(--color-muted)] ml-2 text-xs">
                    {drama.titleKo}
                  </span>
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
              <p className="font-semibold text-lg mb-1">Brilliant!</p>
              <p className="text-sm text-[var(--color-muted)] mb-1">
                You guessed{" "}
                <span className="text-[var(--color-foreground)] font-medium">
                  {target.title}
                </span>{" "}
                in {guesses.length} {guesses.length === 1 ? "try" : "tries"}
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl mb-2">😔</p>
              <p className="font-semibold text-lg mb-1">Better luck tomorrow!</p>
              <p className="text-sm text-[var(--color-muted)] mb-1">
                The answer was{" "}
                <span className="text-[var(--color-foreground)] font-medium">
                  {target.title}
                </span>{" "}
                ({target.titleKo})
              </p>
            </>
          )}

          {/* Stats mini */}
          {stats && (
            <div className="flex justify-center gap-6 my-4 text-center">
              <div>
                <p className="text-xl font-bold">{stats.gamesPlayed}</p>
                <p className="text-[10px] text-[var(--color-muted)] uppercase">
                  Played
                </p>
              </div>
              <div>
                <p className="text-xl font-bold">
                  {stats.gamesPlayed > 0
                    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
                    : 0}
                  %
                </p>
                <p className="text-[10px] text-[var(--color-muted)] uppercase">
                  Win Rate
                </p>
              </div>
              <div>
                <p className="text-xl font-bold">🔥 {stats.currentStreak}</p>
                <p className="text-[10px] text-[var(--color-muted)] uppercase">
                  Streak
                </p>
              </div>
              <div>
                <p className="text-xl font-bold">{stats.maxStreak}</p>
                <p className="text-[10px] text-[var(--color-muted)] uppercase">
                  Max
                </p>
              </div>
            </div>
          )}

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="cta-btn mt-2 w-full rounded-lg bg-[var(--color-success)] text-black font-semibold py-3 text-sm"
          >
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
                    {status === "won" ? `${guesses.length}/6 ✓` : "X/6"}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DailyStatsCard mode="drama" />
          <CountdownTimer />
        </div>
      )}

      {/* Progress bar */}
      <div className="mt-6 flex gap-1.5 justify-center">
        {Array.from({ length: MAX_GUESSES }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-8 rounded-full transition-colors ${
              i < guesses.length
                ? i === guesses.length - 1 && status === "won"
                  ? "bg-[var(--color-success)]"
                  : "bg-[var(--color-error)]"
                : "bg-[var(--color-border)]"
            }`}
          />
        ))}
      </div>

      {/* Next Game */}
      {status !== "playing" && <NextGameBanner currentMode="drama-dle" />}
      <Toast message="Copied to clipboard! 📋" show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
}
