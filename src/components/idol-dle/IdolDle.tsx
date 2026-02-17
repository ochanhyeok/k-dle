"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  getTodaysIdol,
  getWelcomeIdol,
  getIdolPuzzleNumber,
  getIdolByPuzzleNumber,
  loadIdolArchiveState,
  saveIdolArchiveState,
  compareIdols,
  findIdol,
  getAllIdolNames,
  generateIdolShareText,
  type CompareRow,
} from "@/lib/idol-game";
import type { Idol } from "@/data/idols";
import { shareResult, shareWithImage } from "@/lib/share";
import { generateShareCard, type CellResult } from "@/lib/share-image";
import { recordGameResult, loadUnifiedStats, type UnifiedStats } from "@/lib/unified-stats";
import { recordDailyResult } from "@/lib/daily-stats";
import { useTranslation, type TranslationKey } from "@/lib/i18n";
import { translateIdolAttr } from "@/data/i18n/idol-enums";
import CountdownTimer from "@/components/ui/CountdownTimer";
import NextGameBanner from "@/components/ui/NextGameBanner";
import DailyStatsCard from "@/components/ui/DailyStatsCard";
import Toast from "@/components/ui/Toast";
import EmojiVoting from "@/components/ui/EmojiVoting";
import ChallengeButton from "@/components/ui/ChallengeButton";
import FandomSelector from "@/components/ui/FandomSelector";
import FandomLeaderboard from "@/components/ui/FandomLeaderboard";
import { decodeCompareData, type CompareData } from "@/lib/compare";
import { getSelectedFandom, recordFandomResult } from "@/lib/fandom";
import { submitPartyResult } from "@/lib/party";
import { checkAndAwardBadges } from "@/lib/achievements";
import AchievementToast from "@/components/ui/AchievementToast";
import BadgeCollection from "@/components/ui/BadgeCollection";

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

export default function IdolDle({ archivePuzzleNumber }: { archivePuzzleNumber?: number }) {
  const isArchive = archivePuzzleNumber !== undefined;
  const [target, setTarget] = useState<Idol | null>(null);
  const [puzzleNumber, setPuzzleNumber] = useState(0);
  const [rows, setRows] = useState<CompareRow[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [shakeInput, setShakeInput] = useState(false);
  const [stats, setStats] = useState<UnifiedStats | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [friendResult, setFriendResult] = useState<CompareData | null>(null);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [partyCode, setPartyCode] = useState<string | null>(null);
  const [isWelcome, setIsWelcome] = useState(false);
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
    if (isArchive) {
      const idol = getIdolByPuzzleNumber(archivePuzzleNumber);
      const num = archivePuzzleNumber;
      setTarget(idol);
      setPuzzleNumber(num);
      const saved = loadIdolArchiveState(archivePuzzleNumber);
      if (saved && idol) {
        const restoredRows: CompareRow[] = [];
        for (const name of saved.guessNames) {
          const guessIdol = findIdol(name);
          if (guessIdol) {
            restoredRows.push({ guess: guessIdol, results: compareIdols(guessIdol, idol) });
          }
        }
        setRows(restoredRows);
        setStatus(saved.status);
      }
    } else {
      const uStats = loadUnifiedStats();
      setStats(uStats);
      const welcomeDone = localStorage.getItem("k-dle-welcome-done-idol");
      const isNewUser = uStats.gamesPlayed === 0 && !welcomeDone;
      const isParty = !!new URLSearchParams(window.location.search).get("party");

      if (!isParty && isNewUser) {
        setTarget(getWelcomeIdol());
        setPuzzleNumber(0);
        setIsWelcome(true);
      } else {
        const idol = getTodaysIdol();
        const num = getIdolPuzzleNumber();
        setTarget(idol);
        setPuzzleNumber(num);
        if (!isParty) {
          const saved = loadIdolState(num);
          if (saved && idol) {
            const restoredRows: CompareRow[] = [];
            for (const name of saved.guessNames) {
              const guessIdol = findIdol(name);
              if (guessIdol) {
                restoredRows.push({ guess: guessIdol, results: compareIdols(guessIdol, idol) });
              }
            }
            setRows(restoredRows);
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

  const handleGuess = (idOrName: string) => {
    if (!target || status !== "playing") return;
    const idol = findIdol(idOrName);
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

    if (isWelcome) {
      if (won || lost) {
        localStorage.setItem("k-dle-welcome-done-idol", "1");
      }
    } else if (isArchive) {
      saveIdolArchiveState(puzzleNumber, newRows.map((r) => r.guess.id), newStatus);
    } else if (partyCode) {
      if (won || lost) {
        const name = sessionStorage.getItem("k-dle-party-name") || "Player";
        submitPartyResult(partyCode, name, won, newRows.length);
      }
    } else {
      saveIdolState(puzzleNumber, newRows.map((r) => r.guess.id), newStatus);
      if (won || lost) {
        const newStats = recordGameResult(won, newRows.length);
        setStats(newStats);
        recordDailyResult("idol", won, newRows.length);
        const fandom = getSelectedFandom();
        if (fandom) recordFandomResult("idol", fandom, won, newRows.length);
          const badges = checkAndAwardBadges();
          if (badges.length > 0) setNewBadges(badges);
      }
    }
  };

  const handleShare = async () => {
    let text = generateIdolShareText(puzzleNumber, rows, status === "won", MAX_GUESSES);
    if (isArchive) {
      text = text.replace("Idol-dle", "Idol-dle (Archive)");
      text = text.replace(/\/idol-dle\?r=\S+/, `/idol-dle/archive/${puzzleNumber}`);
    }
    try {
      const mapCell = (v: string): CellResult =>
        v === "correct" ? "correct" : v === "partial" ? "partial" : "wrong";
      const grid: CellResult[][] = rows.map((r) => {
        const res = r.results;
        return [
          mapCell(res.gender),
          mapCell(res.group),
          mapCell(res.position),
          mapCell(res.nationality),
          mapCell(res.debutYear === "correct" ? "correct" : "wrong"),
          mapCell(res.company),
          mapCell(res.generation),
        ];
      });
      const blob = await generateShareCard({
        mode: "idol",
        puzzleNumber,
        score: status === "won" ? `${rows.length}/${MAX_GUESSES}` : `X/${MAX_GUESSES}`,
        won: status === "won",
        isArchive,
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

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
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
          {isWelcome ? "Idol-dle" : `Idol-dle #${puzzleNumber}`}
          {isArchive && (
            <span className="ml-2 inline-block rounded bg-[var(--color-accent)]/20 text-[var(--color-accent)] px-1.5 py-0.5 text-[10px] font-semibold">
              {t("archive.archiveMode")}
            </span>
          )}
        </p>
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
                    const selected = filteredNames[selectedIndex];
                    setInput(selected.name);
                    setShowAutocomplete(false);
                    setSelectedIndex(-1);
                    handleGuess(selected.id);
                  } else if (filteredNames.length === 1) {
                    setInput(filteredNames[0].name);
                    setShowAutocomplete(false);
                    setSelectedIndex(-1);
                    handleGuess(filteredNames[0].id);
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
                  key={idol.id}
                  ref={(el) => { if (idx === selectedIndex && el) el.scrollIntoView({ block: "nearest" }); }}
                  onClick={() => { setInput(idol.name); setShowAutocomplete(false); setSelectedIndex(-1); handleGuess(idol.id); }}
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
          {/* Welcome complete — transition to daily puzzle */}
          {isWelcome && (
            <div className="mt-4 rounded-lg bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 p-4 text-center">
              <p className="text-sm font-medium mb-2">{t("welcome.greatJob")}</p>
              <button
                onClick={() => {
                  setIsWelcome(false);
                  setRows([]);
                  setStatus("playing");
                  setInput("");
                  const idol = getTodaysIdol();
                  const num = getIdolPuzzleNumber();
                  setTarget(idol);
                  setPuzzleNumber(num);
                  const saved = loadIdolState(num);
                  if (saved && idol) {
                    const restoredRows: CompareRow[] = [];
                    for (const name of saved.guessNames) {
                      const guessIdol = findIdol(name);
                      if (guessIdol) {
                        restoredRows.push({ guess: guessIdol, results: compareIdols(guessIdol, idol) });
                      }
                    }
                    setRows(restoredRows);
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
                <ChallengeButton mode="idol-dle" puzzleNumber={puzzleNumber} guessCount={rows.length} won={status === "won"} />
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
                    {status === "won" ? `${rows.length}/6 ✓` : "X/6"}
                  </span>
                </div>
              </div>
            </div>
          )}
          {!isArchive && !isWelcome && <EmojiVoting mode="idol" />}
          {!isArchive && !isWelcome && <FandomSelector />}
          {!isArchive && !isWelcome && <FandomLeaderboard mode="idol" />}
          {!isArchive && !isWelcome && <BadgeCollection inline />}
          {isArchive ? (
            <Link
              href="/idol-dle/archive"
              className="mt-4 inline-block w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] py-3 text-sm font-medium text-center hover:border-[var(--color-accent)]/50 transition-colors"
            >
              {t("archive.backToArchive")}
            </Link>
          ) : !isWelcome ? (
            <>
              <DailyStatsCard mode="idol" userGuessCount={rows.length} userWon={status === "won"} />
              <CountdownTimer />
            </>
          ) : null}
        </div>
      )}

      <div className="mt-6 flex gap-1.5 justify-center">
        {Array.from({ length: MAX_GUESSES }).map((_, i) => (
          <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${
            i < rows.length ? (i === rows.length - 1 && status === "won" ? "bg-[var(--color-success)]" : "bg-[var(--color-error)]") : "bg-[var(--color-border)]"
          }`} />
        ))}
      </div>

      {!isArchive && status !== "playing" && <NextGameBanner currentMode="idol-dle" />}
      <Toast message={toastMsg} show={showToast} onClose={() => setShowToast(false)} />
      {newBadges.length > 0 && (
        <AchievementToast badgeIds={newBadges} onDone={() => setNewBadges([])} />
      )}
    </div>
  );
}
