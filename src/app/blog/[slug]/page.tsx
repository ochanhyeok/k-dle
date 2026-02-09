import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost, getAllSlugs } from "@/data/blog-posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — K-Dle Blog`,
    description: post.description,
    alternates: { canonical: `https://k-dle.vercel.app/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // Simple markdown-like rendering (headings, paragraphs, links, bold, italic, lists)
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

    const renderInline = (text: string): React.ReactNode => {
      // Handle bold, italic, and links
      const parts: React.ReactNode[] = [];
      let remaining = text;
      let key = 0;

      while (remaining.length > 0) {
        // Links: [text](url)
        const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
        // Bold: **text**
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

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // List items
      if (line.startsWith("- ")) {
        listItems.push(line.slice(2));
        continue;
      }
      flushList();

      // Headings
      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={i}
            className="text-xl font-bold mt-8 mb-3 text-[var(--color-foreground)]"
          >
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={i}
            className="text-lg font-semibold mt-6 mb-2 text-[var(--color-foreground)]"
          >
            {line.slice(4)}
          </h3>
        );
      } else if (line === "---") {
        elements.push(
          <hr
            key={i}
            className="my-8 border-[var(--color-border)]"
          />
        );
      } else if (line.trim() === "") {
        // Skip empty lines
      } else {
        elements.push(
          <p
            key={i}
            className="text-sm leading-relaxed text-[var(--color-foreground)] mb-4"
          >
            {renderInline(line)}
          </p>
        );
      }
    }
    flushList();
    return elements;
  };

  // Article schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "K-Dle" },
    publisher: {
      "@type": "Organization",
      name: "K-Dle",
      url: "https://k-dle.vercel.app",
    },
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="max-w-2xl mx-auto px-4 py-12">
        <header className="mb-8">
          <Link
            href="/blog"
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
          >
            ← Back to Blog
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
          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <p className="text-xs text-[var(--color-muted)]">{post.date}</p>
        </header>

        <div className="prose-sm">{renderContent(post.content)}</div>

        {/* Related posts */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-4">
            More Articles
          </h3>
          <div className="space-y-3">
            {blogPosts
              .filter((p) => p.slug !== slug)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 hover:border-[var(--color-accent)]/50 transition-colors"
                >
                  <p className="text-sm font-medium">{p.title}</p>
                  <p className="text-xs text-[var(--color-muted)] mt-1">
                    {p.description}
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
          {" — "}Daily K-Drama & K-Pop Puzzles
        </footer>
      </article>
    </div>
  );
}
