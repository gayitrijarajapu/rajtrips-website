import { StatsBar } from "@/components/stats-bar";
import { ButtonArrow } from "@/components/button-arrow";
import Image from "next/image";
import Link from "next/link";
import { fleet } from "@/lib/fleet";
import { Header, Footer } from "@/components/brand";
import { EnquiryForm } from "@/components/enquiry-form";
import { site, services, jsonLd } from "@/lib/site";
export const metadata = { alternates: { canonical: "/" } };
const faqs = [
  [
    "How do I book a car?",
    "Share your pickup, destination, travel date and group size using the enquiry form. Your request opens in WhatsApp or email. The team will confirm availability, fare and terms before you book.",
  ],
  [
    "Can I book a one-way outstation trip?",
    "You can request either a one-way or round-trip journey. Availability and the final quote depend on your route, dates and vehicle requirements.",
  ],
  [
    "What is included in the fare?",
    "Request a written quote that sets out the vehicle, driver charges, included distance or hours, tolls, parking and any other charges. Confirm the total before accepting a booking.",
  ],
  [
    "Which car should I choose?",
    "A sedan suits smaller groups, while our MPVs offer more space. Share passenger numbers and luggage details so the team can confirm a suitable vehicle.",
  ],
  [
    "What if my plans change?",
    "Contact the team as soon as your plans change. Ask for the cancellation and rescheduling terms with your quote, as these must be confirmed before booking.",
  ],
];
export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  };
  const business =
    site.address && site.city && site.phone
      ? {
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: site.name,
          url: site.url,
          telephone: site.phone,
          image: `${site.url}/images/White SUV on a Mountainous Grassy Slope.png`,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address,
            addressLocality: site.city,
            postalCode: site.postalCode,
            addressCountry: site.country,
          },
        }
      : null;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      {business && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(business) }}
        />
      )}
      <div className="site-shell">
        <Header />
        <main id="main">
          <section
            className="hero"
            aria-label="Explore the open road with rajtrips"
          >
            <Image
              src="/images/White SUV on a Mountainous Grassy Slope.png"
              alt="White SUV on a grassy hillside with mountains in the background"
              fill
              priority
              sizes="100vw"
              className="hero-image"
            />
            <div className="hero-gradient" />
            <div className="travel-hero-copy">
              <span className="eyebrow light">
                RAJTRIPS · YOUR NEXT JOURNEY
              </span>
              <h1>
                Leave the everyday.
                <br />
                <span>Take the scenic route.</span>
              </h1>
              <p>
                Airport arrivals, family getaways and car journeys across India.
                <br />
                Find your car. Plan your way. Make the journey yours.
              </p>
              <a className="button hero-cta" href="#fleet">
                Explore our cars <ButtonArrow />
              </a>
              <div className="hero-travel-tags">
                <span>Airport transfers</span>
                <span>Outstation trips</span>
                <span>Local journeys</span>
              </div>
            </div>
          </section>
          <EnquiryForm />
          <StatsBar />
          <div className="promise-strip">
            <span>
              ↗ <b>Your route, your pace</b>
            </span>
            <span>
              ◇ <b>Find your perfect ride</b>
            </span>
            <span>
              ☏ <b>A real conversation, a clear quote</b>
            </span>
          </div>
          <section className="services section" id="services">
            <div className="section-heading">
              <div>
                <span className="eyebrow">A RIDE FOR EVERY REASON</span>
                <h2>
                  Life moves.
                  <br />
                  We take you there.
                </h2>
              </div>
              <p>
                Early flights. Long weekends. Little detours.
                <br />
                However your day unfolds, start with the right ride.
              </p>
            </div>
            <div className="service-grid">
              {services.map((s, i) => (
                <Link
                  className="service-card"
                  href={`/services/${s.slug}`}
                  key={s.slug}
                >
                  <div className="card-top">
                    <span className="service-icon">{s.icon}</span>
                    <span className="number">0{i + 1}</span>
                  </div>
                  <span className="eyebrow">{s.label}</span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <span className="card-link">
                    Explore service <span>↗</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
          <section className="about section" id="about">
            <div className="about-photo">
              <Image
                src="/images/journey.jpg"
                alt="A view from inside a car while travelling along a scenic road"
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
              />
              <span className="photo-label">LESS HASSLE. MORE HORIZONS. ↗</span>
            </div>
            <div className="about-copy">
              <span className="eyebrow">THE RAJTRIPS APPROACH</span>
              <h2 className="about-headline">
                <span>The journey should feel</span>{" "}
                <span>as good as the destination.</span>
              </h2>
              <p>
                Travel is personal. It’s the space to catch up, the freedom to
                take a detour, and the comfort of having a plan.
              </p>
              <div className="about-point">
                <span>01</span>
                <div>
                  <h3>Make it your journey</h3>
                  <p>
                    Tell us where you want to go. We’ll help you plan the way.
                  </p>
                </div>
              </div>
              <div className="about-point">
                <span>02</span>
                <div>
                  <h3>Know before you go</h3>
                  <p>
                    Discuss your vehicle, itinerary and total quote before you
                    book.
                  </p>
                </div>
              </div>
              <a href="#enquire" className="text-link">
                Let’s plan something good ↗
              </a>
            </div>
          </section>
          <section className="fleet section" id="fleet">
            <div className="section-heading">
              <div>
                <span className="eyebrow">ROOM FOR YOUR PLANS</span>
                <h2>
                  Good company.
                  <br />
                  The right car.
                </h2>
              </div>
              <p>
                Four cars. A world of possibilities.
                <br />
                Choose your favourite. We’ll take care of the planning.
              </p>
            </div>
            <div className="fleet-grid premium-fleet">
              {fleet.map((car, i) => (
                <article className="fleet-card" key={car.name}>
                  <div className="fleet-photo">
                    <span className="fleet-count">
                      0{i + 1} / RAJTRIPS COLLECTION
                    </span>
                    <Image
                      src={car.image}
                      alt={`${car.colour === "White" ? "White " : ""}${car.name}, representative vehicle image`}
                      fill
                      sizes="(max-width: 600px) 90vw, (max-width: 1100px) 45vw, 24vw"
                    />
                    <span className="fleet-photo-label">{car.category}</span>
                  </div>
                  <div className="fleet-info">
                    <span className="eyebrow">{car.category}</span>
                    <h3>{car.name}</h3>
                    <p>{car.description}</p>
                    <dl className="fleet-specs">
                      <div>
                        <dt>Colour</dt>
                        <dd>{car.colour}</dd>
                      </div>
                      <div>
                        <dt>Journeys</dt>
                        <dd>{car.travel}</dd>
                      </div>
                    </dl>
                    <a
                      className="button fleet-enquire"
                      href={`/?car=${encodeURIComponent(car.name)}#enquire`}
                    >
                      Enquire now <ButtonArrow />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="fleet-note">
              Representative model images. Confirm the exact vehicle, passenger
              capacity, luggage space and availability with the team before
              booking.
            </p>
          </section>
          <section className="faq section" id="faq">
            <div>
              <span className="eyebrow">BEFORE YOU SET OFF</span>
              <h2>
                A few things
                <br />
                you might wonder.
              </h2>
              <p>
                Have something else in mind?
                <br />
                <a href="#enquire" className="text-link">
                  Let’s talk about your trip ↗
                </a>
              </p>
            </div>
            <div className="faq-list">
              {faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <span>+</span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="cta">
            <span className="eyebrow">YOUR NEXT CHAPTER</span>
            <h2>
              Somewhere good
              <br />
              is waiting.
            </h2>
            <a className="button" href="#enquire">
              Let’s get you there <ButtonArrow />
            </a>
            <span className="cta-art" aria-hidden="true">
              ↗
            </span>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
