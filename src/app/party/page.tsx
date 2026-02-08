import type { Metadata } from "next";
import PartyPage from "@/components/party/PartyPage";

export const metadata: Metadata = {
  title: "Party Mode",
  description: "Create a K-Dle party room and challenge your friends! Compare scores in real-time.",
  alternates: { canonical: "https://k-dle.vercel.app/party" },
  openGraph: {
    title: "Party Mode | K-Dle",
    description: "Create a party room and challenge your friends in K-Drama & K-Pop quizzes!",
    url: "https://k-dle.vercel.app/party",
  },
};

export default function Page() {
  return <PartyPage />;
}
