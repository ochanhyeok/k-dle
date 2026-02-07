"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import GameFooter from "@/components/ui/GameFooter";
import ContactModal from "@/components/ui/ContactModal";

export default function AboutPage() {
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
          <h1 className="text-lg font-bold tracking-tight">{t("about.title")}</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-10">
            <div className="text-5xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold mb-3">
              <span className="text-[var(--color-accent)]">K</span>-Dle
            </h2>
            <p className="text-[var(--color-muted)] text-sm max-w-md mx-auto leading-relaxed">
              {t("about.tagline")}
            </p>
          </div>

          {/* What is K-Dle */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">{t("about.whatIs")}</h3>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">
              {t("about.whatIsP1")}
            </p>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              {t("about.whatIsP2")}
            </p>
          </section>

          {/* Why We Built K-Dle */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">{t("about.whyTitle")}</h3>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">
              {t("about.whyP1")}
            </p>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              {t("about.whyP2")}
            </p>
          </section>

          {/* Game Modes */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{t("about.gameModes")}</h3>
            <div className="space-y-3">
              {([
                { emoji: "🎬", title: "Drama-dle", descKey: "about.drama" as const },
                { emoji: "🎤", title: "Idol-dle", descKey: "about.idol" as const },
                { emoji: "📝", title: "Lyric-dle", descKey: "about.lyric" as const },
                { emoji: "🎭", title: "Scene-dle", descKey: "about.scene" as const },
              ]).map((mode) => (
                <div key={mode.title} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{mode.emoji}</span>
                    <h4 className="font-semibold text-sm">{mode.title}</h4>
                  </div>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">{t(mode.descKey)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">{t("about.featuresTitle")}</h3>
            <div className="space-y-2">
              {(["about.feature1", "about.feature2", "about.feature3", "about.feature4", "about.feature5", "about.feature6"] as const).map((key, i) => (
                <div key={key} className="flex items-start gap-3 text-sm text-[var(--color-muted)]">
                  <span className="text-[var(--color-accent)] mt-0.5">✓</span>
                  <p>{t(key)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How it Works */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">{t("about.howItWorks")}</h3>
            <div className="space-y-2 text-sm text-[var(--color-muted)] leading-relaxed">
              {(["about.step1", "about.step2", "about.step3", "about.step4", "about.step5"] as const).map((key, i) => (
                <div key={key} className="flex items-start gap-3">
                  <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5">{i + 1}.</span>
                  <p>{t(key)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Community */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">{t("about.communityTitle")}</h3>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              {t("about.communityText")}
            </p>
          </section>

          {/* Built With Care */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">{t("about.techTitle")}</h3>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              {t("about.techText")}
            </p>
          </section>

          {/* Disclaimer */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">{t("about.disclaimerTitle")}</h3>
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                {t("about.disclaimerText")}
              </p>
            </div>
          </section>

          {/* Links */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">{t("about.links")}</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/privacy" className="text-[var(--color-accent)] hover:underline">
                {t("about.privacyPolicy")}
              </Link>
              <Link href="/terms" className="text-[var(--color-accent)] hover:underline">
                {t("about.termsOfService")}
              </Link>
              <Link href="/faq" className="text-[var(--color-accent)] hover:underline">
                {t("faq.title")}
              </Link>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h3 className="text-lg font-semibold mb-3">{t("about.contact")}</h3>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              {t("about.contactText")}{" "}
              <button onClick={() => setShowModal(true)} className="text-[var(--color-accent)] hover:underline">
                pon07084@gmail.com
              </button>
            </p>
          </section>
        </div>
      </main>

      <GameFooter />
      <ContactModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
