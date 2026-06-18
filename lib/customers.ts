// A curated selection of real customers (from dispatch records) for the
// "trusted by" marquee, plus state-wise reach for the coverage section.

export const featuredCustomers: string[] = [
  "IVL Dhunseri Petrochem Industries",
  "RGP Impex Private Limited",
  "Vasudev Enterprise",
  "Ken Pet",
  "Fortune Forever",
  "Trishakti Polyplast",
  "SSKP Polymers Pvt. Ltd.",
  "Maa Biraja Packaging",
  "Tilottama Food & Beverages",
  "Lokanath Industry",
  "Modern Plastic Industries",
  "Crown Plastic",
  "Maskara Impex LLP",
  "Rishabh Plastic Industries",
  "Balaji International",
  "Essem Udyog Pvt Ltd",
  "Shrinath Trade Ventures Pvt Ltd",
  "Purulia Bottling Pvt Ltd",
  "Indopet Polymer Pvt. Ltd.",
  "SGS Khanna Food & Beverages",
  "Hind Pets & Jars",
  "Emkay Polymers Pvt. Ltd.",
  "Fabulous Commotrade LLP",
  "Ishaan Plastics Pvt Ltd",
];

export type StateReach = { state: string; customers: number };

// Unique customers per state (rounded for the bigger ones).
export const stateReach: StateReach[] = [
  { state: "West Bengal", customers: 586 },
  { state: "Odisha", customers: 15 },
  { state: "Jharkhand", customers: 14 },
  { state: "Bihar", customers: 9 },
  { state: "Assam", customers: 7 },
  { state: "Tripura", customers: 3 },
  { state: "Mizoram", customers: 3 },
  { state: "Nagaland", customers: 2 },
  { state: "Maharashtra", customers: 2 },
  { state: "Telangana", customers: 1 },
  { state: "Uttarakhand", customers: 1 },
  { state: "Haryana", customers: 1 },
  { state: "Tamil Nadu", customers: 1 },
];
