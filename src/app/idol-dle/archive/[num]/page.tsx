import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArchiveGame from "./ArchiveGame";

const SITE_URL = "https://k-dle.vercel.app";
const BASELINE = new Date(2026, 1, 6); // Feb 6, 2026

function getMaxPuzzle(): number {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((today.getTime() - BASELINE.getTime()) / (1000 * 60 * 60 * 24)));
}

// Revalidate once per day so new puzzles become available
export const revalidate = 86400;

export function generateStaticParams() {
  const count = getMaxPuzzle();
  return Array.from({ length: count }, (_, i) => ({ num: String(i) }));
}

export async function generateMetadata({ params }: { params: Promise<{ num: string }> }): Promise<Metadata> {
  const { num } = await params;
  return {
    title: `Idol-dle Archive #${num}`,
    description: `Play past Idol-dle puzzle #${num}. Can you identify the K-Pop idol from attribute comparisons?`,
    alternates: { canonical: `${SITE_URL}/idol-dle/archive/${num}` },
    openGraph: {
      title: `Idol-dle Archive #${num} | K-Dle`,
      description: `Play past Idol-dle puzzle #${num}. Guess the K-Pop idol!`,
      url: `${SITE_URL}/idol-dle/archive/${num}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ num: string }> }) {
  const { num } = await params;
  const n = Number(num);
  if (isNaN(n) || n < 0 || n >= getMaxPuzzle() || String(n) !== num) {
    notFound();
  }
  return <ArchiveGame num={num} />;
}
