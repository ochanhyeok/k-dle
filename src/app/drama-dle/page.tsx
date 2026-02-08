import type { Metadata } from "next";
import GameHeader from "@/components/ui/GameHeader";
import DramaDle from "@/components/drama-dle/DramaDle";
import GameHowToPlay from "@/components/ui/GameHowToPlay";
import GameFooter from "@/components/ui/GameFooter";

export const metadata: Metadata = {
  title: "Drama-dle — Guess the K-Drama",
  description:
    "Can you guess the K-Drama from progressive text clues? Genre, cast, quotes and more. A new puzzle every day!",
  alternates: {
    canonical: "https://k-dle.vercel.app/drama-dle",
  },
  openGraph: {
    title: "Drama-dle — Guess the K-Drama | K-Dle",
    description: "Guess the K-Drama from progressive clues. New puzzle daily!",
    url: "https://k-dle.vercel.app/drama-dle",
  },
  twitter: {
    title: "Drama-dle — Guess the K-Drama | K-Dle",
    description: "Guess the K-Drama from progressive clues. New puzzle daily!",
  },
};

export default function DramaDlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader emoji="🎬" title="Drama-dle" subtitle="Guess the K-Drama" />
      <main className="flex-1">
        <DramaDle />
        <GameHowToPlay mode="drama-dle" />
      </main>
      <GameFooter />
    </div>
  );
}
