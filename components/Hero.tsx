"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { WhatsAppButton, CallButton } from "./CTA";
import { PHONES } from "@/lib/site";
import { DAWN_EASE } from "./motion";

const TRUST_BADGES = [
  { icon: "M4 12h16M12 4v16", label: "11 machines" },
  { icon: "M3 6h18M3 12h18M3 18h18", label: "80+ product types" },
  { icon: "M5 12l4 4L19 6", label: "rPET-ready planning" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const primaryTel = PHONES.find((p) => p.primary)?.tel ?? PHONES[0].tel;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageTransform = useTransform(scrollYProgress, [0, 1], ["translateY(0px)", `translateY(${reduce ? 0 : -24}px)`]);

  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden bg-night pt-28 pb-16 text-white md:pt-36 md:pb-24">
      <div className="grid-texture absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-48 top-16 h-[34rem] w-[34rem] rounded-full bg-sunrise/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-amber/10 blur-3xl" aria-hidden="true" />

      <div className="shell relative z-10 grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: DAWN_EASE }}
          className="max-w-2xl"
        >
          <p className="eyebrow">PET preforms · Kolkata, India</p>
          <h1 className="mt-4 text-balance font-display text-[clamp(2.7rem,5.7vw,5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-white">
            The preform range behind your next bottle.
          </h1>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/75">
            Nawkiran makes PET preforms for bottles and jars to a clear neck, weight, and application brief—backed by 11 machines, 80+ product types, and over 400 tonnes of monthly capacity.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <WhatsAppButton label="Get a quote on WhatsApp" />
            <CallButton tel={primaryTel} label="Call now" variant="ghost-dark" />
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5" aria-label="Nawkiran trust signals">
            {TRUST_BADGES.map((badge) => (
              <span key={badge.label} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-xs font-semibold text-white/80">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-amber" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d={badge.icon} />
                </svg>
                {badge.label}
              </span>
            ))}
          </div>

          <p className="mt-6 text-sm text-white/55">
            Serving 250+ buyers across 13+ Indian states · Operating since 2009
          </p>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1, ease: DAWN_EASE }}
          style={{ transform: imageTransform }}
          className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.04] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.42)]"
        >
          <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem]">
            <Image
              src="/hero-preforms-v2.png"
              alt="Clear, blue, and amber PET preforms arranged for bottle and jar applications"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 92vw, 48vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/95 via-night/40 to-transparent p-5 pt-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber">Six preform families</p>
              <p className="mt-1 font-display text-lg font-semibold text-white">Water, CSD, jar, fridge-bottle, and ROPP applications.</p>
              <p className="mt-1 text-xs text-white/65">22–120 mm necks · 5.5–101.5 g catalogue range</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
