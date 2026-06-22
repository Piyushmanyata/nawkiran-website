import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, type Product } from "@/lib/products";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SpecTable } from "@/components/SpecTable";
import { Preform, BlownBottle } from "@/components/Preform";
import { waLink } from "@/lib/site";
import { WhatsAppIcon, ArrowRight } from "@/components/icons";
import { SectionDivider } from "@/components/SunArc";

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

          {/* Hero Section */}
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start mt-6">
            {/* Left Column: Product Info & Specs */}
            <div className="space-y-8">
              <div>
                <p className="eyebrow">Product Family</p>
                <h1 className="mt-3 text-4xl sm:text-5xl font-display font-extrabold text-navy leading-tight">
                  {product.name} PET Preforms
                </h1>
                <p className="mt-4 text-lg text-slate leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Crawlable Specs Table */}
              <div className="space-y-4">
                <h2 className="text-xl font-display font-bold text-navy">
                  Available Neck Sizes &amp; Weights
                </h2>
                <SpecTable product={product} />
              </div>

              {/* Dynamic CTA */}
              <div className="rounded-2xl border border-steel bg-white p-6 shadow-sm">
                <h3 className="text-lg font-display font-bold text-navy">Request a Bulk Quote</h3>
                <p className="mt-2 text-sm text-slate">
                  Nawkiran Polyplast manufactures high-quality PET preforms to exact industrial tolerances. Send us your parameters on WhatsApp to receive a prompt custom quote.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href={waLink(`Hi Nawkiran, I need a bulk quote for ${product.name} PET preforms. Please send specs and pricing.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-sunrise px-6 py-3 text-sm font-semibold text-white shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <WhatsAppIcon className="h-4.5 w-4.5" />
                    Enquire on WhatsApp
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <span className="text-xs text-slate font-mono">Typically responds in minutes</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Rendering Card */}
            <div className="relative sticky top-24 overflow-hidden rounded-3xl bg-gradient-to-b from-[#0d1e3e] to-night p-6 text-white shadow-xl min-h-[30rem] flex flex-col justify-between">
              <div className="grid-texture absolute inset-0 opacity-40" />
              <div
                className="absolute -right-16 top-10 h-60 w-60 rounded-full opacity-22 blur-[52px]"
                style={{ background: product.accent }}
              />
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Visualisation</span>
                  <h3 className="text-2xl font-display font-bold mt-1">{product.name} Model</h3>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold text-night"
                  style={{ background: product.accent }}
                >
                  Food Grade PET
                </span>
              </div>

              {/* Renders */}
              <div className="relative my-8 flex items-center justify-center flex-1 min-h-[20rem]">
                <Preform
                  shape={product.illustration}
                  tint={TINT[product.id]}
                  uid={`product-page-${product.id}`}
                  neckMm={neckMm}
                  weightG={avgWeight}
                  className="h-72 sm:h-80 w-auto drop-shadow-[0_22px_32px_rgba(0,0,0,0.45)] z-10"
                />
                <BlownBottle
                  shape={product.illustration}
                  tint={TINT[product.id]}
                  uid={`product-page-blown-${product.id}`}
                  className="pointer-events-none absolute right-4 bottom-4 h-36 sm:h-44 w-auto opacity-15"
                />
              </div>

              <div className="relative z-10 border-t border-white/10 pt-4 text-xs text-white/50 flex justify-between">
                <span>Illustration: Preform &amp; Blown Shape</span>
                <span>Accurate to scale</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
