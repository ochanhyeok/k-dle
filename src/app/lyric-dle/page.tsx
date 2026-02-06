import type { Metadata } from "next";
import GameHeader from "@/components/ui/GameHeader";
import LyricDle from "@/components/lyric-dle/LyricDle";

export const metadata: Metadata = {
  title: "Lyric-dle — Name the K-Pop Song",
  description:
    "Can you name the K-Pop or K-Drama OST from translated lyrics? One new line revealed per guess. A new puzzle every day!",
  alternates: {
    canonical: "https://k-dle.vercel.app/lyric-dle",
  },
  openGraph: {
    title: "Lyric-dle — Name the K-Pop Song | K-Dle",
    description: "Name the song from translated lyrics. New puzzle daily!",
  },
};

export default function LyricDlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader emoji="📝" title="Lyric-dle" subtitle="Name the Song from Lyrics" />
      <main className="flex-1">
        <LyricDle />
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
