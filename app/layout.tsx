import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { COMPANY } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b1b3a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nawkiran.com"),
  title: {
    default: "Nawkiran Polyplast — PET Preforms for Bottles & Jars, Made to Spec in Kolkata",
    template: "%s · Nawkiran Polyplast",
  },
  description:
    "Nawkiran Polyplast manufactures PET preforms for bottles and jars — 11 machines, 80+ product types, ~350 tonnes a month across 6 preform families (neck sizes 22–120mm). Get a quote on WhatsApp in minutes.",
  keywords: [
    "PET preforms",
    "preform manufacturer Kolkata",
    "bottle preform",
    "jar preform",
    "PCO 1810",
    "PCO 1881",
    "ROPP preform",
    "Nawkiran Polyplast",
    "West Bengal preform supplier",
  ],
  manifest: "/manifest.json",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://nawkiran.com",
  },
  openGraph: {
    title: "Nawkiran Polyplast — PET Preforms for Bottles & Jars",
    description:
      "11 machines · 80+ product types · ~350 tonnes/month. PET preforms made to spec in Kolkata. Quote on WhatsApp in minutes.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nawkiran Polyplast — PET Preforms for Bottles & Jars",
    description:
      "11 machines · 80+ product types · ~350 tonnes/month. PET preforms made to spec in Kolkata. Quote on WhatsApp in minutes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "Organization"],
              "name": "Nawkiran Polyplast Pvt. Ltd.",
              "description": COMPANY.about,
              "url": "https://nawkiran.com",
              "telephone": "+919831185794",
              "email": "nawkiranpolyplast@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Poddar Court, 18 Rabindra Sarani, Gate No. 3, 5th Floor",
                "addressLocality": "Kolkata",
                "postalCode": "700001",
                "addressCountry": "IN",
              },
              "areaServed": "India",
              "priceRange": "$$",
            }),
          }}
        />
      </body>
    </html>
  );
}
