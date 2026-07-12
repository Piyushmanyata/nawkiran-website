"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ShoppingBagIcon } from "@/components/icons";
import { APTUS_SITE_PATH, aptusFamilies, type AptusFamily } from "@/lib/aptus";
import { useAptusCart } from "./AptusCart";
import { AptusCatalogCrop } from "./AptusCatalogCrop";

type Variant = AptusFamily["variants"][number];

export function AptusProductDetail({ family }: { family: AptusFamily }) {
  const { addItem, openCart, itemCount } = useAptusCart();
  const [boxCounts, setBoxCounts] = useState<Record<string, number>>({});
  const [neck, setNeck] = useState("all");
  const [capacity, setCapacity] = useState("all");
  const [shape, setShape] = useState("all");

  const bottleVariants = family.kind === "bottle" ? family.variants : [];
  const neckOptions = [...new Set(bottleVariants.map((variant) => String(variant.neckSizeMm)))];
  const capacityOptions = [...new Set(bottleVariants.map((variant) => String(variant.capacityMl)))];
  const shapeOptions = [...new Set(bottleVariants.map((variant) => variant.item))];

  const filteredVariants = useMemo<readonly Variant[]>(() => {
    if (family.kind !== "bottle") return family.variants;
    return family.variants.filter((variant) =>
      (neck === "all" || String(variant.neckSizeMm) === neck) &&
      (capacity === "all" || String(variant.capacityMl) === capacity) &&
      (shape === "all" || variant.item === shape),
    );
  }, [capacity, family, neck, shape]);

  const getBoxes = (id: string) => boxCounts[id] ?? 10;
  const updateBoxes = (id: string, value: number) => {
    setBoxCounts((current) => ({ ...current, [id]: Math.max(1, Math.min(1000000, value || 1)) }));
  };

  return (
    <div className="shell pb-20 pt-8">
      <section className="grid overflow-hidden rounded-3xl border border-steel bg-white lg:grid-cols-[0.9fr_1.1fr]">
        <div className="min-h-64 sm:min-h-80"><AptusCatalogCrop slug={family.slug} /></div>
        <div className="p-6 sm:p-10">
          <p className="eyebrow">Aptus official catalogue</p>
          <h1 className="mt-3 text-[clamp(2.1rem,4vw,3.5rem)]">{family.name}</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            {family.kind === "bottle"
              ? "Filter the verified bottle range by neck, capacity, and shape. Choose a box quantity only when the specification is right."
              : "Choose the verified closure size and weight, then add the number of boxes you want to discuss."}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={(event) => openCart(event.currentTarget)}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-steel px-5 text-sm font-semibold text-navy hover:border-sunrise focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise"
            >
              <ShoppingBagIcon className="h-4.5 w-4.5" />
              View quote cart{itemCount ? ` (${itemCount})` : ""}
            </button>
            <p className="text-sm text-slate">Boxes × pieces per box = total pieces.</p>
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="aptus-specifications-title">
        <div className="max-w-3xl">
          <p className="eyebrow">Compact specification picker</p>
          <h2 id="aptus-specifications-title" className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)]">Find the right row in seconds.</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate">Use the filters to collapse repeated shapes such as Round and Altron, then add boxes from the matching specifications.</p>
        </div>

        {family.kind === "bottle" && (
          <div className="mt-7 grid gap-3 rounded-2xl border border-steel bg-white p-4 sm:grid-cols-3">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
              Neck finish
              <select value={neck} onChange={(event) => setNeck(event.target.value)} className="mt-2 block min-h-11 w-full rounded-xl border border-steel bg-cloud px-3 text-sm font-semibold normal-case tracking-normal text-navy focus:border-sunrise focus:outline-none">
                <option value="all">All necks</option>
                {neckOptions.map((value) => <option key={value} value={value}>{value} mm</option>)}
              </select>
            </label>
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
              Capacity
              <select value={capacity} onChange={(event) => setCapacity(event.target.value)} className="mt-2 block min-h-11 w-full rounded-xl border border-steel bg-cloud px-3 text-sm font-semibold normal-case tracking-normal text-navy focus:border-sunrise focus:outline-none">
                <option value="all">All capacities</option>
                {capacityOptions.map((value) => <option key={value} value={value}>{value} ml</option>)}
              </select>
            </label>
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
              Shape / item
              <select value={shape} onChange={(event) => setShape(event.target.value)} className="mt-2 block min-h-11 w-full rounded-xl border border-steel bg-cloud px-3 text-sm font-semibold normal-case tracking-normal text-navy focus:border-sunrise focus:outline-none">
                <option value="all">All shapes</option>
                {shapeOptions.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </label>
          </div>
        )}

        <p className="mt-4 text-sm font-semibold text-slate" aria-live="polite">
          Showing {filteredVariants.length} of {family.variants.length} catalogue specifications
        </p>

        <ul className="mt-4 grid gap-3">
          {filteredVariants.map((variant) => {
            const boxes = getBoxes(variant.id);
            const isBottle = variant.kind === "bottle";
            return (
              <li key={variant.id} className="rounded-2xl border border-steel bg-white p-4 sm:p-5">
                <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <p className="font-display text-lg font-bold text-navy">
                      {isBottle ? `${variant.item} bottle · ${variant.capacityMl} ml` : variant.product}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate">
                      <span className="rounded-full bg-cloud px-3 py-1">{isBottle ? `${variant.neckSizeMm} mm neck` : `${variant.sizeMm} mm`}</span>
                      {isBottle && <span className="rounded-full bg-cloud px-3 py-1">{variant.capacityMl} ml</span>}
                      <span className="rounded-full bg-cloud px-3 py-1">{variant.weightG} g</span>
                      <span className="rounded-full bg-cloud px-3 py-1">{variant.packingSize.toLocaleString("en-IN")} pcs / box</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-end gap-2 md:justify-end">
                    <label className="text-xs font-semibold text-slate">
                      Boxes
                      <input
                        type="number"
                        min={1}
                        max={1000000}
                        step={1}
                        inputMode="numeric"
                        value={boxes}
                        onChange={(event) => updateBoxes(variant.id, Number(event.target.value))}
                        className="mt-1 block h-11 w-24 rounded-xl border border-steel bg-cloud px-3 text-center font-mono text-sm font-bold text-navy focus:border-sunrise focus:outline-none"
                        aria-label={`Number of boxes for ${isBottle ? `${variant.item} ${variant.capacityMl} millilitre bottle` : variant.product}`}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => addItem(variant, boxes)}
                      className="min-h-11 rounded-full bg-sunrise px-4 text-sm font-semibold text-white hover:bg-sunrise-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise"
                    >
                      Add {boxes} boxes
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <nav className="mt-12" aria-label="Other Aptus product families">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">Other Aptus families</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {aptusFamilies.filter((related) => related.slug !== family.slug).map((related) => (
            <Link key={related.slug} href={`${APTUS_SITE_PATH}/products/${related.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-steel bg-white px-4 text-sm font-semibold text-navy hover:border-sunrise">
              {related.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
