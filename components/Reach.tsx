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

const COLORS = ["#F36B21", "#F59E1F", "#FBC02D", "#4FB3A6", "#5AA0E6", "#16284D"];

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const a = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function piePath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, r, end);
  const e = polarToCartesian(cx, cy, r, start);
  const large = end - start <= 180 ? 0 : 1;
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y} Z`;
}

function ReachPie() {
  const reduce = useReducedMotion();
  const topStates = stateReach.slice(0, 5);
  const otherCustomers = stateReach.slice(5).reduce((sum, item) => sum + item.customers, 0);
  const slices = [...topStates, { state: "Other markets", customers: otherCustomers }].filter((s) => s.customers > 0);
  const total = slices.reduce((sum, item) => sum + item.customers, 0);
  let angle = -18;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(18rem,0.8fr)_1fr] lg:items-center">
      <div className="relative mx-auto aspect-square w-full max-w-[23rem]">
        <svg viewBox="0 0 240 240" className="h-full w-full drop-shadow-[0_18px_28px_rgba(11,27,58,0.12)]" role="img" aria-label="Customer reach by Indian state">
          <circle cx="120" cy="120" r="112" fill="#F1F4F9" />
          {slices.map((slice, i) => {
            const span = (slice.customers / total) * 360;
            const start = angle;
            const end = angle + span;
            angle = end;
            return (
              <motion.path
                key={slice.state}
                d={piePath(120, 120, 106, start, end)}
                fill={COLORS[i % COLORS.length]}
                stroke="#ffffff"
                strokeWidth="3"
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: DAWN_EASE }}
              />
            );
          })}
          <circle cx="120" cy="120" r="48" fill="#ffffff" />
          <circle cx="120" cy="120" r="36" fill="#FFF6EC" />
          <text x="120" y="116" textAnchor="middle" className="fill-navy font-display text-[17px] font-bold">
            India
          </text>
          <text x="120" y="135" textAnchor="middle" className="fill-slate text-[9px] font-semibold">
            supply footprint
          </text>
        </svg>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {slices.map((slice, i) => (
          <motion.div
            key={slice.state}
            className="flex items-center gap-3 rounded-xl border border-steel bg-white px-4 py-3"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.36, delay: 0.12 + i * 0.05, ease: DAWN_EASE }}
          >
            <span className="h-3 w-3 rounded-full" style={{ background: COLORS[i % COLORS.length] }} aria-hidden="true" />
            <span className="font-medium text-navy">{slice.state}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Reach() {
  return (
    <section id="reach" className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-steel to-transparent" aria-hidden="true" />

      <div className="shell section relative">
        <Reveal className="grid gap-6 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">National reach</p>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,3rem)]">A concentrated base with routes beyond the east.</h2>
          </div>
          <p className="text-lg leading-relaxed text-slate">
            The dispatch footprint is strongest close to the plant and extends through repeat
            supply relationships across regional bottling, food, pharma, oil and FMCG packaging.
          </p>
        </Reveal>

        <Reveal className="mt-12 rounded-2xl border border-steel bg-cloud/55 p-5 sm:p-7">
          <ReachPie />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <p className="text-sm font-semibold text-navy">What our preforms become</p>
          <div className="marquee mt-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
            <div className="marquee-track gap-3" style={{ "--marquee-duration": "34s" } as CSSProperties}>
              {[...USE_CASES, ...USE_CASES].map((u, i) => (
                <span
                  key={i}
                  className="inline-flex items-center whitespace-nowrap rounded-full border border-steel bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-sunrise hover:text-sunrise"
                >
                  {u}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
