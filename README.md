# rajtrips

Responsive Next.js App Router, TypeScript and Tailwind CSS travel website inspired by the supplied pale-blue automotive reference. The configured brand is rajtrips and the canonical domain is https://rajtrips.com. Photos and illustrations do not represent a confirmed fleet.

## Local development

Requires Node.js 22+ and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. `npm run build` creates a production build; `npm start` serves it. `npx tsc --noEmit` checks types. GitHub Actions checks types and builds pushes to main and pull requests.

## Business configuration

Set values in `.env.local` locally and in Vercel → Project → Settings → Environment Variables:

| Variable                           | Purpose                                                          |
| ---------------------------------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_BUSINESS_NAME`        | Real trading name; defaults to rajtrips                   |
| `NEXT_PUBLIC_SITE_URL`             | Final HTTPS canonical domain without trailing slash              |
| `NEXT_PUBLIC_BUSINESS_PHONE`       | WhatsApp number with country code                                |
| `NEXT_PUBLIC_BUSINESS_SECONDARY_PHONE` | Secondary call number with country code                       |
| `NEXT_PUBLIC_BUSINESS_EMAIL`       | Optional public contact email                    |
| `NEXT_PUBLIC_BUSINESS_CITY`        | Actual main city                                                 |
| `NEXT_PUBLIC_BUSINESS_ADDRESS`     | Public business street address                                   |
| `NEXT_PUBLIC_BUSINESS_POSTAL_CODE` | Postal code                                                      |
| `NEXT_PUBLIC_BUSINESS_COUNTRY`     | Two-letter country code, default IN                              |
| `GOOGLE_SITE_VERIFICATION`         | Search Console verification token, optional                      |
| `SITE_INDEXABLE`                   | Default false; enable in Production only after reviewing content |

Rebuild/redeploy after changing variables. Public variables are bundled for browsers; do not put secrets there. Business data lives in `src/lib/site.ts`. When changing the brand, review the custom logo and remaining brand copy in `src/components/brand.tsx` and `src/app/page.tsx`.

The Enquire button opens a structured WhatsApp message with pickup, destination, date and selected car. The default destination is +91 81212 87777. The visitor reviews and sends it themselves. No enquiry is stored in a website database, and no booking or payment is automatically confirmed. Confirm service offerings, capacities, pricing terms and contact details with the owner before launch.

## Push to GitHub

This directory is a Git repository. Create an empty GitHub repository, review changes, then run:

```sh
git add .
git commit -m "Build travel website with SEO foundations"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

If an origin already exists, inspect `git remote -v` first. `.env.local` is ignored; `.env.example` is tracked.

## Vercel and GoDaddy

1. Import the GitHub repository in Vercel. Select Next.js, use this directory as project root and keep the default build/output settings.
2. Set the environment variables above. Keep indexing disabled until the content and enquiry destination are reviewed. Deploy and test the contact flow.
3. Add the purchased domain in Vercel → Settings → Domains. Add the root and www variants, choose the canonical hostname matching `NEXT_PUBLIC_SITE_URL`, and redirect the other to it.
4. In GoDaddy DNS, add **the exact records Vercel displays**. Do not guess IP addresses. Replace only conflicting records for the hostname being connected. Preserve MX, SPF, DKIM and other email records.
5. Wait for DNS verification and HTTPS provisioning. Verify HTTPS and root/www redirection.
6. Set `SITE_INDEXABLE=true` for **Production only**, redeploy, then verify `/robots.txt`, `/sitemap.xml`, canonical tags and page titles. Vercel Preview remains noindex even when the flag is enabled.
7. Verify Search Console ownership, submit the sitemap and inspect key pages.

Official guides: [GitHub deployment](https://vercel.com/docs/git/vercel-for-github), [domain configuration](https://vercel.com/docs/domains/working-with-domains/add-a-domain).

## SEO and launch checklist

Included: pre-rendered service pages, unique metadata, canonical URLs, sitemap, robots controls, Open Graph/Twitter previews, generated social image, optimized local images, semantic HTML, accessible labels, internal links, breadcrumb structured data and conditional business structured data. Business schema is emitted only when address, city and phone are configured; use real public details and review the brand before launch. Preview/setup pages are excluded from indexing by default.

- Review illustrative fleet content and replace it with verified information.
- Replace stock photos with licensed real fleet photos if available. Original stock image URLs are recorded in `public/images/SOURCES.txt`.
- Add useful city/route pages only for actual service areas, with original route information, fare terms and pickup details. Generic duplicate city pages are not included.
- Create or verify Google Business Profile, maintain consistent contact details and request genuine reviews.
- Test the deployed site with PageSpeed Insights and Google's structured data validation tools.
- Review the privacy page against actual hosting, messaging, retention and legal practices. Update it when adding analytics, a database or payments.

Technical SEO supports discovery; top rankings cannot be guaranteed. [Google local ranking guidance](https://support.google.com/business/answer/7091), [business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business).

## Cookie preferences and travel policies

The site includes `/privacy`, `/terms` and `/cookies`, linked from every footer. Cookie preferences follow the Lenox reference workflow: accept all, reject optional, open category settings, save choices and reopen settings from the footer. The essential consent record uses local storage (`rajtrips_cookie_preferences_v1`) and synchronizes across open tabs. No analytics, marketing or optional functional trackers are installed. Any future integration must check the corresponding consent category before loading.

Run `npm run test:consent` to check default-deny behavior, malformed records, saved choices, change events and blocked storage. Policies describe the current enquiry workflow; confirm operational booking, cancellation, record-retention and contact details with the owner before launch.

Fleet catalogue imagery is representative of the models, not photographs of the operator’s actual vehicles. Sources are recorded in `public/images/SOURCES.txt`; replace them with authorised fleet photography before a public launch where needed. No fares are displayed.

## Pick-up calendar and sitemap

The enquiry form uses a teal calendar dialog with keyboard navigation, mobile sizing and validation that prevents past dates. Dates are passed to WhatsApp in YYYY-MM-DD format.

`/sitemap.xml` always lists the eight canonical pages. `/robots.txt` allows crawling and advertises the sitemap only when `SITE_INDEXABLE=true`, `NEXT_PUBLIC_SITE_URL` is configured, and the deployment is not a Vercel Preview. Enable indexing for the production launch and redeploy.
