import Image from "next/image";
import type { AptusFamilySlug } from "@/lib/aptus";
import cosmeticBottles from "../../public/cosmetic-bottles.png";
import pharmaBottles from "../../public/pharma-bottles.png";
import plasticClosures from "../../public/plastic-closures.png";

const IMAGES: Record<AptusFamilySlug, any> = {
  "cosmetic-bottles": cosmeticBottles,
  "pharma-bottles": pharmaBottles,
  "plastic-closures": plasticClosures,
};

const ALTS: Record<AptusFamilySlug, string> = {
  "cosmetic-bottles": "Premium cosmetic PET bottles collection",
  "pharma-bottles": "Amber-colored PET pharmaceutical liquid bottles",
  "plastic-closures": "Vibrant colored plastic closures and caps",
};

export function AptusCatalogCrop({ slug }: { slug: AptusFamilySlug }) {
  const image = IMAGES[slug];
  const alt = ALTS[slug];

  return (
    <div className="relative h-full w-full bg-dawn/40 overflow-hidden">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 400px"
        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </div>
  );
}
