import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import BlogListContent from "@/components/blog/BlogListContent";

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
  return <BlogListContent posts={blogPosts} />;
}
