import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About K-Dle",
  description:
    "Learn about K-Dle, the daily K-Drama and K-Pop guessing game for fans worldwide.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--color-border)] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="p-2 -ml-2 rounded-lg hover:bg-[var(--color-card)] transition-colors"
            aria-label="Back to home"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold tracking-tight">About K-Dle</h1>
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
              The daily guessing game for K-Drama and K-Pop fans worldwide.
            </p>
          </div>

          {/* What is K-Dle */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">What is K-Dle?</h3>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">
              K-Dle is a free daily puzzle game inspired by Wordle, designed for fans of Korean entertainment. Every day, new puzzles challenge your knowledge of K-Dramas, K-Pop idols, song lyrics, and iconic drama scenes.
            </p>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              With four unique game modes, K-Dle offers something for every type of fan — whether you binge-watch dramas, follow K-Pop groups, or know every OST by heart.
            </p>
          </section>

          {/* Game Modes */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Game Modes</h3>
            <div className="space-y-3">
              {[
                { emoji: "🎬", title: "Drama-dle", desc: "Guess the K-Drama from progressive text clues including genre, cast, and famous quotes." },
                { emoji: "🎤", title: "Idol-dle", desc: "Identify the K-Pop idol by comparing attributes like group, position, nationality, and debut year." },
                { emoji: "📝", title: "Lyric-dle", desc: "Name the K-Pop song or K-Drama OST from translated lyrics revealed one line at a time." },
                { emoji: "🎭", title: "Scene-dle", desc: "Recognize the K-Drama from scene descriptions that become more specific with each guess." },
              ].map((mode) => (
                <div key={mode.title} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{mode.emoji}</span>
                    <h4 className="font-semibold text-sm">{mode.title}</h4>
                  </div>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">{mode.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How it Works */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">How It Works</h3>
            <div className="space-y-2 text-sm text-[var(--color-muted)] leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5">1.</span>
                <p>Choose a game mode from the homepage</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5">2.</span>
                <p>You have 6 tries to guess the correct answer</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5">3.</span>
                <p>Each wrong guess reveals more clues</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5">4.</span>
                <p>Share your results with friends — no spoilers!</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[var(--color-accent)] font-mono text-xs mt-0.5">5.</span>
                <p>Come back every day to build your streak</p>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Disclaimer</h3>
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                K-Dle is an unofficial fan project created for entertainment purposes only. It is not affiliated with, endorsed by, or sponsored by any entertainment company, record label, or broadcasting network. All K-Drama titles, K-Pop artist names, song titles, and related intellectual property belong to their respective owners. The use of these names constitutes nominative fair use within the context of a trivia game.
              </p>
            </div>
          </section>

          {/* Links */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Links</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/privacy" className="text-[var(--color-accent)] hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[var(--color-accent)] hover:underline">
                Terms of Service
              </Link>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              For questions, feedback, or DMCA requests, please email us at{" "}
              <a href="mailto:k-dle@proton.me" className="text-[var(--color-accent)] hover:underline">
                k-dle@proton.me
              </a>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-[var(--color-border)] px-4 py-3">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] text-[var(--color-muted)]">
            K-Dle is an unofficial fan project. All IP belongs to respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}
