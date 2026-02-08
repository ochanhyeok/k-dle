import type { Metadata } from "next";
import GameHeader from "@/components/ui/GameHeader";
import ArchiveGrid from "@/components/ui/ArchiveGrid";
import GameFooter from "@/components/ui/GameFooter";

export const metadata: Metadata = {
  title: "Drama-dle Archive — Past Puzzles",
  description: "Browse and play past Drama-dle puzzles. Revisit previous K-Drama guessing challenges.",
  alternates: { canonical: "https://k-dle.vercel.app/drama-dle/archive" },
  openGraph: {
    title: "Drama-dle Archive | K-Dle",
    description: "Browse and play past Drama-dle puzzles.",
    url: "https://k-dle.vercel.app/drama-dle/archive",
  },
};

export default function DramaDleArchivePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader emoji="🎬" title="Drama-dle" subtitle="Archive" />
      <main className="flex-1">
        <ArchiveGrid mode="drama-dle" emoji="🎬" title="Drama-dle" />
      </main>
      <GameFooter />
    </div>
  );
}
