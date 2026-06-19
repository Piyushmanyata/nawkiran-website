"use client";

import { CountUp } from "./CountUp";
import { Reveal, Stagger, StaggerItem } from "./motion";

type Block = { prefix?: string; to: number; suffix: string; label: string };

const BLOCKS: Block[] = [
  { to: 23000, suffix: "+", label: "Tonnes delivered" },
  { to: 40000, suffix: "+", label: "Orders fulfilled" },
  { to: 680, suffix: "+", label: "Customers served" },
  { to: 13, suffix: "+", label: "States reached" },
  { to: 11, suffix: "", label: "Machines running" },
  { prefix: "~", to: 350, suffix: " T", label: "Tonnes / month" },
];

export function Stats() {
  return (
    <section className="bg-dawn">
      <div className="shell section">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Proven at scale</p>
          <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,2.75rem)]">
            Track record, not claims.
          </h2>
          <p className="mt-3 text-slate">
            Real dispatch numbers from a working plant — the kind of supply continuity high-volume
            bottlers depend on.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6" gap={0.07}>
          {BLOCKS.map((b) => (
            <StaggerItem key={b.label} className="text-center">
              <div className="font-display text-[clamp(2.1rem,3.5vw,3rem)] font-bold leading-none tracking-tight text-navy">
                {b.prefix && <span className="text-amber">{b.prefix}</span>}
                <CountUp to={b.to} />
                <span className="text-amber">{b.suffix}</span>
              </div>
              <div className="mt-2 text-sm font-medium text-slate">{b.label}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
