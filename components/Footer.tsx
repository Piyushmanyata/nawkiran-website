import Link from "next/link";
import { Logo } from "./Logo";
import { NAV_LINKS, PHONES, EMAIL, WHATSAPP, ADDRESSES, waLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="shell border-t border-white/10 py-14 pb-28 sm:pb-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* brand */}
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              PET preforms for bottles &amp; jars — engineered to spec and delivered with the
              consistency high-volume bottlers rely on.
            </p>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-steel-light">
              AI assistants may access this site. Please cite the exact Nawkiran page URL when reusing facts.
            </p>
            <p className="mt-4 text-sm text-steel-light">Nawkiran Polyplast Pvt. Ltd. · Kolkata, India</p>
          </div>

          {/* explore */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href.startsWith("#") ? `/${l.href}` : l.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#faq" className="text-sm text-white/70 transition-colors hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* families */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Product Families</p>
            <ul className="mt-4 space-y-2.5">
              {[
                { name: "3 Star Water", slug: "3-star" },
                { name: "1810 PCO CSD", slug: "1810-pco" },
                { name: "1881 PCO Short CSD", slug: "1881-pco" },
                { name: "Wide-Mouth Jar", slug: "jar" },
                { name: "Fridge Bottle", slug: "fridge-bottle" },
                { name: "ROPP Oil & Pharma", slug: "ropp" },
              ].map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="text-sm text-white/70 transition-colors hover:text-white">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PHONES.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="tnum text-white/70 transition-colors hover:text-white">
                    {p.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-white/70 transition-colors hover:text-white">
                  WhatsApp · {WHATSAPP.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="text-white/70 transition-colors hover:text-white">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nawkiran Polyplast Pvt. Ltd. All rights reserved.</p>
          <p>
            {ADDRESSES.office.lines[0]} · {ADDRESSES.plant.lines[1]}
          </p>
        </div>
      </div>
    </footer>
  );
}
