import type { Metadata } from "next";
import GameHeader from "@/components/ui/GameHeader";
import LyricDle from "@/components/lyric-dle/LyricDle";
import GameHowToPlay from "@/components/ui/GameHowToPlay";
import GameFooter from "@/components/ui/GameFooter";

export const metadata: Metadata = {
  title: "Lyric-dle — Name the K-Pop Song",
  description:
    "Can you name the K-Pop or K-Drama OST from translated lyrics? One new line revealed per guess. A new puzzle every day!",
  alternates: {
    canonical: "https://k-dle.vercel.app/lyric-dle",
  },
  openGraph: {
    title: "Lyric-dle — Name the K-Pop Song | K-Dle",
    description: "Name the song from translated lyrics. New puzzle daily!",
    url: "https://k-dle.vercel.app/lyric-dle",
  },
  twitter: {
    title: "Lyric-dle — Name the K-Pop Song | K-Dle",
    description: "Name the song from translated lyrics. New puzzle daily!",
  },
};

export default function LyricDlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader emoji="📝" title="Lyric-dle" subtitle="Name the Song from Lyrics" />
      <main className="flex-1">
        <LyricDle />
        <GameHowToPlay mode="lyric-dle" />
      </main>

      <section className="max-w-2xl mx-auto px-4 py-10 text-sm leading-relaxed text-[var(--color-muted)]">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">K-Pop Music: A Guide to Korean Popular Music</h2>
        <p className="mb-4">
          Korean popular music, universally known as K-Pop, has evolved from a regional music scene into one of the most influential forces in the global entertainment industry. What distinguishes K-Pop from other pop music traditions is its unique combination of meticulously produced sound, visually stunning music videos, synchronized choreography, and a fan engagement model that creates deeply personal connections between artists and audiences. The result is a music culture that has captivated hundreds of millions of listeners across every continent.
        </p>
        <p className="mb-4">
          K-Pop&apos;s musical identity defies simple categorization. A single K-Pop album might span electronic dance music, hip-hop, R&amp;B, rock, jazz, and traditional Korean musical elements. Producers frequently blend genres within individual songs, creating unexpected sonic landscapes that keep listeners engaged through constant surprise. This willingness to experiment — combined with production quality that rivals the most expensive Western releases — has earned K-Pop critical respect alongside its commercial success.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">The Art of K-Pop Lyrics</h3>
        <p className="mb-4">
          K-Pop lyrics occupy a fascinating linguistic space. Many songs blend Korean and English seamlessly, using English phrases as hooks and choruses while delivering verses in Korean. This bilingual approach serves both artistic and commercial purposes — English hooks make songs accessible to international audiences, while Korean verses preserve the emotional nuance and poetic tradition of the Korean language. Some songs incorporate Japanese, Spanish, or other languages, reflecting the increasingly global nature of K-Pop&apos;s audience and creative team.
        </p>
        <p className="mb-4">
          Thematically, K-Pop lyrics have evolved significantly over the decades. Early K-Pop focused primarily on love and romance, but contemporary artists tackle subjects ranging from mental health and self-acceptance (BTS&apos;s Love Yourself series) to social criticism and empowerment (Stray Kids&apos;s God&apos;s Menu), personal identity and confidence (BLACKPINK&apos;s Kill This Love), and surreal storytelling (aespa&apos;s metaverse narrative). This thematic depth has helped K-Pop transcend the &quot;bubblegum pop&quot; label that some critics initially applied to the genre.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">K-Drama OSTs: Where Television Meets Music</h3>
        <p className="mb-4">
          One of the most beloved categories of Korean music is the K-Drama OST (Original Soundtrack). Unlike Western television, which typically licenses existing songs or uses instrumental scoring, Korean dramas commission entirely original songs specifically written to complement their storylines. Each drama may feature 10 to 15 original tracks performed by established and rising artists, creating mini-albums that fans treasure independently of the shows themselves.
        </p>
        <p className="mb-4">
          K-Drama OSTs have produced some of the most emotionally powerful songs in Korean music. Tracks like &quot;Stay With Me&quot; from Goblin, &quot;Everytime&quot; from Descendants of the Sun, and &quot;Christmas Tree&quot; by V (BTS) from Our Beloved Summer have charted internationally and introduced millions of new listeners to Korean music through the emotional gateway of television storytelling. The OST industry represents a significant revenue stream and a crucial bridge between K-Drama and K-Pop fandoms.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">The Hallyu Wave and Music&apos;s Global Reach</h3>
        <p className="mb-4">
          The Korean Wave — known as Hallyu — has transformed the global music landscape in ways that would have been unimaginable just two decades ago. BTS became the first K-Pop act to top the Billboard Hot 100, BLACKPINK headlined Coachella, and Korean artists now regularly fill stadiums across North America, Europe, and South America. Streaming platforms report that K-Pop is among the fastest-growing genres worldwide, with dedicated playlist categories and algorithm recommendations introducing new listeners daily.
        </p>
        <p className="mb-4">
          This global reach has had ripple effects beyond music. K-Pop&apos;s success has driven unprecedented interest in Korean language learning, with platforms like Duolingo reporting Korean as one of their fastest-growing languages. Korean fashion, beauty products, and cuisine have all benefited from the cultural gateway that K-Pop provides. The economic impact of the Korean music industry now extends far beyond record sales into tourism, merchandise, brand partnerships, and cultural diplomacy.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">Challenge Your K-Pop Knowledge with Lyric-dle</h3>
        <p className="mb-4">
          Lyric-dle puts your knowledge of K-Pop songs and K-Drama OSTs to the ultimate test. Each day, a new song is selected from our library of over 200 tracks spanning chart-topping K-Pop hits and beloved drama soundtracks. You start with a single lyric line and receive additional lines with each guess. Can you name the song before all six lines are revealed? Share your results and compete with fans around the world to prove your lyrical expertise.
        </p>
      </section>

      <GameFooter />
    </div>
  );
}
