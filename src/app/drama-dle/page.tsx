import type { Metadata } from "next";
import GameHeader from "@/components/ui/GameHeader";
import DramaDle from "@/components/drama-dle/DramaDle";

export const metadata: Metadata = {
  title: "Drama-dle — Guess the K-Drama",
  description:
    "Can you guess the K-Drama from progressive text clues? Genre, cast, quotes and more. A new puzzle every day!",
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
