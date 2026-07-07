// Headline metrics. Volume figures are derived from real dispatch records
// (≈45,000 tonnes delivered, 250+ customers across 13+ states);
// rounded down to conservative, defensible marketing numbers.
// Years of experience is derived from the founding year so it never goes stale.

import { FOUNDING_YEAR } from "./site";

export type CompanyStat = {
  prefix?: string;
  to: number;
  suffix: string;
  label: string;
  detail?: string;
};

const yearsExperience = new Date().getFullYear() - FOUNDING_YEAR;

// Single source of truth for the "track record" stat grid (Stats.tsx).
// First three carry provenance copy (the record); the rest are capacity facts.
export const companyStats: CompanyStat[] = [
  { to: 45000, suffix: "+", label: "Tonnes delivered", detail: "Cumulative PET preform dispatches from real plant records." },
  { to: 250, suffix: "+", label: "Customers served", detail: "Bottlers, fillers & converters — repeat buyers, not one-off leads." },
  { to: 13, suffix: "+", label: "States reached", detail: "Active dispatch network across eastern & northern India." },
  { to: 11, suffix: "", label: "Machines running" },
  { to: 400, suffix: "+", label: "Tonnes / month" },
  { to: yearsExperience, suffix: "+", label: "Years of experience" },
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
