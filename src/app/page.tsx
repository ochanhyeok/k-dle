import Link from "next/link";
import HeaderButtons from "@/components/ui/HeaderButtons";
import StreakBanner from "@/components/ui/StreakBanner";

const MODES = [
  {
    id: "drama-dle",
    emoji: "🎬",
    title: "Drama-dle",
    description: "Guess the K-Drama from progressive clues",
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
    available: true,
  },
  {
    id: "idol-dle",
    emoji: "🎤",
    title: "Idol-dle",
    description: "Identify the K-Pop idol from attributes",
    color: "from-pink-500/20 to-pink-500/5",
    borderColor: "border-pink-500/30",
    available: true,
  },
  {
    id: "lyric-dle",
    emoji: "📝",
    title: "Lyric-dle",
    description: "Name the song from translated lyrics",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    available: true,
  },
  {
    id: "scene-dle",
    emoji: "🎭",
    title: "Scene-dle",
    description: "Recognize the drama from scene descriptions",
    color: "from-amber-500/20 to-amber-500/5",
    borderColor: "border-amber-500/30",
    available: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-[var(--color-accent)]">K</span>-Dle
          </h1>
          <HeaderButtons />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-10">
            <div className="text-5xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold mb-2">
              Daily K-Drama & K-Pop Puzzles
            </h2>
            <p className="text-[var(--color-muted)] text-sm max-w-md mx-auto">
              Test your knowledge with daily challenges.
              Guess dramas, idols, lyrics, and iconic scenes.
            </p>
          </div>

          {/* Game Modes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {MODES.map((mode) => {
              const content = (
                <div
                  key={mode.id}
                  className={`relative rounded-xl border ${mode.borderColor} bg-gradient-to-b ${mode.color} p-5 transition-all ${
                    mode.available
                      ? "hover:scale-[1.02] cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{mode.emoji}</span>
                    {!mode.available && (
                      <span className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] bg-[var(--color-card)] px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{mode.title}</h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    {mode.description}
                  </p>
                </div>
              );

              return mode.available ? (
                <Link href={`/${mode.id}`} key={mode.id}>
                  {content}
                </Link>
              ) : (
                <div key={mode.id}>{content}</div>
              );
            })}
          </div>

          {/* Daily Streak Banner */}
          <StreakBanner />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] px-4 py-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-[var(--color-muted)]">
            K-Dle is an unofficial fan project. Not affiliated with any
            entertainment company.
            <br />
            All intellectual property belongs to their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}
