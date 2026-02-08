"use client";

import { useState, useEffect } from "react";
import { createParty, getParty, type PartyMode, type Party } from "@/lib/party";
import { useTranslation } from "@/lib/i18n";
import PartyResults from "@/components/ui/PartyResults";
import GameHeader from "@/components/ui/GameHeader";

const MODES: { id: PartyMode; emoji: string; label: string }[] = [
  { id: "drama-dle", emoji: "🎬", label: "Drama-dle" },
  { id: "idol-dle", emoji: "🎤", label: "Idol-dle" },
  { id: "lyric-dle", emoji: "📝", label: "Lyric-dle" },
  { id: "scene-dle", emoji: "🎭", label: "Scene-dle" },
];

function getTodaysPuzzleNumber(): number {
  const now = new Date();
  const start = new Date(2026, 1, 6);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export default function PartyPage() {
  const [view, setView] = useState<"home" | "create" | "join" | "room">("home");
  const [selectedMode, setSelectedMode] = useState<PartyMode>("drama-dle");
  const [hostName, setHostName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [partyCode, setPartyCode] = useState("");
  const [party, setParty] = useState<Party | null>(null);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const { t } = useTranslation();

  const handleCreate = async () => {
    if (!hostName.trim()) return;
    setCreating(true);
    try {
      const puzzleNumber = getTodaysPuzzleNumber();
      const code = await createParty(selectedMode, puzzleNumber, hostName.trim());
      setPartyCode(code);
      setParty({ code, mode: selectedMode, puzzleNumber, hostName: hostName.trim(), createdAt: Date.now(), players: {} });
      setView("room");
    } catch {
      setError(t("party.createError"));
    }
    setCreating(false);
  };

  const handleJoin = async () => {
    if (!/^[A-Z0-9]{6}$/.test(joinCode)) {
      setError(t("party.invalidCode"));
      return;
    }
    setError("");
    const data = await getParty(joinCode);
    if (!data) {
      setError(t("party.notFound"));
      return;
    }
    setParty(data);
    setPartyCode(joinCode);
    setView("room");
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(
      `${t("party.inviteText", { code: partyCode })}\nhttps://k-dle.vercel.app/party?code=${partyCode}`
    );
  };

  // Auto-join if code in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code && /^[A-Z0-9]{6}$/.test(code.toUpperCase())) {
      const upperCode = code.toUpperCase();
      setJoinCode(upperCode);
      getParty(upperCode).then((data) => {
        if (data) {
          setParty(data);
          setPartyCode(upperCode);
          setView("room");
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col page-enter">
      <GameHeader emoji="🎉" title="Party Mode" subtitle={t("party.subtitle")} />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-lg mx-auto">
          {view === "home" && (
            <div className="space-y-4 animate-stagger-in">
              <div className="text-center mb-6">
                <p className="text-5xl mb-3">🎉</p>
                <h2 className="text-xl font-bold mb-2">{t("party.title")}</h2>
                <p className="text-sm text-[var(--color-muted)]">{t("party.description")}</p>
              </div>

              <button
                onClick={() => setView("create")}
                className="w-full rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 p-5 text-left hover:border-[var(--color-accent)]/60 transition-colors"
              >
                <p className="text-lg font-semibold mb-1">{t("party.createRoom")}</p>
                <p className="text-xs text-[var(--color-muted)]">{t("party.createDesc")}</p>
              </button>

              <button
                onClick={() => setView("join")}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 text-left hover:border-[var(--color-accent)]/50 transition-colors"
              >
                <p className="text-lg font-semibold mb-1">{t("party.joinRoom")}</p>
                <p className="text-xs text-[var(--color-muted)]">{t("party.joinDesc")}</p>
              </button>
            </div>
          )}

          {view === "create" && (
            <div className="animate-slide-up">
              <button
                onClick={() => setView("home")}
                className="text-sm text-[var(--color-muted)] mb-4 hover:text-[var(--color-foreground)]"
              >
                ← {t("party.back")}
              </button>

              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
                <h3 className="font-semibold text-lg mb-4">{t("party.createRoom")}</h3>

                <div className="mb-4">
                  <label className="text-xs text-[var(--color-muted)] uppercase tracking-wider block mb-1.5">
                    {t("party.yourName")}
                  </label>
                  <input
                    type="text"
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    placeholder={t("party.namePlaceholder")}
                    maxLength={20}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xs text-[var(--color-muted)] uppercase tracking-wider block mb-1.5">
                    {t("party.selectMode")}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {MODES.map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setSelectedMode(mode.id)}
                        className={`rounded-lg px-3 py-2.5 text-sm font-medium border transition-colors ${
                          selectedMode === mode.id
                            ? "border-[var(--color-accent)]/50 bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                            : "border-[var(--color-border)] hover:border-[var(--color-accent)]/30"
                        }`}
                      >
                        {mode.emoji} {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleCreate}
                  disabled={!hostName.trim() || creating}
                  className="w-full rounded-lg bg-[var(--color-accent)] text-black font-semibold py-3 text-sm disabled:opacity-50"
                >
                  {creating ? t("game.loading") : t("party.createButton")}
                </button>

                {error && (
                  <p className="text-xs text-[var(--color-error)] mt-2 text-center">{error}</p>
                )}
              </div>
            </div>
          )}

          {view === "join" && (
            <div className="animate-slide-up">
              <button
                onClick={() => setView("home")}
                className="text-sm text-[var(--color-muted)] mb-4 hover:text-[var(--color-foreground)]"
              >
                ← {t("party.back")}
              </button>

              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
                <h3 className="font-semibold text-lg mb-4">{t("party.joinRoom")}</h3>

                <div className="mb-4">
                  <label className="text-xs text-[var(--color-muted)] uppercase tracking-wider block mb-1.5">
                    {t("party.enterCode")}
                  </label>
                  <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => { setJoinCode(e.target.value.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 6)); setError(""); }}
                    placeholder="ABC123"
                    maxLength={6}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-2xl text-center font-mono tracking-[0.5em] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                  />
                </div>

                <button
                  onClick={handleJoin}
                  disabled={joinCode.length !== 6}
                  className="w-full rounded-lg bg-[var(--color-accent)] text-black font-semibold py-3 text-sm disabled:opacity-50"
                >
                  {t("party.joinButton")}
                </button>

                {error && (
                  <p className="text-xs text-[var(--color-error)] mt-2 text-center">{error}</p>
                )}
              </div>
            </div>
          )}

          {view === "room" && (
            <div className="space-y-4 animate-slide-up">
              {/* Room Code Display */}
              <div className="rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-6 text-center">
                <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-2">
                  {t("party.roomCode")}
                </p>
                <p className="text-4xl font-bold font-mono tracking-[0.3em] text-[var(--color-accent)] mb-3">
                  {partyCode}
                </p>
                <button
                  onClick={handleCopyCode}
                  className="rounded-lg border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-4 py-2 text-sm font-medium text-[var(--color-accent)] hover:bg-[var(--color-accent)]/20 transition-colors"
                >
                  {t("party.shareCode")}
                </button>
              </div>

              {/* Link to play */}
              {party && (
                <a
                  href={`/${party.mode}?party=${partyCode}`}
                  onClick={() => {
                    sessionStorage.setItem("k-dle-party-name", hostName || "Player");
                  }}
                  className="block w-full rounded-lg bg-[var(--color-success)] text-black font-semibold py-3 text-sm text-center"
                >
                  {t("party.playNow")} →
                </a>
              )}

              {/* Results */}
              <PartyResults code={partyCode} />

              <a
                href="/"
                className="block w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] py-3 text-sm font-medium text-center hover:border-[var(--color-accent)]/50 transition-colors"
              >
                {t("notFound.back")}
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
