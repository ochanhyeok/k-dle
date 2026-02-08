import type { Metadata } from "next";
import ArchiveGame from "./ArchiveGame";

const SITE_URL = "https://k-dle.vercel.app";

export async function generateMetadata({ params }: { params: Promise<{ num: string }> }): Promise<Metadata> {
  const { num } = await params;
  return {
    title: `Drama-dle Archive #${num}`,
    description: `Play past Drama-dle puzzle #${num}. Can you guess the K-Drama from progressive clues?`,
    alternates: { canonical: `${SITE_URL}/drama-dle/archive/${num}` },
    openGraph: {
      title: `Drama-dle Archive #${num} | K-Dle`,
      description: `Play past Drama-dle puzzle #${num}. Guess the K-Drama!`,
      url: `${SITE_URL}/drama-dle/archive/${num}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ num: string }> }) {
  const { num } = await params;
  return <ArchiveGame num={num} />;
}
