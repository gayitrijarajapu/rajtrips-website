import type { MetadataRoute } from "next";
import { site, services } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...["privacy", "terms", "cookies"].map((path) => ({
      url: `${site.url}/${path}`,
      priority: 0.2,
    })),
  ];
}
