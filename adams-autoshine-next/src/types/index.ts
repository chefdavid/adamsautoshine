import { type LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export interface WhyReason {
  number: string;
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  tagline: string;
  price: number;
  decimal: string;
  featured?: boolean;
  badge?: string;
  features: PricingFeature[];
}

export interface GalleryItem {
  icon: LucideIcon;
  label: string;
  tag: string;
  wide?: boolean;
}

export interface Perk {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Testimonial {
  text: string;
  initials: string;
  name: string;
  location: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactInfo {
  icon: LucideIcon;
  label: string;
  content: string;
  href?: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ServiceOption {
  value: string;
  label: string;
}

export interface TimeOption {
  value: string;
  label: string;
}
