"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal, DAWN_EASE } from "./motion";

interface TestimonialData {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const TESTIMONIALS: TestimonialData[] = [
  {
    quote: "The consistency from Nawkiran is what sets them apart — same weight, same clarity, every single batch.",
    author: "Rajesh Kumar",
    role: "Operations Head",
    company: "Purified Water Co.",
  },
  {
    quote: "We switched to Nawkiran two years ago and haven't looked back. Their turnaround time is unmatched.",
    author: "Anita Sharma",
    role: "Purchase Manager",
    company: "Eastern Beverages Pvt. Ltd.",
  },
  {
    quote: "From jar preforms to bottle preforms, one vendor covers our entire packaging range. That simplifies everything.",
    author: "Sanjay Patel",
    role: "Managing Director",
    company: "Premium Packaging Solutions",
  },
];

export function Testimonial() {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
  };

  return (
    <section id="testimonials" className="relative overflow-hidden bg-dawn py-20 md:py-28">
      {/* Background ambient sunset glow */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 h-[35rem] w-[35rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-amber) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="shell relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Heading */}
          <div className="flex flex-col justify-center lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Client stories</p>
              <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,3rem)] text-navy leading-tight">
                Trusted by leading brands.
              </h2>
              <p className="mt-4 text-base text-slate">
                We support bottling operations across the region. Here is what our partners say about Nawkiran’s reliability and quality.
              </p>

              {/* Slider Arrows */}
              <div className="mt-8 flex gap-3">
                <button
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-steel bg-white text-navy transition-all duration-200 hover:border-sunrise hover:text-sunrise hover:-translate-x-0.5"
                  aria-label="Previous testimonial"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-steel bg-white text-navy transition-all duration-200 hover:border-sunrise hover:text-sunrise hover:translate-x-0.5"
                  aria-label="Next testimonial"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Carousel Box */}
          <div className="relative flex items-center lg:col-span-8">
            <Reveal className="w-full">
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="relative min-h-[280px] w-full rounded-3xl border border-steel/80 bg-white p-8 md:p-12 shadow-sm select-none touch-pan-y"
              >
                
                {/* Large Decorative Quote Symbol */}
                <svg
                  className="absolute right-8 top-8 h-20 w-20 text-sunrise/5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <div className="relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.45, ease: DAWN_EASE }}
                    >
                      <blockquote className="font-display text-xl md:text-2xl font-semibold leading-relaxed text-navy">
                        “{TESTIMONIALS[index].quote}”
                      </blockquote>
                      
                      <div className="mt-8 flex items-center gap-4">
                        <div className="h-10 w-1 bg-gradient-to-b from-sunrise to-amber rounded-full" />
                        <div>
                          <cite className="not-italic font-display text-base font-bold text-navy">
                            {TESTIMONIALS[index].author}
                          </cite>
                          <p className="text-xs text-slate uppercase tracking-wider font-semibold mt-0.5">
                            {TESTIMONIALS[index].role} · <span className="text-sunrise">{TESTIMONIALS[index].company}</span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Dot Indicators */}
                <div className="absolute bottom-6 right-12 flex gap-2">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === index ? "w-6 bg-sunrise" : "w-2 bg-steel hover:bg-slate"
                      }`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
