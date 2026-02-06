import Link from "next/link";
import DramaDle from "@/components/drama-dle/DramaDle";

export default function DramaDlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 -ml-2 rounded-lg hover:bg-[var(--color-card)] transition-colors"
              aria-label="Back"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                🎬 Drama-dle
              </h1>
              <p className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider">
                Guess the K-Drama
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-lg hover:bg-[var(--color-card)] transition-colors"
              aria-label="How to play"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Game */}
      <main className="flex-1">
        <DramaDle />
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] px-4 py-3">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] text-[var(--color-muted)]">
            K-Dle is an unofficial fan project. All IP belongs to respective
            owners.
          </p>
        </div>
      </footer>
    </div>
  );
}
