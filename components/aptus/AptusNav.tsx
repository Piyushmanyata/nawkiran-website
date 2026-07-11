"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { CompanySwitcher } from "@/components/CompanySwitcher";
import { PhoneIcon, ShoppingBagIcon, WhatsAppIcon } from "@/components/icons";
import { APTUS, APTUS_SITE_PATH, aptusWaLink } from "@/lib/aptus";
import { useAptusCart } from "./AptusCart";

const LINKS = [
  { label: "Products", href: `${APTUS_SITE_PATH}#products` },
  { label: "Capabilities", href: `${APTUS_SITE_PATH}#capabilities` },
  { label: "Contact", href: `${APTUS_SITE_PATH}#contact` },
];

export function AptusNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useAptusCart();
  const primaryPhone = APTUS.phones.find((phone) => phone.primary) ?? APTUS.phones[0];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
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

          <div className="hidden items-center gap-5 xl:flex">
            <CompanySwitcher current="aptus" />
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-slate hover:text-navy">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${primaryPhone.tel}`}
              className="hidden min-h-10 items-center gap-2 rounded-full border border-steel px-4 text-sm font-semibold text-navy hover:border-sunrise sm:inline-flex"
            >
              <PhoneIcon className="h-4 w-4" /> Call
            </a>
            <button
              type="button"
              onClick={handleCart}
              aria-label={`Open Aptus quote cart${itemCount ? `, ${itemCount} items` : ""}`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-steel text-navy hover:border-sunrise focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise"
            >
              <ShoppingBagIcon className="h-4.5 w-4.5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sunrise px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
            <a
              href={aptusWaLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Aptus Packaging LLP"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sunrise text-white shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise sm:w-auto sm:gap-2 sm:px-4"
            >
              <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
              <span className="sr-only sm:not-sr-only">WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-controls="aptus-mobile-menu"
              aria-label={menuOpen ? "Close Aptus menu" : "Open Aptus menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy hover:bg-cloud focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise xl:hidden"
            >
              <span aria-hidden="true" className="text-xl leading-none">{menuOpen ? "×" : "☰"}</span>
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div id="aptus-mobile-menu" className="border-t border-steel bg-white xl:hidden">
            <div className="shell flex max-h-[calc(100dvh-4.5rem)] flex-col gap-2 overflow-y-auto py-4">
              <CompanySwitcher current="aptus" onNavigate={() => setMenuOpen(false)} className="self-start" />
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-semibold text-navy hover:bg-cloud"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
