"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart";
import { Preform } from "./Preform";
import { PRODUCT_TINT, primaryNeckMm, formatNeck } from "@/lib/products";
import { ShoppingBagIcon } from "./icons";
import { waLink } from "@/lib/site";

export function AddedToCartToast() {
  const { lastAddedItem, setLastAddedItem, setIsOpen, itemCount, items } = useCart();

  useEffect(() => {
    if (!lastAddedItem) return;
    const timeout = window.setTimeout(() => setLastAddedItem(null), 4500);
    return () => window.clearTimeout(timeout);
  }, [lastAddedItem, setLastAddedItem]);

  if (!lastAddedItem) return null;

  const tint = PRODUCT_TINT[lastAddedItem.product.id] || "clear";
  const neckMm = primaryNeckMm(lastAddedItem.neckSize);

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed right-4 top-20 z-[60] w-[min(390px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-steel bg-white shadow-[0_12px_30px_rgba(13,30,62,0.15)]"
      >
        <div className="flex gap-3 p-4">
          <div className="relative flex h-16 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-night">
            <Preform
              shape={lastAddedItem.product.illustration}
              tint={tint}
              uid={`toast-${lastAddedItem.id}`}
              neckMm={neckMm}
              weightG={lastAddedItem.weight}
              className="h-12 w-auto"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sunrise">Added to quote cart</p>
                <h2 className="mt-1 truncate font-display text-sm font-bold text-navy">{lastAddedItem.product.name}</h2>
              </div>
              <button type="button" onClick={() => setLastAddedItem(null)} aria-label="Dismiss notification" className="text-xl leading-none text-slate hover:text-navy">×</button>
            </div>
            <p className="mt-1 text-xs text-slate">{formatNeck(lastAddedItem.neckSize)} · {lastAddedItem.weight} g · {lastAddedItem.quantity.toLocaleString()} kg</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 border-t border-steel bg-cloud p-3">
          <button type="button" onClick={() => { setLastAddedItem(null); setIsOpen(true); }} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-steel bg-white text-xs font-bold text-navy hover:border-sunrise">
            <ShoppingBagIcon className="h-3.5 w-3.5" /> View cart ({itemCount})
          </button>
          <button
            type="button"
            onClick={() => {
              setLastAddedItem(null);
              const lines = items.map((item, index) => `${index + 1}. ${item.product.name} (${formatNeck(item.neckSize)} / ${item.weight} g) — ${item.quantity.toLocaleString()} kg`);
              window.open(waLink(`*Enquiry from Nawkiran Website*\n\n${lines.join("\n")}\n\nPlease provide bulk pricing and availability.`), "_blank", "noopener,noreferrer");
            }}
            className="rounded-xl bg-sunrise text-xs font-bold text-white hover:bg-sunrise-dark"
          >
            Send enquiry
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
