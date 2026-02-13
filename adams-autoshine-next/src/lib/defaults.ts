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
  badge: "Enid's #1 Rated Auto Detailing",
  heading: "Professional Car Detailing Services in",
  headingAccent: "Enid, Oklahoma",
  subtitle:
    "Transform your vehicle with expert hand wash, ceramic coating, paint correction, and full interior detailing. Trusted by hundreds of car owners across Enid and Garfield County.",
  ctaText: "Book Appointment",
  phone: "(580) 555-0123",
  phoneHref: "tel:+15805550123",
  trustItems: [
    { icon: "Star", text: "4.9/5 Rating" },
    { icon: "Shield", text: "Fully Insured" },
    { icon: "Award", text: "IDA Certified" },
  ],
};

const ABOUT_DEFAULTS: AboutData = {
  heading: "About",
  headingAccent: "Adams Autoshine",
  paragraph1:
    "At Adams Autoshine, we believe every vehicle deserves to look its absolute best. Founded right here in Enid, Oklahoma, we've built our reputation on meticulous attention to detail, honest pricing, and treating every car like it's our own.",
  paragraph2:
    "What started as a passion for cars has grown into Enid's most trusted auto detailing service. We combine professional-grade products with years of hands-on experience to deliver results that exceed expectations every single time.",
  valueBadges: [
    { icon: "HandMetal", text: "Hand Wash Only" },
    { icon: "Leaf", text: "Eco-Friendly Products" },
    { icon: "Heart", text: "Locally Owned" },
  ],
};

const CTA_DEFAULTS: CTABannerData = {
  heading: "Ready to Make Your Car Shine?",
  subtitle:
    "Book your professional car detailing appointment in Enid today. Same-week availability.",
  ctaText: "Book Now",
  secondaryCtaText: "Call Us",
};

const SEO_DEFAULTS: SEOData = {
  title:
    "Adams Autoshine | Professional Car Detailing & Auto Wash in Enid, OK",
  description:
    "Adams Autoshine is Enid, Oklahoma's premier car detailing service. Professional exterior & interior detailing, ceramic coating, paint correction, and hand car wash. Book online today!",
  keywords:
    "car detailing enid ok, auto detailing enid oklahoma, car wash enid, ceramic coating enid, paint correction enid ok, mobile detailing enid, interior car cleaning enid, hand car wash enid, vehicle detailing enid oklahoma, best car detailing enid, professional auto wash enid ok, car wax enid, auto cleaning services enid",
  ogTitle: "Adams Autoshine | Professional Car Detailing in Enid, OK",
  ogDescription:
    "Enid, Oklahoma's premier car detailing service. Professional detailing, ceramic coating, paint correction & more. Book your appointment today!",
  ogImage: "https://www.adamsautoshine.com/images/og-image.jpg",
};

const FOOTER_DEFAULTS: FooterData = {
  seoText: FOOTER_SEO_TEXT,
  brandTagline:
    "Enid, Oklahoma's trusted professional car detailing service. Premium hand wash, ceramic coating, paint correction, and full interior detailing.",
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
