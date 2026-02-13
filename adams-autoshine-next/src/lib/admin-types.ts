export interface HeroData {
  badge: string;
  heading: string;
  headingAccent: string;
  subtitle: string;
  ctaText: string;
  phone: string;
  phoneHref: string;
  trustItems: { icon: string; text: string }[];
}

export interface ServiceData {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface WhyReasonData {
  number: string;
  title: string;
  description: string;
}

export interface StatData {
  value: number;
  suffix?: string;
  label: string;
}

export interface PricingFeatureData {
  text: string;
  included: boolean;
}

export interface PricingTierData {
  name: string;
  tagline: string;
  price: number;
  decimal: string;
  featured?: boolean;
  badge?: string;
  features: PricingFeatureData[];
}

export interface GalleryItemData {
  icon: string;
  label: string;
  tag: string;
  wide?: boolean;
}

export interface PerkData {
  icon: string;
  title: string;
  description: string;
}

export interface TestimonialData {
  text: string;
  initials: string;
  name: string;
  location: string;
}

export interface FAQData {
  question: string;
  answer: string;
}

export interface ServiceOptionData {
  value: string;
  label: string;
}

export interface TimeOptionData {
  value: string;
  label: string;
}

export interface ContactData {
  address: string;
  city: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
  mapEmbedUrl: string;
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
    google: string;
  };
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

export interface FooterData {
  seoText: string;
  brandTagline: string;
}

export interface AboutData {
  heading: string;
  headingAccent: string;
  paragraph1: string;
  paragraph2: string;
  valueBadges: { icon: string; text: string }[];
}

export interface CTABannerData {
  heading: string;
  subtitle: string;
  ctaText: string;
  secondaryCtaText: string;
}

export type SectionDataMap = {
  hero: HeroData;
  services: ServiceData[];
  "why-us": WhyReasonData[];
  stats: StatData[];
  pricing: PricingTierData[];
  gallery: GalleryItemData[];
  "booking-perks": PerkData[];
  testimonials: TestimonialData[];
  faqs: FAQData[];
  "service-options": { services: ServiceOptionData[]; times: TimeOptionData[] };
  contact: ContactData;
  seo: SEOData;
  footer: FooterData;
  about: AboutData;
  "cta-banner": CTABannerData;
};

export type SectionKey = keyof SectionDataMap;
