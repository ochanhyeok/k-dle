"use client";

import { useState, useEffect } from "react";
import { getParty, getMyPlayerId, type Party } from "@/lib/party";
import { useTranslation } from "@/lib/i18n";

interface Props {
  code: string;
}

export default function PartyResults({ code }: Props) {
  const [party, setParty] = useState<Party | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const myId = getMyPlayerId();

  useEffect(() => {
    loadParty();
    // Refresh every 10 seconds for new results
    const interval = setInterval(loadParty, 10000);
    return () => clearInterval(interval);
  }, [code]);

  async function loadParty() {
    const data = await getParty(code);
    setParty(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
        <p className="text-xs text-[var(--color-muted)] text-center">{t("game.loading")}</p>
      </div>
    );
  }

  if (!party) {
    return (
      <div className="rounded-lg border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 p-4">
        <p className="text-sm text-center text-[var(--color-error)]">{t("party.notFound")}</p>
      </div>
    );
  }

  const players = Object.entries(party.players)
    .map(([id, p]) => ({ id, ...p }))
    .sort((a, b) => {
      if (a.won !== b.won) return a.won ? -1 : 1;
      if (a.won && b.won) return a.guessCount - b.guessCount;
      return a.completedAt - b.completedAt;
    });

  const modeEmojis: Record<string, string> = {
    "drama-dle": "🎬",
    "idol-dle": "🎤",
    "lyric-dle": "📝",
    "scene-dle": "🎭",
  };

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 animate-slide-up">
      <div className="text-center mb-4">
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-1">
          {t("party.room")} #{party.code}
        </p>
        <p className="text-sm font-medium">
          {modeEmojis[party.mode] || ""} {party.mode.replace("-dle", "").charAt(0).toUpperCase() + party.mode.replace("-dle", "").slice(1)}-dle #{party.puzzleNumber}
        </p>
        <p className="text-xs text-[var(--color-muted)] mt-1">
          {t("party.hostedBy", { name: party.hostName })}
        </p>
      </div>

      {players.length === 0 ? (
        <p className="text-xs text-[var(--color-muted)] text-center py-4">
          {t("party.waitingForPlayers")}
        </p>
      ) : (
        <div className="space-y-2">
          {players.map((player, i) => {
            const isMe = player.id === myId;
            return (
              <div
                key={player.id}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                  isMe
                    ? "bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30"
                    : "border border-[var(--color-border)]"
                }`}
              >
                <span className="text-lg w-6 text-center">
                  {i === 0 && player.won ? "🥇" : i === 1 && player.won ? "🥈" : i === 2 && player.won ? "🥉" : ""}
                </span>
                <span className={`flex-1 font-medium ${isMe ? "text-[var(--color-accent)]" : ""}`}>
                  {player.name}
                  {isMe && <span className="text-[var(--color-muted)] text-xs ml-1">({t("compare.you")})</span>}
                </span>
                <span className={`font-mono text-sm ${
                  player.won ? "text-[var(--color-success)]" : "text-[var(--color-error)]"
                }`}>
                  {player.won ? `${player.guessCount}/6` : "X/6"}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-[10px] text-[var(--color-muted)] text-center mt-3">
        {t("party.autoRefresh")}
      </p>
    </div>
  );
}
