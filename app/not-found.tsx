import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for doesn't exist or has been moved.",
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}/404` },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main-content" className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-night pt-24 pb-16 text-white">
        <div className="grid-texture absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-96 w-[50rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(243,107,33,0.5), transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="shell relative z-10 text-center">
          <p className="font-display text-[clamp(5rem,18vw,12rem)] font-extrabold leading-none text-sunrise/90">
            404
          </p>
          <h1 className="mt-2 text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-white">
            This page took a wrong turn.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-white/65">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Explore our PET preform catalogue instead.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-sunrise px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(243,107,33,0.8)] transition-all hover:-translate-y-0.5"
            >
              Back to home
            </Link>
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Browse catalogue
            </Link>
          </div>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/75 transition-all hover:border-sunrise/50 hover:bg-white/[0.08] hover:text-white"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
