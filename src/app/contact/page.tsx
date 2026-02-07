"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import GameFooter from "@/components/ui/GameFooter";

export default function ContactPage() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

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

          {sent ? (
            <div className="rounded-xl border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 p-6 text-center mb-8">
              <p className="text-sm text-[var(--color-success)] font-medium">{t("contact.sent")}</p>
            </div>
          ) : (
            <form
              className="space-y-4 mb-8"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = new FormData(form);
                const mailto = `mailto:pon07084@gmail.com?subject=K-Dle Feedback from ${data.get("name")}&body=${encodeURIComponent(String(data.get("message")))}%0A%0AFrom: ${data.get("email")}`;
                window.location.href = mailto;
                setSent(true);
              }}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">{t("contact.nameLabel")}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder={t("contact.namePlaceholder")}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm placeholder:text-[var(--color-muted)] focus:outline-none input-focus"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">{t("contact.emailLabel")}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t("contact.emailPlaceholder")}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm placeholder:text-[var(--color-muted)] focus:outline-none input-focus"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">{t("contact.messageLabel")}</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder={t("contact.messagePlaceholder")}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm placeholder:text-[var(--color-muted)] focus:outline-none input-focus resize-none"
                />
              </div>
              <button type="submit" className="cta-btn w-full rounded-lg bg-[var(--color-accent)] text-white font-semibold py-3 text-sm">
                {t("contact.send")}
              </button>
            </form>
          )}

          <section className="mb-8">
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-5">
              <p className="text-sm text-[var(--color-muted)] mb-2">
                {t("contact.orEmail")}{" "}
                <a href="mailto:pon07084@gmail.com" className="text-[var(--color-accent)] hover:underline">
                  pon07084@gmail.com
                </a>
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
    </div>
  );
}
