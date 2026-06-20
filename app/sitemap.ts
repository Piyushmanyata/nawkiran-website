import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://nawkiran.com",
      lastModified: "2026-06-20",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://nawkiran.com/#products",
      lastModified: "2026-06-20",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://nawkiran.com/#capabilities",
      lastModified: "2026-06-20",
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://nawkiran.com/#contact",
      lastModified: "2026-06-20",
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
