import type { Metadata } from "next";
import PrivacyContent from "@/components/privacy/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "K-Dle privacy policy. Learn how we handle your data — all game progress is stored locally on your device, no personal data is collected.",
  alternates: { canonical: "https://k-dle.vercel.app/privacy" },
  openGraph: {
    title: "Privacy Policy | K-Dle",
    description: "K-Dle privacy policy. All game data is stored locally on your device.",
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
