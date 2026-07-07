"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart, type CartItem, QTY_STEP, QTY_MIN, QTY_MAX } from "@/lib/cart";
import { Preform } from "./Preform";
import { PRODUCT_TINT, primaryNeckMm, formatNeck } from "@/lib/products";
import { WhatsAppIcon, Plus } from "./icons";
import { waLink } from "@/lib/site";

// Subcomponent for cart items to support smooth exit transitions
function CartItemRow({
  item,
  onUpdateQty,
  onRemove,
}: {
  item: CartItem;
  onUpdateQty: (id: string, q: number) => void;
  onRemove: (id: string) => void;
}) {
  const tint = PRODUCT_TINT[item.product.id] || "clear";
  const neckMm = primaryNeckMm(item.neckSize);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26 }}
      className="flex items-center gap-4 rounded-xl border border-steel/60 bg-white p-3 shadow-[0_2px_8px_rgba(22,40,77,0.02)] transition-shadow hover:shadow-[0_4px_12px_rgba(22,40,77,0.06)]"
    >
      {/* Small preform rendering */}
      <div className="relative flex h-20 w-14 shrink-0 items-center justify-center rounded-lg bg-night overflow-hidden">
        <span className="grid-texture absolute inset-0 opacity-20" />
        <Preform
          shape={item.product.illustration}
          tint={tint}
          uid={`cart-row-${item.id}`}
          neckMm={neckMm}
          weightG={item.weight}
          className="h-16 w-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
        />
      </div>

      {/* Item info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-display text-sm font-bold text-navy truncate">
          {item.product.name} Preform
        </h4>
        <p className="text-xs text-slate font-medium mt-0.5">
          {formatNeck(item.neckSize)} &middot; {item.weight}g
        </p>

        {/* Quantity editor */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center rounded-lg border border-steel bg-cloud/50 p-0.5">
            <button
              type="button"
              onClick={() => onUpdateQty(item.id, Math.max(QTY_MIN, item.quantity - QTY_STEP))}
              className="flex h-6 w-6 items-center justify-center rounded text-navy transition-colors hover:bg-steel/40 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={item.quantity <= QTY_MIN}
              aria-label="Decrease quantity"
            >
              &minus;
            </button>
            <span className="tnum px-2.5 text-xs font-semibold text-navy min-w-[2.5rem] text-center">
              {item.quantity.toLocaleString()}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQty(item.id, Math.min(QTY_MAX, item.quantity + QTY_STEP))}
              className="flex h-6 w-6 items-center justify-center rounded text-navy transition-colors hover:bg-steel/40 cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="text-xs font-semibold uppercase text-slate tracking-wider">
            {item.unit}
          </span>
        </div>
      </div>

      {/* Remove button */}
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="text-slate/70 transition-colors hover:text-sunrise p-1.5 rounded-lg hover:bg-cloud"
        aria-label="Remove item"
      >
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </motion.div>
  );
}

export function CartDrawer() {
  const { isOpen, setIsOpen, items, updateQuantity, removeItem, clearCart, itemCount, totalKgs } = useCart();

  // Customer info form inputs
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Load customer details from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("nawkiran_cust_name") || "";
    setName(savedName);
    setCompany(localStorage.getItem("nawkiran_cust_company") || "");
    setState(localStorage.getItem("nawkiran_cust_state") || "");
    if (!savedName) {
      setShowForm(true);
    }
  }, []);

  // Save details on change
  const handleNameChange = (val: string) => {
    setName(val);
    localStorage.setItem("nawkiran_cust_name", val);
  };
  const handleCompanyChange = (val: string) => {
    setCompany(val);
    localStorage.setItem("nawkiran_cust_company", val);
  };
  const handleStateChange = (val: string) => {
    setState(val);
    localStorage.setItem("nawkiran_cust_state", val);
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Construct structured WhatsApp message and open link
  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let message = `*Enquiry from Nawkiran Polyplast Website*\n\n`;

    if (name || company || state) {
      message += `*Customer Details:*\n`;
      if (name) message += `• Name: ${name}\n`;
      if (company) message += `• Company: ${company}\n`;
      if (state) message += `• State: ${state}\n`;
      message += `\n`;
    }

    message += `*Requested Specifications:*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} (${formatNeck(item.neckSize)} / ${item.weight}g)\n`;
      message += `   - Quantity: ${item.quantity.toLocaleString()} ${item.unit.toUpperCase()}\n`;
    });

    message += `\nPlease provide bulk pricing, availability, and dispatch timeline for these specifications.`;

    const link = waLink(message);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-night/50 backdrop-blur-[4px]"
          />

          {/* Sliding Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex h-full w-full max-w-[420px] flex-col border-l border-steel bg-cloud shadow-2xl text-navy"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-steel bg-white px-5 py-4.5">
              <div>
                <h3 className="font-display text-lg font-extrabold text-navy">
                  Your Enquiry Cart
                </h3>
                <p className="text-xs text-slate font-medium mt-0.5">
                  {itemCount} distinct spec{itemCount !== 1 ? "s" : ""} added
                </p>
              </div>
              <div className="flex items-center gap-3">
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs font-semibold text-slate hover:text-sunrise transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-steel bg-white text-navy hover:bg-cloud hover:border-navy transition-all"
                  aria-label="Close cart"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[60%] text-center px-4">
                  <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-mist text-sunrise/80">
                    <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="absolute -right-1 -top-1 rounded-full bg-sunrise px-2 py-0.5 text-[10px] font-bold text-white shadow-md"
                    >
                      Empty
                    </motion.div>
                  </div>
                  <h4 className="font-display text-base font-bold text-navy">No products in cart</h4>
                  <p className="mt-2 text-xs text-slate leading-relaxed">
                    Select your neck size and gram weight from our catalog to add multiple preforms.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="mt-6 inline-flex rounded-full bg-navy px-5 py-2.5 text-xs font-semibold text-white hover:bg-sunrise transition-colors"
                  >
                    Browse Specifications
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="space-y-3">
                    <AnimatePresence initial={false} mode="popLayout">
                      {items.map((item) => (
                        <CartItemRow
                          key={item.id}
                          item={item}
                          onUpdateQty={updateQuantity}
                          onRemove={removeItem}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Customer Information Form */}
                  <div className="rounded-xl border border-steel/60 bg-white p-4 shadow-[0_2px_8px_rgba(22,40,77,0.02)]">
                    <button
                      type="button"
                      onClick={() => setShowForm((prev) => !prev)}
                      className="flex w-full items-center justify-between font-display text-xs font-bold text-navy"
                    >
                      <span>CUSTOMER DETAILS &middot; OPTIONAL</span>
                      <span className="text-sunrise text-[10px] font-semibold">
                        {showForm ? "HIDE" : "SHOW"}
                      </span>
                    </button>

                    <AnimatePresence>
                      {showForm && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-3.5 space-y-3"
                        >
                          <div>
                            <label htmlFor="cust_name" className="block text-[10px] font-bold text-slate uppercase tracking-wider">
                              Your Name
                            </label>
                            <input
                              type="text"
                              id="cust_name"
                              value={name}
                              onChange={(e) => handleNameChange(e.target.value)}
                              placeholder="e.g. Rahul Sharma"
                              className="mt-1 block w-full rounded-lg border border-steel bg-cloud px-3 py-2 text-sm text-navy placeholder-slate/50 focus:border-sunrise focus:bg-white focus:outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label htmlFor="cust_company" className="block text-[10px] font-bold text-slate uppercase tracking-wider">
                              Company Name
                            </label>
                            <input
                              type="text"
                              id="cust_company"
                              value={company}
                              onChange={(e) => handleCompanyChange(e.target.value)}
                              placeholder="e.g. Pure Water Bottlers"
                              className="mt-1 block w-full rounded-lg border border-steel bg-cloud px-3 py-2 text-sm text-navy placeholder-slate/50 focus:border-sunrise focus:bg-white focus:outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label htmlFor="cust_state" className="block text-[10px] font-bold text-slate uppercase tracking-wider">
                              State (Delivery Destination)
                            </label>
                            <input
                              type="text"
                              id="cust_state"
                              value={state}
                              onChange={(e) => handleStateChange(e.target.value)}
                              placeholder="e.g. West Bengal"
                              className="mt-1 block w-full rounded-lg border border-steel bg-cloud px-3 py-2 text-sm text-navy placeholder-slate/50 focus:border-sunrise focus:bg-white focus:outline-none transition-all"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>

            {/* Footer Checkout Panel */}
            {items.length > 0 && (
              <div className="border-t border-steel bg-white p-5 space-y-4">
                <div className="flex items-center justify-between text-navy">
                  <span className="text-sm font-semibold text-slate">Total Quantity</span>
                  <span className="tnum text-base font-bold">
                    {totalKgs.toLocaleString()}&nbsp;kg
                  </span>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-sunrise to-amber opacity-60 blur transition-all duration-300 group-hover:opacity-100" />
                  <button
                    type="button"
                    onClick={handleWhatsAppCheckout}
                    className="relative flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#e8531a] to-[#f09210] py-3.5 text-sm font-bold text-white shadow-lg transition-transform active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Request Quote on WhatsApp
                  </button>
                </div>
                <p className="text-center text-[10px] font-mono text-slate">
                  Opens WhatsApp &bull; Typically responds in minutes
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
