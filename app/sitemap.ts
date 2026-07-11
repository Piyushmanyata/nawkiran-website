import type { MetadataRoute } from "next";
import { APTUS_SITE_PATH, aptusFamilies } from "@/lib/aptus";
import { products } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString().split("T")[0];
  const productUrls = products.map((product) => ({
    url: `${SITE_URL}/products/${product.id}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const aptusUrls: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}${APTUS_SITE_PATH}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...aptusFamilies.map((family) => ({
      url: `${SITE_URL}${APTUS_SITE_PATH}/products/${family.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...productUrls,
    ...aptusUrls,
  ];
}
