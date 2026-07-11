"use client";

import { WhatsAppButton, CallButton } from "./CTA";
import { MiniArc } from "./SunArc";
import { Reveal } from "./motion";
import { PHONES } from "@/lib/site";

const TRUST_POINTS = [
  "No registration required",
  "Free consultation",
  "Typically replies in &lt;5 minutes",
];

export function FinalCTA() {
  const primaryPhone = PHONES.find((p) => p.primary) ?? PHONES[0];

  return (
    <section className="relative overflow-hidden bg-night text-white py-20 md:py-28">
      {/* Grid pattern overlay */}
      <div className="grid-texture absolute inset-0 opacity-40" aria-hidden="true" />

      {/* Warmer, more vibrant radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(243,107,33,0.8) 0%, rgba(245,158,31,0.4) 35%, transparent 65%)" }}
        aria-hidden="true"
      />
      {/* Outer softer ring */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80rem] w-[80rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(251,192,45,0.6) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      <div className="shell relative z-10 text-center">
        <Reveal className="flex flex-col items-center">
          {/* Brand SunArc Accent */}
          <div className="mb-6 flex justify-center">
            <MiniArc className="h-10 w-auto opacity-95" />
          </div>

          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-white leading-tight">
            Ready to get started?
          </h2>

          <p className="mt-4 max-w-xl text-lg text-white/75">
            Get a custom quote on WhatsApp in minutes — or call us directly to discuss your PET preform requirements.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <WhatsAppButton
              text="Hello Nawkiran Polyplast, I would like to get a quote on PET preforms."
              label="Enquire on WhatsApp"
              variant="primary"
              className="w-full sm:w-auto px-8 py-4 shadow-lg"
            />
            <CallButton
              tel={primaryPhone.tel}
              label={`Call ${primaryPhone.label}`}
              variant="ghost-dark"
              className="w-full sm:w-auto px-8 py-4"
            />
          </div>

          {/* Micro-trust strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            {["No registration required", "Free consultation", "Typically replies in <5 min"].map((t, i) => (
              <span key={t} className="flex items-center gap-1.5 text-xs text-white/50">
                {i > 0 && <span className="hidden sm:inline h-1 w-1 rounded-full bg-white/25" aria-hidden="true" />}
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-amber shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
