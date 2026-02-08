import type { Metadata } from "next";
import GlobalStatsContent from "@/components/stats/GlobalStatsContent";

export const metadata: Metadata = {
  title: "Today's Global Stats — K-Dle",
  description: "See how players around the world performed on today's K-Dle puzzles. Compare win rates, guess distributions, and more across all four game modes.",
  alternates: { canonical: "https://k-dle.vercel.app/stats" },
};

export default function Page() {
  return <GlobalStatsContent />;
}
