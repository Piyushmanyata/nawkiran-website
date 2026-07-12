import type { Metadata } from "next";
import { AptusCatalog } from "@/components/aptus/AptusCatalog";
import { APTUS, APTUS_SITE_PATH, aptusFamilies } from "@/lib/aptus";
import { SITE_URL } from "@/lib/site";
import aptusCatalog from "../../public/aptus-hero-products-v2.png";

const APTUS_URL = `${SITE_URL}${APTUS_SITE_PATH}`;
const CATALOG_IMAGE = `${SITE_URL}${aptusCatalog.src}`;
const TITLE = "PET Bottles & Plastic Closures";
const DESCRIPTION =
  "Explore Aptus Packaging LLP cosmetic PET bottles, pharma bottles and plastic closures with catalogue specifications and box-based WhatsApp enquiries.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | Aptus Packaging LLP`,
    description: DESCRIPTION,
    images: [{ url: CATALOG_IMAGE, alt: `${APTUS.name} product catalog` }],
  },
  twitter: {
    title: `${TITLE} | Aptus Packaging LLP`,
    description: DESCRIPTION,
    images: [CATALOG_IMAGE],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "Organization"],
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
      areaServed: { "@type": "Country", name: "India" },
      hasMap: Object.values(APTUS.addresses).map((address) => address.maps),
      knowsAbout: ["cosmetic PET bottles", "pharma bottles", "plastic closures", "single-stage ASB bottle manufacturing", "compression moulding"],
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
