import HomeContent from "@/components/home/HomeContent";

export default function Home() {
  return (
    <>
      <HomeContent />
      <section className="max-w-2xl mx-auto px-4 py-10 text-sm leading-relaxed text-[var(--color-muted)]">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">What is K-Dle?</h2>
        <p className="mb-4">
          K-Dle is a free daily puzzle game designed for fans of Korean dramas and K-Pop music. Inspired by the worldwide success of word puzzle games, K-Dle brings the same addictive daily-challenge format to the world of Korean entertainment. Every day at midnight, four brand-new puzzles are generated — one for each game mode — giving fans a fresh reason to test their knowledge and compete with the global K-content community.
        </p>
        <p className="mb-4">
          Whether you have been watching Korean dramas for a decade or just discovered K-Pop last month, K-Dle offers puzzles that meet you at your knowledge level. Early clues in each puzzle reward deep expertise, while later clues make the answer accessible to more casual fans. The result is a game that is satisfying for newcomers and veterans alike, creating shared moments of discovery and recognition across the entire fan community.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4 mt-8">Four Game Modes for Every Type of Fan</h2>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">Drama-dle: Guess the K-Drama</h3>
        <p className="mb-4">
          Drama-dle challenges you to identify a Korean drama from progressive text clues. Each puzzle starts with basic information like genre and year, then gradually reveals more specific details — network, episode count, synopsis hints, character details, and iconic quotes. Fans who can recognize a drama from its genre and year alone demonstrate truly impressive knowledge, while later clues ensure that every player has a fair chance of solving the puzzle.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">Idol-dle: Guess the K-Pop Idol</h3>
        <p className="mb-4">
          Idol-dle tests your knowledge of K-Pop artists through an attribute comparison system. Each guess reveals how the idol you chose compares to the answer across seven categories: gender, group, position, nationality, debut year, company, and generation. Green means an exact match, yellow indicates a partial match, and the arrows on numerical values point you in the right direction. Strategic guessing using these comparisons is the key to solving the puzzle in fewer attempts.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">Lyric-dle: Name the Song from Lyrics</h3>
        <p className="mb-4">
          Lyric-dle presents translated lyric lines from K-Pop songs and K-Drama original soundtracks. You start with a single line and receive an additional line with each incorrect guess. The challenge lies in recognizing songs from fragments of their lyrics — sometimes a single distinctive phrase is enough, while other times you need several lines to piece together the song&apos;s identity. The game features both chart-topping K-Pop hits and beloved drama OSTs that have defined emotional moments in Korean television.
        </p>

        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3 mt-6">Scene-dle: Recognize the K-Drama Scene</h3>
        <p className="mb-4">
          Scene-dle describes memorable moments from popular Korean dramas and asks you to identify which drama they belong to. Descriptions begin with atmospheric details — setting, mood, time of day — and progress to more specific information about characters and plot points. This mode rewards fans who have not only watched many dramas but truly absorbed the visual and emotional details that make each one unique.
        </p>

        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4 mt-8">The Korean Wave: Why Korean Entertainment Matters</h2>
        <p className="mb-4">
          The Korean Wave, known as Hallyu, has transformed global entertainment over the past two decades. Korean dramas like Squid Game, Crash Landing on You, and Extraordinary Attorney Woo have captivated audiences in over 190 countries. K-Pop groups including BTS, BLACKPINK, Stray Kids, and NewJeans regularly top international music charts and fill stadiums around the world. Korean films like Parasite have won Academy Awards, and Korean cultural influence extends into fashion, beauty, cuisine, and language learning worldwide.
        </p>
        <p className="mb-4">
          K-Dle celebrates this cultural phenomenon by turning the knowledge that fans naturally accumulate through their passion into a daily game experience. Every puzzle draws from a carefully curated database of over 200 dramas, 200 idols, 200 songs, and 200 scenes, ensuring months of fresh content and constantly testing different areas of Korean entertainment knowledge. The daily format creates a shared ritual among fans globally — a few minutes each day to engage with the content you love and discover new corners of the K-Drama and K-Pop universe.
        </p>
        <p className="mb-4">
          Beyond individual play, K-Dle fosters community through shareable results, global statistics, and the collective experience of tackling the same puzzle at the same time as thousands of fellow fans. Each day&apos;s puzzle becomes a conversation starter, connecting fans across time zones and cultures through their shared love of Korean entertainment.
        </p>
      </section>
    </>
  );
}
