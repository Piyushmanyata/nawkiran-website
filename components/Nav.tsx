"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AnimatedArc } from "./SunArc";
import { WhatsAppIcon, PhoneIcon } from "./icons";
import { NAV_LINKS, PHONES, waLink } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const primaryTel = PHONES.find((p) => p.primary)?.tel ?? PHONES[0].tel;

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

  const onDark = !scrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-steel bg-white/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className={`shell flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? "py-2.5" : "py-4"}`}>
          {/* Brand lockup */}
          <a href="#top" className="flex items-center gap-2.5" aria-label="Nawkiran Polyplast — home">
            <AnimatedArc className="h-6 w-auto" pulse={!reduce} />
            <span className="font-display text-lg font-extrabold leading-none tracking-tight sm:text-xl">
              <span className={onDark ? "text-white" : "text-navy"}>NAW</span>
              <span className="text-sunrise">KIRAN</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
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
              className={`hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all sm:inline-flex ${
                onDark ? "border border-white/25 text-white hover:bg-white/10" : "border border-steel text-navy hover:border-sunrise hover:text-sunrise"
              }`}
            >
              <PhoneIcon className="h-4 w-4" />
              Call
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-full bg-sunrise px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(243,107,33,0.8)] transition-all hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
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
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-steel bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="shell flex flex-col gap-1 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-navy transition-colors hover:bg-cloud"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
