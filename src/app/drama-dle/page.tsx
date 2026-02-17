import type { Metadata } from "next";
import GameHeader from "@/components/ui/GameHeader";
import DramaDle from "@/components/drama-dle/DramaDle";
import GameHowToPlay from "@/components/ui/GameHowToPlay";
import GameFooter from "@/components/ui/GameFooter";

export const metadata: Metadata = {
  title: "Drama-dle — Guess the K-Drama",
  description:
    "Can you guess the K-Drama from progressive text clues? Genre, cast, quotes and more. A new puzzle every day!",
  alternates: {
    canonical: "https://k-dle.vercel.app/drama-dle",
  },
  openGraph: {
    title: "Drama-dle — Guess the K-Drama | K-Dle",
    description: "Guess the K-Drama from progressive clues. New puzzle daily!",
    url: "https://k-dle.vercel.app/drama-dle",
  },
  twitter: {
    title: "Drama-dle — Guess the K-Drama | K-Dle",
    description: "Guess the K-Drama from progressive clues. New puzzle daily!",
  },
};

export default function DramaDlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader emoji="🎬" title="Drama-dle" subtitle="Guess the K-Drama" />
      <main className="flex-1">
        <DramaDle />
        <GameHowToPlay mode="drama-dle" />
      </main>

      <section className="max-w-2xl mx-auto px-4 py-10 text-sm leading-relaxed text-[var(--color-muted)]">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">About K-Dramas: A Cultural Phenomenon</h2>
        <p className="mb-4">
          Korean dramas, commonly known as K-Dramas, have captivated audiences worldwide and fundamentally reshaped how people consume international television. What began as a regional entertainment format popular across East and Southeast Asia has evolved into a genuine global cultural force, with dedicated viewers on every continent streaming the latest episodes within hours of their Korean broadcast.
        </p>
        <p className="mb-4">
          The appeal of K-Dramas lies in their distinctive storytelling approach. Unlike many Western television series that can stretch across multiple seasons for years, most Korean dramas are designed as self-contained stories of 16 to 20 episodes. This limited-series format allows writers to craft tightly plotted narratives with clear beginnings, middles, and satisfying conclusions. Viewers can commit to a complete story in a matter of weeks rather than years, which has made K-Dramas particularly attractive to binge-watchers on streaming platforms like Netflix, Viki, and Disney+.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">Popular K-Drama Genres and What Makes Them Unique</h3>
        <p className="mb-4">
          K-Dramas span an impressive range of genres, each with its own conventions and appeal. Romantic comedies remain the most popular category internationally, featuring the slow-burn love stories, dramatic confessions, and emotional chemistry that have become hallmarks of the format. Historical dramas, known as sageuk, transport viewers to Korea&apos;s Joseon Dynasty with lavish costumes, palace intrigue, and epic storytelling. Thriller and crime dramas have gained significant international traction with psychologically complex narratives that rival the best of Western television.
        </p>
        <p className="mb-4">
          What sets K-Dramas apart from other television traditions is their willingness to blend genres seamlessly. A single drama might combine romance with fantasy elements, weave comedy into a crime thriller, or set a zombie apocalypse within a period historical setting. This creative flexibility keeps the medium fresh and unpredictable, constantly surprising even veteran viewers who think they know what to expect.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">The Global Impact of Korean Television</h3>
        <p className="mb-4">
          The international breakthrough of K-Dramas accelerated dramatically with the rise of global streaming platforms. Netflix&apos;s investment in Korean content produced watershed moments like Squid Game, which became the platform&apos;s most-watched series of all time, viewed in over 90 countries. This success demonstrated that Korean storytelling could captivate audiences regardless of language barriers, shattering the long-held industry assumption that subtitled content had a limited ceiling.
        </p>
        <p className="mb-4">
          Beyond entertainment, K-Dramas have become a gateway to Korean culture for millions of international fans. Viewers develop interests in Korean cuisine, language, fashion, and travel through the dramas they watch. Korean tourism boards have capitalized on this phenomenon, promoting filming locations as tourist destinations. The economic ripple effects extend to Korean beauty products, food exports, and language education programs that have all seen significant growth driven by K-Drama popularity.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">Why K-Drama Fans Love Drama-dle</h3>
        <p className="mb-4">
          Drama-dle is designed specifically for fans who have developed deep knowledge of Korean television through years of passionate viewing. The game features over 200 carefully selected K-Dramas spanning from 2016 to the present, covering everything from mainstream Netflix hits to beloved cable network gems. Each daily puzzle tests a different dimension of drama knowledge — from genre and network details to cast members and iconic quotes.
        </p>
        <p className="mb-4">
          The progressive clue system rewards both breadth and depth of knowledge. Casual viewers who recognize major hits will find early clues sufficient, while dedicated fans can challenge themselves to guess from minimal information. The daily format creates a shared experience among the global K-Drama community, with fans comparing scores and discussing each puzzle across social media platforms.
        </p>
      </section>

      <GameFooter />
    </div>
  );
}
