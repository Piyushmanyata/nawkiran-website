"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { type Product, type NeckSpec } from "@/lib/products";
import { Preform, BlownBottle, type Tint } from "./Preform";
import { useCart } from "@/lib/cart";
import { ShoppingBagIcon, Plus } from "./icons";

const TINT: Record<string, Tint> = {
  "3-star": "blue",
  "1810-pco": "clear",
  "1881-pco": "clear",
  jar: "amber",
  "fridge-bottle": "blue",
  ropp: "amber",
};

function neckNumbers(size: string): number[] {
  return (size.match(/\d+(?:\.\d+)?/g) ?? []).map(Number);
}

function primaryNeckMm(size: string): number {
  const nums = neckNumbers(size);
  return nums.length ? Math.max(...nums) : 28;
}

function formatNeck(size: string): string {
  return size.replace(/\s*\/\s*/g, "/").replace(/\s*MM\b/g, " mm");
}

export function ProductDetailInteractive({ product }: { product: Product }) {
  const [selectedNeck, setSelectedNeck] = useState<NeckSpec>(product.necks[0]);
  const [selectedWeight, setSelectedWeight] = useState<number>(product.necks[0].weights[0]);
  const [qty, setQty] = useState(100);
  const [isAdded, setIsAdded] = useState(false);

  const { addItem } = useCart();

  const handleNeckChange = (neck: NeckSpec) => {
    setSelectedNeck(neck);
    setSelectedWeight(neck.weights[0]);
  };

  const step = 10;

  const handleAdd = () => {
    addItem(product, selectedNeck.size, selectedWeight, qty);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const neckMm = primaryNeckMm(selectedNeck.size);
  const tint = TINT[product.id] || "clear";

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
            <h3 className="text-sm font-bold text-navy uppercase tracking-wider">
              Choose Neck Size
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.necks.map((n) => {
                const active = n.size === selectedNeck.size;
                return (
                  <button
                    key={n.size}
                    type="button"
                    onClick={() => handleNeckChange(n)}
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
              <h3 className="text-sm font-bold text-navy uppercase tracking-wider">
                Choose Weight
              </h3>
              <span className="text-xs text-slate font-medium">
                {selectedNeck.weights.length} weights available
              </span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
              {selectedNeck.weights.map((w) => {
                const active = w === selectedWeight;
                return (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setSelectedWeight(w)}
                    className={`tnum rounded-xl border py-2.5 font-mono text-sm font-semibold transition-all cursor-pointer ${
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
                onClick={() => setQty((q) => Math.max(step, q - step))}
                className="flex h-10 w-12 items-center justify-center rounded-lg text-navy hover:bg-steel/30 active:scale-95 transition-all cursor-pointer font-bold text-lg"
                aria-label="Decrease quantity"
              >
                &minus;
              </button>
              <div className="flex-1 flex items-center justify-center gap-1.5">
                <input
                  type="number"
                  id="qty-detail-input"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-16 text-center bg-transparent font-mono text-base font-bold text-navy focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="font-sans text-sm font-bold text-slate uppercase select-none">kg</span>
              </div>
              <button
                type="button"
                onClick={() => setQty((q) => q + step)}
                className="flex h-10 w-12 items-center justify-center rounded-lg text-navy hover:bg-steel/30 active:scale-95 transition-all cursor-pointer"
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
                disabled={qty <= 0}
                className={`group relative overflow-hidden inline-flex w-full sm:w-auto px-8 py-3.5 items-center justify-center gap-2 rounded-full text-sm font-semibold text-white shadow-lg transition-all duration-300 active:scale-[0.98] cursor-pointer ${
                  isAdded
                    ? "bg-whatsapp shadow-[0_8px_18px_-8px_rgba(37,211,102,0.6)]"
                    : "bg-sunrise shadow-[0_8px_18px_-10px_rgba(243,107,33,0.85)] hover:-translate-y-0.5"
                }`}
              >
                {isAdded ? (
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
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
                Items accumulate in your cart for a single WhatsApp checkout.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Dynamic Interactive Rendering Card */}
      <div className="relative sticky top-24 overflow-hidden rounded-3xl bg-gradient-to-b from-[#0d1e3e] to-night p-6 text-white shadow-xl min-h-[30rem] flex flex-col justify-between">
        <div className="grid-texture absolute inset-0 opacity-40" />
        <div
          className="absolute -right-16 top-10 h-60 w-60 rounded-full opacity-22 blur-[52px] transition-all duration-500"
          style={{ background: product.accent }}
        />
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Visualisation
            </span>
            <h3 className="text-2xl font-display font-bold mt-1">
              {product.name} Model
            </h3>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-bold text-night"
            style={{ background: product.accent }}
          >
            Food Grade PET
          </span>
        </div>

        {/* Real-time Render updating with state */}
        <div className="relative my-8 flex items-center justify-center flex-1 min-h-[20rem]">
          <Preform
            shape={product.illustration}
            tint={tint}
            uid={`product-page-${product.id}`}
            neckMm={neckMm}
            weightG={selectedWeight}
            className="h-72 sm:h-80 w-auto drop-shadow-[0_22px_32px_rgba(0,0,0,0.45)] z-10 transition-transform duration-300"
          />
          <BlownBottle
            shape={product.illustration}
            tint={tint}
            uid={`product-page-blown-${product.id}`}
            className="pointer-events-none absolute right-4 bottom-4 h-36 sm:h-44 w-auto opacity-15"
          />
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
