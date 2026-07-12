import Link from "next/link";
import { APTUS, APTUS_SITE_PATH, aptusFamilies, aptusWaLink } from "@/lib/aptus";

export function AptusFooter() {
  return (
    <footer className="bg-night text-white">
      <div className="shell border-t border-white/10 py-12 pb-28 sm:pb-12">
        <div className="grid gap-10 md:grid-cols-[1.35fr_1fr_1fr]">
          <div>
            <div className="inline-flex rounded-lg bg-white px-3 py-2 font-display text-sm font-extrabold tracking-wide text-night">
              APTUS
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Cosmetic PET bottles, pharma bottles, and compression-moulded plastic closures from West Bengal.
            </p>
            <p className="mt-4 text-sm text-white/55">{APTUS.name} · Kolkata, India</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Product families</p>
            <ul className="mt-4 space-y-2.5">
              {aptusFamilies.map((family) => (
                <li key={family.slug}>
                  <Link
                    href={`${APTUS_SITE_PATH}/products/${family.slug}`}
                    className="text-sm text-white/70 hover:text-white"
                  >
                    {family.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`${APTUS_SITE_PATH}/faq`} className="text-sm text-white/70 hover:text-white">FAQ</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {APTUS.phones.map((phone) => (
                <li key={phone.tel}>
                  <a href={`tel:${phone.tel}`} className="tnum text-white/70 hover:text-white">
                    {phone.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${APTUS.email}`} className="text-white/70 hover:text-white">
                  {APTUS.email}
                </a>
              </li>
              <li>
                <a href={aptusWaLink()} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                  WhatsApp · {APTUS.whatsapp.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {APTUS.name}. All rights reserved.</p>
          <Link href="/" className="hover:text-white">Visit Nawkiran Polyplast</Link>
        </div>
      </div>
    </footer>
  );
}
