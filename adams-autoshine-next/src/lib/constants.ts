import {
  Droplet,
  Sofa,
  Shield,
  Paintbrush,
  Settings,
  Lightbulb,
  Clock,
  Ban,
  Truck,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Car,
  Gem,
  type LucideIcon,
} from "lucide-react";
import type {
  Service,
  WhyReason,
  Stat,
  PricingTier,
  GalleryItem,
  Perk,
  Testimonial,
  FAQ,
  NavLink,
  ServiceOption,
  TimeOption,
} from "@/types";

export const NAV_LINKS: NavLink[] = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#gallery", label: "Our Work" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export const SERVICES: Service[] = [
  {
    icon: Droplet,
    title: "Exterior Detailing",
    description:
      "Professional hand wash, clay bar treatment, polish, and wax to restore your vehicle's showroom shine. We treat every panel with care.",
    features: ["Hand Wash & Dry", "Clay Bar Treatment", "Tire & Rim Cleaning"],
  },
  {
    icon: Sofa,
    title: "Interior Detailing",
    description:
      "Deep clean every surface inside your vehicle. Vacuuming, steam cleaning, leather conditioning, and odor elimination included.",
    features: [
      "Deep Vacuum & Steam",
      "Leather Conditioning",
      "Odor Elimination",
    ],
  },
  {
    icon: Shield,
    title: "Ceramic Coating",
    description:
      "Long-lasting paint protection with professional-grade ceramic coating. Shield your car from Oklahoma's sun, rain, and road debris.",
    features: [
      "2-5 Year Protection",
      "UV & Chemical Resistant",
      "Hydrophobic Finish",
    ],
  },
  {
    icon: Paintbrush,
    title: "Paint Correction",
    description:
      "Remove swirl marks, scratches, and oxidation with multi-stage paint correction. Restore your vehicle's original color depth and clarity.",
    features: [
      "Swirl Mark Removal",
      "Scratch Repair",
      "Color Restoration",
    ],
  },
  {
    icon: Settings,
    title: "Engine Bay Cleaning",
    description:
      "Safe, thorough engine bay degreasing and detailing. Keep your engine looking clean and make it easier to spot leaks or issues.",
    features: [
      "Safe Degreasing",
      "Component Protection",
      "Dressing & Shine",
    ],
  },
  {
    icon: Lightbulb,
    title: "Headlight Restoration",
    description:
      "Restore foggy, yellowed headlights to crystal clear condition. Improve nighttime visibility and your vehicle's appearance.",
    features: [
      "Haze Removal",
      "UV Sealant Applied",
      "Improved Visibility",
    ],
  },
];

export const WHY_REASONS: WhyReason[] = [
  {
    number: "01",
    title: "Premium Products Only",
    description:
      "We use only professional-grade, paint-safe products. No cheap chemicals that damage your finish over time.",
  },
  {
    number: "02",
    title: "Attention to Detail",
    description:
      "Every crevice, every panel, every surface gets our full attention. We don't cut corners on quality.",
  },
  {
    number: "03",
    title: "Satisfaction Guaranteed",
    description:
      "Not happy with the results? We'll re-do it at no extra charge. Your satisfaction is our reputation.",
  },
  {
    number: "04",
    title: "Convenient Scheduling",
    description:
      "Book online 24/7 or call us directly. We offer flexible scheduling including mobile detailing at your location.",
  },
];

export const STATS: Stat[] = [
  { value: 1200, label: "Cars Detailed" },
  { value: 127, label: "5-Star Reviews" },
  { value: 5, label: "Years Experience" },
  { value: 100, suffix: "%", label: "Satisfaction Rate" },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Basic Shine",
    tagline: "Perfect for a quick refresh",
    price: 79,
    decimal: ".99",
    features: [
      { text: "Exterior Hand Wash & Dry", included: true },
      { text: "Tire & Rim Shine", included: true },
      { text: "Window Cleaning (Exterior)", included: true },
      { text: "Air Freshener", included: true },
      { text: "Quick Interior Vacuum", included: true },
      { text: "Interior Deep Clean", included: false },
      { text: "Clay Bar Treatment", included: false },
      { text: "Paint Sealant", included: false },
    ],
  },
  {
    name: "Premium Detail",
    tagline: "The complete inside & out package",
    price: 149,
    decimal: ".99",
    featured: true,
    badge: "Most Popular",
    features: [
      { text: "Everything in Basic Shine", included: true },
      { text: "Full Interior Deep Clean", included: true },
      { text: "Leather Conditioning", included: true },
      { text: "Dashboard & Console Treatment", included: true },
      { text: "Door Jamb Cleaning", included: true },
      { text: "Carpet Shampooing", included: true },
      { text: "Clay Bar Treatment", included: false },
      { text: "Paint Sealant", included: false },
    ],
  },
  {
    name: "Ultimate Package",
    tagline: "The showroom-quality experience",
    price: 249,
    decimal: ".99",
    features: [
      { text: "Everything in Premium Detail", included: true },
      { text: "Clay Bar Treatment", included: true },
      { text: "One-Step Paint Correction", included: true },
      { text: "Paint Sealant Application", included: true },
      { text: "Engine Bay Cleaning", included: true },
      { text: "Headlight Restoration", included: true },
      { text: "Trim Restoration", included: true },
      { text: "30-Day Touch-Up Guarantee", included: true },
    ],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { icon: Car, label: "Exterior Detail", tag: "Full Exterior Detail" },
  { icon: Sofa, label: "Interior Clean", tag: "Interior Deep Clean" },
  { icon: Shield, label: "Ceramic Coating", tag: "Ceramic Coating" },
  { icon: Paintbrush, label: "Paint Correction", tag: "Paint Correction" },
  { icon: Gem, label: "Showroom Finish", tag: "Ultimate Package Result" },
];

export const BOOKING_PERKS: Perk[] = [
  {
    icon: Clock,
    title: "Quick Response",
    description: "We confirm within 2 hours",
  },
  {
    icon: Ban,
    title: "Free Cancellation",
    description: "Cancel up to 24 hours before",
  },
  {
    icon: Truck,
    title: "Mobile Service Available",
    description: "We come to you in Enid",
  },
  {
    icon: CreditCard,
    title: "Pay After Service",
    description: "No upfront payment required",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "Hands down the best car detailing in Enid. My truck looked better than when I bought it. The interior deep clean was absolutely amazing. Will definitely be a repeat customer!",
    initials: "JM",
    name: "Jake M.",
    location: "Enid, OK \u2022 Ultimate Package",
  },
  {
    text: "I've tried every car wash in Enid and nothing compares to Adam's Autoshine. The ceramic coating they applied has kept my car looking new for months even through Oklahoma weather.",
    initials: "SR",
    name: "Sarah R.",
    location: "North Enid, OK \u2022 Ceramic Coating",
  },
  {
    text: "Professional, on time, and the results speak for themselves. They came to my office and detailed my car while I worked. Can't beat that convenience. Five stars all day!",
    initials: "DW",
    name: "Derek W.",
    location: "Enid, OK \u2022 Mobile Detailing",
  },
];

export const FAQS: FAQ[] = [
  {
    question: "How long does a full car detail take in Enid, OK?",
    answer:
      "A full car detail at Adam's Autoshine typically takes 2-4 hours depending on the vehicle size and package selected. Our Basic Shine takes about 1 hour, Premium Detail takes 2-3 hours, and our Ultimate Package takes 3-4 hours. We never rush the job - quality takes time.",
  },
  {
    question: "Do you offer mobile car detailing in Enid, Oklahoma?",
    answer:
      "Yes! Adam's Autoshine offers mobile detailing services throughout Enid and surrounding areas in Garfield County, including North Enid, Waukomis, and Drummond. We bring our professional equipment directly to your home or office - all we need is access to a water source and a shaded area when possible.",
  },
  {
    question: "What is ceramic coating and is it worth it?",
    answer:
      "Ceramic coating is a liquid polymer applied to your vehicle's exterior that creates a permanent or semi-permanent bond with the paint. It provides superior protection against UV rays, chemical stains, and minor scratches. In Oklahoma's harsh weather - from intense summer sun to winter ice storms - ceramic coating is one of the best investments you can make to protect your vehicle's finish. The hydrophobic properties also make washing your car much easier.",
  },
  {
    question: "How often should I get my car detailed?",
    answer:
      "We recommend a full detail every 4-6 months and a basic exterior wash every 2-4 weeks. Regular detailing protects your paint, maintains your vehicle's resale value, and keeps it looking showroom-new. If you park outdoors or drive on dirt roads frequently (common in rural Oklahoma), you may want to detail more often.",
  },
  {
    question: "What areas do you serve besides Enid?",
    answer:
      "Adam's Autoshine proudly serves Enid and surrounding communities including North Enid, Waukomis, Drummond, Kremlin, Lahoma, Carrier, Covington, and other areas within Garfield County, Oklahoma. For mobile detailing outside our standard service area, please contact us and we'll do our best to accommodate you.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), cash, Venmo, and Zelle. Payment is collected after the service is completed so you can inspect our work first.",
  },
];

export const SERVICE_OPTIONS: ServiceOption[] = [
  { value: "basic", label: "Basic Shine - $79.99" },
  { value: "premium", label: "Premium Detail - $149.99" },
  { value: "ultimate", label: "Ultimate Package - $249.99" },
  { value: "ceramic", label: "Ceramic Coating" },
  { value: "paint-correction", label: "Paint Correction" },
  { value: "interior-only", label: "Interior Detail Only" },
  { value: "exterior-only", label: "Exterior Detail Only" },
  { value: "headlight", label: "Headlight Restoration" },
  { value: "other", label: "Other / Custom" },
];

export const TIME_OPTIONS: TimeOption[] = [
  { value: "8:00 AM", label: "8:00 AM" },
  { value: "9:00 AM", label: "9:00 AM" },
  { value: "10:00 AM", label: "10:00 AM" },
  { value: "11:00 AM", label: "11:00 AM" },
  { value: "12:00 PM", label: "12:00 PM" },
  { value: "1:00 PM", label: "1:00 PM" },
  { value: "2:00 PM", label: "2:00 PM" },
  { value: "3:00 PM", label: "3:00 PM" },
  { value: "4:00 PM", label: "4:00 PM" },
];

export const CONTACT_INFO = {
  address: "1727 N Grand Ave",
  city: "Enid, OK 73701",
  phone: "(580) 555-0123",
  phoneHref: "tel:+15805550123",
  email: "info@adamsautoshine.com",
  emailHref: "mailto:info@adamsautoshine.com",
  hours: {
    weekday: "Mon - Fri: 8:00 AM - 6:00 PM",
    saturday: "Saturday: 9:00 AM - 4:00 PM",
    sunday: "Sunday: Closed",
  },
  mapEmbedUrl:
    "https://maps.google.com/maps?q=1727+N+Grand+Ave,+Enid,+OK+73701&t=&z=15&ie=UTF8&iwloc=&output=embed",
  social: {
    facebook: "https://www.facebook.com/adamsautoshine",
    instagram: "https://www.instagram.com/adamsautoshine",
    tiktok: "https://www.tiktok.com/@adamsautoshine",
    google: "https://www.google.com/maps/place/Enid+OK",
  },
};

export const FOOTER_SEO_TEXT =
  "Adam's Autoshine provides professional car detailing services in Enid, Oklahoma and surrounding areas including North Enid, Waukomis, Drummond, Kremlin, and Garfield County. Our services include exterior car wash, interior detailing, ceramic coating, paint correction, engine bay cleaning, and headlight restoration. We are Enid's top-rated auto detailing provider.";
