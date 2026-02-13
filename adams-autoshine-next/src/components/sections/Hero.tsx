"use client";

import Link from "next/link";
import { CalendarCheck, Phone, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { getIcon } from "@/lib/icon-map";
import type { HeroData } from "@/lib/admin-types";

interface HeroProps {
  data: HeroData;
}

export function Hero({ data }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(245, 158, 11, 0.05) 0%, transparent 50%), linear-gradient(180deg, #0A0A1A 0%, #0c0c22 50%, #0E0E20 100%)",
      }}
    >
      {/* Hero bg overlay */}
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-[2] text-center max-w-[860px] px-5 pt-[120px] pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-amber/12 border border-border-accent rounded-full px-6 py-2.5 text-amber text-[0.85rem] font-medium mb-7"
        >
          {(() => {
            const BadgeIcon = getIcon("Award");
            return <BadgeIcon className="h-4 w-4" />;
          })()}
          {data.badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold text-text-white leading-[1.15] mb-6 tracking-tight text-balance"
        >
          {data.heading}{" "}
          <span className="text-amber">{data.headingAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[clamp(0.95rem,1.8vw,1.1rem)] text-text-muted mb-10 leading-relaxed max-w-[620px] mx-auto text-balance"
        >
          {data.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-4 justify-center flex-wrap mb-12"
        >
          <Link
            href="#booking"
            className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-lg font-semibold text-[1.05rem] btn-gradient text-bg-dark border-2 border-amber transition-all duration-300 hover:-translate-y-0.5 hover:shadow-amber-glow max-md:w-full max-md:max-w-[300px]"
          >
            <CalendarCheck className="h-5 w-5" />
            {data.ctaText}
          </Link>
          <a
            href={data.phoneHref}
            className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-lg font-semibold text-[1.05rem] bg-transparent text-text-white border-2 border-white/25 transition-all duration-300 hover:border-amber hover:text-amber hover:-translate-y-0.5 max-md:w-full max-md:max-w-[300px]"
          >
            <Phone className="h-5 w-5" />
            {data.phone}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-6 flex-wrap max-md:flex-col max-md:gap-3"
        >
          {(data.trustItems || []).map((item, index) => {
            const TrustIcon = getIcon(item.icon);
            return (
              <div key={index} className="flex items-center gap-2 text-text-muted text-[0.9rem] font-medium">
                {item.icon === "Star" ? (
                  <div className="flex gap-0.5 text-amber">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const StarIcon = getIcon("Star");
                      return <StarIcon key={i} className="h-4 w-4 fill-current" />;
                    })}
                  </div>
                ) : (
                  <TrustIcon className="h-4 w-4 text-amber" />
                )}
                <span>{item.text}</span>
                {index < (data.trustItems || []).length - 1 && (
                  <div className="w-px h-6 bg-white/15 ml-4 max-md:hidden" />
                )}
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]">
        <Link
          href="#services"
          aria-label="Scroll to services"
          className="flex items-center justify-center w-11 h-11 border-2 border-white/15 rounded-full text-text-muted"
        >
          <motion.div
            animate={{ y: [0, -8, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
