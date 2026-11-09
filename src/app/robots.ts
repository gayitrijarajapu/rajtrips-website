import type { MetadataRoute } from "next";
import { site, indexable } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(indexable ? { allow: "/" } : { disallow: "/" }),
    },
    ...(indexable ? { sitemap: `${site.url}/sitemap.xml` } : {}),
  };
}
