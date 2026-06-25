"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/lib/cart";
import { Preform, type Tint } from "./Preform";
import { ShoppingBagIcon } from "./icons";

const TINT: Record<string, Tint> = {
  "3-star": "blue",
  "1810-pco": "clear",
  "1881-pco": "clear",
  jar: "amber",
  "fridge-bottle": "blue",
  ropp: "amber",
};

export function AddedToCartToast() {
  const { lastAddedItem, setLastAddedItem, setIsOpen, itemCount } = useCart();
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);

  const DURATION = 6000; // 6 seconds auto-dismiss
  const TICK_RATE = 50;  // Update progress bar every 50ms

  const closeToast = () => {
    setLastAddedItem(null);
  };

  const startTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    const startTime = Date.now();
    const totalRemaining = (progress / 100) * DURATION;

    timerRef.current = setTimeout(() => {
      closeToast();
    }, totalRemaining);

    progressIntervalRef.current = setInterval(() => {
      if (isHoveredRef.current) return;
      
      setProgress((prev) => {
        const next = prev - (TICK_RATE / DURATION) * 100;
        if (next <= 0) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          return 0;
        }
        return next;
      });
    }, TICK_RATE);
  };

  const pauseTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  useEffect(() => {
    if (lastAddedItem) {
      setProgress(100);
      isHoveredRef.current = false;
      startTimers();
    } else {
      pauseTimers();
    }

    return () => {
      pauseTimers();
    };
  }, [lastAddedItem]);

  if (!lastAddedItem) return null;

  const tint = TINT[lastAddedItem.product.id] || "clear";
  const neckMm = Math.max(...(lastAddedItem.neckSize.match(/\d+/g) ?? []).map(Number));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -15, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        onMouseEnter={() => {
          isHoveredRef.current = true;
          pauseTimers();
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          startTimers();
        }}
        className="fixed top-20 right-4 sm:right-6 z-[60] w-full max-w-[390px] overflow-hidden rounded-2xl border border-steel/80 bg-white/95 shadow-[0_12px_30px_rgba(13,30,62,0.15)] backdrop-blur-xl pointer-events-auto"
      >
        {/* Progress bar */}
        <div className="h-1 w-full bg-cloud">
          <div
            className="h-full bg-sunrise transition-all ease-linear"
            style={{ width: `${progress}%`, transitionDuration: `${TICK_RATE}ms` }}
          />
        </div>

        <div className="p-4 sm:p-5">
          {/* Header checkmark */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-sm font-bold text-navy">Added to Cart</span>
            </div>
            <button
              onClick={closeToast}
              className="text-slate/60 hover:text-navy transition-colors p-1 rounded-lg hover:bg-cloud"
              aria-label="Dismiss notification"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Product visualization and info */}
          <div className="mt-3 flex gap-3.5 rounded-xl border border-steel/40 bg-cloud/30 p-2.5">
            <div className="relative flex h-16 w-11 shrink-0 items-center justify-center rounded-lg bg-night overflow-hidden ring-1 ring-steel/10 shadow-inner">
              <span className="grid-texture absolute inset-0 opacity-15" />
              <Preform
                shape={lastAddedItem.product.illustration}
                tint={tint}
                uid={`toast-${lastAddedItem.id}`}
                neckMm={neckMm}
                weightG={lastAddedItem.weight}
                className="h-12 w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-display text-sm font-bold text-navy truncate">
                {lastAddedItem.product.name}
              </h4>
              <p className="text-xs text-slate mt-0.5 font-medium">
                {lastAddedItem.neckSize.replace(" MM", " mm")} &middot; {lastAddedItem.weight}g
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-slate tracking-wider">Qty:</span>
                <span className="font-mono text-xs font-bold text-navy">{lastAddedItem.quantity.toLocaleString()} kg</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                closeToast();
                setIsOpen(true);
              }}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-steel/80 bg-white py-2 text-xs font-bold text-navy shadow-sm transition-all hover:bg-cloud hover:border-navy active:scale-95 cursor-pointer"
            >
              <ShoppingBagIcon className="h-3.5 w-3.5" />
              View Cart ({itemCount})
            </button>
            <button
              onClick={() => {
                closeToast();
                setIsOpen(true);
              }}
              className="rounded-xl bg-sunrise py-2 text-xs font-bold text-white shadow-md shadow-sunrise/20 transition-all hover:-translate-y-0.5 active:scale-95 hover:shadow-lg hover:shadow-sunrise/25 cursor-pointer"
            >
              Send Enquiry
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
