"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  getTodaysDrama,
  getPuzzleNumber,
  getHints,
  checkGuess,
  getAllDramaTitles,
  generateShareText,
  loadStats,
  saveStats,
  loadGameState,
  saveGameState,
  type StoredStats,
} from "@/lib/game";
import type { Drama } from "@/data/dramas";

const MAX_GUESSES = 6;

export default function DramaDle() {
  const [target, setTarget] = useState<Drama | null>(null);
  const [puzzleNumber, setPuzzleNumber] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<StoredStats | null>(null);
  const [shakeInput, setShakeInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
    setStats(loadStats());

    const saved = loadGameState(num);
    if (saved) {
      setGuesses(saved.guesses);
      setStatus(saved.status);
    }
  }, []);

  const filteredTitles = input.length >= 1
    ? allTitles.filter(
        (d) =>
          d.title.toLowerCase().includes(input.toLowerCase()) ||
          d.titleKo.includes(input)
      ).slice(0, 8)
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
        const currentStats = loadStats();
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .split("T")[0];

        currentStats.gamesPlayed += 1;
        if (won) {
          currentStats.gamesWon += 1;
          currentStats.guessDistribution[newGuesses.length - 1] += 1;
          currentStats.currentStreak =
            currentStats.lastPlayedDate === yesterday
              ? currentStats.currentStreak + 1
              : 1;
          currentStats.maxStreak = Math.max(
            currentStats.maxStreak,
            currentStats.currentStreak
          );
        } else {
          currentStats.currentStreak = 0;
        }
        currentStats.lastPlayedDate = today;

        saveStats(currentStats);
        setStats(currentStats);
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
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
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
              }}
              onFocus={() => setShowAutocomplete(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGuess(input);
                }
                if (e.key === "Escape") {
                  setShowAutocomplete(false);
                }
              }}
              placeholder="Type a K-Drama title..."
              className="input-focus w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm placeholder:text-[var(--color-muted)] focus:outline-none"
            />
          </div>

          {/* Autocomplete */}
          {showAutocomplete && filteredTitles.length > 0 && (
            <div className="absolute z-10 w-full mt-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] shadow-xl overflow-hidden max-h-64 overflow-y-auto">
              {filteredTitles.map((drama) => (
                <button
                  key={drama.title}
                  onClick={() => {
                    setInput(drama.title);
                    setShowAutocomplete(false);
                    handleGuess(drama.title);
                  }}
                  className="autocomplete-item w-full text-left px-4 py-2.5 text-sm hover:bg-[var(--color-card-hover)] border-b border-[var(--color-border)] last:border-0"
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
            {copied ? "Copied to clipboard! ✓" : "Share Result 📋"}
          </button>
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
    </div>
  );
}
