"use client";

import Link from "next/link";
import HeaderButtons from "@/components/ui/HeaderButtons";
import StreakBanner from "@/components/ui/StreakBanner";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTranslation } from "@/lib/i18n";

const MODE_KEYS = [
  {
    id: "drama-dle",
    emoji: "🎬",
    title: "Drama-dle",
    descKey: "mode.drama.desc" as const,
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
    hoverBorder: "hover:border-purple-500/60",
  },
  {
    id: "idol-dle",
    emoji: "🎤",
    title: "Idol-dle",
    descKey: "mode.idol.desc" as const,
    color: "from-pink-500/20 to-pink-500/5",
    borderColor: "border-pink-500/30",
    hoverBorder: "hover:border-pink-500/60",
  },
  {
    id: "lyric-dle",
    emoji: "📝",
    title: "Lyric-dle",
    descKey: "mode.lyric.desc" as const,
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    hoverBorder: "hover:border-blue-500/60",
  },
  {
    id: "scene-dle",
    emoji: "🎭",
    title: "Scene-dle",
    descKey: "mode.scene.desc" as const,
    color: "from-amber-500/20 to-amber-500/5",
    borderColor: "border-amber-500/30",
    hoverBorder: "hover:border-amber-500/60",
  },
];

export default function HomeContent() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col page-enter">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-[var(--color-accent)]">K</span>-Dle
            <span className="sr-only"> — Daily K-Drama & K-Pop Guessing Game</span>
          </h1>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <HeaderButtons />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-8 animate-stagger-in">
            <div className="text-5xl mb-3">🇰🇷</div>
            <h2 className="text-2xl font-bold mb-2">
              {t("home.hero")}
            </h2>
            <p className="text-[var(--color-muted)] text-sm max-w-md mx-auto whitespace-pre-line">
              {t("home.subtitle")}
            </p>
          </div>

          {/* Game Modes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {MODE_KEYS.map((mode, i) => (
              <Link
                href={`/${mode.id}`}
                key={mode.id}
                className="animate-stagger-in"
                style={{ animationDelay: `${0.05 + i * 0.07}s` }}
              >
                <div
                  className={`game-card relative rounded-xl border ${mode.borderColor} ${mode.hoverBorder} bg-gradient-to-b ${mode.color} p-5 cursor-pointer group h-full`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl group-active:scale-110 transition-transform">{mode.emoji}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 transition-transform mt-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{mode.title}</h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    {t(mode.descKey)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Party Mode Link */}
          <div className="animate-stagger-in mb-3" style={{ animationDelay: "0.31s" }}>
            <Link
              href="/party"
              className="block rounded-xl border border-pink-500/30 hover:border-pink-500/60 bg-gradient-to-b from-pink-500/10 to-pink-500/5 p-4 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎉</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{t("party.title")}</h3>
                  <p className="text-xs text-[var(--color-muted)]">{t("party.homeDesc")}</p>
                </div>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  className="text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Archive Link */}
          <div className="animate-stagger-in mb-6" style={{ animationDelay: "0.33s" }}>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">📚</span>
                <div>
                  <h3 className="font-semibold text-sm">{t("archive.title")}</h3>
                  <p className="text-xs text-[var(--color-muted)]">{t("archive.subtitle")}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {MODE_KEYS.map((mode) => (
                  <Link
                    key={mode.id}
                    href={`/${mode.id}/archive`}
                    className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-center text-xs font-medium hover:border-[var(--color-accent)]/50 transition-colors"
                  >
                    {mode.emoji} {mode.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Badges Link */}
          <div className="animate-stagger-in mb-3" style={{ animationDelay: "0.35s" }}>
            <Link
              href="/badges"
              className="block rounded-xl border border-amber-500/30 hover:border-amber-500/60 bg-gradient-to-b from-amber-500/10 to-amber-500/5 p-4 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{t("badge.homeTitle")}</h3>
                  <p className="text-xs text-[var(--color-muted)]">{t("badge.homeDesc")}</p>
                </div>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  className="text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Global Stats Link */}
          <div className="animate-stagger-in mb-3" style={{ animationDelay: "0.37s" }}>
            <Link
              href="/stats"
              className="block rounded-xl border border-emerald-500/30 hover:border-emerald-500/60 bg-gradient-to-b from-emerald-500/10 to-emerald-500/5 p-4 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{t("globalStats.title")}</h3>
                  <p className="text-xs text-[var(--color-muted)]">{t("globalStats.homeDesc")}</p>
                </div>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  className="text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Daily Streak Banner */}
          <div className="animate-stagger-in" style={{ animationDelay: "0.39s" }}>
            <StreakBanner />
          </div>

          {/* SEO Content - What is K-Dle */}
          <section className="mt-10 mb-8">
            <h3 className="text-lg font-semibold mb-3">{t("home.whatIsTitle")}</h3>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              {t("home.whatIsText")}
            </p>
          </section>

          {/* Why fans love K-Dle */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">{t("home.whyTitle")}</h3>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">
              {t("home.whyP1")}
            </p>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              {t("home.whyP2")}
            </p>
          </section>

          {/* How to Play */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">{t("home.howPlayTitle")}</h3>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              {t("home.howPlayText")}
            </p>
          </section>

          <div className="text-center mb-4">
            <Link href="/about" className="text-sm text-[var(--color-accent)] hover:underline">
              {t("home.moreAbout")} →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] px-4 py-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-2 text-xs">
            <Link href="/about" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
              {t("home.about")}
            </Link>
            <span className="text-[var(--color-border)]">|</span>
            <Link href="/faq" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
              FAQ
            </Link>
            <span className="text-[var(--color-border)]">|</span>
            <Link href="/blog" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
              Blog
            </Link>
            <span className="text-[var(--color-border)]">|</span>
            <Link href="/contact" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
              {t("contact.title")}
            </Link>
            <span className="text-[var(--color-border)]">|</span>
            <Link href="/privacy" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
              {t("home.privacy")}
            </Link>
            <span className="text-[var(--color-border)]">|</span>
            <Link href="/terms" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
              {t("home.terms")}
            </Link>
          </div>
          <p className="text-[10px] text-[var(--color-muted)]">
            {t("home.footer")}
          </p>
        </div>
      </footer>
    </div>
  );
}
