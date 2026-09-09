/**
 * Company details, navigation, and service copy.
 *
 * This is the only place any of it is written down. Pages and components read
 * from here so a phone number or service name changes in one edit.
 *
 * Comments mark where copy came from. Anything not marked as taken from the
 * live site or a directory listing was written for this build and needs the
 * client to sign off before launch.
 */

export const site = {
  name: "Rapid Energy Solutions",
  legalName: "Rapid Energy Solutions LLC",
  /** Taken from the live site. */
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
  /** Taken from the live site. */
  hours: "Monday to Friday, 6:30 AM to 5:00 PM",
  /** Listed on the company's Angi and BBB profiles. */
  serviceAreas: ["Weld County", "Larimer County", "Adams County", "Boulder County"],
} as const;

/**
 * Astro collapses whitespace between adjacent expressions, which drops the
 * space in `{state} {zip}`. Compose the strings here instead.
 */
export const cityStateZip = `${site.address.city}, ${site.address.state} ${site.address.zip}`;
export const fullAddress = `${site.address.street}, ${cityStateZip}`;

/**
 * Shown in the strip under the hero. Taken from the company's HomeAdvisor
 * profile, which lists "10 years of experience" and "Free Estimates: Yes".
 * That profile also shows "Licensed", but flags licence claims as
 * self-reported, so no licence badge appears until the client confirms one.
 */
export const credentials = [
  "10+ years in business",
  "Free estimates",
  "Locally owned & operated",
  "Residential · Commercial · Industrial",
] as const;

export const nav: { label: string; href: string }[] = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  slug: string;
  title: string;
  summary: string;
  /** Capability list written for this build. Confirm with the client. */
  points: string[];
};

export const services: Service[] = [
  {
    slug: "residential",
    title: "Residential",
    // Live site: "Whatever your home project may be, Rapid Energy Solutions
    // is here to turn your dreams into reality."
    summary: "We turn your home project into reality, whatever its size, done safely and to code.",
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
    // Live site: "Our commercial work spans multiple industries and business
    // needs. Support all your business' electrical needs from small updates
    // to full renovations to breaking ground."
    summary:
      "We support your business at every stage, from small updates to full renovations to breaking ground.",
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
    // Live site lists this service as "Oilfield Electrical / Automation".
    summary:
      "We run oilfield electrical and automation with crews who know the field and its safety demands.",
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
    // Listed in the live site's navigation.
    summary:
      "We handle site prep, trenching, and hauling so your project stays on one schedule with one crew.",
    points: [
      "Trenching & backfill",
      "Material & equipment hauling",
      "Site grading & prep",
      "Coordinated with your electrical scope",
    ],
  },
];

/** The three values named on the live site's About page. */
export const values = [
  {
    title: "Accountability",
    body: "We own our work and our commitments: to clients, to each other, and to the communities we serve.",
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
