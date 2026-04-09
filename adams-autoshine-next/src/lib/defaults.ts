import {
  SERVICES,
  WHY_REASONS,
  STATS,
  PRICING_TIERS,
  GALLERY_ITEMS,
  BOOKING_PERKS,
  TESTIMONIALS,
  FAQS,
  SERVICE_OPTIONS,
  TIME_OPTIONS,
  CONTACT_INFO,
  FOOTER_SEO_TEXT,
} from "@/lib/constants";
import type {
  SectionKey,
  SectionDataMap,
  HeroData,
  AboutData,
  CTABannerData,
  SEOData,
  FooterData,
} from "@/lib/admin-types";

function getIconName(icon: { displayName?: string; name?: string }): string {
  return icon.displayName || icon.name || "Sparkles";
}

const HERO_DEFAULTS: HeroData = {
  badge: "Gloucester County's #1 Rated Auto Detailing",
  heading: "Professional Auto Detailing —",
  headingAccent: "Gloucester County, NJ",
  subtitle:
    "Honest work. Real results. Professional detailing serving Washington Township, Mullica Hill, Turnersville & all of Gloucester County.",
  ctaText: "Book Appointment",
  phone: "(856) 305-0623",
  phoneHref: "tel:+18563050623",
  trustItems: [
    { icon: "Star", text: "4.9/5 Rating" },
    { icon: "Shield", text: "Fully Insured" },
    { icon: "Award", text: "IDA Certified" },
  ],
};

const ABOUT_DEFAULTS: AboutData = {
  heading: "About",
  headingAccent: "Adam's Autoshine",
  paragraph1:
    "At Adam's Autoshine, we believe every vehicle deserves to look its absolute best. Now proudly serving Gloucester County, New Jersey, we've built our reputation on meticulous attention to detail, honest pricing, and treating every car like it's our own.",
  paragraph2:
    "We combine professional-grade products with years of hands-on experience to deliver results that exceed expectations every single time.",
  valueBadges: [
    { icon: "HandMetal", text: "Hand Wash Only" },
    { icon: "Leaf", text: "Eco-Friendly Products" },
    { icon: "Heart", text: "Locally Owned" },
  ],
};

const CTA_DEFAULTS: CTABannerData = {
  heading: "Ready to Make Your Car Shine?",
  subtitle:
    "Book your professional car detailing appointment in Gloucester County today. Same-week availability.",
  ctaText: "Book Now",
  secondaryCtaText: "Call Us",
};

const SEO_DEFAULTS: SEOData = {
  title:
    "Adam's Autoshine | Professional Car Detailing in Gloucester County, NJ",
  description:
    "Professional car detailing in Gloucester County, NJ. Serving Washington Township, Mullica Hill, Turnersville, Sewell, Deptford & all of South Jersey. Ceramic coating, interior detailing, paint correction. Book today.",
  keywords:
    "car detailing gloucester county nj, auto detailing south jersey, car wash washington township nj, ceramic coating mullica hill nj, paint correction turnersville nj, mobile detailing gloucester county, interior car cleaning sewell nj, hand car wash deptford nj, vehicle detailing glassboro nj, best car detailing south jersey, professional auto wash gloucester county nj, car detailing near me nj",
  ogTitle: "Adam's Autoshine | Professional Car Detailing in Gloucester County, NJ",
  ogDescription:
    "Professional car detailing in Gloucester County, NJ. Serving Washington Township, Mullica Hill, Turnersville & all of South Jersey. Book your appointment today!",
  ogImage: "https://www.adamsautoshine.com/images/og-image.jpg",
};

const FOOTER_DEFAULTS: FooterData = {
  seoText: FOOTER_SEO_TEXT,
  brandTagline:
    "Gloucester County, New Jersey's trusted professional car detailing service. Premium hand wash, ceramic coating, paint correction, and full interior detailing.",
};

export function getDefaults<K extends SectionKey>(section: K): SectionDataMap[K] {
  const defaults: Record<string, unknown> = {
    hero: HERO_DEFAULTS,
    services: SERVICES.map((s) => ({
      icon: getIconName(s.icon),
      title: s.title,
      description: s.description,
      features: s.features,
    })),
    "why-us": WHY_REASONS,
    stats: STATS,
    pricing: PRICING_TIERS,
    gallery: GALLERY_ITEMS.map((g) => ({
      icon: getIconName(g.icon),
      label: g.label,
      tag: g.tag,
      wide: g.wide,
    })),
    "booking-perks": BOOKING_PERKS.map((p) => ({
      icon: getIconName(p.icon),
      title: p.title,
      description: p.description,
    })),
    testimonials: TESTIMONIALS,
    faqs: FAQS,
    "service-options": {
      services: SERVICE_OPTIONS,
      times: TIME_OPTIONS,
    },
    contact: CONTACT_INFO,
    seo: SEO_DEFAULTS,
    footer: FOOTER_DEFAULTS,
    about: ABOUT_DEFAULTS,
    "cta-banner": CTA_DEFAULTS,
  };

  return defaults[section] as SectionDataMap[K];
}
