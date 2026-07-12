"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  aptusBottleVariants,
  aptusClosureVariants,
  aptusWaLink,
  MAX_APTUS_PACKS,
  normalizeAptusPackCount,
  type AptusBottleVariant,
  type AptusClosureVariant,
  type AptusFamilySlug,
} from "@/lib/aptus";

const STORAGE_KEY = "aptus_cart_v1";

export type AptusVariant = AptusBottleVariant | AptusClosureVariant;

type AptusCartItem = {
  variant: AptusVariant;
  packCount: number;
  familySlug: AptusFamilySlug;
};

type AptusCartContextValue = {
  items: AptusCartItem[];
  itemCount: number;
  totalPieces: number;
  addItem: (variant: AptusVariant, packCount: number, familySlug: AptusFamilySlug) => void;
  updatePackCount: (variantId: string, packCount: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  openCart: (trigger?: HTMLElement | null) => void;
  lastAddedItem: AptusCartItem | null;
  setLastAddedItem: (item: AptusCartItem | null) => void;
};

const AptusCartContext = createContext<AptusCartContextValue | null>(null);
const variantById = new Map<string, AptusVariant>(
  [...aptusBottleVariants, ...aptusClosureVariants].map((variant) => [variant.id, variant]),
);

function defaultFamilySlug(variant: AptusVariant): AptusFamilySlug {
  return variant.kind === "closure" ? "plastic-closures" : "cosmetic-bottles";
}

function isFamilySlugForVariant(variant: AptusVariant, value: unknown): value is AptusFamilySlug {
  return variant.kind === "closure"
    ? value === "plastic-closures"
    : value === "cosmetic-bottles" || value === "pharma-bottles";
}

function validPackCount(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0 && value <= MAX_APTUS_PACKS;
}

function readStoredItems(): AptusCartItem[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];

  try {
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new Error("Cart is not an array");

    const merged = new Map<string, { packCount: number; familySlug: AptusFamilySlug }>();
    for (const entry of parsed) {
      if (!entry || typeof entry !== "object") throw new Error("Invalid cart row");
      const { variantId, packCount, familySlug } = entry as Record<string, unknown>;
      const variant = typeof variantId === "string" ? variantById.get(variantId) : undefined;
      if (!variant || !validPackCount(packCount)) {
        throw new Error("Invalid cart row");
      }
      const selectedFamily = isFamilySlugForVariant(variant, familySlug)
        ? familySlug
        : defaultFamilySlug(variant);
      const existing = merged.get(variant.id);
      merged.set(variant.id, {
        packCount: Math.min(MAX_APTUS_PACKS, (existing?.packCount ?? 0) + packCount),
        familySlug: selectedFamily,
      });
    }

    return [...merged].map(([variantId, { packCount, familySlug }]) => {
      const variant = variantById.get(variantId)!;
      return { variant, packCount, familySlug };
    });
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

function describeVariant(variant: AptusVariant) {
  return variant.kind === "bottle"
    ? `${variant.item} · ${variant.capacityMl} ml · ${variant.neckSizeMm} mm neck · ${variant.weightG} g`
    : `${variant.product} · ${variant.sizeMm} mm · ${variant.weightG} g`;
}

export function AptusCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<AptusCartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [lastAddedItem, setLastAddedItem] = useState<AptusCartItem | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setItems(readStoredItems());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items.map(({ variant, packCount, familySlug }) => ({ variantId: variant.id, packCount, familySlug }))),
    );
  }, [items, ready]);

  function addItem(variant: AptusVariant, requestedPacks: number, familySlug: AptusFamilySlug) {
    const packCount = normalizeAptusPackCount(requestedPacks);
    const selectedFamily = isFamilySlugForVariant(variant, familySlug)
      ? familySlug
      : defaultFamilySlug(variant);
    setItems((current) => {
      const existing = current.find((item) => item.variant.id === variant.id);
      if (!existing) return [...current, { variant, packCount, familySlug: selectedFamily }];
      return current.map((item) =>
        item.variant.id === variant.id
          ? {
              ...item,
              packCount: Math.min(MAX_APTUS_PACKS, item.packCount + packCount),
              familySlug: selectedFamily,
            }
          : item,
      );
    });
    setLastAddedItem({ variant, packCount, familySlug: selectedFamily });
    setAnnouncement(`${describeVariant(variant)} added to the Aptus enquiry cart.`);
  }

  function updatePackCount(variantId: string, packCount: number) {
    if (!Number.isFinite(packCount) || packCount <= 0) return;
    const normalizedPackCount = normalizeAptusPackCount(packCount);
    setItems((current) =>
      current.map((item) => (
        item.variant.id === variantId ? { ...item, packCount: normalizedPackCount } : item
      )),
    );
  }

  function removeItem(variantId: string) {
    setItems((current) => current.filter((item) => item.variant.id !== variantId));
    setLastAddedItem((item) => (item?.variant.id === variantId ? null : item));
  }

  function clearCart() {
    setItems([]);
    setLastAddedItem(null);
  }

  function openCart(trigger?: HTMLElement | null) {
    triggerRef.current = trigger ?? document.querySelector<HTMLElement>("[data-aptus-cart-trigger]");
    setOpen(true);
  }

  const value = useMemo<AptusCartContextValue>(
    () => ({
      items,
      itemCount: items.length,
      totalPieces: items.reduce(
        (total, item) => total + item.packCount * item.variant.packingSize,
        0,
      ),
      addItem,
      updatePackCount,
      removeItem,
      clearCart,
      openCart,
      lastAddedItem,
      setLastAddedItem,
    }),
    [items, lastAddedItem],
  );

  return (
    <AptusCartContext.Provider value={value}>
      {children}
      <AptusCartDrawer
        open={open}
        onClose={() => setOpen(false)}
        returnFocus={() => {
          if (triggerRef.current?.isConnected) triggerRef.current.focus();
        }}
      />
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </AptusCartContext.Provider>
  );
}

export function useAptusCart() {
  const context = useContext(AptusCartContext);
  if (!context) throw new Error("useAptusCart must be used inside AptusCartProvider");
  return context;
}

function AptusCartDrawer({
  open,
  onClose,
  returnFocus,
}: {
  open: boolean;
  onClose: () => void;
  returnFocus: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { items, totalPieces, updatePackCount, removeItem, clearCart } = useAptusCart();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      onClose();
      returnFocus();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose, returnFocus]);

  const message = [
    "Hello Aptus Packaging LLP, I would like a quote for:",
    ...items.map(({ variant, packCount }) => {
      const pieces = packCount * variant.packingSize;
      return `• ${describeVariant(variant)} — ${packCount} box${packCount === 1 ? "" : "es"} × ${variant.packingSize.toLocaleString("en-IN")} pcs = ${pieces.toLocaleString("en-IN")} pcs`;
    }),
    "Please share pricing and availability. Thank you.",
  ].join("\n");

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="aptus-cart-title"
      className="m-0 ml-auto h-dvh w-full max-w-md overflow-hidden bg-white p-0 text-navy shadow-2xl backdrop:bg-night/70"
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-steel px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sunrise">Aptus enquiry</p>
            <h2 id="aptus-cart-title" className="font-display text-xl font-bold text-navy">
              Quote cart
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close Aptus quote cart"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-steel text-xl hover:border-sunrise focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-steel bg-cloud p-6 text-center">
              <p className="font-display font-semibold">Your Aptus cart is empty.</p>
              <p className="mt-2 text-sm text-slate">Add a catalog specification to prepare an enquiry.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ variant, packCount }) => {
                const inputId = `aptus-boxes-${variant.id}`;
                return (
                  <li key={variant.id} className="rounded-2xl border border-steel p-4">
                    <p className="font-display text-sm font-bold text-navy">{describeVariant(variant)}</p>
                    <p className="mt-1 text-xs text-slate">
                      {variant.packingSize.toLocaleString("en-IN")} pieces per box
                    </p>
                    <div className="mt-4 flex items-end justify-between gap-3">
                      <div>
                        <label htmlFor={inputId} className="block text-xs font-semibold text-slate">
                          Boxes
                        </label>
                        <input
                          id={inputId}
                          type="number"
                          min={1}
                          max={MAX_APTUS_PACKS}
                          step={1}
                          inputMode="numeric"
                          value={packCount}
                          onChange={(event) => updatePackCount(variant.id, Number(event.target.value))}
                          className="mt-1 h-11 w-24 rounded-lg border border-steel px-3 font-mono text-sm focus:border-sunrise focus:outline-none"
                        />
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate">Total pieces</p>
                        <p className="font-display font-bold text-navy">
                          {(packCount * variant.packingSize).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(variant.id)}
                      className="mt-3 min-h-8 text-sm font-semibold text-sunrise underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise"
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-steel bg-cloud px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] pt-4">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-slate">Combined pieces</span>
            <strong className="font-display text-lg text-navy">{totalPieces.toLocaleString("en-IN")}</strong>
          </div>
          <a
            href={items.length ? aptusWaLink(message) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={items.length === 0}
            className={`flex min-h-12 w-full items-center justify-center rounded-full px-5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise ${
              items.length ? "bg-sunrise hover:bg-sunrise-dark" : "pointer-events-none bg-slate/40"
            }`}
          >
            Send enquiry on WhatsApp
          </a>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="mt-3 min-h-8 w-full text-sm font-semibold text-slate hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise"
            >
              Clear Aptus cart
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
}
