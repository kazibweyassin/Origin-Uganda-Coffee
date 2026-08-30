import type { MetadataRoute } from "next";
import { coffeeLots } from "@/lib/data";
import { insights } from "@/lib/insights";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ["", "weekly", 1],
    ["/coffee", "daily", 0.95],
    ["/about", "monthly", 0.8],
    ["/insights", "weekly", 0.9],
    ["/how-it-works", "monthly", 0.8],
    ["/request-quote", "monthly", 0.9],
    ["/request-sample", "monthly", 0.85],
    ["/contact", "monthly", 0.7],
  ] as const;

  return [
    ...pages.map(([path, changeFrequency, priority]) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    ...coffeeLots.map((lot) => ({
      url: `${siteConfig.url}/coffee/${lot.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: [lot.image],
    })),
    ...insights.map((article) => ({
      url: `${siteConfig.url}/insights/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
      images: [article.image],
    })),
  ];
}
