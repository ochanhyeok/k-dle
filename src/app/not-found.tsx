import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
      <p className="text-sm text-[var(--color-muted)] mb-6 text-center max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to the puzzles!
      </p>
      <Link
        href="/"
        className="cta-btn rounded-lg bg-[var(--color-accent)] text-white font-semibold px-6 py-3 text-sm"
      >
        Back to K-Dle
      </Link>
    </div>
  );
}
