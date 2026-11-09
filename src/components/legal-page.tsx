import Link from "next/link";
import { Header, Footer } from "@/components/brand";
import { site } from "@/lib/site";
export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { title: string; text: string }[];
}) {
  return (
    <div className="site-shell">
      <Header />
      <main id="main" className="legal-page section">
        <div className="legal-heading">
          <span className="eyebrow">RAJTRIPS · TRAVEL WITH CLARITY</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          <span className="legal-date">Last updated: 8 November 2026</span>
        </div>
        <nav className="legal-nav" aria-label="Policies">
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms & conditions</Link>
          <Link href="/cookies">Cookie policy</Link>
        </nav>
        <div className="legal-content">
          {sections.map((s, i) => (
            <section key={s.title}>
              <span className="legal-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </div>
            </section>
          ))}
          <section>
            <span className="legal-index">↗</span>
            <div>
              <h2>Get in touch</h2>
              <p>
                {site.email ? (
                  <>
                    Email <a href={`mailto:${site.email}`}>{site.email}</a> for
                    questions about this policy or your trip.
                  </>
                ) : (
                  "Contact rajtrips through the same WhatsApp or email conversation used for your enquiry. Our website enquiry section shows the available contact channel once configured."
                )}
              </p>
              <Link className="text-link" href="/#enquire">
                Contact the travel team ↗
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
