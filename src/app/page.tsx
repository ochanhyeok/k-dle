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
    hoverBorder: "hover:border-purple-500/60",
    available: true,
  },
  {
    id: "idol-dle",
    emoji: "🎤",
    title: "Idol-dle",
    description: "Identify the K-Pop idol from attributes",
    color: "from-pink-500/20 to-pink-500/5",
    borderColor: "border-pink-500/30",
    hoverBorder: "hover:border-pink-500/60",
    available: true,
  },
  {
    id: "lyric-dle",
    emoji: "📝",
    title: "Lyric-dle",
    description: "Name the song from translated lyrics",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    hoverBorder: "hover:border-blue-500/60",
    available: true,
  },
  {
    id: "scene-dle",
    emoji: "🎭",
    title: "Scene-dle",
    description: "Recognize the drama from scene descriptions",
    color: "from-amber-500/20 to-amber-500/5",
    borderColor: "border-amber-500/30",
    hoverBorder: "hover:border-amber-500/60",
    available: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col page-enter">
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
          <div className="text-center mb-8 animate-stagger-in">
            <div className="text-5xl mb-3">🇰🇷</div>
            <h2 className="text-2xl font-bold mb-2">
              Daily K-Drama & K-Pop Puzzles
            </h2>
            <p className="text-[var(--color-muted)] text-sm max-w-md mx-auto">
              Test your knowledge with daily challenges.
              Guess dramas, idols, lyrics, and iconic scenes.
            </p>
          </div>

          {/* Game Modes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {MODES.map((mode, i) => (
              <Link
                href={`/${mode.id}`}
                key={mode.id}
                className="animate-stagger-in"
                style={{ animationDelay: `${0.05 + i * 0.07}s` }}
              >
                <div
                  className={`game-card relative rounded-xl border ${mode.borderColor} ${mode.hoverBorder} bg-gradient-to-b ${mode.color} p-5 cursor-pointer group h-full`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl group-active:scale-110 transition-transform">{mode.emoji}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 transition-transform mt-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{mode.title}</h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    {mode.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Daily Streak Banner */}
          <div className="animate-stagger-in" style={{ animationDelay: "0.35s" }}>
            <StreakBanner />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] px-4 py-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-2 text-xs">
            <Link href="/about" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
              About
            </Link>
            <span className="text-[var(--color-border)]">|</span>
            <Link href="/privacy" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
              Privacy
            </Link>
            <span className="text-[var(--color-border)]">|</span>
            <Link href="/terms" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
              Terms
            </Link>
          </div>
          <p className="text-[10px] text-[var(--color-muted)]">
            K-Dle is an unofficial fan project. All IP belongs to respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}
