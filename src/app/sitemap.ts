import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/research";
import { locales, type Locale } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vyntra.security";
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const l of locales) {
    const locale = l as Locale;
    entries.push({
      url: `${base}/${locale}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    });
    entries.push({
      url: `${base}/${locale}/research`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    for (const p of getAllPosts(locale)) {
      entries.push({
        url: `${base}/${locale}/research/${p.slug}`,
        lastModified: p.date ? new Date(p.date) : now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
