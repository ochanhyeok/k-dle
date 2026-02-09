import type { MetadataRoute } from "next";

// Revalidate sitemap once per day (prevents ISR writes on every request)
export const revalidate = 86400;

const SITE_URL = "https://k-dle.vercel.app";
const BASELINE = new Date(2026, 1, 6); // Feb 6, 2026
const MODES = ["drama-dle", "idol-dle", "lyric-dle", "scene-dle"] as const;

function getPuzzleCount(): number {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((today.getTime() - BASELINE.getTime()) / (1000 * 60 * 60 * 24)));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const puzzleCount = getPuzzleCount();
  // Use a stable date (today at midnight) instead of new Date() to avoid cache busting
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: today,
      changeFrequency: "daily",
      priority: 1,
    },
    ...MODES.map((mode) => ({
      url: `${SITE_URL}/${mode}`,
      lastModified: today,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    ...MODES.map((mode) => ({
      url: `${SITE_URL}/${mode}/archive`,
      lastModified: today,
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/about`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/party`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/stats`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/badges`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Archive puzzle pages for each mode
  const archivePages: MetadataRoute.Sitemap = [];
  for (const mode of MODES) {
    for (let i = 0; i < puzzleCount; i++) {
      const puzzleDate = new Date(BASELINE.getTime() + i * 24 * 60 * 60 * 1000);
      archivePages.push({
        url: `${SITE_URL}/${mode}/archive/${i}`,
        lastModified: puzzleDate,
        changeFrequency: "never",
        priority: 0.4,
      });
    }
  }

  return [...staticPages, ...archivePages];
}
