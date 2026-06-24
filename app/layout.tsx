import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from "next/font/google";
import { COMPANY } from "@/lib/site";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

const SITE_URL = "https://nawkiran.com";
const OG_IMAGE = `${SITE_URL}/hero-preforms.png`;

export const viewport: Viewport = {
  themeColor: "#0b1b3a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nawkiran Polyplast — PET Preforms Manufacturer in Kolkata | 80+ Types, 400+ Tonnes/Month",
    template: "%s · Nawkiran Polyplast",
  },
  description:
    "Nawkiran Polyplast manufactures PET preforms for bottles and jars — 11 machines, 80+ product types, 400+ tonnes a month across 6 preform families (neck sizes 22–120mm). Serving 250+ buyers across 13+ Indian states. Get a quote on WhatsApp in minutes.",
  keywords: [
    "PET preforms manufacturer India",
    "PET preforms Kolkata",
    "preform manufacturer West Bengal",
    "bottle preform supplier",
    "jar preform manufacturer",
    "PCO 1810 preform",
    "PCO 1881 preform",
    "ROPP preform India",
    "3-star neck preform",
    "Nawkiran Polyplast",
    "PET preform wholesale",
    "water bottle preform",
    "soft drink bottle preform",
    "edible oil bottle preform",
    "PET bottle blanks India",
    "preform injection moulding Kolkata",
    "Baidyabati PET preform plant",
    "preform manufacturer eastern India",
    "high-volume PET preform supply",
    "food-grade PET preforms",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-IN": `${SITE_URL}/en-in`,
      "hi-IN": `${SITE_URL}/hi-in`,
    },
  },
  openGraph: {
    title: "Nawkiran Polyplast — PET Preforms for Bottles & Jars | Kolkata",
    description:
      "11 machines · 80+ product types · 400+ tonnes/month · 250+ buyers across 13+ states. PET preforms made to spec in Kolkata. Quote on WhatsApp in minutes.",
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Nawkiran Polyplast",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Nawkiran Polyplast — Premium PET Preforms for Bottles and Jars",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nawkiran Polyplast — PET Preforms for Bottles & Jars",
    description:
      "11 machines · 80+ product types · 400+ tonnes/month. PET preforms made to spec in Kolkata. Quote on WhatsApp in minutes.",
    images: [OG_IMAGE],
  },
  category: "Manufacturing",
  other: {
    "geo.region": "IN-WB",
    "geo.placename": "Kolkata",
    "geo.position": "22.5726;88.3639",
    "ICBM": "22.5726, 88.3639",
  },
};

const structuredData = {
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
        url: `${SITE_URL}/hero-preforms.png`,
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
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      foundingDate: "2009",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: 50,
      },
      priceRange: "$$",
      hasMap: "https://maps.app.goo.gl/GBRHrSvco2py9AZf7",
      sameAs: [
        "https://wa.me/919831185794",
      ],
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
            description: "Virgin-grade PET preforms for water bottles, soft drinks, and edible oil — available in PCO 1810, PCO 1881, 3-Star, ROPP, jar, and fridge-bottle families. Neck sizes 22–120 mm, weights 10–150 g.",
            category: "PET Preforms",
            manufacturer: {
              "@id": `${SITE_URL}/#organization`,
            },
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
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
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
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Nawkiran Polyplast — PET Preforms Manufacturer in Kolkata",
      description: "11 machines, 80+ product types, 400+ tonnes/month across 6 PET preform families.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
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
            text: "Nawkiran Polyplast manufactures 6 families of PET preforms: 3-Star neck (water bottles), PCO 1810, PCO 1881 (carbonated soft drinks), jar preforms, fridge-bottle preforms, and ROPP (Roll-On Pilfer Proof) neck preforms. Neck sizes range from 22 mm to 120 mm.",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrains.variable}`}>
        <CartProvider>
          {children}
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
