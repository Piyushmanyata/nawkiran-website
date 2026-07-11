import { Reveal, Stagger, StaggerItem } from "./motion";
import { MiniArc } from "./SunArc";

const POINTS = [
  {
    title: "Consistency you can fill on",
    body: "Tight control over weight, clarity and neck finish — so every preform behaves the same on your blow-moulding and filling lines.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  },
  {
    title: "The full range, one partner",
    body: "From 5.5 g jar preforms to 101.5 g wide-mouth necks across six families and 80+ specs. One vendor for your entire packaging range.",
    icon: "m12 3 9 5-9 5-9-5 9-5Zm9 9-9 5-9-5m18 4-9 5-9-5",
  },
  {
    title: "Answers within minutes",
    body: "Reach a real person on WhatsApp during business hours and get pricing and availability fast — not a ticket number.",
    icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  },
  {
    title: "Capacity to grow with you",
    body: "Over 400 tonnes a month across 11 machines means real headroom when your demand spikes or a season turns.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
];

export function WhyNawkiran() {
  return (
    <section id="about" className="bg-dawn">
      <div className="shell section">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Why Nawkiran</p>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,3rem)]">A fresh, on-spec start — every order.</h2>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-steel bg-white/70 p-5 shadow-sm">
              <MiniArc className="mt-1 h-6 w-auto shrink-0" />
              <p className="text-[1.0625rem] leading-relaxed text-navy">
                <span className="font-semibold">Nawkiran means &ldquo;a new ray of light.&rdquo;</span> That&apos;s how we
                treat every order — a clean, dependable, on-spec start, whether it&apos;s your first trial run
                or your fifty-thousandth dispatch.
              </p>
            </div>
          </Reveal>

          <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-steel bg-steel sm:grid-cols-2" gap={0.08}>
            {POINTS.map((p) => (
              <StaggerItem key={p.title} className="group bg-dawn p-5 sm:p-6 transition-colors duration-300 hover:bg-white">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sunrise/10 text-sunrise transition-colors group-hover:bg-sunrise group-hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={p.icon} />
                    </svg>
                  </span>
                  <h3 className="font-display text-base font-semibold text-navy">{p.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
