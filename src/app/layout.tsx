import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://k-dle.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "K-Dle — Daily K-Drama & K-Pop Guessing Game",
    template: "%s | K-Dle",
  },
  description:
    "Test your K-Drama and K-Pop knowledge with daily puzzles. Guess dramas, idols, lyrics, and iconic scenes. Share your results and compete with fans worldwide.",
  keywords: [
    "K-Drama",
    "K-Pop",
    "Wordle",
    "guessing game",
    "daily puzzle",
    "Korean drama",
    "kdrama quiz",
    "kpop quiz",
    "drama quiz",
    "idol quiz",
    "K-Drama trivia",
    "K-Pop trivia",
    "Squid Game",
    "BTS",
    "BLACKPINK",
    "Korean entertainment",
    "daily word game",
    "Wordle alternative",
  ],
  authors: [{ name: "K-Dle" }],
  creator: "K-Dle",
  publisher: "K-Dle",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "K-Dle — Daily K-Drama & K-Pop Guessing Game",
    description:
      "Test your K-Drama and K-Pop knowledge with daily puzzles. Guess dramas, idols, lyrics, and scenes. Share your results!",
    type: "website",
    locale: "en_US",
    siteName: "K-Dle",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "K-Dle — Daily K-Drama & K-Pop Guessing Game",
    description:
      "Test your K-Drama and K-Pop knowledge with daily puzzles. Share your results!",
    creator: "@kdle_game",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "K-Dle",
    url: SITE_URL,
    description:
      "Daily K-Drama and K-Pop guessing game with multiple game modes.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "K-Dle",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-site-verification" content="MrECvrjpt3wmdi56cllNejohfsaWjgcWO-xS15ZWp00" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-T8FPHCKHM4" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-T8FPHCKHM4');`,
          }}
        />
        <meta name="google-adsense-account" content="ca-pub-2403565022366483" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2403565022366483"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
