"use client";

import Link from "next/link";
import HeaderButtons from "./HeaderButtons";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation, type TranslationKey } from "@/lib/i18n";

const SUBTITLE_KEYS: Record<string, TranslationKey> = {
  "Drama-dle": "game.subtitle.drama",
  "Idol-dle": "game.subtitle.idol",
  "Lyric-dle": "game.subtitle.lyric",
  "Scene-dle": "game.subtitle.scene",
};

interface GameHeaderProps {
  emoji: string;
  title: string;
  subtitle: string;
}

export default function GameHeader({ emoji, title, subtitle }: GameHeaderProps) {
  const { t } = useTranslation();
  const subtitleKey = SUBTITLE_KEYS[title];
  const displaySubtitle = subtitleKey ? t(subtitleKey) : subtitle;

  return (
    <header className="border-b border-[var(--color-border)] px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="icon-btn p-2.5 -ml-2 rounded-xl"
            aria-label={t("aria.backHome")}
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
              {displaySubtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <HeaderButtons />
        </div>
      </div>
    </header>
  );
}
