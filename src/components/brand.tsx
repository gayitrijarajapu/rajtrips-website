import { MobileMenu } from "@/components/mobile-menu";
import Image from "next/image";
import { CookieSettingsButton } from "@/components/cookie-consent";
import { ButtonArrow } from "@/components/button-arrow";
import Link from "next/link";
import { site, services } from "@/lib/site";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label={`${site.name} home`}>
      <span className="brand-logo-frame">
        <Image
          className="brand-logo"
          src="/images/Rajtrips_Travels___Experiences_Logo-removebg-preview.png"
          alt={site.name + " — Travels & Experiences"}
          width={883}
          height={289}
          priority
        />
      </span>
    </Link>
  );
}
export function Header() {
  return (
    <header className="header">
      <Brand />
      <nav aria-label="Main navigation">
        <Link href="/#services">Our services</Link>
        <Link href="/#fleet">Our fleet</Link>
        <Link href="/#about">Why rajtrips</Link>
        <Link href="/#faq">FAQs</Link>
      </nav>
      <MobileMenu />
      <Link className="button small" href="/#enquire">
        Let’s plan a trip <ButtonArrow />
      </Link>
    </header>
  );
}
export function Footer() {
  const whatsapp = `https://wa.me/${site.phone.replace(/\D/g, "")}`;
  return (
    <footer className="site-footer">
      <div className="footer-card">
        <div className="footer-main">
          <div className="footer-brand-block">
            <Brand />
            <p>
              Thoughtfully planned car journeys, from everyday city rides to
              memorable escapes across India.
            </p>
            <div className="footer-contact-pills">
              <a href={`tel:${site.phone}`} aria-label="Call rajtrips">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="m7 3 3 5-2 2c1 3 3 5 6 6l2-2 5 3c-1 5-5 5-9 3S3 13 3 8c0-3 1-5 4-5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                Call us
              </a>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp <span aria-hidden="true">↗</span>
              </a>
            </div>
            <span className="footer-coverage">
              <span aria-hidden="true" />
              CAR TRAVEL ACROSS INDIA
            </span>
          </div>
          <nav className="footer-column" aria-label="Travel services">
            <h2>Your journey</h2>
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                {service.title}
              </Link>
            ))}
          </nav>
          <nav className="footer-column" aria-label="Explore rajtrips">
            <h2>Explore</h2>
            <Link href="/#fleet">Our cars</Link>
            <Link href="/#about">Why rajtrips</Link>
            <Link href="/#faq">Travel FAQs</Link>
            <Link href="/#enquire">Plan a trip</Link>
          </nav>
          <div className="footer-column footer-reach">
            <h2>Let’s talk travel</h2>
            <a href={`tel:${site.phone}`}>+91 81212 87777</a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              Enquire on WhatsApp ↗
            </a>
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
            <p>
              Share your route, dates and preferred car. We’ll help you plan the
              way.
            </p>
          </div>
        </div>
        <div className="footer-card-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <div className="footer-policies">
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms & conditions</Link>
            <Link href="/cookies">Cookie policy</Link>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
      <div className="footer-watermark" aria-hidden="true">
        <span className="footer-watermark-text">rajtrips</span>
      </div>
    </footer>
  );
}
