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
import { shareResult, shareWithImage } from "@/lib/share";
import { generateShareCard, type CellResult } from "@/lib/share-image";
import { recordGameResult, loadUnifiedStats, type UnifiedStats } from "@/lib/unified-stats";
import { recordDailyResult } from "@/lib/daily-stats";
import { decodeCompareData, type CompareData } from "@/lib/compare";
import { useTranslation } from "@/lib/i18n";
import CountdownTimer from "@/components/ui/CountdownTimer";
import NextGameBanner from "@/components/ui/NextGameBanner";
import DailyStatsCard from "@/components/ui/DailyStatsCard";
import Toast from "@/components/ui/Toast";

const MAX_GUESSES = 6;
const STORAGE_KEY = "k-dle-lyric-state";

function saveLyricState(puzzleNumber: number, guesses: string[], status: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ puzzleNumber, guesses, status }));
}

function loadLyricState(puzzleNumber: number): { guesses: string[]; status: "playing" | "won" | "lost" } | null {
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

export default function LyricDle() {
  const [target, setTarget] = useState<LyricSong | null>(null);
  const [puzzleNumber, setPuzzleNumber] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [shakeInput, setShakeInput] = useState(false);
  const [stats, setStats] = useState<UnifiedStats | null>(null);
  const [friendResult, setFriendResult] = useState<CompareData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();

  const allTitles = getAllSongTitles();

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
    const song = getTodaysLyric();
    const num = getLyricPuzzleNumber();
    setTarget(song);
    setPuzzleNumber(num);
    setStats(loadUnifiedStats());

    const saved = loadLyricState(num);
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

  const filteredTitles =
    input.length >= 1
      ? allTitles.filter((s) =>
          s.title.toLowerCase().includes(input.toLowerCase()) ||
          s.titleKo.includes(input) ||
          s.artist.toLowerCase().includes(input.toLowerCase())
        )
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
    const newStatus = won ? "won" : lost ? "lost" : "playing";
    setStatus(newStatus);

    saveLyricState(puzzleNumber, newGuesses, newStatus);

    if (won || lost) {
      const newStats = recordGameResult(won, newGuesses.length);
      setStats(newStats);
      recordDailyResult("lyric", won, newGuesses.length);
    }
  };

  const handleShare = async () => {
    const text = generateLyricShareText(puzzleNumber, guesses, status === "won", MAX_GUESSES);
    try {
      const grid: CellResult[][] = [
        guesses.map((_, i): CellResult =>
          i === guesses.length - 1 && status === "won" ? "correct" : "wrong"
        ),
      ];
      const blob = await generateShareCard({
        mode: "lyric",
        puzzleNumber,
        score: status === "won" ? `${guesses.length}/${MAX_GUESSES}` : `X/${MAX_GUESSES}`,
        won: status === "won",
        grid,
        stats: stats
          ? {
              played: stats.gamesPlayed,
              winRate: stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0,
              streak: stats.currentStreak,
            }
          : undefined,
      });
      const result = await shareWithImage(blob, text);
      if (result === "shared") {
        setToastMsg(t("toast.linkCopied"));
        setShowToast(true);
      } else if (result === "copied") {
        setToastMsg(`${t("toast.copied")} 📋`);
        setShowToast(true);
      }
    } catch {
      await shareResult(text);
      setToastMsg(`${t("toast.copied")} 📋`);
      setShowToast(true);
    }
  };

  if (!target) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-[var(--color-muted)]">{t("game.loading")}</div>
      </div>
    );
  }

  const hints = getLyricHints(target, guesses.length + (status === "playing" ? 1 : 0));
  const remaining = 6 - hints.length;

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-1">Lyric-dle #{puzzleNumber}</p>
        <p className="text-sm text-[var(--color-muted)]">{t("game.lyricGuessIn")}</p>
      </div>

      {/* Lyrics */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 mb-6">
        <div className="space-y-3">
          {hints.map((line, i) => (
            <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <p className="text-sm italic text-[var(--color-foreground)]">&ldquo;{line}&rdquo;</p>
            </div>
          ))}
          {status === "playing" && remaining > 0 && (
            <p className="text-xs text-[var(--color-muted)]">
              {t("lyric.remaining", { n: remaining, s: remaining > 1 ? "s" : "" })}
            </p>
          )}
        </div>
        {target.type === "OST" && guesses.length >= 2 && status === "playing" && (
          <p className="text-xs text-[var(--color-muted)] mt-3 pt-3 border-t border-[var(--color-border)]">
            {t("lyric.ostHint")}
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
              placeholder={t("game.placeholder.lyric")}
              className="input-focus w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm placeholder:text-[var(--color-muted)] focus:outline-none"
            />
          </div>
          {showAutocomplete && filteredTitles.length > 0 && (
            <div ref={listRef} className="absolute z-10 w-full mt-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] shadow-xl overflow-hidden max-h-64 overflow-y-auto">
              {filteredTitles.map((song, idx) => (
                <button
                  key={song.title}
                  ref={(el) => { if (idx === selectedIndex && el) el.scrollIntoView({ block: "nearest" }); }}
                  onClick={() => { setInput(song.title); setShowAutocomplete(false); setSelectedIndex(-1); handleGuess(song.title); }}
                  className={`autocomplete-item w-full text-left px-4 py-2.5 text-sm border-b border-[var(--color-border)] last:border-0 ${idx === selectedIndex ? "bg-[var(--color-card-hover)]" : "hover:bg-[var(--color-card-hover)]"}`}
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
              <p className="font-semibold text-lg mb-1">{t("result.perfectEar")}</p>
              <p className="text-sm text-[var(--color-muted)]">
                {t("result.lyricGuessedIn", {
                  title: target.title,
                  artist: target.artist,
                  n: guesses.length,
                  tries: guesses.length === 1 ? t("result.try") : t("result.tries"),
                })}
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl mb-2">😔</p>
              <p className="font-semibold text-lg mb-1">{t("result.betterLuck")}</p>
              <div className="my-3 rounded-lg border-2 border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-4 py-3">
                <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-1">{t("result.answerLabel")}</p>
                <p className="text-lg font-bold text-[var(--color-accent)]">{target.title}</p>
                <p className="text-sm text-[var(--color-muted)]">{target.artist}</p>
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
                    {status === "won" ? `${guesses.length}/6 ✓` : "X/6"}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DailyStatsCard mode="lyric" />
          <CountdownTimer />
        </div>
      )}

      <div className="mt-6 flex gap-1.5 justify-center">
        {Array.from({ length: MAX_GUESSES }).map((_, i) => (
          <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${
            i < guesses.length ? (i === guesses.length - 1 && status === "won" ? "bg-[var(--color-success)]" : "bg-[var(--color-error)]") : "bg-[var(--color-border)]"
          }`} />
        ))}
      </div>

      {status !== "playing" && <NextGameBanner currentMode="lyric-dle" />}
      <Toast message={toastMsg} show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
}
