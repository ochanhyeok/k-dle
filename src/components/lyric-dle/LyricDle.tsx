"use client";

import { useState, useEffect, useRef } from "react";
import {
  getTodaysLyric,
  getWelcomeLyric,
  getLyricPuzzleNumber,
  getLyricHints,
  checkLyricGuess,
  getAllSongTitles,
  generateLyricShareText,
  getLyricByPuzzleNumber,
  loadLyricArchiveState,
  saveLyricArchiveState,
} from "@/lib/lyric-game";
import type { LyricSong } from "@/data/lyrics";
import Link from "next/link";
import { shareResult, shareWithImage } from "@/lib/share";
import { generateShareCard, type CellResult } from "@/lib/share-image";
import { recordGameResult, loadUnifiedStats, type UnifiedStats } from "@/lib/unified-stats";
import { recordDailyResult } from "@/lib/daily-stats";
import { decodeCompareData, type CompareData } from "@/lib/compare";
import { submitPartyResult } from "@/lib/party";
import { useTranslation } from "@/lib/i18n";
import CountdownTimer from "@/components/ui/CountdownTimer";
import NextGameBanner from "@/components/ui/NextGameBanner";
import DailyStatsCard from "@/components/ui/DailyStatsCard";
import Toast from "@/components/ui/Toast";
import EmojiVoting from "@/components/ui/EmojiVoting";
import ChallengeButton from "@/components/ui/ChallengeButton";
import FandomSelector from "@/components/ui/FandomSelector";
import FandomLeaderboard from "@/components/ui/FandomLeaderboard";
import { getSelectedFandom, recordFandomResult } from "@/lib/fandom";
import { checkAndAwardBadges } from "@/lib/achievements";
import AchievementToast from "@/components/ui/AchievementToast";
import BadgeCollection from "@/components/ui/BadgeCollection";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";

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

export default function LyricDle({ archivePuzzleNumber }: { archivePuzzleNumber?: number }) {
  const isArchive = archivePuzzleNumber !== undefined;
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
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [partyCode, setPartyCode] = useState<string | null>(null);
  const [isWelcome, setIsWelcome] = useState(false);
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
    if (isArchive) {
      const song = getLyricByPuzzleNumber(archivePuzzleNumber);
      setTarget(song);
      setPuzzleNumber(archivePuzzleNumber);
      const saved = loadLyricArchiveState(archivePuzzleNumber);
      if (saved) {
        setGuesses(saved.guesses);
        setStatus(saved.status);
      }
    } else {
      const uStats = loadUnifiedStats();
      setStats(uStats);
      const welcomeDone = localStorage.getItem("k-dle-welcome-done");
      const isNewUser = uStats.gamesPlayed === 0 && !welcomeDone;
      const isParty = !!new URLSearchParams(window.location.search).get("party");

      if (!isParty && isNewUser) {
        setTarget(getWelcomeLyric());
        setPuzzleNumber(0);
        setIsWelcome(true);
      } else {
        const song = getTodaysLyric();
        const num = getLyricPuzzleNumber();
        setTarget(song);
        setPuzzleNumber(num);
        if (!isParty) {
          const saved = loadLyricState(num);
          if (saved) {
            setGuesses(saved.guesses);
            setStatus(saved.status);
          }
        }
      }
    }
  }, [isArchive, archivePuzzleNumber]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const party = params.get("party");
    if (party) setPartyCode(party);
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

    if (isWelcome) {
      if (won || lost) {
        localStorage.setItem("k-dle-welcome-done", "1");
      }
    } else if (isArchive) {
      saveLyricArchiveState(puzzleNumber, newGuesses, newStatus);
    } else if (partyCode) {
      if (won || lost) {
        const name = sessionStorage.getItem("k-dle-party-name") || "Player";
        submitPartyResult(partyCode, name, won, newGuesses.length);
      }
    } else {
      saveLyricState(puzzleNumber, newGuesses, newStatus);
      if (won || lost) {
        const newStats = recordGameResult(won, newGuesses.length);
        setStats(newStats);
        recordDailyResult("lyric", won, newGuesses.length);
        const fandom = getSelectedFandom();
        if (fandom) recordFandomResult("lyric", fandom, won, newGuesses.length);
          const badges = checkAndAwardBadges();
          if (badges.length > 0) setNewBadges(badges);
      }
    }
  };

  const handleShare = async () => {
    let text = generateLyricShareText(puzzleNumber, guesses, status === "won", MAX_GUESSES);
    if (isArchive) text = text.replace("Lyric-dle", "Lyric-dle (Archive)");
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
      {/* Challenge Banner */}
      {friendResult && status === "playing" && (
        <div className="mb-4 rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-4 py-3 text-center animate-slide-up">
          <p className="text-sm font-medium text-[var(--color-accent)]">
            {t("challenge.banner")}
          </p>
          <p className="text-xs text-[var(--color-muted)] mt-1">
            {friendResult.won ? t("challenge.friendSolved", { n: friendResult.guessCount }) : t("challenge.friendFailed")}
          </p>
        </div>
      )}

      {/* Welcome Banner */}
      {isWelcome && status === "playing" && (
        <div className="mb-4 rounded-lg border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 px-4 py-3 text-center animate-slide-up">
          <p className="text-sm font-medium text-[var(--color-success)]">
            {t("welcome.banner")}
          </p>
        </div>
      )}

      <div className="text-center mb-6">
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-1">
          {isWelcome ? "Lyric-dle" : `Lyric-dle #${puzzleNumber}`}
          {isArchive && (
            <span className="ml-2 inline-block rounded bg-[var(--color-accent)]/20 text-[var(--color-accent)] px-1.5 py-0.5 text-[10px] font-semibold">
              {t("archive.archiveMode")}
            </span>
          )}
        </p>
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
          {/* Welcome complete — transition to daily puzzle */}
          {isWelcome && (
            <div className="mt-4 rounded-lg bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 p-4 text-center">
              <p className="text-sm font-medium mb-2">{t("welcome.greatJob")}</p>
              <button
                onClick={() => {
                  setIsWelcome(false);
                  setGuesses([]);
                  setStatus("playing");
                  setInput("");
                  const song = getTodaysLyric();
                  const num = getLyricPuzzleNumber();
                  setTarget(song);
                  setPuzzleNumber(num);
                  const saved = loadLyricState(num);
                  if (saved) {
                    setGuesses(saved.guesses);
                    setStatus(saved.status);
                  }
                }}
                className="cta-btn w-full rounded-lg bg-[var(--color-accent)] text-white font-semibold py-3 text-sm"
              >
                {t("welcome.tryDaily")} →
              </button>
            </div>
          )}

          {/* Stats mini */}
          {!isArchive && !isWelcome && stats && (
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

          {!isWelcome && (
            <>
              <button onClick={handleShare} className="cta-btn mt-2 w-full rounded-lg bg-[var(--color-success)] text-black font-semibold py-3 text-sm">
                {t("result.shareResult")} 📋
              </button>
              {!isArchive && (
                <ChallengeButton mode="lyric-dle" puzzleNumber={puzzleNumber} guessCount={guesses.length} won={status === "won"} />
              )}
            </>
          )}
          {!isArchive && !isWelcome && friendResult && friendResult.puzzleNum === puzzleNumber && (
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
          {target.youtubeId && (
            <YouTubeEmbed videoId={target.youtubeId} title={`${target.title} - ${target.artist}`} />
          )}
          {!isArchive && !isWelcome && <EmojiVoting mode="lyric" />}
          {!isArchive && !isWelcome && <FandomSelector />}
          {!isArchive && !isWelcome && <FandomLeaderboard mode="lyric" />}
          {!isArchive && !isWelcome && <BadgeCollection inline />}
          {isArchive ? (
            <Link
              href="/lyric-dle/archive"
              className="mt-4 inline-block w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] py-3 text-sm font-medium text-center hover:border-[var(--color-accent)]/50 transition-colors"
            >
              {t("archive.backToArchive")}
            </Link>
          ) : !isWelcome ? (
            <>
              <DailyStatsCard mode="lyric" userGuessCount={guesses.length} userWon={status === "won"} />
              <CountdownTimer />
            </>
          ) : null}
        </div>
      )}

      <div className="mt-6 flex gap-1.5 justify-center">
        {Array.from({ length: MAX_GUESSES }).map((_, i) => (
          <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${
            i < guesses.length ? (i === guesses.length - 1 && status === "won" ? "bg-[var(--color-success)]" : "bg-[var(--color-error)]") : "bg-[var(--color-border)]"
          }`} />
        ))}
      </div>

      {!isArchive && status !== "playing" && <NextGameBanner currentMode="lyric-dle" />}
      <Toast message={toastMsg} show={showToast} onClose={() => setShowToast(false)} />
      {newBadges.length > 0 && (
        <AchievementToast badgeIds={newBadges} onDone={() => setNewBadges([])} />
      )}
    </div>
  );
}
