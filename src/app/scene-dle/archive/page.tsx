import type { Metadata } from "next";
import GameHeader from "@/components/ui/GameHeader";
import ArchiveGrid from "@/components/ui/ArchiveGrid";
import GameFooter from "@/components/ui/GameFooter";

export const metadata: Metadata = {
  title: "Scene-dle Archive — Past Puzzles",
  description: "Browse and play past Scene-dle puzzles. Revisit previous K-Drama scene recognition challenges.",
  alternates: { canonical: "https://k-dle.vercel.app/scene-dle/archive" },
};

export default function SceneDleArchivePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader emoji="🎭" title="Scene-dle" subtitle="Archive" />
      <main className="flex-1">
        <ArchiveGrid mode="scene-dle" emoji="🎭" title="Scene-dle" />
      </main>
      <GameFooter />
    </div>
  );
}
