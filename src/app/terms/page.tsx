import type { Metadata } from "next";
import TermsContent from "@/components/terms/TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "K-Dle terms of service. Read the rules and conditions for using our free K-Drama and K-Pop guessing game.",
  alternates: { canonical: "https://k-dle.vercel.app/terms" },
  openGraph: {
    title: "Terms of Service | K-Dle",
    description: "K-Dle terms of service for our free K-Drama and K-Pop guessing game.",
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
