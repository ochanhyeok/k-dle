"use client";

import { useState, useEffect, useRef } from "react";
import {
  getTodaysScene,
  getScenePuzzleNumber,
  getSceneHints,
  checkSceneGuess,
  getAllDramaTitlesForScene,
  generateSceneShareText,
} from "@/lib/scene-game";
import type { Scene } from "@/data/scenes";

const MAX_GUESSES = 6;
const STORAGE_KEY = "k-dle-scene-state";

function saveSceneState(puzzleNumber: number, guesses: string[], status: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ puzzleNumber, guesses, status }));
}

function loadSceneState(puzzleNumber: number): { guesses: string[]; status: "playing" | "won" | "lost" } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw);
    if (state.puzzleNumber !== puzzleNumber) return null;
    return { guesses: state.guesses, status: state.status };
  } catch {
    return null;
  }
}

export default function SceneDle() {
  const [target, setTarget] = useState<Scene | null>(null);
  const [puzzleNumber, setPuzzleNumber] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const allTitles = getAllDramaTitlesForScene();

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
    const scene = getTodaysScene();
    const num = getScenePuzzleNumber();
    setTarget(scene);
    setPuzzleNumber(num);

    const saved = loadSceneState(num);
    if (saved) {
      setGuesses(saved.guesses);
      setStatus(saved.status);
    }
  }, []);

  const filteredTitles =
    input.length >= 1
      ? allTitles.filter(
          (d) =>
            d.title.toLowerCase().includes(input.toLowerCase()) ||
            d.titleKo.includes(input)
        ).slice(0, 8)
      : [];

  const handleGuess = (guessTitle: string) => {
    if (!target || status !== "playing") return;
    if (!guessTitle.trim()) return;

    const isValid = allTitles.some(
      (d) => d.title.toLowerCase() === guessTitle.toLowerCase() || d.titleKo === guessTitle
    );
    if (!isValid) {
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 400);
      return;
    }
    if (guesses.some((g) => g.toLowerCase() === guessTitle.toLowerCase())) {
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 400);
      return;
    }

    const newGuesses = [...guesses, guessTitle];
    setGuesses(newGuesses);
    setInput("");
    setShowAutocomplete(false);

    const won = checkSceneGuess(guessTitle, target);
    const lost = !won && newGuesses.length >= MAX_GUESSES;
    const newStatus = won ? "won" : lost ? "lost" : "playing";
    setStatus(newStatus);

    saveSceneState(puzzleNumber, newGuesses, newStatus);
  };

  const handleShare = async () => {
    const text = generateSceneShareText(puzzleNumber, guesses, status === "won", MAX_GUESSES);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (!target) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-[var(--color-muted)]">Loading...</div>
      </div>
    );
  }

  const hints = getSceneHints(target, guesses.length + (status === "playing" ? 1 : 0));

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-1">Scene-dle #{puzzleNumber}</p>
        <p className="text-sm text-[var(--color-muted)]">Recognize the K-Drama from the scene description</p>
      </div>

      {/* Scene Description */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 mb-6">
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-3">The Scene</p>
        <div className="space-y-3">
          {hints.map((desc, i) => (
            <div key={i} className="flex gap-3 animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <span className="text-xs text-[var(--color-accent)] font-mono mt-0.5">{i + 1}.</span>
              <p className="text-sm text-[var(--color-foreground)]">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Guesses */}
      {guesses.length > 0 && (
        <div className="space-y-2 mb-6">
          {guesses.map((guess, i) => {
            const isCorrect = checkSceneGuess(guess, target);
            return (
              <div key={i} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium animate-slide-up ${
                isCorrect
                  ? "bg-[var(--color-success)]/15 border border-[var(--color-success)]/30 text-[var(--color-success)]"
                  : "bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 text-[var(--color-error)]"
              }`}>
                <span>{isCorrect ? "✓" : "✗"}</span>
                <span>{guess}</span>
                <span className="ml-auto text-xs opacity-60">{i + 1}/{MAX_GUESSES}</span>
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
              onChange={(e) => { setInput(e.target.value); setShowAutocomplete(true); }}
              onFocus={() => setShowAutocomplete(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleGuess(input);
                if (e.key === "Escape") setShowAutocomplete(false);
              }}
              placeholder="Type a K-Drama title..."
              className="input-focus w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm placeholder:text-[var(--color-muted)] focus:outline-none"
            />
          </div>
          {showAutocomplete && filteredTitles.length > 0 && (
            <div className="absolute z-10 w-full mt-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] shadow-xl overflow-hidden max-h-64 overflow-y-auto">
              {filteredTitles.map((drama) => (
                <button
                  key={drama.title}
                  onClick={() => { setInput(drama.title); setShowAutocomplete(false); handleGuess(drama.title); }}
                  className="autocomplete-item w-full text-left px-4 py-2.5 text-sm hover:bg-[var(--color-card-hover)] border-b border-[var(--color-border)] last:border-0"
                >
                  <span>{drama.title}</span>
                  <span className="text-[var(--color-muted)] ml-2 text-xs">{drama.titleKo}</span>
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
              <p className="text-2xl mb-2">🎭</p>
              <p className="font-semibold text-lg mb-1">Scene master!</p>
              <p className="text-sm text-[var(--color-muted)]">
                <span className="text-[var(--color-foreground)] font-medium">{target.dramaTitle}</span>
                {" "}in {guesses.length} {guesses.length === 1 ? "try" : "tries"}
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl mb-2">😔</p>
              <p className="font-semibold text-lg mb-1">Better luck tomorrow!</p>
              <p className="text-sm text-[var(--color-muted)]">
                The answer was <span className="text-[var(--color-foreground)] font-medium">{target.dramaTitle}</span> ({target.dramaTitleKo})
              </p>
            </>
          )}
          <button onClick={handleShare} className="cta-btn mt-4 w-full rounded-lg bg-[var(--color-success)] text-black font-semibold py-3 text-sm">
            {copied ? "Copied to clipboard! ✓" : "Share Result 📋"}
          </button>
        </div>
      )}

      <div className="mt-6 flex gap-1.5 justify-center">
        {Array.from({ length: MAX_GUESSES }).map((_, i) => (
          <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${
            i < guesses.length ? (i === guesses.length - 1 && status === "won" ? "bg-[var(--color-success)]" : "bg-[var(--color-error)]") : "bg-[var(--color-border)]"
          }`} />
        ))}
      </div>
    </div>
  );
}
