/**
 * Single source of truth for company info, navigation, and services.
 * Copy marked "verbatim" is taken directly from rapidenergysolutions.net.
 * Everything else is marketing copy written for this enhancement and
 * should be confirmed with the client before going live.
 */

export const site = {
  name: "Rapid Energy Solutions",
  legalName: "Rapid Energy Solutions LLC",
  /** verbatim */
  tagline: "Your trusted partner for all your electrical needs",
  url: "https://www.rapidenergysolutions.net",
  phone: "970-535-2381",
  phoneHref: "tel:+19705352381",
  email: "info@rapidenergysolutions.net",
  address: {
    street: "303 Main Street",
    city: "Platteville",
    state: "CO",
    zip: "80651",
  },
  /** verbatim */
  hours: "Monday–Friday, 6:30 AM – 5:00 PM",
  /** from the company's own directory listings */
  serviceAreas: ["Weld County", "Larimer County", "Adams County", "Boulder County"],
} as const;

/**
 * Credentials sourced from the company's HomeAdvisor profile (read 2026-09-09):
 * https://www.homeadvisor.com/rated.rapidenergysolutions.156594988.html
 * "Business highlights: 10 years of experience" · "Free Estimates: Yes" ·
 * "Licensed*" (HomeAdvisor notes licence claims are self-reported).
 * Verify each with Matt before launch — especially the licence line.
 */
export const credentials = [
  "10+ years in business",
  "Free estimates",
  "Locally owned & operated",
  "Residential · Commercial · Industrial",
] as const;

/** Pre-composed so JSX whitespace collapsing can't drop the spaces. */
export const cityStateZip = `${site.address.city}, ${site.address.state} ${site.address.zip}`;
export const fullAddress = `${site.address.street}, ${cityStateZip}`;

export const nav: { label: string; href: string }[] = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  slug: string;
  title: string;
  /** one-line summary (verbatim source noted where applicable) */
  summary: string;
  /** illustrative capability list — confirm with client */
  points: string[];
};

export const services: Service[] = [
  {
    slug: "residential",
    title: "Residential",
    // verbatim: "Whatever your home project may be, Rapid Energy Solutions is
    // here to turn your dreams into reality."
    summary:
      "Whatever your home project may be, we're here to turn your ideas into reality — done safely and to code.",
    points: [
      "Remodels, additions & finished basements",
      "Panel upgrades, rewiring & troubleshooting",
      "New-construction wiring",
      "Lighting, outlets, fans & fixtures",
    ],
  },
  {
    slug: "commercial",
    title: "Commercial",
    // verbatim: "Our commercial work spans multiple industries and business
    // needs. Support all your business' electrical needs from small updates to
    // full renovations to breaking ground."
    summary:
      "Work that spans multiple industries — from small updates to full renovations to breaking ground.",
    points: [
      "Tenant improvements & build-outs",
      "Full-building renovations",
      "Ground-up construction",
      "Service & maintenance agreements",
    ],
  },
  {
    slug: "industrial",
    title: "Industrial",
    // verbatim service label: "Oilfield Electrical / Automation"
    summary:
      "Oilfield electrical and automation, delivered by crews who know the field and its safety demands.",
    points: [
      "Oilfield electrical installation",
      "Automation & control systems",
      "Preventive & emergency maintenance",
      "Code compliance & documentation",
    ],
  },
  {
    slug: "hauling-dirt-work",
    title: "Hauling & Dirt Work",
    // listed as a service on the site
    summary:
      "Site prep, trenching, and hauling that keep your electrical project on one schedule and one crew.",
    points: [
      "Trenching & backfill",
      "Material & equipment hauling",
      "Site grading & prep",
      "Coordinated with your electrical scope",
    ],
  },
];

/** verbatim from the About page */
export const values = [
  {
    title: "Accountability",
    body: "We own our work and our commitments — to clients, to each other, and to the communities we serve.",
  },
  {
    title: "Responsibility",
    body: "Safety trainings and regular safety inspections are built into how every job runs, start to finish.",
  },
  {
    title: "Integrity",
    body: "Honest scoping, clear communication, and meticulous work for impeccable results.",
  },
];
