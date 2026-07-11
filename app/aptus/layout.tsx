import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { APTUS_SITE_PATH } from "@/lib/aptus";
import { AptusFooter } from "@/components/aptus/AptusFooter";
import { AptusNav } from "@/components/aptus/AptusNav";
import { AptusCartProvider } from "@/components/aptus/AptusCart";
import { AptusAddedToCartToast } from "@/components/aptus/AptusAddedToCartToast";

const APTUS_URL = `${SITE_URL}${APTUS_SITE_PATH}`;

export const metadata: Metadata = {
  title: {
    default: "Aptus Packaging LLP | Cosmetic PET Bottles & Pharma Bottles",
    template: "%s | Aptus Packaging LLP",
  },
  description:
    "Aptus Packaging LLP manufactures cosmetic PET bottles, pharma bottles, and compression-moulded plastic closures (Alaska) in West Bengal. Request a quote on WhatsApp.",
  keywords: [
    "Aptus Packaging",
    "pharma bottles manufacturer India",
    "cosmetic PET bottles supplier Kolkata",
    "mineral water caps wholesale West Bengal",
    "plastic closures manufacturer India",
    "compression molding closures",
    "pharma PET packaging Kolkata",
    "cosmetic bottle injection moulding",
    "single stage ASB machine packaging",
    "premium plastic closures",
  ],
  alternates: {
    canonical: APTUS_URL,
  },
  openGraph: {
    title: "Aptus Packaging LLP | PET Bottles & Closures Manufacturer",
    description:
      "Aptus Packaging LLP manufactures premium cosmetic bottles, pharma bottles, and compression-moulded closures in West Bengal. High daily production capacity.",
    type: "website",
    locale: "en_IN",
    url: APTUS_URL,
    siteName: "Aptus Packaging",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aptus Packaging LLP | PET Bottles & Closures",
    description:
      "Premium cosmetic bottles, pharma bottles, and compression-moulded closures. High daily production capacity.",
  },
};

export default function AptusLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AptusCartProvider>
      <div className="aptus-theme min-h-screen bg-white">
        <AptusNav />
        {children}
        <AptusAddedToCartToast />
        <AptusFooter />
      </div>
    </AptusCartProvider>
  );
}
