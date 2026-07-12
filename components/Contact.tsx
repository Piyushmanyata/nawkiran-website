"use client";

import { useState } from "react";
import { Reveal } from "./motion";
import { WhatsAppIcon, PhoneIcon, MailIcon, ClockIcon, ArrowRight } from "./icons";
import { PHONES, EMAIL, ADDRESSES, waLink } from "@/lib/site";
import { products } from "@/lib/products";
import { LocationMap } from "./LocationMap";

export function Contact() {
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [spec, setSpec] = useState("");
  const [monthlyQuantity, setMonthlyQuantity] = useState("");
  const primary = PHONES.find((p) => p.primary) ?? PHONES[0];

  const waText = `Hi Nawkiran,${name ? ` this is ${name}.` : ""} I'm interested in ${family || "PET"} preforms. ${spec ? `Neck / weight: ${spec}. ` : ""}${monthlyQuantity ? `Approx. monthly quantity: ${monthlyQuantity} kg.` : "Approx. monthly quantity: to be discussed."}`;

  const emailHref =
    `mailto:${EMAIL}?subject=${encodeURIComponent("PET Preform Enquiry")}` +
    `&body=${encodeURIComponent(
      `Hello Nawkiran Polyplast,\n\nI would like a quote for the following:\n- Family: ${family || ""}\n- Neck size / weight: ${spec || ""}\n- Approx. monthly quantity: ${monthlyQuantity || ""} kg\n\nName: ${name || ""}\n\nThank you.`,
    )}`;

  return (
    <section id="contact" className="relative overflow-hidden bg-night text-white">
      <div className="grid-texture absolute inset-0 opacity-50" aria-hidden="true" />
      {/* dawn glow bookend */}
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[70rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(243,107,33,0.5), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="shell section relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Let’s talk</p>
          <h2 className="mt-3 text-[clamp(1.9rem,3.8vw,3.25rem)] text-white">
            Get a quote in one clear WhatsApp message.
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Tell us the family, neck or weight, and monthly quantity. We will reply on WhatsApp during business hours with the next step.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* quick enquiry → builds WhatsApp prefill */}
          <Reveal className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
            <h3 className="font-display text-xl font-semibold text-white">Quick enquiry</h3>
            <p className="mt-1 text-sm text-white/60">No forms to submit — this just opens WhatsApp with your message ready.</p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-white/80">
                  Your name <span className="text-white/40">(optional)</span>
                </label>
                <input
                  id="c-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-sunrise focus:bg-white/10 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="c-family" className="mb-1.5 block text-sm font-medium text-white/80">
                  Which preform family?
                </label>
                <select
                  id="c-family"
                  value={family}
                  onChange={(e) => setFamily(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-sunrise focus:bg-white/10 focus:outline-none"
                >
                  <option value="" className="bg-night">Select a family…</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name} className="bg-night">
                      {p.name} — {p.short}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-spec" className="mb-1.5 block text-sm font-medium text-white/80">
                    Neck / weight <span className="text-white/40">(optional)</span>
                  </label>
                  <input
                    id="c-spec"
                    type="text"
                    value={spec}
                    onChange={(e) => setSpec(e.target.value)}
                    placeholder="e.g. 28 mm / 18 g"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-sunrise focus:bg-white/10 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="c-quantity" className="mb-1.5 block text-sm font-medium text-white/80">
                    Monthly quantity <span className="text-white/40">(kg)</span>
                  </label>
                  <input
                    id="c-quantity"
                    type="number"
                    min="0"
                    inputMode="numeric"
                    value={monthlyQuantity}
                    onChange={(e) => setMonthlyQuantity(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-sunrise focus:bg-white/10 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <a
              href={waLink(waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-sunrise px-6 py-4 text-base font-semibold text-white shadow-[0_12px_30px_-10px_rgba(243,107,33,0.8)] transition-[transform,box-shadow,background-color] hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Send on WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href={`tel:${primary.tel}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <PhoneIcon className="h-4 w-4" /> Call now
              </a>
              <a
                href={emailHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MailIcon className="h-4 w-4" /> Email
              </a>
            </div>
          </Reveal>

          {/* direct contact details */}
          <Reveal delay={0.1} className="space-y-4">
            {/* phones */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                <PhoneIcon className="h-4 w-4" /> Call us directly
              </p>
              <div className="mt-4 space-y-2">
                {PHONES.map((p) => (
                  <a
                    key={p.tel}
                    href={`tel:${p.tel}`}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                      p.primary ? "bg-sunrise/15 ring-1 ring-sunrise/40" : "hover:bg-white/5"
                    }`}
                  >
                    <span className="tnum font-display text-lg font-semibold text-white">{p.label}</span>
                    {p.primary && (
                      <span className="rounded-full bg-sunrise px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-white">
                        Preferred
                      </span>
                    )}
                  </a>
                ))}
              </div>
              <a href={`mailto:${EMAIL}`} className="mt-3 flex items-center gap-2 rounded-xl px-4 py-3 text-white/80 transition-colors hover:bg-white/5">
                <MailIcon className="h-4 w-4 text-amber" />
                <span className="text-sm">{EMAIL}</span>
              </a>
              <p className="mt-3 flex items-center gap-2 px-4 text-sm text-white/55">
                <ClockIcon className="h-4 w-4 text-amber" /> Mon – Sat · 10 AM – 7 PM IST
              </p>
            </div>

            {/* addresses */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <LocationMap label={ADDRESSES.office.label} query={ADDRESSES.office.lines.join(", ")} href={ADDRESSES.office.maps} />
                <address className="mt-2 not-italic text-xs leading-relaxed text-white/60">{ADDRESSES.office.lines.join(" · ")}</address>
              </div>
              <div>
                <LocationMap label={ADDRESSES.plant.label} query={ADDRESSES.plant.lines.join(", ")} href={ADDRESSES.plant.maps} />
                <address className="mt-2 not-italic text-xs leading-relaxed text-white/60">{ADDRESSES.plant.lines.join(" · ")}</address>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
