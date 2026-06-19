"use client";

import { useState } from "react";
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
  return `${neck} necks / ${wmin}-${wmax} g`;
}

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
      className={`group flex min-w-[15.5rem] items-center gap-3 rounded-2xl border p-3 text-left transition-all lg:min-w-0 ${
        active
          ? "border-sunrise bg-white shadow-[0_0_0_1px_rgba(243,107,33,0.15),0_8px_28px_-8px_rgba(243,107,33,0.55)]"
          : "border-steel bg-white/70 hover:border-sunrise/50 hover:bg-white hover:shadow-[0_4px_16px_-8px_rgba(22,40,77,0.12)]"
      }`}
    >
      <span className="relative grid h-16 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-night ring-1 ring-white/5">
        <span className="grid-texture absolute inset-0 opacity-45" aria-hidden="true" />
        <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 80%, rgba(243,107,33,0.18) 0%, transparent 70%)" }} aria-hidden="true" />
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
        <span className="mt-1 block truncate text-xs font-medium text-slate">{productBadge(p)}</span>
      </span>
    </button>
  );
}

function NeckButton({
  neck,
  active,
  onSelect,
}: {
  neck: NeckSpec;
  active: boolean;
  onSelect: () => void;
}) {
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

function WeightChip({
  weight,
  active,
  onSelect,
}: {
  weight: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`tnum rounded-xl border px-3 py-2 font-mono text-sm font-semibold transition-all duration-150 ${
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
      className="grid gap-6 xl:grid-cols-[minmax(20rem,0.9fr)_1fr]"
    >
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0d1e3e] to-night p-5 text-white sm:p-6">
        <div className="grid-texture absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="absolute -right-16 top-10 h-60 w-60 rounded-full opacity-22 blur-[52px]" style={{ background: p.accent }} aria-hidden="true" />
        <div className="absolute -left-10 bottom-16 h-40 w-40 rounded-full opacity-14 blur-[44px]" style={{ background: p.accent }} aria-hidden="true" />
        <div className="relative flex items-start justify-between gap-5">
          <div>
            <p className="text-sm font-semibold text-white/70">Selected preform</p>
            <h3 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-white">{p.name}</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/72">{p.description}</p>
          </div>
          <div className="rounded-full px-3 py-1.5 text-xs font-bold text-night shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4)]" style={{ background: p.accent }}>
            {weight}&thinsp;g
          </div>
        </div>

        <div className="relative mt-8 grid min-h-[16rem] sm:min-h-[24rem] place-items-center rounded-xl bg-white/[0.04] ring-1 ring-white/5">
          {/* Per-product radial halo behind the preform */}
          <div className="pointer-events-none absolute inset-0 rounded-xl" style={{ background: `radial-gradient(ellipse 55% 50% at 50% 62%, ${p.accent}28 0%, transparent 70%)` }} aria-hidden="true" />
          <div className="absolute left-5 top-5 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white/80 ring-1 ring-white/10 backdrop-blur-sm">
            {formatNeck(neck.size)}
          </div>
          <Preform
            shape={p.illustration}
            tint={TINT[p.id]}
            uid={`hero-${p.id}-${neck.size}-${weight}`}
            neckMm={neckMm}
            weightG={weight}
            className="h-[14rem] sm:h-[22rem] w-auto drop-shadow-[0_22px_32px_rgba(0,0,0,0.35)]"
          />
          <BlownBottle
            shape={p.illustration}
            tint={TINT[p.id]}
            uid={`ghost-${p.id}`}
            className="pointer-events-none absolute right-3 top-6 sm:top-12 h-32 sm:h-48 w-auto opacity-20"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-steel bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-steel pb-5">
          <div>
            <p className="text-sm font-semibold text-slate">Application</p>
            <p className="mt-1 text-lg font-semibold text-navy">{p.use}</p>
          </div>
          <div className="rounded-xl bg-dawn px-4 py-3 text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">Current spec</p>
            <p className="tnum mt-1 font-mono text-sm font-semibold text-navy">
              {formatNeck(neck.size)} / {weight} g
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-navy">Choose neck finish</p>
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
            {p.necks.map((n) => (
              <NeckButton
                key={n.size}
                neck={n}
                active={n.size === neck.size}
                onSelect={() => onNeck(n)}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-end justify-between gap-4">
            <p className="text-sm font-semibold text-navy">Choose gram weight</p>
            <p className="text-xs text-slate">{neck.weights.length} options</p>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
            {neck.weights.map((w) => (
              <WeightChip key={w} weight={w} active={w === weight} onSelect={() => onWeight(w)} />
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-amber/30 bg-amber/[0.06] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber">Coming shortly</p>
          <p className="mt-2 text-sm leading-relaxed text-navy">{upcoming}</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={waLink(quoteText)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-sunrise px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_-10px_rgba(243,107,33,0.85)] transition-transform hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
            Quote this spec
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <p className="text-sm text-slate">Message includes product, neck and gram weight.</p>
        </div>
      </section>
    </motion.div>
  );
}

export function Products() {
  const [selectedId, setSelectedId] = useState<string>(products[0].id);
  const selected = products.find((p) => p.id === selectedId) ?? products[0];
  const [selectedNeck, setSelectedNeck] = useState<NeckSpec>(selected.necks[0]);
  const [selectedWeight, setSelectedWeight] = useState<number>(defaultWeight(selected.necks[0]));

  const [showLeftScrollFade, setShowLeftScrollFade] = useState(false);
  const [showRightScrollFade, setShowRightScrollFade] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = target.scrollLeft;
    const maxScroll = target.scrollWidth - target.clientWidth;
    setShowLeftScrollFade(scrollLeft > 8);
    setShowRightScrollFade(scrollLeft < maxScroll - 8);
  };

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
            Explore our complete range of PET preforms by product family. Select a family to compare available neck finishes and gram weights instantly in the same view. The specimen visualization updates in real time to match your selected configurations.
          </p>
        </Reveal>

        <div className="mt-10 grid min-w-0 gap-6 lg:grid-cols-[minmax(16rem,18rem)_1fr] lg:items-start">
          <aside className="sticky top-[4.75rem] z-30 -mx-6 min-w-0 overflow-hidden border-y border-steel bg-white/95 px-6 py-3 backdrop-blur-xl lg:top-24 lg:mx-0 lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-0">
            <div className="relative w-full">
              {/* Left edge fade scroll indicator */}
              <div
                className={`pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-r from-white to-transparent transition-opacity duration-300 lg:hidden ${
                  showLeftScrollFade ? "opacity-100" : "opacity-0"
                }`}
              />

              <div
                onScroll={handleScroll}
                className="no-scrollbar flex w-full min-w-0 gap-3 overflow-x-auto lg:flex-col lg:overflow-visible"
              >
                {products.map((p) => (
                  <ProductFamilyButton
                    key={p.id}
                    p={p}
                    active={p.id === selected.id}
                    onSelect={() => selectProduct(p)}
                  />
                ))}
              </div>

              {/* Right edge fade scroll indicator */}
              <div
                className={`pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-14 bg-gradient-to-l from-white to-transparent transition-opacity duration-300 lg:hidden ${
                  showRightScrollFade ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </aside>

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
