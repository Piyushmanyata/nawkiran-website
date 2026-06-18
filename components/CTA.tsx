import type { ReactNode } from "react";
import { waLink, EMAIL } from "@/lib/site";
import { WhatsAppIcon, PhoneIcon, MailIcon, ArrowRight } from "./icons";

type Variant = "primary" | "ghost" | "ghost-dark" | "soft";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.9375rem] font-semibold tracking-tight transition-all duration-200 will-change-transform";

const variants: Record<Variant, string> = {
  // dawn-orange action — the brand's one warm accent
  primary: "bg-sunrise text-white shadow-[0_8px_24px_-8px_rgba(243,107,33,0.6)] hover:shadow-[0_12px_30px_-8px_rgba(243,107,33,0.7)] hover:-translate-y-0.5",
  // outline on light surfaces
  ghost: "border border-steel bg-white text-navy hover:border-sunrise hover:text-sunrise",
  // outline on dark surfaces
  "ghost-dark": "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
  // tinted soft
  soft: "bg-cloud text-navy hover:bg-steel/70",
};

// Sunrise-arc hover halo that blooms behind the pill (decoration that carries the brand motif).
function Halo() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-3 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(245,158,31,0.55),rgba(243,107,33,0.25),transparent)] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
    />
  );
}

export function Button({
  children,
  href,
  variant = "primary",
  className,
  newTab,
  withArrow,
  halo,
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
  newTab?: boolean;
  withArrow?: boolean;
  halo?: boolean;
}) {
  return (
    <a
      href={href}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${variants[variant]} ${className ?? ""}`}
    >
      {(halo ?? variant === "primary") && <Halo />}
      {children}
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </a>
  );
}

export function WhatsAppButton({
  text,
  label = "Get a quote on WhatsApp",
  variant = "primary",
  className,
}: {
  text?: string;
  label?: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Button href={waLink(text)} variant={variant} newTab halo className={className}>
      <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />
      {label}
    </Button>
  );
}

export function CallButton({
  tel,
  label,
  variant = "ghost",
  className,
}: {
  tel: string;
  label: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Button href={`tel:${tel}`} variant={variant} className={className}>
      <PhoneIcon className="h-[1.05rem] w-[1.05rem]" />
      {label}
    </Button>
  );
}

export function EmailButton({
  subject = "PET Preform Enquiry",
  body = "Hello Nawkiran Polyplast,%0D%0A%0D%0AI would like a quote for the following PET preforms:%0D%0A- Family / neck size / weight:%0D%0A- Approx. monthly quantity:%0D%0A%0D%0AThank you.",
  label = "Email us",
  variant = "ghost",
  className,
}: {
  subject?: string;
  body?: string;
  label?: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Button href={`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`} variant={variant} className={className}>
      <MailIcon className="h-[1.05rem] w-[1.05rem]" />
      {label}
    </Button>
  );
}
