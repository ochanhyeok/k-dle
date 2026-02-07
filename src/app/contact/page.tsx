"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import GameFooter from "@/components/ui/GameFooter";
import ContactModal from "@/components/ui/ContactModal";

export default function ContactPage() {
  const { t } = useTranslation();
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
          <h1 className="text-lg font-bold tracking-tight">{t("contact.title")}</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-5xl mb-4">📬</div>
            <h2 className="text-2xl font-bold mb-3">{t("contact.title")}</h2>
            <p className="text-[var(--color-muted)] text-sm max-w-md mx-auto leading-relaxed">
              {t("contact.tagline")}
            </p>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={() => setShowModal(true)}
              className="cta-btn rounded-lg bg-[var(--color-accent)] text-white font-semibold px-8 py-3 text-sm"
            >
              {t("contact.send")}
            </button>
          </div>

          <section className="mb-8">
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-5">
              <p className="text-sm text-[var(--color-muted)] mb-2">
                {t("contact.orEmail")}{" "}
                <button onClick={() => setShowModal(true)} className="text-[var(--color-accent)] hover:underline">
                  pon07084@gmail.com
                </button>
              </p>
              <p className="text-xs text-[var(--color-muted)]">{t("contact.responseTime")}</p>
            </div>
          </section>

          <section>
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-5">
              <h3 className="text-sm font-semibold mb-2">DMCA / Takedown</h3>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">{t("contact.dmca")}</p>
            </div>
          </section>
        </div>
      </main>

      <GameFooter />
      <ContactModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
