"use client";

import { WhatsAppButton, CallButton } from "./CTA";
import { MiniArc } from "./SunArc";
import { Reveal } from "./motion";
import { PHONES } from "@/lib/site";

export function FinalCTA() {
  const primaryPhone = PHONES.find((p) => p.primary) || PHONES[0];

  return (
    <section className="relative overflow-hidden bg-night text-white py-20 md:py-28">
      {/* Grid pattern overlay */}
      <div className="grid-texture absolute inset-0 opacity-40" aria-hidden="true" />
      
      {/* Center glowing sun effect */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-sunrise) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="shell relative z-10 text-center">
        <Reveal className="flex flex-col items-center">
          {/* Brand SunArc Accent */}
          <div className="mb-6 flex justify-center">
            <MiniArc className="h-10 w-auto opacity-95" />
          </div>

          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-white leading-tight">
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
        </Reveal>
      </div>
    </section>
  );
}
