"use client";

import Link from "next/link";

const ALL_MODES = [
  { id: "drama-dle", emoji: "🎬", title: "Drama-dle" },
  { id: "idol-dle", emoji: "🎤", title: "Idol-dle" },
  { id: "lyric-dle", emoji: "📝", title: "Lyric-dle" },
  { id: "scene-dle", emoji: "🎭", title: "Scene-dle" },
];

interface NextGameBannerProps {
  currentMode: string;
}

export default function NextGameBanner({ currentMode }: NextGameBannerProps) {
  const otherModes = ALL_MODES.filter((m) => m.id !== currentMode);

  return (
    <div className="mt-6 animate-slide-up" style={{ animationDelay: "0.15s" }}>
      <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider text-center mb-3">
        Try another mode
      </p>
      <div className="grid grid-cols-3 gap-2">
        {otherModes.map((mode) => (
          <Link
            key={mode.id}
            href={`/${mode.id}`}
            className="game-card flex flex-col items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-center"
          >
            <span className="text-xl">{mode.emoji}</span>
            <span className="text-xs font-medium">{mode.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
