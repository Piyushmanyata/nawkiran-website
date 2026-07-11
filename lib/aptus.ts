export const APTUS_SITE_PATH = "/aptus" as const;

export const APTUS = {
  name: "Aptus Packaging LLP",
  shortName: "Aptus",
  email: "aptuspackaging@gmail.com",
  phones: [
    { label: "+91 98311 85794", tel: "+919831185794", primary: false },
    { label: "+91 99006 88790", tel: "+919900688790", primary: true },
  ],
  whatsapp: {
    number: "919900688790",
    display: "+91 99006 88790",
    defaultText:
      "Hello Aptus Packaging LLP, I would like to enquire about your packaging products.",
  },
  addresses: {
    office: {
      label: "Head Office Address",
      lines: [
        "18 Rabindra Sarani Gate No.3,",
        "5th Floor Poddar Court, Kolkata 700 001",
      ],
    },
    factory: {
      label: "Factory Address",
      lines: [
        "Vill. Palarah PO. Bighati,",
        "PS. Bhadreswar, Dist. Hooghly",
        "West Bengal 712124",
      ],
    },
  },
  about:
    "Aptus Packaging LLP is mainly engaged in manufacturing of Pharma Bottles, Cosmetic pet Bottles and compression molding caps (SACMI) for water closures. Aptus has the best machines which manufactures pharma bottles along with we have SACMI machine (APTUS brand) for making water closures for mineral water. The daily production is 7.9 lacs caps per day. Moroover, we have 5 single stage ASB machine for pharma, Cosmetic and oil industry. We are making close to 1,50,000 bottles of all range per day.",
  claims: [
    { label: "Daily Production", prefix: "", to: 7.9, decimals: 1, suffix: " Lacs Caps" },
    { label: "Bottle Production", prefix: "Close to ", to: 150000, decimals: 0, suffix: " Bottles / Day" },
    { label: "Machines", prefix: "", to: 5, decimals: 0, suffix: " Single Stage ASB Machines" },
  ],
  qualities: [
    { title: "Premium Quality", icon: "award" },
    { title: "Advanced Technology", icon: "cpu" },
    { title: "High Production Capacity", icon: "factory" },
    { title: "Reliable & Trusted", icon: "shield" },
  ],
  machineClaim: "Advanced Machines Quality Assured",
} as const;

export type AptusFamilySlug =
  | "cosmetic-bottles"
  | "pharma-bottles"
  | "plastic-closures";

export type AptusBottleVariant = {
  readonly kind: "bottle";
  readonly id: string;
  readonly neckSizeMm: number;
  readonly capacityMl: number;
  readonly weightG: number;
  readonly packingSize: number;
  readonly item: string;
};

export type AptusClosureVariant = {
  readonly kind: "closure";
  readonly id: string;
  readonly sizeMm: number;
  readonly product: string;
  readonly weightG: number;
  readonly packingSize: number;
};

export const aptusBottleVariants = [
  { kind: "bottle", id: "bottle-14-30-4_5-2400-agru", neckSizeMm: 14, capacityMl: 30, weightG: 4.5, packingSize: 2400, item: "AGRU" },
  { kind: "bottle", id: "bottle-19-50-8-1944-oval", neckSizeMm: 19, capacityMl: 50, weightG: 8, packingSize: 1944, item: "OVAL" },
  { kind: "bottle", id: "bottle-19-60-8-1848-boston", neckSizeMm: 19, capacityMl: 60, weightG: 8, packingSize: 1848, item: "BOSTON" },
  { kind: "bottle", id: "bottle-19-95-12-1024-oval", neckSizeMm: 19, capacityMl: 95, weightG: 12, packingSize: 1024, item: "OVAL" },
  { kind: "bottle", id: "bottle-19-100-12-1080-boston", neckSizeMm: 19, capacityMl: 100, weightG: 12, packingSize: 1080, item: "BOSTON" },
  { kind: "bottle", id: "bottle-19-100-12-1120-oval", neckSizeMm: 19, capacityMl: 100, weightG: 12, packingSize: 1120, item: "OVAL" },
  { kind: "bottle", id: "bottle-19-120-12-896-oval", neckSizeMm: 19, capacityMl: 120, weightG: 12, packingSize: 896, item: "OVAL" },
  { kind: "bottle", id: "bottle-22-15-5-2912-round", neckSizeMm: 22, capacityMl: 15, weightG: 5, packingSize: 2912, item: "ROUND" },
  { kind: "bottle", id: "bottle-22-25-5-2816-honey", neckSizeMm: 22, capacityMl: 25, weightG: 5, packingSize: 2816, item: "HONEY" },
  { kind: "bottle", id: "bottle-25-30-8_5-1680-round", neckSizeMm: 25, capacityMl: 30, weightG: 8.5, packingSize: 1680, item: "ROUND" },
  { kind: "bottle", id: "bottle-25-50-8_5-1248-honey", neckSizeMm: 25, capacityMl: 50, weightG: 8.5, packingSize: 1248, item: "HONEY" },
  { kind: "bottle", id: "bottle-25-50-10-1920-oval", neckSizeMm: 25, capacityMl: 50, weightG: 10, packingSize: 1920, item: "OVAL" },
  { kind: "bottle", id: "bottle-25-60-10-1440-round", neckSizeMm: 25, capacityMl: 60, weightG: 10, packingSize: 1440, item: "ROUND" },
  { kind: "bottle", id: "bottle-25-100-10-800-round", neckSizeMm: 25, capacityMl: 100, weightG: 10, packingSize: 800, item: "ROUND" },
  { kind: "bottle", id: "bottle-25-100-11_5-800-round", neckSizeMm: 25, capacityMl: 100, weightG: 11.5, packingSize: 800, item: "ROUND" },
  { kind: "bottle", id: "bottle-25-100-12_5-800-round", neckSizeMm: 25, capacityMl: 100, weightG: 12.5, packingSize: 800, item: "ROUND" },
  { kind: "bottle", id: "bottle-25-100-12_5-1050-oval", neckSizeMm: 25, capacityMl: 100, weightG: 12.5, packingSize: 1050, item: "OVAL" },
  { kind: "bottle", id: "bottle-25-100-12_5-840-brute", neckSizeMm: 25, capacityMl: 100, weightG: 12.5, packingSize: 840, item: "BRUTE" },
  { kind: "bottle", id: "bottle-25-170-16-540-round", neckSizeMm: 25, capacityMl: 170, weightG: 16, packingSize: 540, item: "ROUND" },
  { kind: "bottle", id: "bottle-25-200-16-480-round", neckSizeMm: 25, capacityMl: 200, weightG: 16, packingSize: 480, item: "ROUND" },
  { kind: "bottle", id: "bottle-25-200-18-480-round", neckSizeMm: 25, capacityMl: 200, weightG: 18, packingSize: 480, item: "ROUND" },
  { kind: "bottle", id: "bottle-25-200-18-520-oval", neckSizeMm: 25, capacityMl: 200, weightG: 18, packingSize: 520, item: "OVAL" },
  { kind: "bottle", id: "bottle-25-200-18-544-brute", neckSizeMm: 25, capacityMl: 200, weightG: 18, packingSize: 544, item: "BRUTE" },
  { kind: "bottle", id: "bottle-25-450-23-252-round", neckSizeMm: 25, capacityMl: 450, weightG: 23, packingSize: 252, item: "ROUND" },
  { kind: "bottle", id: "bottle-25-450-26-252-round", neckSizeMm: 25, capacityMl: 450, weightG: 26, packingSize: 252, item: "ROUND" },
  { kind: "bottle", id: "bottle-25-450-26-243-altron", neckSizeMm: 25, capacityMl: 450, weightG: 26, packingSize: 243, item: "ALTRON" },
  { kind: "bottle", id: "bottle-25-450-28-252-altron", neckSizeMm: 25, capacityMl: 450, weightG: 28, packingSize: 252, item: "ALTRON" },
  { kind: "bottle", id: "bottle-25-450-28-243-altron", neckSizeMm: 25, capacityMl: 450, weightG: 28, packingSize: 243, item: "ALTRON" },
  { kind: "bottle", id: "bottle-25-450-33_5-240-round", neckSizeMm: 25, capacityMl: 450, weightG: 33.5, packingSize: 240, item: "ROUND" },
  { kind: "bottle", id: "bottle-28-450-26-243-altron", neckSizeMm: 28, capacityMl: 450, weightG: 26, packingSize: 243, item: "ALTRON" },
  { kind: "bottle", id: "bottle-28-450-28-243-altron", neckSizeMm: 28, capacityMl: 450, weightG: 28, packingSize: 243, item: "ALTRON" },
  { kind: "bottle", id: "bottle-28-450-33-216-bayer", neckSizeMm: 28, capacityMl: 450, weightG: 33, packingSize: 216, item: "BAYER" },
  { kind: "bottle", id: "bottle-28-450-33-252-round", neckSizeMm: 28, capacityMl: 450, weightG: 33, packingSize: 252, item: "ROUND" },
  { kind: "bottle", id: "bottle-28-450-38-252-round", neckSizeMm: 28, capacityMl: 450, weightG: 38, packingSize: 252, item: "ROUND" },
] as const satisfies readonly AptusBottleVariant[];

export const aptusClosureVariants = [
  { kind: "closure", id: "closure-27-three-start-alaska-1_35-8500", sizeMm: 27, product: "THREE START ALASKA", weightG: 1.35, packingSize: 8500 },
  { kind: "closure", id: "closure-27-three-start-alaska-1_45-8500", sizeMm: 27, product: "THREE START ALASKA", weightG: 1.45, packingSize: 8500 },
] as const satisfies readonly AptusClosureVariant[];

type AptusFamilyBase = {
  readonly slug: AptusFamilySlug;
  readonly name: string;
};

type AptusBottleFamily = AptusFamilyBase & {
  readonly kind: "bottle";
  readonly slug: "cosmetic-bottles" | "pharma-bottles";
  readonly variants: readonly AptusBottleVariant[];
};

type AptusClosureFamily = AptusFamilyBase & {
  readonly kind: "closure";
  readonly slug: "plastic-closures";
  readonly variants: readonly AptusClosureVariant[];
};

export type AptusFamily = AptusBottleFamily | AptusClosureFamily;

export const aptusFamilies = [
  {
    kind: "bottle",
    slug: "cosmetic-bottles",
    name: "Cosmetic PET Bottles",
    variants: aptusBottleVariants,
  },
  {
    kind: "bottle",
    slug: "pharma-bottles",
    name: "Pharma Bottles",
    variants: aptusBottleVariants,
  },
  {
    kind: "closure",
    slug: "plastic-closures",
    name: "Plastic Closures (Alaska)",
    variants: aptusClosureVariants,
  },
] as const satisfies readonly AptusFamily[];

export function getAptusFamily(slug: string): AptusFamily | undefined {
  return aptusFamilies.find((family) => family.slug === slug);
}

export function aptusWaLink(text: string = APTUS.whatsapp.defaultText) {
  return `https://wa.me/${APTUS.whatsapp.number}?text=${encodeURIComponent(text)}`;
}
