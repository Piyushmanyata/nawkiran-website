"use client";

import Link from "next/link";
import { ShoppingBagIcon } from "@/components/icons";
import {
  APTUS_SITE_PATH,
  aptusFamilies,
  type AptusFamily,
} from "@/lib/aptus";
import { useAptusCart } from "./AptusCart";
import { AptusCatalogCrop } from "./AptusCatalogCrop";

export function AptusProductDetail({ family }: { family: AptusFamily }) {
  const { addItem, openCart, itemCount } = useAptusCart();

  return (
    <div className="shell pb-20 pt-8">
      <section className="grid overflow-hidden rounded-3xl border border-steel bg-white lg:grid-cols-[0.9fr_1.1fr]">
        <div className="min-h-64 sm:min-h-80">
          <AptusCatalogCrop slug={family.slug} />
        </div>
        <div className="p-6 sm:p-10">
          <p className="eyebrow">Aptus official catalogue</p>
          <h1 className="mt-3 text-[clamp(2.1rem,4vw,3.5rem)]">{family.name}</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            {family.kind === "bottle"
              ? "Select from the complete Aptus bottle range. Cosmetic and pharma applications use the same verified specification table from the official catalog."
              : "Select the verified Alaska closure size and weight, then adjust the number of catalog packs in your enquiry cart."}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={(event) => openCart(event.currentTarget)}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-steel px-5 text-sm font-semibold text-navy hover:border-sunrise focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise"
            >
              <ShoppingBagIcon className="h-4.5 w-4.5" />
              View Aptus cart{itemCount ? ` (${itemCount})` : ""}
            </button>
            <p className="text-sm text-slate">Add one pack below, then adjust pack count in the cart.</p>
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="aptus-specifications-title">
        <div className="max-w-3xl">
          <p className="eyebrow">Pack-based specifications</p>
          <h2 id="aptus-specifications-title" className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)]">
            Choose an exact catalog row.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate">
            Packing size is fixed by the brochure. Cart totals are calculated as packs × pieces per pack.
          </p>
        </div>

        <div className="mt-7 overflow-x-auto rounded-2xl border border-steel bg-white">
          {family.kind === "bottle" ? (
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-night text-white">
                <tr>
                  {[
                    "Neck size",
                    "Capacity",
                    "Weight",
                    "Packing size",
                    "Item",
                    "",
                  ].map((heading) => (
                    <th key={heading || "action"} scope="col" className="px-4 py-3 font-semibold">
                      {heading || <span className="sr-only">Add to cart</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {family.variants.map((variant) => (
                  <tr key={variant.id} className="border-t border-steel even:bg-cloud/60">
                    <td className="px-4 py-3 font-mono font-semibold text-navy">{variant.neckSizeMm} mm</td>
                    <td className="px-4 py-3 text-slate">{variant.capacityMl} ml</td>
                    <td className="px-4 py-3 text-slate">{variant.weightG} g</td>
                    <td className="px-4 py-3 text-slate">{variant.packingSize.toLocaleString("en-IN")} pcs</td>
                    <td className="px-4 py-3 font-semibold text-navy">{variant.item}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => addItem(variant)}
                        aria-label={`Add one pack of ${variant.item}, ${variant.capacityMl} millilitres, ${variant.neckSizeMm} millimetre neck, ${variant.weightG} grams`}
                        className="min-h-10 rounded-full bg-sunrise px-4 text-xs font-semibold text-white hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise"
                      >
                        Add 1 pack
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="bg-night text-white">
                <tr>
                  {[
                    "Size",
                    "Product",
                    "Weight",
                    "Packing size",
                    "",
                  ].map((heading) => (
                    <th key={heading || "action"} scope="col" className="px-4 py-3 font-semibold">
                      {heading || <span className="sr-only">Add to cart</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {family.variants.map((variant) => (
                  <tr key={variant.id} className="border-t border-steel even:bg-cloud/60">
                    <td className="px-4 py-3 font-mono font-semibold text-navy">{variant.sizeMm} mm</td>
                    <td className="px-4 py-3 font-semibold text-navy">{variant.product}</td>
                    <td className="px-4 py-3 text-slate">{variant.weightG} g</td>
                    <td className="px-4 py-3 text-slate">{variant.packingSize.toLocaleString("en-IN")} pcs</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => addItem(variant)}
                        aria-label={`Add one pack of ${variant.product}, ${variant.sizeMm} millimetres, ${variant.weightG} grams`}
                        className="min-h-10 rounded-full bg-sunrise px-4 text-xs font-semibold text-white hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise"
                      >
                        Add 1 pack
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <nav className="mt-12" aria-label="Other Aptus product families">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">Other Aptus families</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {aptusFamilies
            .filter((related) => related.slug !== family.slug)
            .map((related) => (
              <Link
                key={related.slug}
                href={`${APTUS_SITE_PATH}/products/${related.slug}`}
                className="inline-flex min-h-10 items-center rounded-full border border-steel bg-white px-4 text-sm font-semibold text-navy hover:border-sunrise"
              >
                {related.name}
              </Link>
            ))}
        </div>
      </nav>
    </div>
  );
}
