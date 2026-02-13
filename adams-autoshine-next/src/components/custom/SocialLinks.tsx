"use client";

import { FaFacebookF, FaInstagram, FaTiktok, FaGoogle } from "react-icons/fa6";
import { CONTACT_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SocialData {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  google?: string;
}

interface SocialLinksProps {
  className?: string;
  iconSize?: string;
  variant?: "default" | "footer";
  socialData?: SocialData;
}

export function SocialLinks({ className, variant = "default", socialData }: SocialLinksProps) {
  const social = socialData || CONTACT_INFO.social;
  const isFooter = variant === "footer";

  const socials = [
    { href: social.facebook, label: "Facebook", icon: FaFacebookF },
    { href: social.instagram, label: "Instagram", icon: FaInstagram },
    { href: social.tiktok, label: "TikTok", icon: FaTiktok },
    { href: social.google, label: "Google Maps", icon: FaGoogle },
  ].filter((s) => s.href);

  return (
    <div className={cn("flex gap-3", className)}>
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={cn(
            "flex items-center justify-center rounded-lg border border-border-subtle text-text-muted transition-all duration-300 hover:bg-amber hover:border-amber hover:text-bg-dark hover:-translate-y-0.5",
            isFooter ? "w-[38px] h-[38px] text-[0.9rem]" : "w-11 h-11 text-base",
            "bg-bg-card"
          )}
        >
          <social.icon />
        </a>
      ))}
    </div>
  );
}
