export function LocationMap({ label, query, href }: { label: string; query: string; href: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-steel bg-white">
      <div className="h-40 bg-mist sm:h-44">
        <iframe
          title={`Map showing ${label}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 items-center justify-between px-4 text-sm font-semibold text-navy hover:text-sunrise-ink"
      >
        <span>{label}</span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
