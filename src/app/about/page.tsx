import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About K-Dle — Daily K-Drama & K-Pop Guessing Game",
  description: "Learn about K-Dle, a free daily puzzle game for K-Drama and K-Pop fans. Four game modes: Drama-dle, Idol-dle, Lyric-dle, and Scene-dle.",
  alternates: { canonical: "https://k-dle.vercel.app/about" },
  openGraph: {
    title: "About K-Dle | K-Dle",
    description: "Learn about K-Dle, a free daily puzzle game for K-Drama and K-Pop fans.",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
