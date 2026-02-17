import type { Metadata } from "next";
import GameHeader from "@/components/ui/GameHeader";
import IdolDle from "@/components/idol-dle/IdolDle";
import GameHowToPlay from "@/components/ui/GameHowToPlay";
import GameFooter from "@/components/ui/GameFooter";

export const metadata: Metadata = {
  title: "Idol-dle — Guess the K-Pop Idol",
  description:
    "Identify the K-Pop idol by comparing attributes like group, position, nationality, and debut year. A new puzzle every day!",
  alternates: {
    canonical: "https://k-dle.vercel.app/idol-dle",
  },
  openGraph: {
    title: "Idol-dle — Guess the K-Pop Idol | K-Dle",
    description: "Guess the K-Pop idol from attribute comparisons. New puzzle daily!",
    url: "https://k-dle.vercel.app/idol-dle",
  },
  twitter: {
    title: "Idol-dle — Guess the K-Pop Idol | K-Dle",
    description: "Guess the K-Pop idol from attribute comparisons. New puzzle daily!",
  },
};

export default function IdolDlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader emoji="🎤" title="Idol-dle" subtitle="Guess the K-Pop Idol" />
      <main className="flex-1">
        <IdolDle />
        <GameHowToPlay mode="idol-dle" />
      </main>

      <section className="max-w-2xl mx-auto px-4 py-10 text-sm leading-relaxed text-[var(--color-muted)]">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">The World of K-Pop Idols: A Complete Guide</h2>
        <p className="mb-4">
          K-Pop idols represent one of the most distinctive entertainment phenomena of the 21st century. Unlike Western pop stars who typically emerge through talent shows, viral moments, or independent music careers, K-Pop idols are the product of a highly structured trainee system developed by South Korean entertainment companies over the past three decades. This system produces performers with an extraordinary combination of vocal ability, dance precision, visual presentation, and media training that sets them apart in the global music industry.
        </p>
        <p className="mb-4">
          The K-Pop idol industry is built around entertainment agencies — often called &quot;Big 4&quot; companies — that scout, train, and debut new artists. HYBE (home to BTS and SEVENTEEN), SM Entertainment (EXO, aespa, NCT), JYP Entertainment (TWICE, Stray Kids, ITZY), and YG Entertainment (BLACKPINK, TREASURE) each have distinctive training philosophies and artistic identities that shape the groups they produce. Beyond the Big 4, companies like Starship, Pledis, CUBE, and Kakao Entertainment have also produced internationally successful acts.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">The Trainee System: How K-Pop Stars Are Made</h3>
        <p className="mb-4">
          Aspiring idols typically enter the trainee system between the ages of 12 and 17, though some start earlier and others later. Trainees undergo rigorous daily training in vocal technique, multiple dance styles, foreign languages (usually Japanese, English, and Mandarin), and media presentation. The training period varies dramatically — some trainees debut within a year, while others train for five to seven years before being selected for a debut group. Many trainees never debut at all, making the system intensely competitive.
        </p>
        <p className="mb-4">
          Within each K-Pop group, members are assigned specific positions that define their role in performances and promotions. Main vocalists carry the most demanding singing parts, lead dancers anchor choreography, main rappers handle rap verses, and visual members serve as the group&apos;s public face. Some members hold multiple positions, and the interplay between these roles creates the group dynamic that fans analyze and celebrate.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">K-Pop Generations and Their Evolution</h3>
        <p className="mb-4">
          K-Pop history is commonly organized into generations, each with distinctive characteristics. The first generation (late 1990s to early 2000s) featured pioneers like H.O.T., S.E.S., and BoA who established the idol format. The second generation (mid-2000s to early 2010s) saw groups like TVXQ, Super Junior, Girls&apos; Generation, BIGBANG, and 2NE1 expand K-Pop&apos;s reach across Asia. The third generation (mid-2010s) brought global breakthroughs with BTS, BLACKPINK, EXO, and TWICE dominating international charts.
        </p>
        <p className="mb-4">
          The current fourth generation, emerging from around 2018 onward, includes groups like Stray Kids, aespa, ENHYPEN, NewJeans, LE SSERAFIM, and IVE. These groups debuted into a more globally connected landscape, with international fans participating in real-time through social media and streaming platforms. Fourth-generation groups often incorporate more diverse musical influences and push creative boundaries in ways that reflect their global audience.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">Global Fandoms and Their Cultural Impact</h3>
        <p className="mb-4">
          K-Pop fandoms are among the most organized and influential fan communities in entertainment history. Each major group has an official fandom name — BTS fans are ARMY, BLACKPINK fans are BLINK, Stray Kids fans are STAY, TWICE fans are ONCE — and these communities coordinate streaming campaigns, charity projects, and social media engagement on a scale that regularly makes international news. K-Pop fans have demonstrated their collective power beyond entertainment, organizing fundraising drives for humanitarian causes and amplifying social justice movements worldwide.
        </p>
        <p className="mb-4">
          The economic impact of K-Pop fandoms extends far beyond music sales. Concert tours, merchandise, brand endorsements, and the &quot;K-Pop tourism&quot; industry generate billions of dollars annually. The success of K-Pop has accelerated interest in Korean language learning, Korean cuisine, and Korean culture more broadly, making K-Pop idols among the most effective cultural ambassadors of any nation in the modern era.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">Test Your Idol Knowledge with Idol-dle</h3>
        <p className="mb-4">
          Idol-dle challenges you to identify K-Pop idols by comparing attributes across seven categories: gender, group, position, nationality, debut year, company, and generation. With over 200 idols in our database spanning all four K-Pop generations, every daily puzzle is a test of how deeply you know the artists behind the music you love. Compare your scores with fans worldwide and see where you rank in the global K-Pop knowledge community.
        </p>
      </section>

      <GameFooter />
    </div>
  );
}
