import type { Metadata } from "next";
import ArchiveGame from "./ArchiveGame";

const SITE_URL = "https://k-dle.vercel.app";

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
  return <ArchiveGame num={num} />;
}
