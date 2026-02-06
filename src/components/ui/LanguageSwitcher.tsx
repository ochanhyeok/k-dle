"use client";

import { useTranslation, LOCALE_LABELS, type Locale } from "@/lib/i18n";

const LOCALES: Locale[] = ["en", "es", "ko"];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="flex items-center rounded-lg border border-[var(--color-border)] overflow-hidden text-[10px] font-medium">
      {LOCALES.map((loc) => (
        <button
          key={loc}
          onClick={() => setLocale(loc)}
          className={`px-2 py-1.5 transition-colors ${
            locale === loc
              ? "bg-[var(--color-accent)] text-white"
              : "text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-card)]"
          }`}
          aria-label={`Switch to ${LOCALE_LABELS[loc]}`}
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
