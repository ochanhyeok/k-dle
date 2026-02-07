"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GameHeader from "@/components/ui/GameHeader";
import IdolDle from "@/components/idol-dle/IdolDle";
import GameFooter from "@/components/ui/GameFooter";
import { getIdolPuzzleNumber } from "@/lib/idol-game";

export default function IdolDleArchiveGamePage({ params }: { params: Promise<{ num: string }> }) {
  const { num: numStr } = use(params);
  const router = useRouter();
  const [valid, setValid] = useState<boolean | null>(null);
  const puzzleNum = parseInt(numStr, 10);

  useEffect(() => {
    const today = getIdolPuzzleNumber();
    if (isNaN(puzzleNum) || puzzleNum < 0 || puzzleNum >= today) {
      router.replace("/idol-dle/archive");
    } else {
      setValid(true);
    }
  }, [puzzleNum, router]);

  if (valid === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <GameHeader emoji="🎤" title="Idol-dle" subtitle="Archive" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-[var(--color-muted)]">Loading...</div>
        </main>
        <GameFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader emoji="🎤" title="Idol-dle" subtitle={`Archive #${puzzleNum}`} />
      <main className="flex-1">
        <IdolDle archivePuzzleNumber={puzzleNum} />
      </main>
      <GameFooter />
    </div>
  );
}
