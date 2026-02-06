import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "K-Dle privacy policy — how we handle your data.",
  alternates: {
    canonical: "https://k-dle.vercel.app/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--color-border)] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="p-2 -ml-2 rounded-lg hover:bg-[var(--color-card)] transition-colors"
            aria-label="Back to home"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold tracking-tight">Privacy Policy</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <article className="max-w-2xl mx-auto prose-sm">
          <p className="text-xs text-[var(--color-muted)] mb-6">
            Last updated: February 6, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">1. Introduction</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">
              K-Dle (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website k-dle.vercel.app (the &quot;Service&quot;). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">2. Data We Collect</h2>
            <div className="space-y-3 text-sm text-[var(--color-muted)] leading-relaxed">
              <p>
                <strong className="text-[var(--color-foreground)]">Local Storage Data:</strong> We store your game progress, statistics, and streak data locally on your device using browser localStorage. This data never leaves your device and is not transmitted to any server.
              </p>
              <p>
                <strong className="text-[var(--color-foreground)]">Analytics:</strong> We may use third-party analytics services (such as Google Analytics) to collect anonymized usage data, including page views, session duration, and general geographic location. This data helps us improve the Service.
              </p>
              <p>
                <strong className="text-[var(--color-foreground)]">Advertising:</strong> We use Google AdSense to display advertisements. Google may use cookies and similar technologies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google&apos;s Ads Settings.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">3. Cookies</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              Our Service may use cookies and similar tracking technologies. Third-party services such as Google AdSense and Google Analytics use cookies to provide their services. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">4. Third-Party Services</h2>
            <div className="text-sm text-[var(--color-muted)] leading-relaxed space-y-2">
              <p>We may employ third-party companies and services, including:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Google AdSense (advertising)</li>
                <li>Google Analytics (usage analytics)</li>
                <li>Vercel (hosting)</li>
              </ul>
              <p>These third parties have access to limited data only to perform tasks on our behalf and are obligated not to disclose or use it for other purposes.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">5. Children&apos;s Privacy</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              Our Service is intended for general audiences. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal data, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">6. Data Retention</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              Game data is stored locally on your device and persists until you clear your browser data. We do not retain any personal data on our servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">7. Your Rights</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              You can clear all locally stored game data at any time by clearing your browser&apos;s localStorage. For questions about data collected by third-party services, please refer to their respective privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">8. Changes to This Policy</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">9. Contact Us</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:pon07084@gmail.com" className="text-[var(--color-accent)] hover:underline">pon07084@gmail.com</a>.
            </p>
          </section>
        </article>
      </main>

      <footer className="border-t border-[var(--color-border)] px-4 py-3">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] text-[var(--color-muted)]">
            K-Dle is an unofficial fan project. All IP belongs to respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}
