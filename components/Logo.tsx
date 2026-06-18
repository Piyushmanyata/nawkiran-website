// Brand mark for Nawkiran ("a new ray of light"): a sunrise of concentric arcs
// over the two-tone wordmark — NAW in navy, KIRAN in sunrise orange.

export function SunMark({ className }: { className?: string }) {
  const arcs = [
    { r: 13, color: "#e23b2e", w: 4.6 },
    { r: 21, color: "#f15a2b", w: 4.6 },
    { r: 29, color: "#f7861f", w: 4.6 },
    { r: 37, color: "#f9a826", w: 4.6 },
    { r: 45, color: "#fbc01f", w: 4.6 },
  ];
  const cx = 50;
  const cy = 50;
  return (
    <svg viewBox="0 0 100 54" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {arcs.map((a, i) => (
        <path
          key={i}
          d={`M ${cx - a.r} ${cy} A ${a.r} ${a.r} 0 0 1 ${cx + a.r} ${cy}`}
          stroke={a.color}
          strokeWidth={a.w}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export function Logo({
  className,
  light = false,
  showMark = true,
}: {
  className?: string;
  light?: boolean;
  showMark?: boolean;
}) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className ?? ""}`}>
      {showMark && <SunMark className="mb-1 h-3.5 w-auto" />}
      <span className="font-display text-xl font-extrabold tracking-tight">
        <span className={light ? "text-white" : "text-navy"}>NAW</span>
        <span className="text-sunrise">KIRAN</span>
      </span>
    </span>
  );
}
