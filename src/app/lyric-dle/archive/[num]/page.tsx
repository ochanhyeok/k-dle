"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GameHeader from "@/components/ui/GameHeader";
import LyricDle from "@/components/lyric-dle/LyricDle";
import GameFooter from "@/components/ui/GameFooter";
import { getLyricPuzzleNumber } from "@/lib/lyric-game";

export default function LyricDleArchiveGamePage({ params }: { params: Promise<{ num: string }> }) {
  const { num: numStr } = use(params);
  const router = useRouter();
  const [valid, setValid] = useState<boolean | null>(null);
  const puzzleNum = parseInt(numStr, 10);

  useEffect(() => {
    const today = getLyricPuzzleNumber();
    if (isNaN(puzzleNum) || puzzleNum < 0 || puzzleNum >= today) {
      router.replace("/lyric-dle/archive");
    } else {
      setValid(true);
    }
  }, [puzzleNum, router]);

  if (valid === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <GameHeader emoji="📝" title="Lyric-dle" subtitle="Archive" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-[var(--color-muted)]">Loading...</div>
        </main>
        <GameFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader emoji="📝" title="Lyric-dle" subtitle={`Archive #${puzzleNum}`} />
      <main className="flex-1">
        <LyricDle archivePuzzleNumber={puzzleNum} />
      </main>
      <GameFooter />
    </div>
  );
}
