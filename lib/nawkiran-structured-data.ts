import { products } from "@/lib/products";
import { COMPANY, FOUNDING_YEAR, PHONES, EMAIL, SITE_URL } from "@/lib/site";

const OG_IMAGE = `${SITE_URL}/hero-preforms-v2.png`;

export const nawkiranStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "Organization"],
      "@id": `${SITE_URL}/#organization`,
      name: "Nawkiran Polyplast Pvt. Ltd.",
      alternateName: ["Nawkiran Polyplast", "Nawkiran"],
      description: COMPANY.about,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/nawkiran-logo.svg`,
      },
      image: OG_IMAGE,
      telephone: PHONES.map((p) => p.tel),
      email: EMAIL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Poddar Court, 18 Rabindra Sarani, Gate No. 3, 5th Floor",
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        postalCode: "700001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 22.5726,
        longitude: 88.3639,
      },
      areaServed: { "@type": "Country", name: "India" },
      foundingDate: String(FOUNDING_YEAR),
      hasMap: "https://maps.app.goo.gl/GBRHrSvco2py9AZf7",
      sameAs: ["https://wa.me/919831185794"],
      knowsAbout: [
        "PET preform manufacturing",
        "injection moulding",
        "bottle preforms",
        "jar preforms",
        "PCO 1810",
        "PCO 1881",
        "ROPP neck preforms",
        "rPET-ready PET packaging",
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "PET Bottle Preforms",
            description:
              "PET preforms for water bottles, carbonated drinks, edible oil, jars, and fridge bottles — available in PCO 1810, PCO 1881, 3-Start/Alaska, ROPP, jar, and fridge-bottle families. Neck sizes 22–120 mm, weights 5.5–101.5 g.",
            category: "PET Preforms",
            manufacturer: { "@id": `${SITE_URL}/#organization` },
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Nawkiran Polyplast",
      description: "PET preform manufacturer — Kolkata, India",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#catalogue`,
      name: "PET Preform Product Families",
      description:
        "Six families of PET preforms manufactured by Nawkiran Polyplast, covering water, CSD, jar, fridge-bottle and ROPP applications.",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${product.name} PET Preforms`,
        url: `${SITE_URL}/products/${product.id}`,
      })),
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Nawkiran Polyplast — PET Preforms Manufacturer in Kolkata",
      description:
        "11 machines, 80+ product types, 400+ tonnes/month across 6 PET preform families.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        ],
      },
    },
  ],
};
