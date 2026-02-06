import type { Metadata } from "next";
import GameHeader from "@/components/ui/GameHeader";
import SceneDle from "@/components/scene-dle/SceneDle";

export const metadata: Metadata = {
  title: "Scene-dle — Recognize the K-Drama Scene",
  description:
    "Can you recognize the K-Drama from a scene description? Clues get more specific with each guess. A new puzzle every day!",
  alternates: {
    canonical: "https://k-dle.vercel.app/scene-dle",
  },
  openGraph: {
    title: "Scene-dle — Recognize the K-Drama Scene | K-Dle",
    description: "Recognize the K-Drama from scene descriptions. New puzzle daily!",
  },
};

export default function SceneDlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader emoji="🎭" title="Scene-dle" subtitle="Recognize the K-Drama Scene" />
      <main className="flex-1">
        <SceneDle />
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
