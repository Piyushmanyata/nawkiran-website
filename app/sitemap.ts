import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = [
    "3-star",
    "1810-pco",
    "1881-pco",
    "jar",
    "fridge-bottle",
    "ropp"
  ].map((slug) => ({
    url: `${SITE_URL}/products/${slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "monthly",
      priority: 1,
    },
    ...productUrls,
  ];
}
