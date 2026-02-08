import type { Metadata } from "next";
import ArchiveGame from "./ArchiveGame";

const SITE_URL = "https://k-dle.vercel.app";

export async function generateMetadata({ params }: { params: Promise<{ num: string }> }): Promise<Metadata> {
  const { num } = await params;
  return {
    title: `Scene-dle Archive #${num}`,
    description: `Play past Scene-dle puzzle #${num}. Can you recognize the K-Drama from the scene description?`,
    alternates: { canonical: `${SITE_URL}/scene-dle/archive/${num}` },
    openGraph: {
      title: `Scene-dle Archive #${num} | K-Dle`,
      description: `Play past Scene-dle puzzle #${num}. Recognize the K-Drama scene!`,
      url: `${SITE_URL}/scene-dle/archive/${num}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ num: string }> }) {
  const { num } = await params;
  return <ArchiveGame num={num} />;
}
