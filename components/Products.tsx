"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { products, upcoming, weightRange, type Product } from "@/lib/products";
import { Preform, BlownBottle, type Tint } from "./Preform";
import { Reveal, DAWN_EASE } from "./motion";
import { WhatsAppIcon, ArrowRight, Plus } from "./icons";
import { waLink } from "@/lib/site";

const TINT: Record<string, Tint> = {
  "3-star": "blue",
  "1810-pco": "clear",
  "1881-pco": "clear",
  jar: "amber",
  "fridge-bottle": "blue",
  ropp: "amber",
};

function neckMinMax(p: Product): [number, number] {
  const nums = p.necks.flatMap((n) => (n.size.match(/\d+/g) ?? []).map(Number));
  return [Math.min(...nums), Math.max(...nums)];
}

function badge(p: Product): string {
  const [nmin, nmax] = neckMinMax(p);
  const [wmin, wmax] = weightRange(p);
  const neck = nmin === nmax ? `${nmin}mm` : `${nmin}–${nmax}mm`;
  return `NECK ${neck} · ${wmin}–${wmax}g`;
}

function ProductCard({
  p,
  active,
  onSelect,
}: {
  p: Product;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group card relative overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 ${
        active ? "ring-2 ring-sunrise shadow-[0_18px_40px_-18px_rgba(243,107,33,0.45)]" : "hover:shadow-[0_18px_40px_-22px_rgba(22,40,77,0.35)]"
      }`}
    >
      {/* accent top rule */}
      <span className="absolute inset-x-0 top-0 h-1 z-10" style={{ background: p.accent }} aria-hidden="true" />

      {/* navy mini-canvas with preform → bottle crossfade */}
      <div className="relative grid h-56 place-items-center overflow-hidden bg-night">
        <div className="grid-texture absolute inset-0 opacity-50" aria-hidden="true" />
        {/* accent glow */}
        <div
          className="absolute -bottom-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full opacity-30 blur-2xl transition-opacity duration-300 group-hover:opacity-50"
          style={{ background: p.accent }}
          aria-hidden="true"
        />
        <div className="relative h-44 w-full">
          <Preform
            shape={p.illustration}
            tint={TINT[p.id]}
            uid={`card-${p.id}`}
            className="absolute inset-0 mx-auto h-full w-auto transition-all duration-500 group-hover:opacity-0 group-hover:scale-95"
          />
          <BlownBottle
            shape={p.illustration}
            tint={TINT[p.id]}
            uid={`bottle-${p.id}`}
            className="absolute inset-0 mx-auto h-full w-auto scale-105 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"
          />
        </div>
        <span className="absolute bottom-3 right-3 rounded-full bg-white/10 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-white/70 backdrop-blur-sm">
          <span className="hidden sm:inline">Hover to see the bottle</span>
          <span className="sm:hidden">Tap for full specs</span>
        </span>
      </div>

      {/* meta */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-xl font-semibold text-navy">{p.name}</h3>
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-steel text-slate transition-colors group-hover:border-sunrise group-hover:text-sunrise"
            aria-hidden="true"
          >
            <Plus className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-1 font-mono text-xs tracking-tight text-slate">{badge(p)}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate">{p.use}</p>
      </div>
    </button>
  );
}

function SpecPanel({ p }: { p: Product }) {
  const reduce = useReducedMotion();
  const [neck, setNeck] = useState<string>("all");
  const groups = neck === "all" ? p.necks : p.necks.filter((n) => n.size === neck);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.035 } },
  };
  const chip = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: DAWN_EASE } },
  };

  const quoteText = `Hi Nawkiran, I need a quote for ${p.name}${neck !== "all" ? ` ${neck.replace(/\s/g, "")}` : ""} preforms. Approx. monthly quantity: `;

  return (
    <div className="card overflow-hidden">
      <div className="grid gap-0 md:grid-cols-[260px_1fr]">
        {/* left rail: family identity */}
        <div className="relative flex flex-col justify-between gap-6 border-b border-steel bg-night p-6 md:border-b-0 md:border-r">
          <div className="grid-texture absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="relative">
            <span className="inline-block rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider" style={{ background: `${p.accent}22`, color: p.accent }}>
              {p.short}
            </span>
            <h3 className="mt-3 font-display text-2xl font-semibold text-white">{p.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{p.description}</p>
          </div>
          <div className="relative mx-auto h-40">
            <Preform shape={p.illustration} tint={TINT[p.id]} uid={`panel-${p.id}`} className="h-full w-auto" />
          </div>
        </div>

        {/* right: filters + matrix */}
        <div className="p-6">
          {/* neck-size filter */}
          <div className="no-scrollbar flex items-center gap-1 overflow-x-auto border-b border-steel pb-3">
            {["all", ...p.necks.map((n) => n.size)].map((size) => {
              const isActive = neck === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setNeck(size)}
                  className={`relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? "text-navy" : "text-slate hover:text-navy"
                  }`}
                >
                  {size === "all" ? "All neck sizes" : size}
                  {isActive && (
                    <motion.span
                      layoutId={`neck-underline-${p.id}`}
                      className="absolute inset-0 -z-10 rounded-full bg-cloud"
                      transition={{ duration: 0.2, ease: DAWN_EASE }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* matrix */}
          <AnimatePresence mode="wait">
            <motion.div
              key={neck}
              variants={container}
              initial="hidden"
              animate="show"
              exit={reduce ? undefined : { opacity: 0 }}
              className="mt-5 space-y-5"
            >
              {groups.map((n) => (
                <div key={n.size}>
                  <div className="flex items-baseline justify-between">
                    <p className="font-mono text-xs uppercase tracking-wider text-slate">Neck {n.size}</p>
                    <p className="text-xs text-slate">
                      <span className="tnum">{n.weights.length}</span> weights
                    </p>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 border-t border-dashed border-steel pt-3">
                    {n.weights.map((w) => (
                      <motion.a
                        key={w}
                        variants={chip}
                        href={waLink(`Hi Nawkiran, I need a quote for ${p.name} ${n.size.replace(/\s/g, "")} ${w}g preforms. Approx. monthly quantity: `)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tnum group/chip inline-flex items-center gap-1 rounded-lg bg-cloud px-2.5 py-1.5 font-mono text-sm text-navy transition-colors hover:bg-sunrise hover:text-white"
                        title={`Ask for ${p.name} ${n.size} ${w}g on WhatsApp`}
                      >
                        {w}
                        <span className="text-[0.65rem] text-slate group-hover/chip:text-white/80">g</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* upcoming */}
          <div className="mt-6 flex items-start gap-2 rounded-xl bg-dawn p-3 text-sm text-navy">
            <span className="mt-0.5 inline-flex shrink-0 items-center rounded-full bg-sun px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-navy">
              Soon
            </span>
            <span className="text-slate">{upcoming}</span>
          </div>

          {/* CTA */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={waLink(quoteText)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-full bg-sunrise px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(243,107,33,0.6)] transition-all hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
              Quote {p.name}
              {neck !== "all" ? ` · ${neck}` : ""} on WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <p className="text-xs text-slate">Tip: tap any weight chip to ask for that exact spec.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Products() {
  const [selected, setSelected] = useState<string>(products[0].id);
  const current = products.find((p) => p.id === selected)!;

  return (
    <section id="products" className="bg-white">
      <div className="shell section">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">The catalogue</p>
          <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,3rem)]">Find your part in seconds.</h2>
          <p className="mt-4 text-lg text-slate">
            Six preform families, neck sizes from 22 to 120 mm and 80+ weights in all. Pick a family
            to see every available neck and gram — then ask for it on WhatsApp in one tap.
          </p>
        </Reveal>

        {/* family grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} active={p.id === selected} onSelect={() => setSelected(p.id)} />
          ))}
        </div>

        {/* detail panel */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: DAWN_EASE }}
            >
              <SpecPanel p={current} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
