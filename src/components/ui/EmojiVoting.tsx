"use client";

import { useState, useEffect } from "react";
import {
  EMOJI_OPTIONS,
  getLocalVote,
  submitEmojiVote,
  fetchEmojiVotes,
  type EmojiReaction,
  type EmojiVotesData,
} from "@/lib/emoji-voting";
import { useTranslation } from "@/lib/i18n";

interface Props {
  mode: string;
}

export default function EmojiVoting({ mode }: Props) {
  const [voted, setVoted] = useState<EmojiReaction | null>(null);
  const [votes, setVotes] = useState<EmojiVotesData | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const local = getLocalVote(mode);
    if (local) {
      setVoted(local);
      fetchEmojiVotes(mode).then(setVotes);
    }
  }, [mode]);

  const handleVote = async (reaction: EmojiReaction) => {
    if (voted) return;
    setVoted(reaction);
    await submitEmojiVote(mode, reaction);
    const data = await fetchEmojiVotes(mode);
    setVotes(data);
  };

  const totalVotes = votes
    ? votes.fire + votes.hard + votes.perfect + votes.skull + votes.shocked
    : 0;

  return (
    <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 animate-slide-up">
      <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-3 text-center">
        {t("emoji.title")}
      </p>

      <div className="flex justify-center gap-2">
        {EMOJI_OPTIONS.map(({ key, emoji }) => {
          const isSelected = voted === key;
          const pct = votes && totalVotes > 0 ? Math.round(((votes[key] || 0) / totalVotes) * 100) : 0;

          return (
            <button
              key={key}
              onClick={() => handleVote(key)}
              disabled={!!voted}
              aria-label={`React with ${key}`}
              className={`relative flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-sm transition-all ${
                isSelected
                  ? "bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/50 scale-110"
                  : voted
                    ? "opacity-50 cursor-default border border-transparent"
                    : "hover:bg-[var(--color-card-hover)] hover:scale-105 active:scale-95 border border-transparent cursor-pointer"
              }`}
            >
              <span className="text-2xl">{emoji}</span>
              {voted && votes && (
                <span className={`text-[10px] font-medium tabular-nums ${isSelected ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"}`}>
                  {pct}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      {voted && totalVotes > 0 && (
        <p className="text-[10px] text-[var(--color-muted)] text-center mt-2">
          {t("emoji.totalVotes", { n: totalVotes })}
        </p>
      )}
    </div>
  );
}
