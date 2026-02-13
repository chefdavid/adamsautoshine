import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SocialLinks } from "@/components/custom/SocialLinks";
import { CONTACT_INFO, FOOTER_SEO_TEXT } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#gallery", label: "Our Work" },
  { href: "#booking", label: "Book Appointment" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

const serviceLinks = [
  "Exterior Detailing",
  "Interior Detailing",
  "Ceramic Coating",
  "Paint Correction",
  "Engine Bay Cleaning",
  "Headlight Restoration",
];

interface FooterProps {
  contactData?: {
    address: string;
    city: string;
    phone: string;
    phoneHref: string;
    email: string;
    emailHref: string;
    social?: {
      facebook?: string;
      instagram?: string;
      tiktok?: string;
      google?: string;
    };
  };
  footerData?: {
    seoText: string;
    brandTagline: string;
  };
}

export function Footer({ contactData, footerData }: FooterProps) {
  const contact = contactData || CONTACT_INFO;
  const seoText = footerData?.seoText || FOOTER_SEO_TEXT;
  const brandTagline = footerData?.brandTagline ||
    "Enid, Oklahoma's trusted professional car detailing service. Premium hand wash, ceramic coating, paint correction, and full interior detailing.";

  return (
    <footer className="bg-bg-dark pt-15 border-t border-border-subtle">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-border-subtle">
          {/* Brand */}
          <div>
            <Link
              href="#"
              className="text-text-white text-[1.3rem] font-bold hover:text-text-white"
            >
              Adams<span className="text-amber">Autoshine</span>
            </Link>
            <p className="text-[0.9rem] text-text-muted mt-4 leading-relaxed">
              {brandTagline}
            </p>
            <SocialLinks
              className="mt-5"
              variant="footer"
              socialData={contactData?.social}
            />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold text-text-white mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9rem] text-text-muted transition-all duration-300 hover:text-amber hover:pl-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-semibold text-text-white mb-5">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href="#services"
                    className="text-[0.9rem] text-text-muted transition-all duration-300 hover:text-amber hover:pl-1"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold text-text-white mb-5">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-[0.85rem] text-text-muted">
                <MapPin className="h-4 w-4 text-amber mt-0.5 shrink-0" />
                {contact.address}, {contact.city}
              </li>
              <li className="flex items-start gap-2.5 text-[0.85rem] text-text-muted">
                <Phone className="h-4 w-4 text-amber mt-0.5 shrink-0" />
                <a
                  href={contact.phoneHref}
                  className="text-text-muted hover:text-amber transition-colors"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[0.85rem] text-text-muted">
                <Mail className="h-4 w-4 text-amber mt-0.5 shrink-0" />
                <a
                  href={contact.emailHref}
                  className="text-text-muted hover:text-amber transition-colors"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[0.85rem] text-text-muted">
                <Clock className="h-4 w-4 text-amber mt-0.5 shrink-0" />
                Mon-Fri 8am-6pm, Sat 9am-4pm
              </li>
            </ul>
          </div>
        </div>

        {/* SEO text */}
        <div className="py-6 border-b border-border-subtle">
          <p className="text-[0.8rem] text-text-muted opacity-60 leading-relaxed text-center">
            {seoText}
          </p>
        </div>

        {/* Copyright */}
        <div className="py-5 text-center">
          <p className="text-[0.85rem] text-text-muted">
            &copy; {new Date().getFullYear()} Adams Autoshine. All Rights
            Reserved. | Enid, Oklahoma
          </p>
        </div>
      </div>
    </footer>
  );
}
