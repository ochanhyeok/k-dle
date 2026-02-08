"use client";

import Link from "next/link";
import { useTranslation, type TranslationKey } from "@/lib/i18n";
import GameFooter from "@/components/ui/GameFooter";

const SECTIONS: { titleKey: TranslationKey; textKey: TranslationKey }[] = [
  { titleKey: "terms.s1Title", textKey: "terms.s1Text" },
  { titleKey: "terms.s2Title", textKey: "terms.s2Text" },
  { titleKey: "terms.s3Title", textKey: "terms.s3Text" },
  { titleKey: "terms.s4Title", textKey: "terms.s4Text" },
  { titleKey: "terms.s5Title", textKey: "terms.s5Text" },
  { titleKey: "terms.s6Title", textKey: "terms.s6Text" },
  { titleKey: "terms.s7Title", textKey: "terms.s7Text" },
  { titleKey: "terms.s8Title", textKey: "terms.s8Text" },
  { titleKey: "terms.s9Title", textKey: "terms.s9Text" },
  { titleKey: "terms.s10Title", textKey: "terms.s10Text" },
];

export default function TermsContent() {
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
          <h1 className="text-lg font-bold tracking-tight">{t("terms.title")}</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <article className="max-w-2xl mx-auto prose-sm">
          <p className="text-xs text-[var(--color-muted)] mb-6">
            {t("terms.lastUpdated")}
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
