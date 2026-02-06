"use client";

import Modal from "./Modal";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODES = [
  {
    emoji: "🎬",
    title: "Drama-dle",
    description: "Guess the K-Drama from progressive text clues. Each wrong guess reveals a new hint — from genre to cast.",
    example: "📌 Genre: Romance, Fantasy • Year: 2016\n🔑 Keywords: immortal, bride, goblin's sword",
  },
  {
    emoji: "🎤",
    title: "Idol-dle",
    description: "Guess the K-Pop idol. Each guess shows attribute comparisons — group, position, nationality, debut year, and more.",
    example: "🟩 Gender: Female  🟨 Company: Close  🟥 Group: Wrong",
  },
  {
    emoji: "📝",
    title: "Lyric-dle",
    description: "Name the song from translated lyrics. One new line is revealed with each attempt.",
    example: "♪ \"I'm looking for the light in the dark...\"",
  },
  {
    emoji: "🎭",
    title: "Scene-dle",
    description: "Recognize the K-Drama from a scene description that gets more specific with each guess.",
    example: "\"Two people stand in the rain\" → \"A woman hands an umbrella to a man wearing a military uniform\"",
  },
];

export default function HowToPlayModal({
  isOpen,
  onClose,
}: HowToPlayModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="How to Play">
      <div className="space-y-2 mb-5">
        <p className="text-sm text-[var(--color-muted)]">
          Test your K-Drama & K-Pop knowledge with daily puzzles.
        </p>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-[var(--color-success)]">✓</span>
          <span>You have <strong>6 tries</strong> to guess each puzzle</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-[var(--color-success)]">✓</span>
          <span>New puzzles every day at midnight UTC</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-[var(--color-success)]">✓</span>
          <span>Share your results without spoilers</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-[var(--color-success)]">✓</span>
          <span>Build your streak — earn fan ranks!</span>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
          Game Modes
        </p>
        {MODES.map((mode) => (
          <div
            key={mode.title}
            className="rounded-xl border border-[var(--color-border)] bg-zinc-900/50 p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{mode.emoji}</span>
              <h3 className="font-semibold text-sm">{mode.title}</h3>
            </div>
            <p className="text-xs text-[var(--color-muted)] mb-2">
              {mode.description}
            </p>
            <div className="rounded-lg bg-zinc-800/80 px-3 py-2">
              <p className="text-[10px] text-[var(--color-muted)] whitespace-pre-line font-mono">
                {mode.example}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Streak Ranks */}
      <div className="mt-5 pt-4 border-t border-[var(--color-border)]">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-3">
          Streak Ranks
        </p>
        <div className="space-y-1.5 text-xs">
          {[
            { d: "7 days", t: "🎓 Trainee" },
            { d: "30 days", t: "🎤 Debut" },
            { d: "100 days", t: "⭐ Rising Star" },
            { d: "200 days", t: "💥 All-Kill" },
            { d: "365 days", t: "👑 Hallyu Legend" },
          ].map((r) => (
            <div
              key={r.d}
              className="flex justify-between text-[var(--color-muted)]"
            >
              <span>{r.t}</span>
              <span>{r.d}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
