import { type Product, formatNeck } from "@/lib/products";

export function SpecTable({ product }: { product: Product }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-steel bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-steel bg-cloud text-xs font-semibold uppercase tracking-[0.12em] text-navy">
            <th className="px-6 py-4">Neck Finish</th>
            <th className="px-6 py-4">Available Weights (Grams)</th>
            <th className="px-6 py-4">Primary Application</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-steel text-sm text-navy">
          {product.necks.map((n, i) => (
            <tr key={i} className="hover:bg-mist/30 transition-colors">
              <td className="px-6 py-4.5 font-semibold text-navy">
                {formatNeck(n.size)}
              </td>
              <td className="px-6 py-4.5 font-mono text-[0.9375rem] text-sunrise-ink font-semibold">
                {n.weights.map(w => `${w}g`).join(", ")}
              </td>
              <td className="px-6 py-4.5 text-slate leading-relaxed">
                {product.use}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
