import { CookieConsent } from "@/components/cookie-consent";
import { Inter_Tight } from "next/font/google";
import type { Metadata } from "next";
import { site, indexable } from "@/lib/site";
import "./globals.css";
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Car Rentals, Airport Transfers & Outstation Trips${site.city ? ` in ${site.city}` : ""}`,
    template: `%s | ${site.name}`,
  },
  description: `Plan local car rentals, airport transfers, outstation trips and group travel${site.city ? ` in ${site.city}` : ""}. Explore vehicle options and request a personalised trip quote.`,
  robots: { index: indexable, follow: indexable },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: site.name,
    description:
      "A better way to get there. Car rentals, airport transfers and outstation travel.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: "A better way to get there.",
    images: ["/opengraph-image"],
  },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={interTight.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
