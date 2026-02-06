import type { Metadata } from "next";
import GameHeader from "@/components/ui/GameHeader";
import IdolDle from "@/components/idol-dle/IdolDle";

export const metadata: Metadata = {
  title: "Idol-dle — Guess the K-Pop Idol",
  description:
    "Identify the K-Pop idol by comparing attributes like group, position, nationality, and debut year. A new puzzle every day!",
  alternates: {
    canonical: "https://k-dle.vercel.app/idol-dle",
  },
  openGraph: {
    title: "Idol-dle — Guess the K-Pop Idol | K-Dle",
    description: "Guess the K-Pop idol from attribute comparisons. New puzzle daily!",
  },
};

export default function IdolDlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader emoji="🎤" title="Idol-dle" subtitle="Guess the K-Pop Idol" />
      <main className="flex-1">
        <IdolDle />
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
