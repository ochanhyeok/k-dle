import type { Metadata } from "next";
import GameHeader from "@/components/ui/GameHeader";
import DramaDle from "@/components/drama-dle/DramaDle";

export const metadata: Metadata = {
  title: "Drama-dle — Guess the K-Drama",
  description:
    "Can you guess the K-Drama from progressive text clues? Genre, cast, quotes and more. A new puzzle every day!",
  alternates: {
    canonical: "https://k-dle.vercel.app/drama-dle",
  },
  openGraph: {
    title: "Drama-dle — Guess the K-Drama | K-Dle",
    description: "Guess the K-Drama from progressive clues. New puzzle daily!",
  },
};

export default function DramaDlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader emoji="🎬" title="Drama-dle" subtitle="Guess the K-Drama" />
      <main className="flex-1">
        <DramaDle />
        <section className="max-w-lg mx-auto px-4 py-8 text-center">
          <h2 className="text-lg font-semibold mb-2">How to Play Drama-dle</h2>
          <p className="text-xs text-[var(--color-muted)] leading-relaxed max-w-md mx-auto">
            Drama-dle is a daily K-Drama guessing game. Each day, a new Korean drama is selected and you receive progressive text clues — genre, network, keywords, cast initials, famous quotes, and starring actors. You have 6 tries to guess the correct K-Drama title. Share your results with friends and build your daily streak!
          </p>
        </section>
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
