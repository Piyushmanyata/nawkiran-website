import type { Metadata } from "next";
import { AptusCatalog } from "@/components/aptus/AptusCatalog";
import { APTUS, APTUS_SITE_PATH, aptusFamilies } from "@/lib/aptus";
import { SITE_URL } from "@/lib/site";
import aptusCatalog from "../../Aptus Catalog.png";

const APTUS_URL = `${SITE_URL}${APTUS_SITE_PATH}`;
const CATALOG_IMAGE = `${SITE_URL}${aptusCatalog.src}`;
const TITLE = "Aptus Packaging LLP | PET Bottles & Plastic Closures";
const DESCRIPTION =
  "Explore Aptus Packaging LLP cosmetic PET bottles, pharma bottles and plastic closures with catalog specifications and pack-based WhatsApp enquiries.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: APTUS_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_IN",
    url: APTUS_URL,
    siteName: APTUS.name,
    images: [{ url: CATALOG_IMAGE, alt: `${APTUS.name} product catalog` }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [CATALOG_IMAGE],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${APTUS_URL}/#organization`,
      name: APTUS.name,
      alternateName: APTUS.shortName,
      url: APTUS_URL,
      description: APTUS.about,
      email: APTUS.email,
      telephone: APTUS.phones.map((phone) => phone.tel),
      image: CATALOG_IMAGE,
      address: Object.values(APTUS.addresses).map((address) => ({
        "@type": "PostalAddress",
        name: address.label,
        streetAddress: address.lines.join(", "),
      })),
    },
    {
      "@type": "WebPage",
      "@id": `${APTUS_URL}/#webpage`,
      url: APTUS_URL,
      name: TITLE,
      description: DESCRIPTION,
      about: { "@id": `${APTUS_URL}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: CATALOG_IMAGE,
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Aptus", item: APTUS_URL },
        ],
      },
    },
    {
      "@type": "ItemList",
      "@id": `${APTUS_URL}/#catalog`,
      name: "Aptus product families",
      numberOfItems: aptusFamilies.length,
      itemListElement: aptusFamilies.map((family, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: family.name,
        url: `${APTUS_URL}/products/${family.slug}`,
        image: CATALOG_IMAGE,
      })),
    },
  ],
};

export default function AptusPage() {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <AptusCatalog />
    </main>
  );
}
