"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import type { BlogPost } from "@/data/blog-posts";

interface BlogListContentProps {
  posts: BlogPost[];
}

export default function BlogListContent({ posts }: BlogListContentProps) {
  const { t, locale } = useTranslation();

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <header className="mb-10 text-center">
          <Link
            href="/"
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
          >
            {t("blog.backToHome" as any)}
          </Link>
          <h1 className="text-3xl font-bold mt-4 mb-2">{t("blog.title" as any)}</h1>
          <p className="text-[var(--color-muted)]">
            {t("blog.subtitle" as any)}
          </p>
        </header>

        <div className="space-y-6">
          {posts.map((post) => (
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
              <h2 className="text-lg font-semibold mb-1">
                {(locale !== "en" && post.titleI18n?.[locale]) || post.title}
              </h2>
              <p className="text-sm text-[var(--color-muted)] mb-2">
                {(locale !== "en" && post.descriptionI18n?.[locale]) || post.description}
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
          {" — "}{t("blog.footer" as any)}
        </footer>
      </div>
    </div>
  );
}
