"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation, type Locale } from "@/lib/i18n";

const LOCALE_OPTIONS: { code: Locale; flag: string; label: string }[] = [
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "ko", flag: "🇰🇷", label: "한국어" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALE_OPTIONS.find((o) => o.code === locale)!;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="icon-btn flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-sm"
        aria-label={`Language: ${current.label}`}
        aria-expanded={open}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`text-[var(--color-muted)] transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-40 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] shadow-xl overflow-hidden z-50 animate-slide-up">
          {LOCALE_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              onClick={() => { setLocale(opt.code); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                locale === opt.code
                  ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium"
                  : "text-[var(--color-foreground)] hover:bg-[var(--color-card)]"
              }`}
            >
              <span className="text-lg leading-none">{opt.flag}</span>
              <span>{opt.label}</span>
              {locale === opt.code && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="ml-auto text-[var(--color-accent)]"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
