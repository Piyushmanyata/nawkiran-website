import Link from "next/link";

type CompanySwitcherProps = {
  current: "nawkiran" | "aptus";
  onNavigate?: () => void;
  className?: string;
};

export function CompanySwitcher({ current, onNavigate, className = "" }: CompanySwitcherProps) {
  return (
    <nav
      aria-label="Choose company"
      className={`inline-flex rounded-full border border-steel bg-cloud p-1 ${className}`}
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
            className={`inline-flex min-h-8 items-center rounded-full px-3 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunrise ${
              active ? "bg-navy text-white" : "text-slate hover:bg-white hover:text-navy"
            }`}
          >
            {company.label}
          </Link>
        );
      })}
    </nav>
  );
}
