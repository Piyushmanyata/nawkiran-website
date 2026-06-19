import { Reveal, Stagger, StaggerItem } from "./motion";
import { MiniArc } from "./SunArc";

const POINTS = [
  {
    title: "Consistency you can fill on",
    body: "Tight control over weight, clarity and neck finish — so every preform behaves the same on your blow-moulding and filling lines.",
  },
  {
    title: "The full range, one partner",
    body: "From 5.5 g jar preforms to 101.5 g wide-mouth necks across six families and 80+ specs. One vendor for your entire packaging range.",
  },
  {
    title: "Answers within minutes",
    body: "Reach a real person on WhatsApp during business hours and get pricing and availability fast — not a ticket number.",
  },
  {
    title: "Capacity to grow with you",
    body: "Over 400 tonnes a month across 11 machines means real headroom when your demand spikes or a season turns.",
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
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-steel bg-white/70 p-5">
              <MiniArc className="mt-1 h-6 w-auto shrink-0" />
              <p className="text-[1.0625rem] leading-relaxed text-navy">
                <span className="font-semibold">Nawkiran means “a new ray of light.”</span> That’s how we
                treat every order — a clean, dependable, on-spec start, whether it’s your first trial run
                or your fifty-thousandth dispatch.
              </p>
            </div>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2" gap={0.08}>
            {POINTS.map((p) => (
              <StaggerItem key={p.title} className="card h-full p-5">
                <MiniArc className="h-4 w-auto" />
                <h3 className="mt-3 font-display text-lg font-semibold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
