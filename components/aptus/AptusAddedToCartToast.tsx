"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAptusCart } from "./AptusCart";
import { AptusCatalogCrop } from "./AptusCatalogCrop";
import { ShoppingBagIcon } from "../icons";
import { aptusWaLink } from "@/lib/aptus";

export function AptusAddedToCartToast() {
  const { lastAddedItem, setLastAddedItem, openCart, itemCount } = useAptusCart();
  const DURATION = 6000; // 6 seconds auto-dismiss
  const TICK_RATE = 50;  // Update progress bar every 50ms
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const deadlineRef = useRef(0);
  const remainingRef = useRef(DURATION);
  const isHoveredRef = useRef(false);

  const closeToast = useCallback(() => {
    setLastAddedItem(null);
  }, [setLastAddedItem]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimers = useCallback(() => {
    clearTimer();
    deadlineRef.current = Date.now() + remainingRef.current;
    intervalRef.current = setInterval(() => {
      if (isHoveredRef.current) return;
      const remaining = deadlineRef.current - Date.now();
      if (remaining <= 0) {
        setProgress(0);
        clearTimer();
        closeToast();
        return;
      }
      setProgress((remaining / DURATION) * 100);
    }, TICK_RATE);
  }, [clearTimer, closeToast]);

  const pauseTimers = useCallback(() => {
    remainingRef.current = Math.max(0, deadlineRef.current - Date.now());
    clearTimer();
  }, [clearTimer]);

  useEffect(() => {
    if (lastAddedItem) {
      remainingRef.current = DURATION;
      setProgress(100);
      isHoveredRef.current = false;
      startTimers();
    } else {
      clearTimer();
    }

    return () => {
      clearTimer();
    };
  }, [lastAddedItem, startTimers, clearTimer]);

  if (!lastAddedItem) return null;

  const { variant, packCount } = lastAddedItem;

  // Classify correct catalog slug for image rendering
  let slug: "cosmetic-bottles" | "pharma-bottles" | "plastic-closures" = "plastic-closures";
  if (variant.kind === "bottle") {
    if (variant.capacityMl <= 100 || variant.item.includes("OVAL") || variant.item.includes("BOSTON")) {
      slug = "cosmetic-bottles";
    } else {
      slug = "pharma-bottles";
    }
  }

  const name = variant.kind === "bottle" ? `${variant.item} Bottle` : variant.product;
  const spec = variant.kind === "bottle"
    ? `${variant.capacityMl} ml · ${variant.neckSizeMm} mm`
    : `${variant.sizeMm} mm · ${variant.weightG} g`;

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        aria-live="polite"
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
        className="fixed top-20 right-4 sm:right-6 z-[60] w-full max-w-[390px] overflow-hidden rounded-2xl border border-steel/85 bg-white/95 shadow-[0_12px_30px_rgba(11,27,58,0.12)] backdrop-blur-xl pointer-events-auto"
      >
        {/* Progress bar sleeve — blue in Aptus theme */}
        <div className="h-1.5 w-full bg-mist">
          <div
            className="h-full bg-sunrise transition-all ease-linear"
            style={{ width: `${progress}%`, transitionDuration: `${TICK_RATE}ms` }}
          />
        </div>

        <div className="p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sunrise text-white shadow-sm">
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

          {/* Product details */}
          <div className="mt-3 flex gap-3.5 rounded-xl border border-steel/45 bg-cloud/30 p-2.5">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-dawn overflow-hidden ring-1 ring-steel/15 shadow-inner">
              <AptusCatalogCrop slug={slug} />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-display text-sm font-bold text-navy truncate">
                {name}
              </h4>
              <p className="text-xs text-slate mt-0.5 font-medium">
                {spec}
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-slate tracking-wider">Qty:</span>
                <span className="font-mono text-xs font-bold text-navy">{packCount.toLocaleString()} pack{packCount === 1 ? "" : "s"}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                closeToast();
                openCart();
              }}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-steel bg-white py-2 text-xs font-bold text-navy shadow-sm transition-all hover:bg-cloud hover:border-navy active:scale-95 cursor-pointer"
            >
              <ShoppingBagIcon className="h-3.5 w-3.5" />
              View Cart ({itemCount})
            </button>
            <button
              onClick={() => {
                closeToast();
                const desc = variant.kind === "bottle"
                  ? `${variant.item} · ${variant.capacityMl} ml · ${variant.neckSizeMm} mm`
                  : `${variant.product} · ${variant.sizeMm} mm`;
                const msg = `*Enquiry from Aptus Packaging LLP*\n\n*Added:* ${desc}\n*Qty:* ${packCount.toLocaleString()} pack(s)\n\nPlease provide pricing and availability.`;
                window.open(aptusWaLink(msg), "_blank", "noopener,noreferrer");
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
