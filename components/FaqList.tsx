import Link from "next/link";
import type { FAQItem } from "@/lib/faq";

export function FaqList({ items }: { items: readonly FAQItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-steel bg-white transition-colors open:border-sunrise/45 open:shadow-sm"
        >
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display font-semibold text-navy marker:hidden [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span className="text-xl leading-none text-sunrise-ink transition-transform group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <p className="border-t border-steel/60 bg-dawn/40 px-5 py-4 text-sm leading-relaxed text-slate">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

export function FaqPage({
  title,
  description,
  items,
  backHref,
  backLabel,
}: {
  title: string;
  description: string;
  items: readonly FAQItem[];
  backHref: string;
  backLabel: string;
}) {
  return (
    <main id="main-content" className="min-h-screen bg-dawn pt-28 pb-20">
      <div className="shell">
        <Link href={backHref} className="text-sm font-semibold text-sunrise-ink hover:underline">← {backLabel}</Link>
        <div className="mt-8 max-w-3xl">
          <p className="eyebrow">Questions, answered</p>
          <h1 className="mt-3 text-[clamp(2.3rem,5vw,4rem)]">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate">{description}</p>
        </div>
        <div className="mt-10 max-w-3xl">
          <FaqList items={items} />
        </div>
      </div>
    </main>
  );
}
