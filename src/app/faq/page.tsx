"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation, type TranslationKey } from "@/lib/i18n";
import GameFooter from "@/components/ui/GameFooter";
import ContactModal from "@/components/ui/ContactModal";

const FAQ_ITEMS: { q: TranslationKey; a: TranslationKey }[] = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
  { q: "faq.q7", a: "faq.a7" },
  { q: "faq.q8", a: "faq.a8" },
  { q: "faq.q9", a: "faq.a9" },
  { q: "faq.q10", a: "faq.a10" },
  { q: "faq.q11", a: "faq.a11" },
  { q: "faq.q12", a: "faq.a12" },
  { q: "faq.q13", a: "faq.a13" },
  { q: "faq.q14", a: "faq.a14" },
  { q: "faq.q15", a: "faq.a15" },
];

export default function FaqPage() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

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
          <h1 className="text-lg font-bold tracking-tight">{t("faq.title")}</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-5xl mb-4">❓</div>
            <h2 className="text-2xl font-bold mb-3">{t("faq.title")}</h2>
          </div>

          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-[var(--color-card-hover)] transition-colors"
                >
                  <span className="text-sm font-medium">{t(item.q)}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`shrink-0 text-[var(--color-muted)] transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-4 text-sm text-[var(--color-muted)] leading-relaxed border-t border-[var(--color-border)] pt-3">
                    {t(item.a)}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--color-muted)] mb-2">
              {t("about.contactText")}{" "}
              <button onClick={() => setShowModal(true)} className="text-[var(--color-accent)] hover:underline">
                pon07084@gmail.com
              </button>
            </p>
          </div>
        </div>
      </main>

      <GameFooter />
      <ContactModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
