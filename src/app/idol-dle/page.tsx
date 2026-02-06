import Link from "next/link";
import IdolDle from "@/components/idol-dle/IdolDle";

export default function IdolDlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--color-border)] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/" className="p-2 -ml-2 rounded-lg hover:bg-[var(--color-card)] transition-colors" aria-label="Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          </Link>
          <div>
            <h1 className="text-lg font-bold tracking-tight">🎤 Idol-dle</h1>
            <p className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider">Guess the K-Pop Idol</p>
          </div>
        </div>
      </header>
      <main className="flex-1"><IdolDle /></main>
      <footer className="border-t border-[var(--color-border)] px-4 py-3">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] text-[var(--color-muted)]">K-Dle is an unofficial fan project. All IP belongs to respective owners.</p>
        </div>
      </footer>
    </div>
  );
}
