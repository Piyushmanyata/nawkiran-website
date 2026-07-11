"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CompanySwitcher } from "@/components/CompanySwitcher";
import { PhoneIcon, ShoppingBagIcon, WhatsAppIcon } from "@/components/icons";
import { APTUS, APTUS_SITE_PATH, aptusWaLink } from "@/lib/aptus";
import { DAWN_EASE } from "@/components/motion";
import { useAptusCart } from "./AptusCart";

const LINKS = [
  { label: "Products", href: `${APTUS_SITE_PATH}#products` },
  { label: "Capabilities", href: `${APTUS_SITE_PATH}#capabilities` },
  { label: "Contact", href: `${APTUS_SITE_PATH}#contact` },
];

const menuVariants = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: "auto",
    transition: { height: { duration: 0.3, ease: DAWN_EASE }, opacity: { duration: 0.2 }, staggerChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { height: { duration: 0.25, ease: DAWN_EASE }, opacity: { duration: 0.15 } },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 26 } as const },
  exit: { opacity: 0, y: -6, transition: { duration: 0.12 } },
};

export function AptusNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useAptusCart();
  const primaryPhone = APTUS.phones.find((phone) => phone.primary) ?? APTUS.phones[0];

  // Lock body scroll when menu is open
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function handleCart(event: MouseEvent<HTMLButtonElement>) {
    openCart(event.currentTarget);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-steel bg-white/90 backdrop-blur-xl">
        <nav className="shell flex min-h-[4.5rem] items-center justify-between gap-3" aria-label="Aptus primary">
          <Link
            href={APTUS_SITE_PATH}
            aria-label="Aptus Packaging LLP home"
            className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sunrise"
          >
            <span className="inline-flex h-9 min-w-11 items-center justify-center rounded-lg bg-night px-2 font-display text-sm font-extrabold tracking-wide text-white">
              APTUS
            </span>
            <span className="hidden font-display text-base font-extrabold text-navy sm:inline">
              Packaging LLP
            </span>
          </Link>

          <CompanySwitcher current="aptus" className="hidden xl:inline-flex" />

          <div className="hidden items-center gap-5 xl:flex">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-slate hover:text-navy transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${primaryPhone.tel}`}
              className="hidden min-h-10 items-center gap-2 rounded-full border border-steel px-4 text-sm font-semibold text-navy hover:border-sunrise transition-colors sm:inline-flex"
            >
              <PhoneIcon className="h-4 w-4" /> Call
            </a>
            <button
              type="button"
              onClick={handleCart}
              aria-label={`Open Aptus quote cart${itemCount ? `, ${itemCount} items` : ""}`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-steel text-navy hover:border-sunrise transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise"
            >
              <ShoppingBagIcon className="h-4.5 w-4.5" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sunrise px-1 text-[10px] font-bold text-white"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <a
              href={aptusWaLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Aptus Packaging LLP"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sunrise text-white shadow-lg transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise sm:w-auto sm:gap-2 sm:px-4"
            >
              <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
              <span className="sr-only sm:not-sr-only">WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="aptus-mobile-menu"
              aria-label={menuOpen ? "Close Aptus menu" : "Open Aptus menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy hover:bg-cloud transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise xl:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </nav>

        {/* Animated mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="aptus-mobile-menu"
              variants={menuVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="overflow-hidden border-t border-steel bg-white xl:hidden"
            >
              <div className="shell flex flex-col gap-1 py-4">
                <CompanySwitcher current="aptus" onNavigate={() => setMenuOpen(false)} className="self-start mb-2" />
                {LINKS.map((link) => (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-3 py-3 text-base font-semibold text-navy hover:bg-cloud transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
