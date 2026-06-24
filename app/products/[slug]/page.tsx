import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, type Product } from "@/lib/products";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SpecTable } from "@/components/SpecTable";
import { SectionDivider } from "@/components/SunArc";
import { ProductDetailInteractive } from "@/components/ProductDetailInteractive";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static routes at build time
export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.id,
  }));
}

const TINT: Record<string, "blue" | "clear" | "amber"> = {
  "3-star": "blue",
  "1810-pco": "clear",
  "1881-pco": "clear",
  jar: "amber",
  "fridge-bottle": "blue",
  ropp: "amber",
};

function formatNeck(size: string): string {
  return size.replace(/\s*\/\s*/g, "/").replace(/\s*MM\b/g, " mm");
}

// Generate dynamic metadata for SEO targeting
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) return {};

  const neckText = product.necks.map((n) => formatNeck(n.size)).join(", ");
  const title = `${product.name} PET Preforms Manufacturer Kolkata | Nawkiran`;
  const description = `Buy high-quality, food-grade ${product.name} PET preforms in Kolkata. Available in neck sizes: ${neckText}. Weight options include ${product.necks[0].weights.join(", ")}g. Request a bulk quote now.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://nawkiran.com/products/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://nawkiran.com/products/${slug}`,
      images: [
        {
          url: "https://nawkiran.com/hero-preforms.png",
          width: 1200,
          height: 630,
          alt: `${product.name} PET Preforms`,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) {
    notFound();
  }

  // Preform properties for illustration
  const allWeights = product.necks.flatMap((n) => n.weights);
  const avgWeight = allWeights.reduce((s, w) => s + w, 0) / allWeights.length;
  const primaryNeck = product.necks[0];
  const neckMm = Math.max(...(primaryNeck.size.match(/\d+/g) ?? []).map(Number));

  // Product schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${product.name} PET Preform`,
    "image": "https://nawkiran.com/hero-preforms.png",
    "description": product.description,
    "category": "PET Preforms",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "price": "0.00",
      "priceRange": "$$",
      "seller": {
        "@type": "Organization",
        "name": "Nawkiran Polyplast Pvt. Ltd.",
      },
    },
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/#products" },
    { label: product.name },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Nav />
      <main className="pt-24 bg-cloud/30">
        <div className="shell py-12">
          {/* Breadcrumbs */}
          <Breadcrumb items={breadcrumbs} />

          {/* Interactive Specification & Order Panel */}
          <ProductDetailInteractive product={product} />

          <SectionDivider />

          {/* Crawlable Specs Table Reference */}
          <div className="mt-12 space-y-6 max-w-3xl">
            <h2 className="text-2xl font-display font-extrabold text-navy">
              Available Neck Sizes &amp; Weights
            </h2>
            <p className="text-sm text-slate leading-relaxed">
              Below is the comprehensive list of manufactured configurations for the {product.name} family. Select any specifications in the configurator above to add to your enquiry cart.
            </p>
            <SpecTable product={product} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
