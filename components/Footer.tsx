import Link from "next/link";
import { Logo } from "./Logo";
import { NAV_LINKS, PHONES, EMAIL, WHATSAPP, ADDRESSES, waLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-night text-white">
      {/* Sunrise accent line at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-sunrise/60 to-transparent" aria-hidden="true" />

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

            {/* WhatsApp quick-link */}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-whatsapp" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp us
            </a>
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
            </ul>
          </div>

          {/* families */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Product Families</p>
            <ul className="mt-4 space-y-2.5">
              {[
                { name: "3 Start/Alaska Water", slug: "3-start-alaska" },
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
