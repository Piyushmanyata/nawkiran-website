"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Preform } from "./Preform";
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
              <span className="text-gradient-dawn">made to spec</span>
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

        {/* right: hero preform */}
        <div className="relative mx-auto flex h-[420px] w-full max-w-sm items-center justify-center lg:h-[560px]">
          <motion.div
            className="relative h-full"
            style={{ y: preY }}
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: DAWN_EASE }}
          >
            <motion.div
              className="relative h-full"
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Preform shape="star" tint="blue" uid="hero" className="h-full w-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]" />
              {/* specular glint sweep */}
              {!reduce && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute -inset-y-4 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    animate={{ x: ["-120%", "320%"] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                  />
                </div>
              )}
            </motion.div>
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
