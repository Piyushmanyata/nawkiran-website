"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal, DAWN_EASE } from "./motion";
import { stateReach } from "@/lib/customers";

const USE_CASES = [
  "Packaged drinking water",
  "Carbonated soft drinks",
  "Food & confectionery jars",
  "Pharma & nutraceuticals",
  "Edible oil",
  "Cosmetics & personal care",
  "Dairy & beverages",
  "FMCG packaging",
  "Bottlers & fillers",
  "Distributors",
];

// faint, decorative India silhouette (atmosphere only, very low opacity)
const INDIA =
  "M150 28c10-2 18 4 24 12 8 2 14 8 20 16 9 1 16 7 20 16 4 7 1 15 5 21 6 3 4 11 1 16-5 4-12 1-15 7-4 8-13 6-18 2-5 5-13 4-16 11-2 9 3 18 1 27-3 13-7 26-13 38-5 13-10 27-19 38-6 8-15 14-19 23-5-9-13-15-19-23-9-12-15-26-21-40-5-12-9-25-11-38-2-9 3-18 0-27-3-7-11-6-16-11-5 4-13 6-18-2-3-6-10-3-15-7-3-5-6-13 1-16 4-9 11-15 20-16 4-9 11-15 20-16 6-8 12-14 20-16 6-8 14-14 24-12 4-6 9-12 16-12 4 4 7 4 11 0 4 0 5 2 7 5z";

function BarRow({ state, customers, max, i }: { state: string; customers: number; max: number; i: number }) {
  const reduce = useReducedMotion();
  const width = `${Math.max(6, Math.round((Math.sqrt(customers) / Math.sqrt(max)) * 100))}%`;
  const top = i === 0;
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={reduce ? { opacity: 1 } : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: i * 0.08, ease: DAWN_EASE }}
    >
      <span className="w-28 shrink-0 text-sm font-medium text-navy">{state}</span>
      <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-cloud">
        <motion.span
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: top
              ? "linear-gradient(90deg,#F36B21,#F59E1F,#FBC02D)"
              : "linear-gradient(90deg,#F59E1F,#FBC02D)",
          }}
          initial={reduce ? { width } : { width: 0 }}
          whileInView={{ width }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: DAWN_EASE }}
        />
      </div>
      <span className="tnum w-10 shrink-0 text-right text-sm font-semibold text-slate">{customers}</span>
    </motion.div>
  );
}

export function Reach() {
  const top = stateReach.slice(0, 8);
  const others = stateReach.slice(8).reduce((s, x) => s + x.customers, 0);
  const max = stateReach[0].customers;

  return (
    <section id="reach" className="relative overflow-hidden bg-white">
      {/* faint India silhouette */}
      <svg viewBox="0 0 300 360" className="pointer-events-none absolute right-0 top-1/2 h-[120%] -translate-y-1/2 opacity-[0.05]" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <path d={INDIA} fill="#16284D" />
      </svg>

      <div className="shell section relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">National reach</p>
          <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,3rem)]">From our floor to 13+ states.</h2>
          <p className="mt-4 text-lg text-slate">
            <span className="tnum font-semibold text-navy">680+</span> B2B customers across{" "}
            <span className="tnum font-semibold text-navy">13+</span> Indian states — from West Bengal
            across the east and into the north.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1fr_0.85fr]">
          {/* ranked bars */}
          <Reveal className="card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
              Customers by state
            </p>
            <div className="mt-6 space-y-4">
              {top.map((s, i) => (
                <BarRow key={s.state} state={s.state} customers={s.customers} max={max} i={i} />
              ))}
              <BarRow state="Other states" customers={others} max={max} i={top.length} />
            </div>
          </Reveal>

          {/* use cases */}
          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
              What our preforms become
            </p>
            <p className="mt-3 text-slate">
              From mineral water to pharma jars — wherever PET is filled and capped, our preforms are
              already on the line.
            </p>
            <div className="marquee mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
              <div className="marquee-track gap-3" style={{ "--marquee-duration": "34s" } as CSSProperties}>
                {[...USE_CASES, ...USE_CASES].map((u, i) => (
                  <span
                    key={i}
                    className="group inline-flex items-center whitespace-nowrap rounded-full border border-steel px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-transparent hover:bg-gradient-to-r hover:from-sunrise hover:to-amber hover:text-white"
                  >
                    {u}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-steel bg-dawn p-5">
              <p className="text-sm leading-relaxed text-navy">
                We keep client lists private — but we’re happy to share relevant references for your
                product category on request.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
