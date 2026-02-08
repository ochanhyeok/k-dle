import type { Metadata } from "next";
import GameHeader from "@/components/ui/GameHeader";
import ArchiveGrid from "@/components/ui/ArchiveGrid";
import GameFooter from "@/components/ui/GameFooter";

export const metadata: Metadata = {
  title: "Idol-dle Archive — Past Puzzles",
  description: "Browse and play past Idol-dle puzzles. Revisit previous K-Pop idol guessing challenges.",
  alternates: { canonical: "https://k-dle.vercel.app/idol-dle/archive" },
  openGraph: {
    title: "Idol-dle Archive | K-Dle",
    description: "Browse and play past Idol-dle puzzles.",
    url: "https://k-dle.vercel.app/idol-dle/archive",
  },
};

export default function IdolDleArchivePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader emoji="🎤" title="Idol-dle" subtitle="Archive" />
      <main className="flex-1">
        <ArchiveGrid mode="idol-dle" emoji="🎤" title="Idol-dle" />
      </main>
      <GameFooter />
    </div>
  );
}
