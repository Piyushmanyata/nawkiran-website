import type { MetadataRoute } from "next";
import { APTUS_SITE_PATH, aptusFamilies } from "@/lib/aptus";
import { products } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = products.map((product) => ({
    url: `${SITE_URL}/products/${product.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const aptusUrls: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}${APTUS_SITE_PATH}`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}${APTUS_SITE_PATH}/faq`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...aptusFamilies.map((family) => ({
      url: `${SITE_URL}${APTUS_SITE_PATH}/products/${family.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/faq`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...productUrls,
    ...aptusUrls,
  ];
}
