"use client";

import { CountUp } from "./CountUp";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { companyStats } from "@/lib/stats";

export function Stats() {
  const primary = companyStats.slice(0, 3);
  const secondary = companyStats.slice(3);

  return (
    <section className="bg-dawn">
      <div className="shell section">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Proven at scale</p>
          <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,2.75rem)]">
            Track record, not claims.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Real dispatch numbers from a working plant — the kind of supply continuity high-volume
            bottlers depend on. No rounded-up vanity metrics, no stock-photo factories.
          </p>
        </Reveal>

        {/* Primary record — a ruled board, not a card grid */}
        <Stagger
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-steel bg-steel sm:grid-cols-3"
          gap={0.08}
        >
          {primary.map((b) => (
            <StaggerItem key={b.label} className="bg-dawn p-6 sm:p-8">
              <div className="font-display text-[clamp(2.4rem,4vw,3.25rem)] font-extrabold leading-none tracking-tight text-navy">
                {b.prefix && <span className="text-amber">{b.prefix}</span>}
                <CountUp to={b.to} />
                <span className="text-amber">{b.suffix}</span>
              </div>
              <div className="mt-3 font-display text-base font-bold text-navy">{b.label}</div>
              {b.detail && (
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{b.detail}</p>
              )}
            </StaggerItem>
          ))}
        </Stagger>

        {/* Capacity facts strip */}
        <Reveal
          delay={0.1}
          className="mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-steel bg-white/60 p-5 sm:p-6"
        >
          {secondary.map((b) => (
            <div key={b.label} className="text-center sm:text-left">
              <div className="font-display text-xl font-bold text-navy sm:text-2xl">
                {b.prefix && <span className="text-amber">{b.prefix}</span>}
                <CountUp to={b.to} />
                <span className="text-amber">{b.suffix}</span>
              </div>
              <div className="mt-1 text-xs font-medium text-slate sm:text-sm">{b.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
