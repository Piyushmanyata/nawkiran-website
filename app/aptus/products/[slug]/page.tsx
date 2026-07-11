import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AptusProductDetail } from "@/components/aptus/AptusProductDetail";
import {
  APTUS,
  APTUS_SITE_PATH,
  aptusFamilies,
  getAptusFamily,
  type AptusFamily,
} from "@/lib/aptus";
import { SITE_URL } from "@/lib/site";
import aptusCatalog from "../../../../Aptus Catalog.png";

type Props = {
  params: Promise<{ slug: string }>;
};

type AptusVariant = AptusFamily["variants"][number];

const APTUS_URL = `${SITE_URL}${APTUS_SITE_PATH}`;
const CATALOG_IMAGE = `${SITE_URL}${aptusCatalog.src}`;
const FAMILY_DESCRIPTIONS: Record<string, string> = {
  "cosmetic-bottles":
    "Explore Aptus cosmetic PET bottle specifications, including neck size, capacity, bottle weight and catalog packing quantity.",
  "pharma-bottles":
    "Explore Aptus pharma bottle specifications, including neck size, capacity, bottle weight and catalog packing quantity.",
  "plastic-closures":
    "Explore Aptus plastic closure specifications, including closure size, weight and catalog packing quantity.",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return aptusFamilies.map((family) => ({ slug: family.slug }));
}

function getDescription(family: AptusFamily) {
  return FAMILY_DESCRIPTIONS[family.slug] ?? `Explore ${family.name} specifications from ${APTUS.name}.`;
}

function describeVariant(variant: AptusVariant) {
  if (variant.kind === "bottle") {
    return `${variant.item}: ${variant.capacityMl} ml capacity, ${variant.neckSizeMm} mm neck, ${variant.weightG} g bottle weight, packing ${variant.packingSize} pieces.`;
  }

  return `${variant.product}: ${variant.sizeMm} mm, ${variant.weightG} g closure weight, packing ${variant.packingSize} pieces.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const family = getAptusFamily(slug);
  if (!family) return {};

  const url = `${APTUS_URL}/products/${family.slug}`;
  const title = `${family.name} Specifications | Aptus Packaging LLP`;
  const description = getDescription(family);
  const image = CATALOG_IMAGE;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_IN",
      url,
      siteName: APTUS.name,
      images: [{ url: image, alt: family.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function AptusFamilyPage({ params }: Props) {
  const { slug } = await params;
  const family = getAptusFamily(slug);
  if (!family) notFound();

  const url = `${APTUS_URL}/products/${family.slug}`;
  const description = getDescription(family);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}/#webpage`,
    url,
    name: `${family.name} Specifications`,
    description,
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
        { "@type": "ListItem", position: 3, name: family.name, item: url },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      name: `${family.name} catalog specifications`,
      numberOfItems: family.variants.length,
      itemListElement: family.variants.map((variant, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: describeVariant(variant),
      })),
    },
  };

  return (
    <main id="main-content" className="min-h-screen bg-cloud/30 pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <div className="shell pt-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Aptus", href: APTUS_SITE_PATH },
            { label: family.name },
          ]}
        />
      </div>
      <AptusProductDetail family={family} />
    </main>
  );
}
