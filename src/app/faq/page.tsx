import type { Metadata } from "next";
import FaqContent from "@/components/faq/FaqContent";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description: "Find answers to common questions about K-Dle. Learn about game modes, streak system, sharing results, language support, and more.",
  alternates: { canonical: "https://k-dle.vercel.app/faq" },
  openGraph: {
    title: "FAQ | K-Dle",
    description: "Frequently asked questions about K-Dle, the daily K-Drama & K-Pop guessing game.",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is K-Dle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "K-Dle is a free daily puzzle game inspired by Wordle, designed for fans of Korean entertainment. It features four game modes: Drama-dle (guess K-Dramas from clues), Idol-dle (identify K-Pop idols by attributes), Lyric-dle (name songs from translated lyrics), and Scene-dle (recognize dramas from scene descriptions).",
      },
    },
    {
      "@type": "Question",
      name: "How many tries do I get?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You get 6 tries for each game mode. Each wrong guess reveals additional clues to help you narrow down the answer.",
      },
    },
    {
      "@type": "Question",
      name: "When do new puzzles appear?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "New puzzles are available every day at midnight in your local time zone. All four game modes refresh simultaneously.",
      },
    },
    {
      "@type": "Question",
      name: "Is K-Dle free to play?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, K-Dle is completely free. No account registration is required. Just visit the website and start playing!",
      },
    },
    {
      "@type": "Question",
      name: "How many dramas and songs are in the game?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "K-Dle features 75 K-Dramas across all difficulty levels, 75 K-Pop songs and OSTs, 75 idol profiles, and 75 iconic scene descriptions.",
      },
    },
    {
      "@type": "Question",
      name: "Can I play in different languages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! K-Dle supports English, Spanish, and Korean. You can switch languages using the language selector in the top right corner.",
      },
    },
    {
      "@type": "Question",
      name: "How does the streak system work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your daily streak increases each day you play at least one game mode. Play consistently to earn fan ranks: Newcomer, Trainee, Debut, Rising Star, All-Kill, and Hallyu Legend.",
      },
    },
    {
      "@type": "Question",
      name: "Can I share my results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! After completing a puzzle, click the Share Result button. Your results are shared as emoji grids without revealing the answer.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data stored online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All your game progress, statistics, and streak data are stored locally on your device using browser localStorage. Nothing is sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Does K-Dle work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, K-Dle is fully responsive and works great on smartphones, tablets, and desktop browsers. You can also add it to your home screen for an app-like experience.",
      },
    },
  ],
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <FaqContent />
    </>
  );
}
