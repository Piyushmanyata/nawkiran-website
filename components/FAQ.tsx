"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "./icons";
import { Reveal } from "./motion";

const FAQS = [
  {
    question: "What types of PET preforms does Nawkiran Polyplast manufacture?",
    answer:
      "Nawkiran Polyplast manufactures 6 families of PET preforms: 3-Star neck (packaged drinking water), PCO 1810 & PCO 1881 (carbonated soft drinks & hot-fill juices), jar preforms (confectionery & dry food), fridge-bottle preforms (reusable water bottles), and ROPP neck preforms (edible oil, pharmaceuticals, liquor). Neck sizes range from 22 mm to 120 mm.",
  },
  {
    question: "What is your monthly PET preform production capacity?",
    answer:
      "Nawkiran Polyplast has a monthly production capacity of over 400 tonnes. We run 11 state-of-the-art preform injection moulding machines from industry-leading brands like Ferromatik, Toshiba, and Windsor, allowing us to supply large-volume packaging contracts consistently.",
  },
  {
    question: "Where is the Nawkiran Polyplast plant and office located?",
    answer:
      "Our registered corporate office is located at Poddar Court, 18 Rabindra Sarani, Gate No. 3, 5th Floor, Kolkata – 700001, West Bengal, India. Our primary manufacturing plant operates out of the Balaji Complex on Old Delhi Road, Baidyabati, West Bengal.",
  },
  {
    question: "How can I request a quote or product catalog?",
    answer:
      "You can request a custom quote or physical/digital catalogs by clicking our WhatsApp CTA buttons (quotes usually respond within minutes), calling us at +91 98311 85794, or emailing nawkiranpolyplast@gmail.com. When requesting, please specify your desired neck finish (mm), target weight (g), and estimated monthly volumes.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white">
      <div className="shell section border-t border-steel">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,3rem)]">Frequently Asked Questions</h2>
          <p className="mt-4 text-slate text-lg">
            Find quick answers to common questions about our PET preform specifications, production capacity, and order options.
          </p>
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-button-${index}`;
            const panelId = `faq-panel-${index}`;
            return (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-sunrise/40 bg-white shadow-[0_4px_20px_-8px_rgba(243,107,33,0.15)]"
                    : "border-steel bg-cloud/50 hover:bg-white hover:border-sunrise/20"
                }`}
              >
                {/* Active left accent bar */}
                <div className={`absolute left-0 top-0 h-full w-0.5 rounded-l-2xl bg-sunrise transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-display font-semibold text-navy hover:text-sunrise transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className={`shrink-0 rounded-full p-1 transition-all duration-300 ${isOpen ? "rotate-45 bg-sunrise/10 text-sunrise" : "text-slate hover:text-sunrise"}`}>
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="border-t border-steel/60 bg-dawn/30 px-5 py-4 text-[0.9375rem] leading-relaxed text-slate">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
