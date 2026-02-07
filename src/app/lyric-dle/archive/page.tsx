import type { Metadata } from "next";
import GameHeader from "@/components/ui/GameHeader";
import ArchiveGrid from "@/components/ui/ArchiveGrid";
import GameFooter from "@/components/ui/GameFooter";

export const metadata: Metadata = {
  title: "Lyric-dle Archive — Past Puzzles",
  description: "Browse and play past Lyric-dle puzzles. Revisit previous K-Pop lyrics guessing challenges.",
  alternates: { canonical: "https://k-dle.vercel.app/lyric-dle/archive" },
};

export default function LyricDleArchivePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader emoji="📝" title="Lyric-dle" subtitle="Archive" />
      <main className="flex-1">
        <ArchiveGrid mode="lyric-dle" emoji="📝" title="Lyric-dle" />
      </main>
      <GameFooter />
    </div>
  );
}
