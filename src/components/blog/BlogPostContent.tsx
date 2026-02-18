"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import type { BlogPost } from "@/data/blog-posts";

interface BlogPostContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const { t, locale } = useTranslation();

  const renderInline = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);

      const linkIdx = linkMatch ? remaining.indexOf(linkMatch[0]) : Infinity;
      const boldIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity;

      if (linkIdx === Infinity && boldIdx === Infinity) {
        parts.push(remaining);
        break;
      }

      if (linkIdx < boldIdx && linkMatch) {
        parts.push(remaining.slice(0, linkIdx));
        parts.push(
          <Link
            key={key++}
            href={linkMatch[2]}
            className="text-[var(--color-accent)] hover:underline"
          >
            {linkMatch[1]}
          </Link>
        );
        remaining = remaining.slice(linkIdx + linkMatch[0].length);
      } else if (boldMatch) {
        parts.push(remaining.slice(0, boldIdx));
        parts.push(<strong key={key++}>{boldMatch[1]}</strong>);
        remaining = remaining.slice(boldIdx + boldMatch[0].length);
      }
    }
    return parts;
  };

  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul
            key={`list-${elements.length}`}
            className="list-disc pl-6 space-y-1 mb-4 text-sm text-[var(--color-foreground)]"
          >
            {listItems.map((item, i) => (
              <li key={i}>{renderInline(item)}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("- ")) {
        listItems.push(line.slice(2));
        continue;
      }
      flushList();

      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-xl font-bold mt-8 mb-3 text-[var(--color-foreground)]">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-lg font-semibold mt-6 mb-2 text-[var(--color-foreground)]">
            {line.slice(4)}
          </h3>
        );
      } else if (line === "---") {
        elements.push(<hr key={i} className="my-8 border-[var(--color-border)]" />);
      } else if (line.trim() === "") {
        // skip
      } else {
        elements.push(
          <p key={i} className="text-sm leading-relaxed text-[var(--color-foreground)] mb-4">
            {renderInline(line)}
          </p>
        );
      }
    }
    flushList();
    return elements;
  };

  const displayTitle = (locale !== "en" && post.titleI18n?.[locale]) || post.title;
  const displayDesc = (locale !== "en" && post.descriptionI18n?.[locale]) || post.description;

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <article className="max-w-2xl mx-auto px-4 py-12">
        <header className="mb-8">
          <Link
            href="/blog"
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
          >
            {t("blog.backToBlog" as any)}
          </Link>
          <div className="flex flex-wrap gap-2 mt-4 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-accent)] bg-[var(--color-accent)]/10 rounded px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold mb-2">{displayTitle}</h1>
          <p className="text-xs text-[var(--color-muted)]">{post.date}</p>
        </header>

        <div className="prose-sm">{renderContent(post.content)}</div>

        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-4">
            {t("blog.moreArticles" as any)}
          </h3>
          <div className="space-y-3">
            {relatedPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 hover:border-[var(--color-accent)]/50 transition-colors"
              >
                <p className="text-sm font-medium">
                  {(locale !== "en" && p.titleI18n?.[locale]) || p.title}
                </p>
                <p className="text-xs text-[var(--color-muted)] mt-1">
                  {(locale !== "en" && p.descriptionI18n?.[locale]) || p.description}
                </p>
              </Link>
            ))}
          </div>
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
      </article>
    </div>
  );
}
