"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { AnimatedArc } from "./SunArc";
import { WhatsAppIcon, PhoneIcon, ShoppingBagIcon } from "./icons";
import { NAV_LINKS, PHONES, waLink } from "@/lib/site";
import { useCart } from "@/lib/cart";
import { CartDrawer } from "./CartDrawer";
import { AddedToCartToast } from "./AddedToCartToast";
import { CompanySwitcher } from "./CompanySwitcher";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const primaryTel = PHONES.find((p) => p.primary)?.tel ?? PHONES[0].tel;
  const { itemCount, toggleCart } = useCart();

  // RAF-throttled scroll listener
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 28);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  };
  const closeMenuForNavigation = () => setOpen(false);

  // Escape closes the normal expandable navigation and returns to its trigger.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const closeAtDesktop = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", closeAtDesktop);
    return () => window.removeEventListener("resize", closeAtDesktop);
  }, []);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const onDark = isHome && !scrolled;
  const showBg = !isHome || scrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,border-color] duration-200 ${
          showBg
            ? "border-b border-steel bg-white/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className={`shell flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap ${scrolled ? "py-2.5" : "py-4"}`}
        >
          {/* Brand lockup */}
          <Link href="/" className="flex items-center gap-2.5" aria-label="Nawkiran Polyplast — home">
            <AnimatedArc className="h-6 w-auto" pulse={!reduce} />
            <span className="font-display text-lg font-extrabold leading-none tracking-tight sm:text-xl">
              <span className={onDark ? "text-white" : "text-navy"}>NAW</span>
              <span className="text-sunrise">KIRAN</span>
            </span>
          </Link>

          <div className="order-3 basis-full sm:order-none sm:basis-auto">
            <CompanySwitcher current="nawkiran" />
          </div>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href.startsWith("#") ? `/${l.href}` : l.href}
                className={`text-[0.9375rem] font-medium transition-colors ${
                  onDark ? "text-white/80 hover:text-white" : "text-slate hover:text-navy"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTAs — always visible */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${primaryTel}`}
              className={`hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-[background-color,border-color,color] sm:inline-flex ${
                onDark ? "border border-white/25 text-white hover:bg-white/10" : "border border-steel text-navy hover:border-sunrise hover:text-sunrise-ink"
              }`}
            >
              <PhoneIcon className="h-4 w-4" />
              Call
            </a>

            {/* Cart toggle button */}
            <button
              type="button"
              onClick={toggleCart}
              className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-200 active:scale-95 cursor-pointer ${
                onDark
                  ? "border-white/25 text-white hover:bg-white/10"
                  : "border-steel text-navy hover:border-sunrise hover:text-sunrise-ink hover:bg-cloud"
              }`}
              aria-label="Open quote cart"
            >
              <ShoppingBagIcon className="h-4.5 w-4.5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-sunrise px-1 text-[9px] font-bold text-white shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Nawkiran Polyplast"
              title="WhatsApp Nawkiran Polyplast"
              className="group relative inline-flex items-center gap-2 rounded-full bg-sunrise px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(243,107,33,0.8)] transition-[transform,box-shadow,background-color] hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
              <span className="sr-only sm:not-sr-only">WhatsApp</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => (open ? closeMenu() : setOpen(true))}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden ${
                onDark ? "text-white hover:bg-white/10" : "text-navy hover:bg-cloud"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile sheet */}
      {open && (
          <nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="overflow-hidden border-b border-steel bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="shell flex flex-col gap-1 py-4">

              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href.startsWith("#") ? `/${l.href}` : l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-navy transition-colors hover:bg-cloud"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </nav>
      )}
      <CartDrawer />
      <AddedToCartToast />
    </header>
  );
}
