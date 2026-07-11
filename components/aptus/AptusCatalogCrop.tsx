import Image from "next/image";
import aptusCatalog from "../../Aptus Catalog.png";
import type { AptusFamilySlug } from "@/lib/aptus";

const COLUMN: Record<AptusFamilySlug, number> = {
  "cosmetic-bottles": 0,
  "pharma-bottles": 1,
  "plastic-closures": 2,
};

export function AptusCatalogCrop({ slug }: { slug: AptusFamilySlug }) {
  const column = COLUMN[slug];

  return (
    <div className="relative h-full w-full overflow-hidden bg-white" aria-hidden="true">
      <Image
        src={aptusCatalog}
        alt=""
        sizes="(max-width: 1024px) 300vw, 100vw"
        className="absolute left-0 top-0 h-auto max-w-none"
        style={{
          width: "300%",
          transform: `translate(${-column * 33.3333}%, -32.9%)`,
          transformOrigin: "left top",
        }}
      />
    </div>
  );
}
