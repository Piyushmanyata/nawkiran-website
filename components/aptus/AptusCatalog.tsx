"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import aptusCatalog from "../../Aptus Catalog.png";
import { ArrowRight, MailIcon, MapPin, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { APTUS, APTUS_SITE_PATH, aptusFamilies, aptusWaLink } from "@/lib/aptus";
import { AptusCatalogCrop } from "./AptusCatalogCrop";
import { Reveal, Stagger, StaggerItem, DAWN_EASE } from "@/components/motion";

export function AptusCatalog() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-night pb-20 pt-32 text-white md:pb-28 md:pt-40">
        <div className="grid-texture absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-48 -top-48 h-[42rem] w-[42rem] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-sunrise), transparent 68%)" }}
          aria-hidden="true"
        />
        <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: DAWN_EASE }}
            >
              Aptus Packaging LLP · West Bengal
            </motion.p>
            <motion.h1
              className="mt-4 max-w-3xl text-balance font-display text-[clamp(2.6rem,5.4vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-white"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: DAWN_EASE }}
            >
              Bottles and closures, made at industrial scale.
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5, ease: DAWN_EASE }}
            >
              Pharma bottles, cosmetic PET bottles, and compression-moulded water closures—with exact catalog specifications and pack-based enquiries.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65, ease: DAWN_EASE }}
            >
              <a
                href="#products"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sunrise px-6 text-sm font-semibold text-white shadow-lg hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-transform"
              >
                Browse product families <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={aptusWaLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                <WhatsAppIcon className="h-5 w-5" /> Enquire on WhatsApp
              </a>
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: DAWN_EASE }}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={aptusCatalog}
                alt="Aptus Packaging LLP official catalog showing company details and product categories"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover object-top"
              />
            </div>
            <p className="border-t border-steel bg-white px-4 py-3 text-xs font-medium text-slate">
              Product information sourced from the official Aptus catalog.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Claims strip ── */}
      <section className="bg-dawn">
        <div className="shell section">
          <Stagger
            className="grid gap-px overflow-hidden rounded-2xl border border-steel bg-steel sm:grid-cols-3"
            gap={0.08}
          >
            {APTUS.claims.map((claim) => (
              <StaggerItem key={claim.label} className="bg-dawn p-6 sm:p-8">
                <p className="font-display text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold leading-tight text-navy">
                  {claim.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate">{claim.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Product families ── */}
      <section id="products" className="scroll-mt-24 bg-white">
        <div className="shell section">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Official catalogue</p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.25rem)]">Choose the Aptus range you need.</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              Cosmetic and pharma bottle pages share the complete verified bottle table from the brochure. Closures use their own size and weight specifications.
            </p>
          </Reveal>

          <Stagger className="mt-10 grid gap-5 lg:grid-cols-3" gap={0.1}>
            {aptusFamilies.map((family) => (
              <StaggerItem key={family.slug}>
                <Link
                  href={`${APTUS_SITE_PATH}/products/${family.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-steel bg-cloud transition-all hover:-translate-y-1 hover:border-sunrise hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sunrise"
                >
                  <div className="aspect-[16/10] overflow-hidden border-b border-steel">
                    <AptusCatalogCrop slug={family.slug} />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sunrise">
                      {family.variants.length} catalog specifications
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-navy">{family.name}</h3>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy">
                      View specifications
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section id="capabilities" className="scroll-mt-24 bg-night text-white">
        <div className="shell section grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Inside the plant</p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.25rem)] text-white">Advanced machines. Repeatable output.</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Aptus uses five single-stage ASB machines for pharma, cosmetic, and oil-industry bottles, alongside SACMI compression-moulding equipment for water closures.
            </p>
          </Reveal>
          <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2" gap={0.08}>
            {APTUS.qualities.map((quality) => (
              <StaggerItem key={quality} className="bg-night p-6 sm:p-8">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sunrise/15 font-bold text-sunrise" aria-hidden="true">✓</span>
                <p className="mt-4 font-display text-lg font-semibold text-white">{quality}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="scroll-mt-24 bg-dawn">
        <div className="shell section">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <p className="eyebrow">Contact Aptus</p>
              <h2 className="mt-3 text-[clamp(2rem,4vw,3.25rem)]">Send exact specifications in one message.</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate">
                Build a pack-based quote cart from any family page, or contact Aptus directly.
              </p>
              <a
                href={aptusWaLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-sunrise px-6 text-sm font-semibold text-white shadow-lg hover:-translate-y-0.5 transition-transform"
              >
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp {APTUS.whatsapp.display}
              </a>
            </Reveal>

            <Stagger className="grid gap-4 sm:grid-cols-2 content-start" gap={0.1}>
              <StaggerItem className="rounded-3xl border border-steel bg-white p-6">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-sunrise">
                  <PhoneIcon className="h-4 w-4" /> Call or email
                </p>
                <div className="mt-4 space-y-2">
                  {APTUS.phones.map((phone) => (
                    <a key={phone.tel} href={`tel:${phone.tel}`} className="tnum block text-base font-semibold text-navy hover:text-sunrise">
                      {phone.label}
                    </a>
                  ))}
                  <a href={`mailto:${APTUS.email}`} className="flex items-center gap-2 pt-2 text-sm text-slate hover:text-navy">
                    <MailIcon className="h-4 w-4" /> {APTUS.email}
                  </a>
                </div>
              </StaggerItem>
              {Object.values(APTUS.addresses).map((address) => (
                <StaggerItem key={address.label} className="rounded-3xl border border-steel bg-white p-6">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-sunrise">
                    <MapPin className="h-4 w-4" /> {address.label}
                  </p>
                  <address className="mt-4 not-italic text-sm leading-relaxed text-slate">
                    {address.lines.map((line) => <span key={line} className="block">{line}</span>)}
                  </address>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>
    </>
  );
}
