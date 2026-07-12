import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, formatNeck, weightRange, productBadge } from "@/lib/products";
import { SITE_URL } from "@/lib/site";
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

// Generate dynamic metadata for SEO targeting
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) return {};

  const neckText = product.necks.map((n) => formatNeck(n.size)).join(", ");
  const [wmin, wmax] = weightRange(product);
  const variantCount = product.necks.reduce((s, n) => s + n.weights.length, 0);
  const title = `${product.name} PET Preforms Manufacturer Kolkata | Nawkiran`;
  const description = `Buy food-grade ${product.name} PET preforms in Kolkata. Neck sizes: ${neckText}. Weights ${wmin}–${wmax} g across ${variantCount} variants. ${product.use}. Request a bulk quote on WhatsApp.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/products/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/products/${slug}`,
      images: [
        {
          url: `${SITE_URL}/hero-preforms-v2.png`,
          width: 1200,
          height: 630,
          alt: `${product.name} PET Preforms`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/hero-preforms-v2.png`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) {
    notFound();
  }

  // Product schema + breadcrumb structured data
  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": `${product.name} PET Preform`,
        "image": `${SITE_URL}/hero-preforms-v2.png`,
        "description": product.description,
        "category": "PET Preforms",
        "material": "PET",
        "brand": {
          "@type": "Brand",
          "name": "Nawkiran Polyplast",
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "Nawkiran Polyplast Pvt. Ltd.",
          "url": SITE_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/#products` },
          { "@type": "ListItem", position: 3, name: product.name, item: `${SITE_URL}/products/${slug}` },
        ],
      },
    ],
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Nav />
      <main id="main-content" className="pt-24 bg-cloud/30">
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

          {/* Related families — internal linking */}
          <div className="mt-16">
            <h2 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">
              Other preform families
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {products
                .filter((p) => p.id !== product.id)
                .map((p) => (
                  <a
                    key={p.id}
                    href={`/products/${p.id}`}
                    className="group rounded-xl border border-steel bg-white p-3 hover:border-sunrise hover:shadow-sm transition-[border-color,box-shadow]"
                  >
                    <span className="block text-xs font-semibold text-slate">{productBadge(p)}</span>
                    <span className="mt-1 block font-display text-sm font-bold text-navy group-hover:text-sunrise transition-colors">
                      {p.name}
                    </span>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
