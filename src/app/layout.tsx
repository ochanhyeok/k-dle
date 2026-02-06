import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "K-Dle — Daily K-Drama & K-Pop Guessing Game",
  description:
    "Test your K-Drama and K-Pop knowledge with daily puzzles. Guess the drama, idol, lyrics, and scenes. Share your results and compete with fans worldwide.",
  keywords: [
    "K-Drama",
    "K-Pop",
    "Wordle",
    "guessing game",
    "daily puzzle",
    "Korean drama",
    "kdrama quiz",
  ],
  openGraph: {
    title: "K-Dle — Daily K-Drama & K-Pop Guessing Game",
    description:
      "Test your K-Drama and K-Pop knowledge with daily puzzles. Share your results!",
    type: "website",
    locale: "en_US",
    siteName: "K-Dle",
  },
  twitter: {
    card: "summary_large_image",
    title: "K-Dle — Daily K-Drama & K-Pop Guessing Game",
    description:
      "Test your K-Drama and K-Pop knowledge with daily puzzles. Share your results!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
