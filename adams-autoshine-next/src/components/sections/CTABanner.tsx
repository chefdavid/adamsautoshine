"use client";

import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/custom/ScrollReveal";
import type { CTABannerData } from "@/lib/admin-types";

interface CTABannerProps {
  data: CTABannerData;
  phoneHref?: string;
}

export function CTABanner({ data, phoneHref }: CTABannerProps) {
  return (
    <section
      className="py-20 border-t border-b border-border-accent"
      style={{
        background:
          "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(10, 10, 26, 0.95) 100%), #0A0A1A",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5">
        <ScrollReveal className="text-center">
          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-text-white mb-3">
            {data.heading}
          </h2>
          <p className="text-[1.05rem] text-text-muted mb-8">
            {data.subtitle}
          </p>
          <div className="flex gap-4 justify-center flex-wrap max-md:flex-col max-md:items-center">
            <Link
              href="#booking"
              className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-lg font-semibold text-[1.05rem] btn-gradient text-bg-dark border-2 border-amber transition-all duration-300 hover:-translate-y-0.5 hover:shadow-amber-glow max-md:w-full max-md:max-w-[300px]"
            >
              <CalendarCheck className="h-5 w-5" />
              {data.ctaText}
            </Link>
            <a
              href={phoneHref || "tel:+15805550123"}
              className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-lg font-semibold text-[1.05rem] bg-white/10 text-text-white border-2 border-white/20 backdrop-blur-lg transition-all duration-300 hover:bg-text-white hover:text-bg-dark hover:-translate-y-0.5 max-md:w-full max-md:max-w-[300px]"
            >
              <Phone className="h-5 w-5" />
              {data.secondaryCtaText}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
