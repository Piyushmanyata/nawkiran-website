import Link from "next/link";

const POINTS = [
  ["Lower virgin-resin exposure", "Use the right recycled-content mix for the application and supply brief."],
  ["Cost-aware decisions", "Compare grade, availability, colour, compliance, and price before committing."],
  ["Designed for the next loop", "Keep bottle and preform choices aligned with collection and recycling realities."],
] as const;

export function RpetSection() {
  return (
    <section id="rpet" className="bg-white">
      <div className="shell section">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">The next PET cycle</p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.2rem)]">rPET-ready thinking for the future of bottles.</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate">
              Recycled PET is becoming a practical part of packaging strategy. Nawkiran helps buyers think through the material mix before a production run—so cost, clarity, performance, and circularity stay in the same conversation.
            </p>
            <Link href="/#contact" className="mt-7 inline-flex min-h-11 items-center rounded-full bg-sunrise px-5 text-sm font-semibold text-white hover:-translate-y-0.5">
              Discuss an rPET brief →
            </Link>
          </div>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-steel bg-steel sm:grid-cols-3">
            {POINTS.map(([title, body]) => (
              <div key={title} className="bg-dawn p-6 sm:p-7">
                <p className="font-display text-lg font-semibold text-navy">{title}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
