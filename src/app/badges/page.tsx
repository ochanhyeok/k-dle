import type { Metadata } from "next";
import BadgesContent from "@/components/badges/BadgesContent";

export const metadata: Metadata = {
  title: "Badges — K-Dle",
  description: "Collect K-pop themed achievement badges by playing K-Dle daily puzzles. Track your streak, skill, and discovery progress.",
  alternates: { canonical: "https://k-dle.vercel.app/badges" },
};

export default function Page() {
  return <BadgesContent />;
}
