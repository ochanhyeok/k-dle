import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog — K-Dle | K-Drama & K-Pop Guides and Articles",
  description:
    "Read guides, tips, and articles about K-Dramas, K-Pop, and how to master K-dle daily puzzles.",
  alternates: { canonical: "https://k-dle.vercel.app/blog" },
  openGraph: {
    title: "Blog | K-Dle",
    description:
      "Guides, tips, and articles about K-Dramas, K-Pop, and K-dle puzzles.",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <header className="mb-10 text-center">
          <Link
            href="/"
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
          >
            ← Back to K-Dle
          </Link>
          <h1 className="text-3xl font-bold mt-4 mb-2">Blog</h1>
          <p className="text-[var(--color-muted)]">
            Guides, tips, and deep dives into K-Drama & K-Pop culture
          </p>
        </header>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 hover:border-[var(--color-accent)]/50 transition-colors"
            >
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-accent)] bg-[var(--color-accent)]/10 rounded px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-lg font-semibold mb-1">{post.title}</h2>
              <p className="text-sm text-[var(--color-muted)] mb-2">
                {post.description}
              </p>
              <p className="text-xs text-[var(--color-muted)]">{post.date}</p>
            </Link>
          ))}
        </div>

        <footer className="mt-12 text-center text-xs text-[var(--color-muted)]">
          <Link
            href="/"
            className="hover:text-[var(--color-foreground)] transition-colors"
          >
            K-Dle
          </Link>
          {" — "}Daily K-Drama & K-Pop Puzzles
        </footer>
      </div>
    </div>
  );
}
