import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the K-Dle team. Report issues, suggest new content, or send feedback about our K-Drama and K-Pop guessing game.",
  alternates: { canonical: "https://k-dle.vercel.app/contact" },
  openGraph: {
    title: "Contact Us | K-Dle",
    description: "Get in touch with the K-Dle team for feedback, suggestions, or DMCA requests.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
