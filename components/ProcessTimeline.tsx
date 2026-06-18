"use client";

import { motion } from "motion/react";
import { Reveal, Stagger, StaggerItem, DAWN_EASE } from "./motion";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Enquiry",
    description: "Reach us on WhatsApp or call — tell us the part and volume.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Specification",
    description: "We confirm neck size, weight, material grade and pricing.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Production",
    description: "Your preforms are moulded on our Ferromatik, Toshiba or Windsor machines.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10v6M6 10v6M10 10v6M14 10v6M18 10v6" />
        <path d="M2 10l5-6 5 6 5-6 5 6" />
        <rect x="2" y="16" width="20" height="4" rx="1" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Quality Check",
    description: "Weight, clarity and neck finish verified before packing.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 11 2 2 4-4" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Dispatch",
    description: "Packed and shipped — tracked until it reaches your plant.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

export function ProcessTimeline() {
  return (
    <section id="process" className="relative overflow-hidden bg-white text-navy">
      {/* Subtle background effects */}
      <div className="dot-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -bottom-48 left-1/3 h-[30rem] w-[30rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-sunrise) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="shell section relative z-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">How we deliver</p>
          <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,3rem)] text-navy leading-none">
            A structured process, from enquiry to dispatch.
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate">
            We operate with industrial precision. Every step is system-driven, ensuring your preforms arrive as approved, on schedule.
          </p>
        </Reveal>

        <div className="relative mt-16 md:mt-24">
          {/* Connecting line (Desktop) */}
          <div className="absolute top-[2.25rem] left-[5%] right-[5%] hidden h-0.5 bg-steel md:block" aria-hidden="true">
            <motion.div
              className="h-full bg-gradient-to-r from-sunrise via-amber to-sun"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: DAWN_EASE }}
              style={{ originX: 0 }}
            />
          </div>

          {/* Connecting line (Mobile) */}
          <div className="absolute top-8 bottom-8 left-[2.25rem] w-0.5 bg-steel md:hidden" aria-hidden="true">
            <motion.div
              className="w-full bg-gradient-to-b from-sunrise via-amber to-sun"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: DAWN_EASE }}
              style={{ originY: 0 }}
            />
          </div>

          <Stagger className="grid gap-12 md:grid-cols-5 md:gap-6" gap={0.12}>
            {STEPS.map((s, idx) => (
              <StaggerItem key={s.number} className="relative flex flex-row gap-6 md:flex-col md:gap-0">
                {/* Node circle & Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-steel bg-white text-navy shadow-sm transition-all duration-300 hover:border-sunrise hover:text-sunrise hover:shadow-[0_8px_20px_rgba(243,107,33,0.15)]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cloud text-navy transition-colors group-hover:bg-sunrise/10">
                      {s.icon}
                    </span>
                  </div>
                  {/* Step indicator tag */}
                  <span className="absolute -top-2 -right-1 flex h-5 w-8 items-center justify-center rounded-full bg-navy text-[10px] font-bold tracking-tight text-white tnum shadow-sm">
                    {s.number}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-2 md:mt-6">
                  <h3 className="font-display text-lg font-bold text-navy md:text-xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate md:text-sm">
                    {s.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
