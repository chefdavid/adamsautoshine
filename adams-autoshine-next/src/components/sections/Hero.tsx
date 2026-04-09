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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#E8EEF4]"
    >
      {/* Watermark text behind everything */}
      <div className="absolute inset-0 flex items-center justify-center z-[1]">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hero-watermark"
        >
          AUTOSHINE
        </motion.span>
      </div>

      {/* Hero car image */}
      <div className="absolute inset-0 z-[2] flex items-end justify-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-[900px] px-5"
        >
          <img
            src="/images/hero-bg.jpg"
            alt="Professional car detailing"
            className="w-full h-auto object-cover rounded-t-3xl shadow-2xl"
            style={{ maxHeight: "55vh" }}
          />
        </motion.div>
      </div>

      {/* Blue accent block (Moxom-style geometric element) */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[180px] h-[280px] bg-amber/80 rounded-lg z-[1]"
      />

      {/* Content overlay at top */}
      <div className="relative z-[3] text-center max-w-[860px] px-5 pt-[120px] pb-[340px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-amber/10 border border-border-accent rounded-full px-6 py-2.5 text-amber text-[0.85rem] font-medium mb-7"
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
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link
            href="#booking"
            className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-lg font-semibold text-[1.05rem] btn-gradient text-white border-2 border-amber transition-all duration-300 hover:-translate-y-0.5 hover:shadow-amber-glow max-md:w-full max-md:max-w-[300px]"
          >
            <CalendarCheck className="h-5 w-5" />
            {data.ctaText}
          </Link>
          <a
            href={data.phoneHref}
            className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-lg font-semibold text-[1.05rem] bg-white text-text-white border-2 border-border-subtle transition-all duration-300 hover:border-amber hover:text-amber hover:-translate-y-0.5 shadow-sm max-md:w-full max-md:max-w-[300px]"
          >
            <Phone className="h-5 w-5" />
            {data.phone}
          </a>
        </motion.div>
      </div>

      {/* Hours bar at bottom left */}
      <div className="absolute bottom-8 left-8 z-[4] flex items-center gap-3">
        <div className="w-10 h-px bg-text-muted/40" />
        <p className="text-[0.8rem] text-text-muted font-medium">
          <span className="font-semibold text-text-white">Mon - Sat:</span> 08:00 - 18:00
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-[4]">
        <Link
          href="#features"
          aria-label="Scroll to features"
          className="flex items-center justify-center w-11 h-11 border-2 border-text-muted/20 rounded-full text-text-muted hover:border-amber hover:text-amber transition-colors"
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
