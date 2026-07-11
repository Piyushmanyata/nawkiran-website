import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
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
    "3-start/alaska neck preform",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrains.variable}`}>
        <CartProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to content
          </a>
          {children}
        </CartProvider>
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                { where: { href_matches: "/products/*" }, eagerness: "moderate" },
                { where: { href_matches: "/aptus/products/*" }, eagerness: "moderate" },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
