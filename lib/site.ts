// Central source of truth for company / contact details.

export const SITE_URL = "https://nawkiran.com";

export const COMPANY = {
  name: "Nawkiran Polyplast Pvt. Ltd.",
  shortName: "Nawkiran",
  tagline: "A new dawn in PET preforms",
  meaning: "नव किरण — a new ray of light",
  foundingYear: 2009,
  about:
    "Nawkiran Polyplast Pvt. Ltd. specializes in manufacturing PET preforms for bottles and jars. We operate 11 preform machines from leading brands such as Ferromatik, Toshiba and Windsor, with a monthly production capacity of over 400 tons across 80 product types.",
};

export const FOUNDING_YEAR = COMPANY.foundingYear;

export const PHONES = [
  { label: "+91 98311 85794", tel: "+919831185794", primary: true },
  { label: "+91 98313 88570", tel: "+919831388570", primary: false },
  { label: "+91 79806 39796", tel: "+917980639796", primary: false },
];

export const WHATSAPP = {
  number: "919831185794",
  display: "+91 98311 85794",
  defaultText:
    "Hello Nawkiran Polyplast, I would like to enquire about your PET preforms.",
};

export const EMAIL = "nawkiranpolyplast@gmail.com";

export const ADDRESSES = {
  office: {
    label: "Registered Office",
    lines: ["Poddar Court, 18 Rabindra Sarani", "Gate No. 3, 5th Floor", "Kolkata – 700001"],
    maps: "https://maps.app.goo.gl/GBRHrSvco2py9AZf7",
  },
  plant: {
    label: "Manufacturing Plant",
    lines: ["Balaji Complex, Old Delhi Road", "Baidyabati", "West Bengal"],
    maps: "https://maps.app.goo.gl/5D8xC9ogbxkVvqedA",
  },
};

export const BRANDS = ["Ferromatik", "Toshiba", "Windsor"];

export function waLink(text: string = WHATSAPP.defaultText) {
  return `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(text)}`;
}

export const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
