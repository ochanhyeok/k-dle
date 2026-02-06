import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "K-Dle terms of service — rules for using our daily puzzle game.",
  alternates: {
    canonical: "https://k-dle.vercel.app/terms",
  },
};

export default function TermsPage() {
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
          <h1 className="text-lg font-bold tracking-tight">Terms of Service</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <article className="max-w-2xl mx-auto prose-sm">
          <p className="text-xs text-[var(--color-muted)] mb-6">
            Last updated: February 6, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              By accessing and using K-Dle (the &quot;Service&quot;), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">2. Description of Service</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              K-Dle is a free, web-based daily puzzle game that tests your knowledge of K-Drama and K-Pop. The Service offers multiple game modes including Drama-dle, Idol-dle, Lyric-dle, and Scene-dle. New puzzles are available daily.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">3. Intellectual Property</h2>
            <div className="text-sm text-[var(--color-muted)] leading-relaxed space-y-3">
              <p>
                K-Dle is an unofficial fan project. All K-Drama titles, K-Pop artist names, song titles, and related intellectual property referenced in this game belong to their respective owners and copyright holders.
              </p>
              <p>
                The use of these names and references is for informational and entertainment purposes within the context of a trivia/quiz game and constitutes nominative fair use. No endorsement, sponsorship, or affiliation is implied.
              </p>
              <p>
                If you are a rights holder and believe that any content on this Service infringes your intellectual property rights, please contact us and we will promptly address your concern.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">4. User Conduct</h2>
            <div className="text-sm text-[var(--color-muted)] leading-relaxed space-y-2">
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Attempt to gain unauthorized access to the Service or its related systems</li>
                <li>Use automated scripts to access or interact with the Service</li>
                <li>Reverse-engineer or attempt to extract the source code of the Service</li>
                <li>Share daily puzzle answers on public platforms before the puzzle expires</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">5. Disclaimer of Warranties</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              The Service is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, express or implied. We do not guarantee that the Service will be uninterrupted, error-free, or free of harmful components.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">6. Limitation of Liability</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              To the fullest extent permitted by applicable law, K-Dle shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">7. Advertising</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              The Service may display advertisements provided by third-party advertising networks, including Google AdSense. These advertisements may use cookies and similar technologies. By using the Service, you consent to the display of advertisements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">8. DMCA / Takedown Requests</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              If you believe that any content on K-Dle infringes upon your copyright, please send a written notice to pon07084@gmail.com with the following information: a description of the copyrighted work, the location of the infringing content, and your contact information. We will respond to all legitimate requests promptly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">9. Changes to Terms</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the Service after changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">10. Contact</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              For questions about these Terms, please contact us at pon07084@gmail.com.
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
