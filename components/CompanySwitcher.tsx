import Link from "next/link";
import { motion } from "motion/react";

type CompanySwitcherProps = {
  current: "nawkiran" | "aptus";
  onNavigate?: () => void;
  className?: string;
};

export function CompanySwitcher({ current, onNavigate, className = "" }: CompanySwitcherProps) {
  return (
    <nav
      aria-label="Choose company"
      className={`relative inline-flex rounded-full border border-steel bg-cloud p-1 ${className}`}
    >
      {[
        { id: "nawkiran", label: "Nawkiran", href: "/" },
        { id: "aptus", label: "Aptus", href: "/aptus" },
      ].map((company) => {
        const active = current === company.id;
        return (
          <Link
            key={company.id}
            href={company.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`relative inline-flex min-h-8 items-center rounded-full px-4.5 py-1 text-xs font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise ${
              active ? "text-white" : "text-slate hover:text-navy"
            }`}
          >
            {active && (
              <motion.span
                layoutId="activeCompanyPill"
                className="absolute inset-0 bg-navy rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{company.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
