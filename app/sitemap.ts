import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = [
    "3-star",
    "1810-pco",
    "1881-pco",
    "jar",
    "fridge-bottle",
    "ropp"
  ].map((slug) => ({
    url: `https://nawkiran.com/products/${slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://nawkiran.com",
      lastModified: "2026-06-22",
      changeFrequency: "monthly",
      priority: 1,
    },
    ...productUrls,
  ];
}
