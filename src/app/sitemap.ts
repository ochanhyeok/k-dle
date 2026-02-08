import type { MetadataRoute } from "next";

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

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...MODES.map((mode) => ({
      url: `${SITE_URL}/${mode}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    ...MODES.map((mode) => ({
      url: `${SITE_URL}/${mode}/archive`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
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
