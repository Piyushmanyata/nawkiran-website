// Full product catalogue for Nawkiran Polyplast — transcribed from the official catalog.
// Each PET preform is sold by NECK SIZE (mm) and WEIGHT (grams).

export type NeckSpec = {
  size: string; // neck finish size, e.g. "28 MM"
  weights: number[]; // available weights in grams
};

export type Product = {
  id: string;
  name: string;
  short: string; // one-line label
  use: string; // primary application
  description: string;
  necks: NeckSpec[];
  accent: string; // per-category accent color (hex)
  illustration: "star" | "pco1810" | "pco1881" | "jar" | "fridge" | "ropp";
};

export const products: Product[] = [
  {
    id: "3-star",
    name: "3 Star",
    short: "Water & beverage preforms",
    use: "Packaged drinking water & general beverage bottles",
    description:
      "Our most versatile range — lightweight, high-clarity preforms engineered for packaged drinking water and everyday beverage bottles across the widest weight span we make.",
    accent: "#f4a23b",
    illustration: "star",
    necks: [
      { size: "26 / 22 MM", weights: [7.1, 9.5, 10.2, 15.8] },
      {
        size: "28 MM",
        weights: [8.6, 9.4, 11.6, 12.5, 13.1, 14.5, 17.5, 18.4, 19.1, 21, 26.5, 30, 33.1],
      },
    ],
  },
  {
    id: "1810-pco",
    name: "1810 PCO",
    short: "Carbonated soft-drink preforms",
    use: "Pressure-rated CSD & carbonated beverage bottles",
    description:
      "The classic tall PCO-1810 finish, built to hold carbonation pressure with a reinforced threaded neck and support ring for dependable capping on high-speed lines.",
    accent: "#f5793b",
    illustration: "pco1810",
    necks: [{ size: "28 MM", weights: [13.5, 16, 18, 21, 24.5, 27, 29, 31] }],
  },
  {
    id: "1881-pco",
    name: "1881 PCO",
    short: "Short-neck CSD preforms",
    use: "Modern lightweight carbonated bottles",
    description:
      "The modern short-neck PCO-1881 standard — less material in the finish, lower weight and faster filling, without compromising the seal on carbonated products.",
    accent: "#ef5a4c",
    illustration: "pco1881",
    necks: [{ size: "28 MM", weights: [10.5, 11.5, 15.5, 22, 24, 26.5, 28.5, 30.5, 52] }],
  },
  {
    id: "jar",
    name: "Jar",
    short: "Wide-mouth jar preforms",
    use: "Confectionery, dry-food, pharma & FMCG jars",
    description:
      "The broadest neck range we offer — from compact 38 MM to wide 120 MM mouths — for transparent jars used across food, confectionery and FMCG packaging.",
    accent: "#5aa0e6",
    illustration: "jar",
    necks: [
      { size: "38 MM", weights: [5.5, 7, 9, 10] },
      { size: "48 MM", weights: [63, 73] },
      { size: "53 MM", weights: [13, 14.5, 17, 24.5, 28] },
      { size: "63 MM", weights: [18] },
      { size: "83 MM", weights: [29.5, 33, 40, 42, 47, 51] },
      { size: "96 MM", weights: [34, 50] },
      { size: "120 MM", weights: [70, 74, 75, 80, 82, 85, 90, 95, 101.5] },
    ],
  },
  {
    id: "fridge-bottle",
    name: "Fridge Bottle",
    short: "Refrigerator bottle preforms",
    use: "Reusable fridge & water-dispenser bottles",
    description:
      "Sturdier preforms for refillable fridge and dispenser bottles, available across four neck finishes for a comfortable grip and a reliable, reusable seal.",
    accent: "#4fb3a6",
    illustration: "fridge",
    necks: [
      { size: "29 MM", weights: [40, 44, 50] },
      { size: "36 MM", weights: [55] },
      { size: "38 MM", weights: [25] },
      { size: "46 MM", weights: [41, 49] },
    ],
  },
  {
    id: "ropp",
    name: "ROPP",
    short: "Aluminium screw-cap preforms",
    use: "Edible oil, liquor & pharma ROPP bottles",
    description:
      "Roll-On Pilfer-Proof finishes designed for aluminium screw caps — the go-to for edible oil, liquor and pharmaceutical bottles that need a tamper-evident seal.",
    accent: "#c79248",
    illustration: "ropp",
    necks: [
      { size: "25 MM", weights: [10.5, 14.5, 16] },
      { size: "28 MM", weights: [18, 24, 26, 28, 30] },
    ],
  },
];

// "Coming shortly" — noted on the catalog.
export const upcoming = "27.5 g (26 / 22 mm) and 33 g in 29 mm neck are coming shortly.";

// Derived helpers
export const totalVariants = products.reduce(
  (sum, p) => sum + p.necks.reduce((s, n) => s + n.weights.length, 0),
  0,
);

export function weightRange(p: Product): [number, number] {
  const all = p.necks.flatMap((n) => n.weights);
  return [Math.min(...all), Math.max(...all)];
}

export function neckSizes(p: Product): string {
  return p.necks.map((n) => n.size.replace(" MM", "")).join(" · ") + " mm";
}

// ── Shared helpers used across Products, ProductDetailInteractive, SpecTable,
//    CartDrawer, AddedToCartToast — defined once to stay DRY. ──────────────

// Resin tint per product family — single source of truth for all illustrations.
export const PRODUCT_TINT: Record<string, "blue" | "amber" | "clear"> = {
  "3-star": "blue",
  "1810-pco": "clear",
  "1881-pco": "clear",
  jar: "amber",
  "fridge-bottle": "blue",
  ropp: "amber",
};

export function neckNumbers(size: string): number[] {
  return (size.match(/\d+(?:\.\d+)?/g) ?? []).map(Number);
}

export function primaryNeckMm(size: string): number {
  const nums = neckNumbers(size);
  return nums.length ? Math.max(...nums) : 28;
}

export function formatNeck(size: string): string {
  return size.replace(/\s*\/\s*/g, "/").replace(/\s*MM\b/g, " mm");
}

// Mid-weight option — a sensible default when first selecting a neck.
export function defaultWeight(neck: NeckSpec): number {
  return neck.weights[Math.floor(neck.weights.length / 2)] ?? neck.weights[0];
}

export function neckMinMax(p: Product): [number, number] {
  const nums = p.necks.flatMap((n) => neckNumbers(n.size));
  return [Math.min(...nums), Math.max(...nums)];
}

export function productBadge(p: Product): string {
  const [nmin, nmax] = neckMinMax(p);
  const [wmin, wmax] = weightRange(p);
  const neck = nmin === nmax ? `${nmin} mm` : `${nmin}-${nmax} mm`;
  return `${neck} / ${wmin}-${wmax} g`;
}
