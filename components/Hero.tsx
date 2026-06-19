"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { WhatsAppButton, CallButton } from "./CTA";
import { PHONES } from "@/lib/site";
import { DAWN_EASE } from "./motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const primaryTel = PHONES.find((p) => p.primary)?.tel ?? PHONES[0].tel;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sunY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const preY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -36]);
  const neckDetailY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -110]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);

  const stars = [
    [12, 22], [20, 14], [28, 30], [8, 40], [33, 18], [17, 33], [40, 12], [6, 26],
  ];

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-night pt-24 pb-16">
      {/* faint grid + stars */}
      <div className="grid-texture absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true">
        {stars.map(([l, t], i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-white/40"
            style={{ left: `${l}%`, top: `${t}%` }}
          />
        ))}
      </div>

      {/* sunrise ray-burst */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[78%] h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2"
        style={{
          y: sunY,
          background:
            "repeating-conic-gradient(from 0deg at 50% 50%, rgba(245,158,31,0.11) 0deg 5deg, transparent 5deg 24deg)",
          maskImage: "radial-gradient(closest-side, rgba(0,0,0,0.9), transparent 72%)",
          WebkitMaskImage: "radial-gradient(closest-side, rgba(0,0,0,0.9), transparent 72%)",
        }}
        initial={reduce ? { opacity: 0.25 } : { opacity: 0 }}
        animate={{ opacity: 0.28 }}
        transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
      />

      {/* rising sun */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[80%] h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full lg:left-[62%]"
        style={{
          y: sunY,
          background:
            "radial-gradient(circle at 50% 50%, #FBC02D 0%, #F59E1F 20%, rgba(243,107,33,0.6) 40%, rgba(243,107,33,0.12) 60%, transparent 72%)",
        }}
        initial={reduce ? { opacity: 0.95, y: 0 } : { opacity: 0, y: 140 }}
        animate={{ opacity: 0.95 }}
        transition={{ opacity: { duration: 1.4, delay: 0.2 } }}
      >
        {!reduce && (
          <motion.div
            className="h-full w-full rounded-full"
            animate={{ scale: [1, 1.015, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>

      {/* warm bleed into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night/0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-24 bg-gradient-to-t from-dawn/90 to-transparent" aria-hidden="true" />

      {/* content */}
      <motion.div style={{ y: contentY }} className="shell relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* left: type block */}
        <div className="max-w-2xl">
          <motion.p
            className="eyebrow"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: DAWN_EASE }}
          >
            PET Preforms · Kolkata, India
          </motion.p>

          <h1 className="mt-4 text-balance font-display text-[clamp(2.6rem,5.4vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-white">
            {["PET preforms for", "bottles & jars,"].map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.5 + i * 0.07, ease: DAWN_EASE }}
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              className="block"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.64, ease: DAWN_EASE }}
            >
              <span className="text-sun">made to spec</span>
              <span className="text-white"> in Kolkata.</span>
            </motion.span>
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-[#E7ECF5]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.82, ease: DAWN_EASE }}
          >
            11 machines. 80+ product types. <span className="tnum">~350</span> tonnes a month — across 6 preform
            families, neck sizes <span className="tnum">22</span>–<span className="tnum">120</span> mm. Reach us on
            WhatsApp and get a quote in minutes.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.95, ease: DAWN_EASE }}
          >
            <WhatsAppButton label="Get a quote on WhatsApp" />
            <CallButton tel={primaryTel} label="Call now" variant="ghost-dark" />
          </motion.div>

          <motion.div
            className="mt-9 flex items-center gap-3 text-sm text-white/65"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.25 }}
          >
            <span className="inline-flex -space-x-1.5" aria-hidden="true">
              {["#BFE3F5", "#F59E1F", "#D9A24A"].map((c) => (
                <span key={c} className="h-6 w-6 rounded-full border-2 border-night" style={{ background: c }} />
              ))}
            </span>
            <span>
              Serving <span className="tnum font-semibold text-white">680+</span> buyers across{" "}
              <span className="tnum font-semibold text-white">13+</span> Indian states
            </span>
          </motion.div>
        </div>

        {/* right: hero product showcase */}
        <div className="relative mx-auto flex h-[480px] w-full max-w-lg items-center justify-center lg:h-[600px]">
          {/* Main Showcase Card */}
          <motion.div
            className="relative h-[380px] w-[260px] md:h-[460px] md:w-[320px] rounded-3xl border border-white/10 bg-white/[0.03] p-2.5 backdrop-blur-md shadow-[0_30px_60px_rgba(0,0,0,0.55)] overflow-hidden"
            style={{ y: preY }}
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: DAWN_EASE }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <img
                src="/hero-preforms.png"
                alt="Nawkiran Premium PET Preforms"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sunrise">Featured</span>
                <h3 className="font-display text-lg font-bold text-white mt-0.5">High-Volume Moulding</h3>
                <p className="text-xs text-white/75 mt-1">Virgin grade resin preforms for water & soft drinks.</p>
              </div>
            </div>
          </motion.div>

          {/* Secondary Floating Card (Offset Close-Up) */}
          <motion.div
            className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 h-[160px] w-[160px] md:h-[200px] md:w-[200px] rounded-2xl border border-white/15 bg-white/[0.04] p-2 backdrop-blur-md shadow-[0_20px_45px_rgba(0,0,0,0.45)] overflow-hidden hidden sm:block"
            style={{ y: neckDetailY }}
            initial={reduce ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: DAWN_EASE }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-xl">
              <img
                src="/neck-detail.png"
                alt="Precision thread neck detail"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3 text-white">
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber">Precision</span>
                <p className="font-display text-xs font-semibold text-white mt-0.5">Perfect Thread Finish</p>
              </div>
            </div>
          </motion.div>

          {/* Decorative stats badge floating on the top-right */}
          <motion.div
            className="absolute -top-4 -right-2 md:-top-8 md:-right-6 rounded-2xl border border-sunrise/30 bg-night/85 px-4 py-3 backdrop-blur-md shadow-lg flex items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sunrise/20 text-sunrise">
              <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </span>
            <div>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Quality Standard</p>
              <p className="text-xs font-bold text-white">ISO 9001:2015 Process</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: reduce ? 0 : 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.div animate={reduce ? undefined : { y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
