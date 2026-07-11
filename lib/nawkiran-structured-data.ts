import { products } from "@/lib/products";
import { COMPANY, FOUNDING_YEAR, SITE_URL } from "@/lib/site";

const OG_IMAGE = `${SITE_URL}/hero-preforms.png`;

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
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
      image: OG_IMAGE,
      telephone: ["+919831185794", "+919831388570", "+917980639796"],
      email: "nawkiranpolyplast@gmail.com",
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
      numberOfEmployees: { "@type": "QuantitativeValue", value: 50 },
      priceRange: "$$",
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
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "PET Bottle Preforms",
            description:
              "Virgin-grade PET preforms for water bottles, soft drinks, and edible oil — available in PCO 1810, PCO 1881, 3-Star, ROPP, jar, and fridge-bottle families. Neck sizes 22–120 mm, weights 10–150 g.",
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
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/#products`,
        },
        "query-input": "required name=search_term_string",
      },
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
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What types of PET preforms does Nawkiran Polyplast manufacture?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nawkiran Polyplast manufactures 6 families of PET preforms: 3-Star neck (packaged drinking water), PCO 1810 & PCO 1881 (carbonated soft drinks & hot-fill juices), jar preforms (confectionery & dry food), fridge-bottle preforms (reusable water bottles), and ROPP neck preforms (edible oil, pharmaceuticals, liquor). Neck sizes range from 22 mm to 120 mm.",
          },
        },
        {
          "@type": "Question",
          name: "What is the monthly production capacity?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nawkiran Polyplast has a monthly production capacity of over 400 tonnes across 80+ product types, operating 11 preform injection moulding machines.",
          },
        },
        {
          "@type": "Question",
          name: "Where is Nawkiran Polyplast located?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nawkiran Polyplast's registered office is at Poddar Court, 18 Rabindra Sarani, Kolkata – 700001. The manufacturing plant is at Baidyabati, West Bengal.",
          },
        },
        {
          "@type": "Question",
          name: "How can I get a quote for PET preforms?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can get a quote by messaging Nawkiran Polyplast on WhatsApp at +91 98311 85794, calling +91 98311 85794, or emailing nawkiranpolyplast@gmail.com. WhatsApp quotes are typically answered within minutes.",
          },
        },
      ],
    },
  ],
};
