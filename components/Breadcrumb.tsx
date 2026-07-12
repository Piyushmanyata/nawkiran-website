import React from "react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.11em] text-slate">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-steel/70">/</span>}
            {isLast || !item.href ? (
              <span className="text-sunrise-ink font-bold">{item.label}</span>
            ) : (
              <a href={item.href} className="hover:text-navy transition-colors">
                {item.label}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
