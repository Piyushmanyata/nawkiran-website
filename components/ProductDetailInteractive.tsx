"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { type Product, type NeckSpec, PRODUCT_TINT, primaryNeckMm, formatNeck, defaultWeight } from "@/lib/products";
import { Preform, BlownBottle } from "./Preform";
import { useCart, QTY_STEP, QTY_MIN, QTY_MAX } from "@/lib/cart";
import { ShoppingBagIcon, Plus } from "./icons";
import { DAWN_EASE } from "./motion";

export function ProductDetailInteractive({ product }: { product: Product }) {
  const [selectedNeck, setSelectedNeck] = useState<NeckSpec>(product.necks[0]);
  const [selectedWeight, setSelectedWeight] = useState<number>(defaultWeight(product.necks[0]));
  const [qty, setQty] = useState(100);
  const [isAdded, setIsAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  const { addItem } = useCart();

  const handleNeckChange = (neck: NeckSpec) => {
    setSelectedNeck(neck);
    setSelectedWeight(defaultWeight(neck));
  };

  // QTY_STEP, QTY_MIN, QTY_MAX are imported from lib/cart

  const handleAdd = () => {
    addItem(product, selectedNeck.size, selectedWeight, qty);
    setIsAdded(true);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => () => { if (addedTimer.current) clearTimeout(addedTimer.current); }, []);

  const neckMm = primaryNeckMm(selectedNeck.size);
  const tint = PRODUCT_TINT[product.id] || "clear";

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start mt-6">
      {/* Left Column: Product Info & Interactive Selectors */}
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

        {/* Specs & Selection controls */}
        <div className="rounded-2xl border border-steel bg-white p-6 shadow-sm space-y-6">
          {/* Neck Selector */}
          <div>
            <h2 className="text-sm font-bold text-navy uppercase tracking-wider">
              Choose Neck Size
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.necks.map((n) => {
                const active = n.size === selectedNeck.size;
                return (
                  <button
                    key={n.size}
                    type="button"
                    onClick={() => handleNeckChange(n)}
                    aria-pressed={active}
                    className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
                      active
                        ? "border-navy bg-navy text-white"
                        : "border-steel bg-white text-navy hover:border-sunrise"
                    }`}
                  >
                    {formatNeck(n.size)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Weight Selector */}
          <div>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-sm font-bold text-navy uppercase tracking-wider">
                Choose Weight
              </h2>
              <span className="text-xs text-slate font-medium">
                {selectedNeck.weights.length} weights available
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {selectedNeck.weights.map((w) => {
                const active = w === selectedWeight;
                return (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setSelectedWeight(w)}
                    aria-pressed={active}
                    className={`tnum rounded-xl border py-2.5 font-mono text-sm font-semibold transition-[transform,background-color,border-color,color,box-shadow] cursor-pointer ${
                      active
                        ? "border-sunrise bg-sunrise text-white shadow-md scale-[1.04]"
                        : "border-steel bg-cloud text-navy hover:border-sunrise/75 hover:bg-white hover:scale-[1.02]"
                    }`}
                  >
                    {w}g
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector (strictly in Kgs) */}
          <div className="pt-4 border-t border-cloud">
            <label htmlFor="qty-detail-input" className="block text-xs font-bold text-slate uppercase tracking-wider">
              Quantity (in Kilograms)
            </label>
            <div className="mt-2 flex items-center rounded-xl border border-steel bg-cloud p-1 max-w-[18rem]">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(QTY_MIN, q - QTY_STEP))}
                className="flex h-10 w-12 items-center justify-center rounded-lg text-navy hover:bg-steel/30 active:scale-95 transition-[transform,background-color] cursor-pointer font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={qty <= QTY_MIN}
                aria-label="Decrease quantity"
              >
                &minus;
              </button>
              <div className="flex-1 flex items-center justify-center gap-1.5">
                <input
                  type="number"
                  id="qty-detail-input"
                  value={qty}
                  min={QTY_MIN}
                  max={QTY_MAX}
                  step={QTY_STEP}
                  onChange={(e) => setQty(Math.min(QTY_MAX, Math.max(QTY_MIN, parseInt(e.target.value, 10) || QTY_MIN)))}
                  className="w-16 text-center bg-transparent font-mono text-base font-bold text-navy focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="font-sans text-sm font-bold text-slate uppercase select-none">kg</span>
              </div>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(QTY_MAX, q + QTY_STEP))}
                className="flex h-10 w-12 items-center justify-center rounded-lg text-navy hover:bg-steel/30 active:scale-95 transition-[transform,background-color] cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="pt-2">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={handleAdd}
                    className={`group relative overflow-hidden inline-flex w-full sm:w-auto px-8 py-3.5 items-center justify-center gap-2 rounded-full text-sm font-semibold text-white shadow-lg transition-[transform,box-shadow,background-color] duration-300 active:scale-[0.98] cursor-pointer ${
                  isAdded
                    ? "bg-whatsapp shadow-[0_8px_18px_-8px_rgba(37,211,102,0.6)]"
                    : "bg-sunrise shadow-[0_8px_18px_-10px_rgba(243,107,33,0.85)] hover:-translate-y-0.5"
                }`}
              >
                {isAdded ? (
                  <motion.span
                    initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
                    animate={reduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                    className="flex items-center gap-1.5"
                  >
                    Added to Cart ✓
                  </motion.span>
                ) : (
                  <>
                    <ShoppingBagIcon className="h-4.5 w-4.5" />
                    Add to Cart
                  </>
                )}
              </button>
              <span className="text-xs text-slate font-mono">
                Items accumulate in your cart for one WhatsApp quote request.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Dynamic Interactive Rendering Card */}
      <div className="relative lg:sticky lg:top-24 overflow-hidden rounded-3xl bg-gradient-to-b from-[#0d1e3e] to-night p-6 text-white shadow-xl min-h-[30rem] flex flex-col justify-between">
        <div className="grid-texture absolute inset-0 opacity-40" />
        <div
          className="absolute -right-16 top-10 h-60 w-60 rounded-full opacity-22 blur-[52px]"
          style={{ background: product.accent }}
        />
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Visualisation
            </span>
            <h2 className="text-2xl font-display font-bold mt-1">
              {product.name} Model
            </h2>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-bold text-night"
            style={{ background: product.accent }}
          >
            PET material
          </span>
        </div>

        {/* Real-time Render updating with state */}
        <div className="relative my-8 flex items-center justify-center flex-1 min-h-[20rem]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${product.id}-${neckMm}-${selectedWeight}`}
              initial={reduceMotion ? false : { opacity: 0.85, scale: 0.96 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0.85, scale: 0.96 }}
              transition={{ duration: reduceMotion ? 0 : 0.25, ease: DAWN_EASE }}
              className="z-10 flex items-center justify-center"
            >
              <Preform
                shape={product.illustration}
                tint={tint}
                uid={`product-page-${product.id}-${selectedNeck.size}-${selectedWeight}`}
                neckMm={neckMm}
                weightG={selectedWeight}
                className="h-72 sm:h-80 w-auto drop-shadow-[0_22px_32px_rgba(0,0,0,0.45)] transition-transform duration-300"
              />
            </motion.div>
          </AnimatePresence>
          <div
            className="pointer-events-none absolute right-4 bottom-4 h-36 sm:h-44 w-auto opacity-15"
          >
            <BlownBottle
              shape={product.illustration}
              tint={tint}
              uid={`product-page-blown-${product.id}`}
            />
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 pt-4 text-xs text-white/50 flex justify-between">
          <span>Illustration: Preform &amp; Blown Shape</span>
          <span className="tnum">
            {formatNeck(selectedNeck.size)} / {selectedWeight}g
          </span>
        </div>
      </div>
    </div>
  );
}
