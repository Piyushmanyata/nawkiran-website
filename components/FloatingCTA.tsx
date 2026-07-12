"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { WhatsAppIcon, PhoneIcon } from "./icons";
import { PHONES, waLink } from "@/lib/site";

export function FloatingCTA() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();
  const primaryTel = PHONES.find((p) => p.primary)?.tel ?? PHONES[0].tel;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShow(window.scrollY > 640);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop / tablet: floating WhatsApp bubble */}
      <AnimatePresence>
        {show && (
          <motion.a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 20 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 20 }}
            transition={reduce ? { duration: 0 } : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="group fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-sunrise text-white shadow-[0_12px_30px_-6px_rgba(243,107,33,0.7)] sm:flex"
          >
            {!reduce && (
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-sunrise/40" style={{ animationDuration: "2.5s" }} />
            )}
            <WhatsAppIcon className="h-7 w-7" />
            <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-navy px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
              Chat on WhatsApp
            </span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* Mobile: sticky bottom Call + WhatsApp bar */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { y: 80 }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: 80 }}
            transition={reduce ? { duration: 0 } : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-steel bg-white/95 px-3.5 pt-3 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] backdrop-blur-xl sm:hidden"
          >
            <a
              href={`tel:${primaryTel}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-steel py-3 text-sm font-semibold text-navy"
            >
              <PhoneIcon className="h-4 w-4" /> Call now
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sunrise py-3 text-sm font-semibold text-white"
            >
              <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" /> WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
