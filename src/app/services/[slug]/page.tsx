import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, site, jsonLd } from "@/lib/site";
import { Header, Footer } from "@/components/brand";
import { EnquiryForm } from "@/components/enquiry-form";
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) return {};
  return {
    title: `${s.title}${site.city ? ` in ${site.city}` : ""}`,
    description: s.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: s.title,
      description: s.description,
      url: `/services/${slug}`,
    },
  };
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <div className="site-shell">
      <Header />
      <main id="main">
        <section className="detail-hero section">
          <Link className="text-link" href="/">
            ← Back to home
          </Link>
          <span className="eyebrow">{s.label}</span>
          <h1>
            {s.title}
            {site.city && <> in {site.city}</>}
          </h1>
          <p>{s.body}</p>
          <ul>
            {s.details.map((d) => (
              <li key={d}>↗ {d}</li>
            ))}
          </ul>
          <p className="detail-note">
            Ask for a complete quote including tolls, parking, extra distance or
            time, and cancellation terms. Your booking is confirmed only after
            availability and terms are agreed.
          </p>
        </section>
        <EnquiryForm />
        <section className="section">
          <span className="eyebrow">MORE WAYS TO TRAVEL</span>
          <div className="related-links">
            {services
              .filter((x) => x.slug !== slug)
              .map((x) => (
                <Link key={x.slug} href={`/services/${x.slug}`}>
                  {x.title} ↗
                </Link>
              ))}
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: site.url,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: s.title,
                item: `${site.url}/services/${slug}`,
              },
            ],
          }),
        }}
      />
    </div>
  );
}
