import type { Metadata } from "next";
import GameHeader from "@/components/ui/GameHeader";
import SceneDle from "@/components/scene-dle/SceneDle";
import GameHowToPlay from "@/components/ui/GameHowToPlay";
import GameFooter from "@/components/ui/GameFooter";

export const metadata: Metadata = {
  title: "Scene-dle — Recognize the K-Drama Scene",
  description:
    "Can you recognize the K-Drama from a scene description? Clues get more specific with each guess. A new puzzle every day!",
  alternates: {
    canonical: "https://k-dle.vercel.app/scene-dle",
  },
  openGraph: {
    title: "Scene-dle — Recognize the K-Drama Scene | K-Dle",
    description: "Recognize the K-Drama from scene descriptions. New puzzle daily!",
    url: "https://k-dle.vercel.app/scene-dle",
  },
  twitter: {
    title: "Scene-dle — Recognize the K-Drama Scene | K-Dle",
    description: "Recognize the K-Drama from scene descriptions. New puzzle daily!",
  },
};

export default function SceneDlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader emoji="🎭" title="Scene-dle" subtitle="Recognize the K-Drama Scene" />
      <main className="flex-1">
        <SceneDle />
        <GameHowToPlay mode="scene-dle" />
      </main>

      <section className="max-w-2xl mx-auto px-4 py-10 text-sm leading-relaxed text-[var(--color-muted)]">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">Iconic K-Drama Scenes: The Moments That Define Korean Television</h2>
        <p className="mb-4">
          Korean dramas are built on moments — those pivotal scenes that make viewers gasp, cry, laugh, or reach for the replay button. From dramatic confessions under cherry blossoms to heart-stopping thriller reveals, K-Drama scenes have a distinctive emotional intensity that sets them apart from other television traditions. These moments become cultural touchstones, shared across social media, recreated by fans, and discussed in communities worldwide long after the drama has aired its final episode.
        </p>
        <p className="mb-4">
          The power of K-Drama scenes comes from a combination of careful craftsmanship and emotional authenticity. Korean directors are known for their attention to visual composition, using cinematography, lighting, and color grading to create frames that look like carefully composed photographs. The best K-Drama scenes pair this visual beauty with performances that convey complex emotions through subtle expressions, meaningful silences, and perfectly timed dialogue delivery.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">The Art of the K-Drama Confession Scene</h3>
        <p className="mb-4">
          Perhaps no type of scene is more quintessentially K-Drama than the confession — the moment when a character finally reveals their feelings to the person they love. Korean dramas have elevated the confession scene into an art form, with each drama finding new ways to make this universal moment feel fresh and emotionally devastating. The settings range from rain-soaked streets to rooftop gardens, from hospital corridors to airport departure gates, and the variety of approaches ensures that even veteran viewers are regularly surprised.
        </p>
        <p className="mb-4">
          What makes K-Drama confessions particularly effective is the buildup. Korean dramas typically develop romantic tension across many episodes before the confession arrives, giving viewers time to become deeply invested in the outcome. The slow-burn approach means that when the confession finally happens, it carries the emotional weight of hours of accumulated tension. The OST — the original soundtrack commissioned specifically for the drama — typically swells at exactly the right moment, creating a multi-sensory emotional experience that is uniquely Korean in its execution.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">K-Drama Filming Locations and Visual Storytelling</h3>
        <p className="mb-4">
          The visual beauty of K-Drama scenes owes much to Korea&apos;s diverse landscape and the creative use of filming locations. Seoul provides an urban backdrop that ranges from the traditional hanok houses of Bukchon to the gleaming skyscrapers of Gangnam. Jeju Island&apos;s volcanic coastline, the autumn foliage of Nami Island, and the historical palaces of the Joseon Dynasty offer distinct visual settings that directors use to establish mood and atmosphere. Many filming locations have become tourist destinations, with fans traveling from around the world to stand where their favorite scenes were shot.
        </p>
        <p className="mb-4">
          Indoor scenes in K-Dramas are equally meticulously crafted. Set designers create environments that communicate character through every detail — from the minimalist apartment of a struggling protagonist to the opulent mansion of a chaebol family. The contrast between these spaces often serves as visual shorthand for the class dynamics that drive many K-Drama narratives, and attentive viewers can read entire character backstories from the way their living spaces are designed.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">Scenes That Became Internet Phenomena</h3>
        <p className="mb-4">
          The social media era has transformed how K-Drama scenes are consumed and shared. Particularly powerful or funny moments become viral clips, GIF reactions, and meme templates that circulate far beyond the drama&apos;s original audience. The &quot;red light, green light&quot; scene from Squid Game became one of the most shared television moments in internet history. Romantic scenes from Crash Landing on You, comedic moments from Hometown Cha-Cha-Cha, and dramatic reveals from Penthouse all achieved viral status that drove viewership and cultural conversation.
        </p>
        <p className="mb-4">
          This viral sharing creates a feedback loop that benefits the entire K-Drama ecosystem. A single compelling scene can introduce a drama to millions of potential viewers who then watch the full series, discover other Korean dramas, and become long-term fans of the medium. The K-Drama industry has recognized this dynamic and some productions now deliberately craft &quot;moment-worthy&quot; scenes designed to be clipped, shared, and discussed online.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">Put Your Scene Knowledge to the Test</h3>
        <p className="mb-4">
          Scene-dle challenges you to recognize K-Dramas from descriptions of their most memorable scenes. Starting with vague atmospheric clues and progressing to specific character and plot details, each puzzle rewards fans who have truly absorbed the visual and emotional language of Korean television. With over 200 scenes drawn from dramas spanning 2016 to the present, every day brings a new opportunity to prove your expertise. Compare your results with the global community and discover which scenes fellow fans found most memorable.
        </p>
      </section>

      <GameFooter />
    </div>
  );
}
