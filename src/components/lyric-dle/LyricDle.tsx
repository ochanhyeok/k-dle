"use client";

import { useState, useEffect, useRef } from "react";
import {
  getTodaysLyric,
  getLyricPuzzleNumber,
  getLyricHints,
  checkLyricGuess,
  getAllSongTitles,
  generateLyricShareText,
} from "@/lib/lyric-game";
import type { LyricSong } from "@/data/lyrics";

const MAX_GUESSES = 6;

export default function LyricDle() {
  const [target, setTarget] = useState<LyricSong | null>(null);
  const [puzzleNumber, setPuzzleNumber] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const allTitles = getAllSongTitles();

  useEffect(() => {
    setTarget(getTodaysLyric());
    setPuzzleNumber(getLyricPuzzleNumber());
  }, []);

  const filteredTitles =
    input.length >= 1
      ? allTitles.filter((s) =>
          s.title.toLowerCase().includes(input.toLowerCase()) ||
          s.titleKo.includes(input) ||
          s.artist.toLowerCase().includes(input.toLowerCase())
        ).slice(0, 8)
      : [];

  const handleGuess = (guessTitle: string) => {
    if (!target || status !== "playing") return;
    if (!guessTitle.trim()) return;

    const isValid = allTitles.some(
      (s) => s.title.toLowerCase() === guessTitle.toLowerCase() || s.titleKo === guessTitle
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

    const won = checkLyricGuess(guessTitle, target);
    const lost = !won && newGuesses.length >= MAX_GUESSES;
    setStatus(won ? "won" : lost ? "lost" : "playing");
  };

  const handleShare = async () => {
    const text = generateLyricShareText(puzzleNumber, guesses, status === "won", MAX_GUESSES);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (!target) {
    return <div className="flex items-center justify-center min-h-[60vh] text-[var(--color-muted)]">Loading...</div>;
  }

  const hints = getLyricHints(target, guesses.length + (status === "playing" ? 1 : 0));

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-1">Lyric-dle #{puzzleNumber}</p>
        <p className="text-sm text-[var(--color-muted)]">Name the song from translated lyrics</p>
      </div>

      {/* Lyrics */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 mb-6">
        <div className="space-y-3">
          {hints.map((line, i) => (
            <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <p className="text-sm italic text-[var(--color-foreground)]">♪ &ldquo;{line}&rdquo;</p>
            </div>
          ))}
          {status === "playing" && hints.length < 6 && (
            <p className="text-xs text-[var(--color-muted)]">
              {6 - hints.length} more line{6 - hints.length > 1 ? "s" : ""} remaining...
            </p>
          )}
        </div>
        {target.type === "OST" && guesses.length >= 2 && status === "playing" && (
          <p className="text-xs text-[var(--color-muted)] mt-3 pt-3 border-t border-[var(--color-border)]">
            💡 Hint: This is a K-Drama OST
          </p>
        )}
      </div>

      {/* Guesses */}
      {guesses.length > 0 && (
        <div className="space-y-2 mb-6">
          {guesses.map((guess, i) => {
            const isCorrect = checkLyricGuess(guess, target);
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
              placeholder="Type a song title..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </div>
          {showAutocomplete && filteredTitles.length > 0 && (
            <div className="absolute z-10 w-full mt-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] shadow-xl overflow-hidden">
              {filteredTitles.map((song) => (
                <button
                  key={song.title}
                  onClick={() => { setInput(song.title); setShowAutocomplete(false); handleGuess(song.title); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-[var(--color-card-hover)] transition-colors border-b border-[var(--color-border)] last:border-0"
                >
                  <span>{song.title}</span>
                  <span className="text-[var(--color-muted)] ml-2 text-xs">{song.artist}</span>
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
              <p className="text-2xl mb-2">🎶</p>
              <p className="font-semibold text-lg mb-1">Perfect ear!</p>
              <p className="text-sm text-[var(--color-muted)]">
                <span className="text-[var(--color-foreground)] font-medium">{target.title}</span>
                {" "}by {target.artist} in {guesses.length} {guesses.length === 1 ? "try" : "tries"}
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl mb-2">😔</p>
              <p className="font-semibold text-lg mb-1">Better luck tomorrow!</p>
              <p className="text-sm text-[var(--color-muted)]">
                The answer was <span className="text-[var(--color-foreground)] font-medium">{target.title}</span> by {target.artist}
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
            i < guesses.length ? (i === guesses.length - 1 && status === "won" ? "bg-[var(--color-success)]" : "bg-[var(--color-error)]") : "bg-[var(--color-border)]"
          }`} />
        ))}
      </div>
    </div>
  );
}
