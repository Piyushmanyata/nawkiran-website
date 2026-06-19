// Headline metrics. Volume figures are derived from real dispatch records
// (≈45,000 tonnes delivered, 250+ customers across 13+ states);
// rounded down to conservative, defensible marketing numbers.

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  hint: string;
};

export const heroStats: Stat[] = [
  { value: 400, suffix: "+ T", label: "Monthly capacity", hint: "tonnes of preforms every month" },
  { value: 80, suffix: "+", label: "Product types", hint: "neck-size & weight combinations" },
  { value: 11, label: "Preform machines", hint: "Ferromatik · Toshiba · Windsor" },
];

export const impactStats: Stat[] = [
  { value: 45000, suffix: "+", label: "Delivered to date", hint: "tonnes of PET preforms dispatched" },
  { value: 250, suffix: "+", label: "Customers served", hint: "bottlers, fillers & converters" },
  { value: 13, suffix: "+", label: "States reached", hint: "across eastern & northern India" },
];

export const capabilities = [
  {
    title: "400+ tonnes / month",
    body: "A monthly production capacity of over 400 tonnes keeps high-volume bottlers supplied without interruption.",
  },
  {
    title: "11 preform machines",
    body: "A floor of 11 injection machines from Ferromatik, Toshiba and Windsor — the brands the industry trusts.",
  },
  {
    title: "80+ product types",
    body: "From 5.5 g jar preforms to 101.5 g wide-mouth necks — one partner for your entire packaging range.",
  },
  {
    title: "Consistent quality",
    body: "Tight control over weight, clarity and neck finish so every preform performs the same on your line.",
  },
];
