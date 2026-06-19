"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { products, upcoming, weightRange, type NeckSpec, type Product } from "@/lib/products";
import { BlownBottle, Preform, type Tint } from "./Preform";
import { Reveal, DAWN_EASE } from "./motion";
import { WhatsAppIcon, ArrowRight } from "./icons";
import { waLink } from "@/lib/site";

const TINT: Record<string, Tint> = {
  "3-star": "blue",
  "1810-pco": "clear",
  "1881-pco": "clear",
  jar: "amber",
  "fridge-bottle": "blue",
  ropp: "amber",
};

function neckNumbers(size: string): number[] {
  return (size.match(/\d+(?:\.\d+)?/g) ?? []).map(Number);
}

function primaryNeckMm(size: string): number {
  const nums = neckNumbers(size);
  return nums.length ? Math.max(...nums) : 28;
}

function formatNeck(size: string): string {
  return size.replace(/\s*\/\s*/g, "/").replace(/\s*MM\b/g, " mm");
}

function defaultWeight(neck: NeckSpec): number {
  return neck.weights[Math.floor(neck.weights.length / 2)] ?? neck.weights[0];
}

function neckMinMax(p: Product): [number, number] {
  const nums = p.necks.flatMap((n) => neckNumbers(n.size));
  return [Math.min(...nums), Math.max(...nums)];
}

function productBadge(p: Product): string {
  const [nmin, nmax] = neckMinMax(p);
  const [wmin, wmax] = weightRange(p);
  const neck = nmin === nmax ? `${nmin} mm` : `${nmin}-${nmax} mm`;
  return `${neck} / ${wmin}-${wmax} g`;
}

/* ─── Mobile horizontal tab strip ─────────────────────────────────────── */
function MobileProductStrip({
  products,
  selectedId,
  onSelect,
}: {
  products: Product[];
  selectedId: string;
  onSelect: (p: Product) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
      style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
    >
      {products.map((p) => {
        const active = p.id === selectedId;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
              active
                ? "border-transparent text-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.3)]"
                : "border-steel bg-white text-navy"
            }`}
            style={active ? { background: p.accent } : undefined}
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: active ? "rgba(255,255,255,0.55)" : p.accent }}
            />
            {p.name}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Desktop sidebar card ─────────────────────────────────────────────── */
function ProductFamilyButton({
  p,
  active,
  onSelect,
}: {
  p: Product;
  active: boolean;
  onSelect: () => void;
}) {
  const defaultNeck = p.necks[0];
  const [wmin, wmax] = weightRange(p);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
        active
          ? "border-sunrise bg-white shadow-[0_0_0_1px_rgba(243,107,33,0.15),0_6px_20px_-8px_rgba(243,107,33,0.45)]"
          : "border-steel bg-white/70 hover:border-sunrise/50 hover:bg-white hover:shadow-[0_4px_12px_-8px_rgba(22,40,77,0.10)]"
      }`}
    >
      <span className="relative grid h-16 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-night ring-1 ring-white/5">
        <span className="grid-texture absolute inset-0 opacity-45" aria-hidden="true" />
        <span
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 80%, rgba(243,107,33,0.18) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <Preform
          shape={p.illustration}
          tint={TINT[p.id]}
          uid={`family-${p.id}`}
          neckMm={primaryNeckMm(defaultNeck.size)}
          weightG={(wmin + wmax) / 2}
          className="relative h-14 w-auto"
        />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-base font-semibold leading-tight text-navy">{p.name}</span>
        <span className="mt-0.5 block truncate text-xs font-medium text-slate">{productBadge(p)}</span>
      </span>
    </button>
  );
}

/* ─── Neck & weight controls ───────────────────────────────────────────── */
function NeckButton({ neck, active, onSelect }: { neck: NeckSpec; active: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
        active ? "border-navy bg-navy text-white" : "border-steel bg-white text-navy hover:border-sunrise"
      }`}
    >
      {formatNeck(neck.size)}
    </button>
  );
}

function WeightChip({ weight, active, onSelect }: { weight: number; active: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`tnum rounded-xl border px-2.5 py-2 font-mono text-sm font-semibold transition-all duration-150 ${
        active
          ? "border-sunrise bg-sunrise text-white shadow-[0_4px_14px_-6px_rgba(243,107,33,0.7)] scale-[1.06]"
          : "border-steel bg-cloud text-navy hover:border-sunrise/70 hover:bg-white hover:scale-[1.04] hover:shadow-sm"
      }`}
    >
      {weight}
      <span className={active ? "text-white/80" : "text-slate"}> g</span>
    </button>
  );
}

/* ─── Spec panel ───────────────────────────────────────────────────────── */
function SpecPanel({
  p,
  neck,
  weight,
  onNeck,
  onWeight,
}: {
  p: Product;
  neck: NeckSpec;
  weight: number;
  onNeck: (neck: NeckSpec) => void;
  onWeight: (weight: number) => void;
}) {
  const neckMm = primaryNeckMm(neck.size);
  const quoteText = `Hi Nawkiran, I need a quote for ${p.name} ${formatNeck(neck.size)} ${weight}g preforms. Approx. monthly quantity: `;

  return (
    <motion.div
      key={p.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.32, ease: DAWN_EASE }}
      className="grid grid-cols-1 min-w-0 w-full gap-4 xl:grid-cols-[minmax(20rem,0.9fr)_1fr]"
    >
      {/* Dark preview card */}
      <section className="relative min-w-0 overflow-hidden rounded-2xl bg-gradient-to-b from-[#0d1e3e] to-night p-4 sm:p-6 text-white">
        <div className="grid-texture absolute inset-0 opacity-40" aria-hidden="true" />
        <div
          className="absolute -right-16 top-10 h-60 w-60 rounded-full opacity-22 blur-[52px]"
          style={{ background: p.accent }}
          aria-hidden="true"
        />
        <div
          className="absolute -left-10 bottom-16 h-40 w-40 rounded-full opacity-14 blur-[44px]"
          style={{ background: p.accent }}
          aria-hidden="true"
        />

        {/* Header row — name + weight badge */}
        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white/70">Selected preform</p>
            <h3 className="mt-1 font-display text-[clamp(1.4rem,4vw,2.5rem)] font-semibold text-white leading-tight">{p.name}</h3>
            <p className="mt-1.5 max-w-md text-xs sm:text-sm leading-relaxed text-white/72 line-clamp-2 sm:line-clamp-none">{p.description}</p>
          </div>
          <div
            className="shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold text-night shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4)] mt-0.5"
            style={{ background: p.accent }}
          >
            {weight}&thinsp;g
          </div>
        </div>

        {/* Preform visualization */}
        <div className="relative mt-4 sm:mt-8 grid min-h-[9rem] sm:min-h-[24rem] place-items-center rounded-xl bg-white/[0.04] ring-1 ring-white/5">
          <div
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{ background: `radial-gradient(ellipse 55% 50% at 50% 62%, ${p.accent}28 0%, transparent 70%)` }}
            aria-hidden="true"
          />
          <div className="absolute left-3 top-3 sm:left-5 sm:top-5 rounded-xl bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white/80 ring-1 ring-white/10 backdrop-blur-sm">
            {formatNeck(neck.size)}
          </div>
          <Preform
            shape={p.illustration}
            tint={TINT[p.id]}
            uid={`hero-${p.id}-${neck.size}-${weight}`}
            neckMm={neckMm}
            weightG={weight}
            className="h-[8rem] sm:h-[22rem] w-auto drop-shadow-[0_22px_32px_rgba(0,0,0,0.35)]"
          />
          <BlownBottle
            shape={p.illustration}
            tint={TINT[p.id]}
            uid={`ghost-${p.id}`}
            className="pointer-events-none absolute right-3 top-3 sm:top-12 h-16 sm:h-48 w-auto opacity-20"
          />
        </div>
      </section>

      {/* Spec selection card */}
      <section className="min-w-0 rounded-2xl border border-steel bg-white p-4 sm:p-6">
        <div className="border-b border-steel pb-4">
          <p className="text-xs font-semibold text-slate">Application</p>
          <p className="mt-1 text-base sm:text-lg font-semibold text-navy">{p.use}</p>
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold text-navy">Choose neck finish</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {p.necks.map((n) => (
              <NeckButton key={n.size} neck={n} active={n.size === neck.size} onSelect={() => onNeck(n)} />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-end justify-between gap-4">
            <p className="text-sm font-semibold text-navy">Choose gram weight</p>
            <p className="text-xs text-slate">{neck.weights.length} options</p>
          </div>
          <div className="mt-2.5 grid grid-cols-4 gap-1.5 sm:grid-cols-4 lg:grid-cols-5">
            {neck.weights.map((w) => (
              <WeightChip key={w} weight={w} active={w === weight} onSelect={() => onWeight(w)} />
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-amber/30 bg-amber/[0.06] p-3.5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber">Coming shortly</p>
          <p className="mt-1.5 text-sm leading-relaxed text-navy">{upcoming}</p>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
          <a
            href={waLink(quoteText)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-sunrise px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_-10px_rgba(243,107,33,0.85)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
            Quote this spec
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <p className="text-xs sm:text-sm text-slate text-center sm:text-left">Message includes product, neck &amp; gram weight.</p>
        </div>
      </section>
    </motion.div>
  );
}

/* ─── Main export ──────────────────────────────────────────────────────── */
export function Products() {
  const [selectedId, setSelectedId] = useState<string>(products[0].id);
  const selected = products.find((p) => p.id === selectedId) ?? products[0];
  const [selectedNeck, setSelectedNeck] = useState<NeckSpec>(selected.necks[0]);
  const [selectedWeight, setSelectedWeight] = useState<number>(defaultWeight(selected.necks[0]));

  function selectProduct(p: Product) {
    const neck = p.necks[0];
    setSelectedId(p.id);
    setSelectedNeck(neck);
    setSelectedWeight(defaultWeight(neck));
  }

  function selectNeck(neck: NeckSpec) {
    setSelectedNeck(neck);
    setSelectedWeight(defaultWeight(neck));
  }

  return (
    <section id="products" className="bg-white">
      <div className="shell section">
        <Reveal className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Catalogue</p>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,3rem)]">Select your exact preform specifications.</h2>
            <div className="mt-5 h-px w-12 rounded-full bg-gradient-to-r from-sunrise to-amber" />
          </div>
          <p className="text-lg leading-relaxed text-slate">
            Explore our complete range of PET preforms by product family. Select a family to compare available neck finishes and gram weights instantly. The specimen visualization updates in real time.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 min-w-0 w-full gap-4 lg:gap-6 lg:grid-cols-[minmax(16rem,18rem)_1fr] lg:items-start">
          {/* ── Sidebar / strip selector ── */}
          <aside className="sticky top-[4.75rem] z-30 bg-white/95 backdrop-blur-xl lg:top-24 lg:bg-transparent lg:backdrop-blur-0">
            {/* Mobile: horizontal scroll strip */}
            <div className="border-y border-steel py-3 lg:hidden">
              <MobileProductStrip products={products} selectedId={selected.id} onSelect={selectProduct} />
            </div>

            {/* Desktop: vertical sidebar cards */}
            <div className="hidden lg:flex lg:flex-col lg:gap-3">
              {products.map((p) => (
                <ProductFamilyButton key={p.id} p={p} active={p.id === selected.id} onSelect={() => selectProduct(p)} />
              ))}
            </div>
          </aside>

          {/* ── Spec panel ── */}
          <AnimatePresence mode="wait">
            <SpecPanel
              key={selected.id}
              p={selected}
              neck={selectedNeck}
              weight={selectedWeight}
              onNeck={selectNeck}
              onWeight={setSelectedWeight}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
