"use client";

import { Reveal, Stagger, StaggerItem } from "./motion";
import { capabilities } from "@/lib/stats";
import { BRANDS } from "@/lib/site";

const ICONS = [
  // gauge / capacity
  "M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0 3.5-3.5M4 12a8 8 0 0 1 16 0",
  // cog / machines
  "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm9 3-2 .5M5 12l-2-.5m9-7-.5 2m1 12 .5-2M6 6l1.5 1.5M16.5 16.5 18 18M6 18l1.5-1.5M16.5 7.5 18 6",
  // layers / types
  "m12 3 9 5-9 5-9-5 9-5Zm9 9-9 5-9-5m18 4-9 5-9-5",
  // shield-check / quality
  "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Zm-3.5 9 2.5 2.5 4.5-4.5",
];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative overflow-hidden bg-night text-white">
      <div className="grid-texture absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(245,158,31,0.5), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="shell section relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Inside the plant</p>
          <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,3rem)] text-white">Made again, at volume, on time.</h2>
          <p className="mt-4 text-lg text-white/70">
            Repeatable supply is the whole job. Our floor is built around the brands the industry
            trusts — so the preform you approve today ships the same, order after order.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2" gap={0.08}>
          {capabilities.map((c, i) => (
            <StaggerItem key={c.title} className="bg-night p-6 sm:p-8">
              <div className="flex items-center gap-3 text-amber">
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={ICONS[i]} />
                </svg>
                <h3 className="font-display text-lg font-semibold text-white">{c.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{c.body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* machine brands */}
        <Reveal delay={0.1} className="mt-14 flex flex-col items-center gap-6 border-t border-white/10 pt-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
            Machines we run
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {BRANDS.map((b) => (
              <span key={b} className="font-display text-2xl font-semibold tracking-tight text-white/80 sm:text-3xl">
                {b}
              </span>
            ))}
          </div>
          <p className="text-sm text-white/50">
            <span className="tnum font-semibold text-white">11</span> preform machines ·{" "}
            <span className="tnum font-semibold text-white">400+</span> tonnes / month ·{" "}
            <span className="tnum font-semibold text-white">80+</span> product types
          </p>
        </Reveal>
      </div>
    </section>
  );
}
