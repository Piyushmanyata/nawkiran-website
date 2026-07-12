"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAptusCart } from "./AptusCart";
import { AptusCatalogCrop } from "./AptusCatalogCrop";
import { ShoppingBagIcon } from "../icons";
import { aptusWaLink } from "@/lib/aptus";

export function AptusAddedToCartToast() {
  const { lastAddedItem, setLastAddedItem, openCart, itemCount } = useAptusCart();

  useEffect(() => {
    if (!lastAddedItem) return;
    const timeout = window.setTimeout(() => setLastAddedItem(null), 4500);
    return () => window.clearTimeout(timeout);
  }, [lastAddedItem, setLastAddedItem]);

  if (!lastAddedItem) return null;

  const { variant, packCount } = lastAddedItem;
  const slug = variant.kind === "closure"
    ? "plastic-closures"
    : variant.capacityMl <= 100 || variant.item === "OVAL" || variant.item === "BOSTON"
      ? "cosmetic-bottles"
      : "pharma-bottles";
  const name = variant.kind === "bottle" ? `${variant.item} bottle` : variant.product;
  const spec = variant.kind === "bottle"
    ? `${variant.capacityMl} ml · ${variant.neckSizeMm} mm neck · ${variant.weightG} g`
    : `${variant.sizeMm} mm · ${variant.weightG} g`;
  const message = `*Enquiry from Aptus Packaging LLP*\n\n*Added:* ${spec}\n*Qty:* ${packCount.toLocaleString()} box${packCount === 1 ? "" : "es"}\n\nPlease provide pricing and availability.`;

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed right-4 top-20 z-[60] w-[min(390px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-steel bg-white shadow-[0_12px_30px_rgba(25,21,31,0.16)]"
      >
        <div className="flex gap-3 p-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-dawn">
            <AptusCatalogCrop slug={slug} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sunrise">Added to quote cart</p>
                <h2 className="mt-1 truncate font-display text-sm font-bold text-navy">{name}</h2>
              </div>
              <button type="button" onClick={() => setLastAddedItem(null)} aria-label="Dismiss notification" className="text-xl leading-none text-slate hover:text-navy">×</button>
            </div>
            <p className="mt-1 text-xs text-slate">{spec} · {packCount.toLocaleString()} box{packCount === 1 ? "" : "es"}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 border-t border-steel bg-cloud p-3">
          <button type="button" onClick={() => { setLastAddedItem(null); openCart(); }} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-steel bg-white text-xs font-bold text-navy hover:border-sunrise">
            <ShoppingBagIcon className="h-3.5 w-3.5" /> View cart ({itemCount})
          </button>
          <a href={aptusWaLink(message)} target="_blank" rel="noopener noreferrer" onClick={() => setLastAddedItem(null)} className="inline-flex min-h-10 items-center justify-center rounded-xl bg-sunrise text-xs font-bold text-white hover:bg-sunrise-dark">
            Send enquiry
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
