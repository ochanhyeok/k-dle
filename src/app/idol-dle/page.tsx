import type { Metadata } from "next";
import GameHeader from "@/components/ui/GameHeader";
import IdolDle from "@/components/idol-dle/IdolDle";
import GameHowToPlay from "@/components/ui/GameHowToPlay";
import GameFooter from "@/components/ui/GameFooter";

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
        <GameHowToPlay mode="idol-dle" />
      </main>
      <GameFooter />
    </div>
  );
}
