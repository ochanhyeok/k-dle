"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GameHeader from "@/components/ui/GameHeader";
import DramaDle from "@/components/drama-dle/DramaDle";
import GameFooter from "@/components/ui/GameFooter";
import { getPuzzleNumber } from "@/lib/game";

export default function ArchiveGame({ num }: { num: string }) {
  const router = useRouter();
  const [valid, setValid] = useState<boolean | null>(null);
  const puzzleNum = parseInt(num, 10);

  useEffect(() => {
    const today = getPuzzleNumber();
    if (isNaN(puzzleNum) || puzzleNum < 0 || puzzleNum >= today) {
      router.replace("/drama-dle/archive");
    } else {
      setValid(true);
    }
  }, [puzzleNum, router]);

  if (valid === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <GameHeader emoji="🎬" title="Drama-dle" subtitle="Archive" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-[var(--color-muted)]">Loading...</div>
        </main>
        <GameFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader emoji="🎬" title="Drama-dle" subtitle={`Archive #${puzzleNum}`} />
      <main className="flex-1">
        <DramaDle archivePuzzleNumber={puzzleNum} />
      </main>
      <GameFooter />
    </div>
  );
}
