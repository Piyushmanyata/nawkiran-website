import React from "react";
import { SITE_URL } from "@/lib/site";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  // Generate JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? new URL(item.href, SITE_URL).toString() : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.11em] text-slate">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-steel/70">/</span>}
              {isLast || !item.href ? (
                <span className="text-sunrise font-bold">{item.label}</span>
              ) : (
                <a href={item.href} className="hover:text-navy transition-colors">
                  {item.label}
                </a>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
