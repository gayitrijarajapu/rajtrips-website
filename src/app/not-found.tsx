import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="section privacy">
      <span className="eyebrow">A SMALL DETOUR</span>
      <h1>This road ends here.</h1>
      <p>We couldn’t find that page. Let’s get your journey back on track.</p>
      <Link className="button" href="/">
        Back to home ↗
      </Link>
    </main>
  );
}
