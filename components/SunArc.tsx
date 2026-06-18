"use client";

import { motion, useReducedMotion } from "motion/react";
import { DAWN_EASE } from "./motion";

const ARCS = [
  { r: 13, color: "#e23b2e" },
  { r: 21, color: "#f15a2b" },
  { r: 29, color: "#f7861f" },
  { r: 37, color: "#f9a826" },
  { r: 45, color: "#fbc01f" },
];
const CX = 50;
const CY = 50;

// The brand signature: three+ concentric sunrise arcs that draw themselves on
// load (left→right), then pulse once — "a new ray of light".
export function AnimatedArc({ className, pulse = true }: { className?: string; pulse?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 100 54"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      initial={false}
      animate={pulse && !reduce ? { scale: [1, 1, 1.05, 1] } : undefined}
      transition={pulse && !reduce ? { duration: 1.4, times: [0, 0.6, 0.8, 1], ease: "easeOut" } : undefined}
      style={{ transformOrigin: "50% 100%" }}
    >
      {ARCS.map((a, i) => (
        <motion.path
          key={i}
          d={`M ${CX - a.r} ${CY} A ${a.r} ${a.r} 0 0 1 ${CX + a.r} ${CY}`}
          stroke={a.color}
          strokeWidth={4.6}
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: DAWN_EASE, delay: 0.05 + i * 0.08 }}
        />
      ))}
    </motion.svg>
  );
}

// Static small arc — used as the bullet glyph and the section divider.
export function MiniArc({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 54" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {ARCS.map((a, i) => (
        <path
          key={i}
          d={`M ${CX - a.r} ${CY} A ${a.r} ${a.r} 0 0 1 ${CX + a.r} ${CY}`}
          stroke={a.color}
          strokeWidth={4.6}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

// Centered sunrise divider with steel hairlines, between major light sections.
export function SectionDivider() {
  return (
    <div className="shell flex items-center gap-5 py-4" aria-hidden="true">
      <span className="h-px flex-1 bg-steel" />
      <MiniArc className="h-5 w-auto opacity-90" />
      <span className="h-px flex-1 bg-steel" />
    </div>
  );
}
