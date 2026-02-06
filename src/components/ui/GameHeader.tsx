"use client";

import Link from "next/link";
import HeaderButtons from "./HeaderButtons";

interface GameHeaderProps {
  emoji: string;
  title: string;
  subtitle: string;
}

export default function GameHeader({ emoji, title, subtitle }: GameHeaderProps) {
  return (
    <header className="border-b border-[var(--color-border)] px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 -ml-2 rounded-lg hover:bg-[var(--color-card)] transition-colors"
            aria-label="Back to home"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              {emoji} {title}
            </h1>
            <p className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider">
              {subtitle}
            </p>
          </div>
        </div>
        <HeaderButtons />
      </div>
    </header>
  );
}
