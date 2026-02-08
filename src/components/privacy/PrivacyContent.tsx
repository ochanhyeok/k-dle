"use client";

import Link from "next/link";
import { useTranslation, type TranslationKey } from "@/lib/i18n";
import GameFooter from "@/components/ui/GameFooter";

const SECTIONS: { titleKey: TranslationKey; textKey: TranslationKey }[] = [
  { titleKey: "privacy.s1Title", textKey: "privacy.s1Text" },
  { titleKey: "privacy.s2Title", textKey: "privacy.s2Text" },
  { titleKey: "privacy.s3Title", textKey: "privacy.s3Text" },
  { titleKey: "privacy.s4Title", textKey: "privacy.s4Text" },
  { titleKey: "privacy.s5Title", textKey: "privacy.s5Text" },
  { titleKey: "privacy.s6Title", textKey: "privacy.s6Text" },
  { titleKey: "privacy.s7Title", textKey: "privacy.s7Text" },
  { titleKey: "privacy.s8Title", textKey: "privacy.s8Text" },
  { titleKey: "privacy.s9Title", textKey: "privacy.s9Text" },
];

export default function PrivacyContent() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--color-border)] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="p-2 -ml-2 rounded-lg hover:bg-[var(--color-card)] transition-colors"
            aria-label={t("aria.backHome")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold tracking-tight">{t("privacy.title")}</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <article className="max-w-2xl mx-auto prose-sm">
          <p className="text-xs text-[var(--color-muted)] mb-6">
            {t("privacy.lastUpdated")}
          </p>

          {SECTIONS.map((s) => (
            <section key={s.titleKey} className="mb-8">
              <h2 className="text-lg font-semibold mb-3">{t(s.titleKey)}</h2>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                {t(s.textKey)}
              </p>
            </section>
          ))}
        </article>
      </main>

      <GameFooter />
    </div>
  );
}
