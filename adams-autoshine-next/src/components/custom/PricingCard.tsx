"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { staggerItem } from "./StaggerContainer";
import { cn } from "@/lib/utils";
import type { PricingTier } from "@/types";

export function PricingCard({
  name,
  tagline,
  price,
  decimal,
  featured,
  badge,
  features,
}: PricingTier) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative flex flex-col bg-bg-card border rounded-3xl p-10 max-sm:p-8 transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]",
        featured
          ? "border-amber bg-gradient-to-b from-amber/8 to-bg-card lg:scale-[1.03] shadow-amber-glow"
          : "border-border-subtle"
      )}
    >
      {badge && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2 btn-gradient text-bg-dark text-[0.8rem] font-bold px-6 py-1.5 rounded-b-lg uppercase tracking-wider">
          {badge}
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-[1.4rem] font-bold text-text-white mb-1">
          {name}
        </h3>
        <p className="text-[0.85rem] text-text-muted">{tagline}</p>
      </div>

      <div className="text-center mb-8 pb-8 border-b border-border-subtle">
        <span className="text-2xl font-bold text-amber align-super">$</span>
        <span className="text-[3.5rem] font-extrabold text-text-white leading-none">
          {price}
        </span>
        <span className="text-2xl font-bold text-text-muted align-super">
          {decimal}
        </span>
      </div>

      <ul className="flex-1 flex flex-col gap-3 mb-8">
        {features.map((feature) => (
          <li
            key={feature.text}
            className={cn(
              "flex items-center gap-3 text-[0.9rem]",
              feature.included
                ? "text-text-light"
                : "text-text-muted opacity-40"
            )}
          >
            {feature.included ? (
              <CheckCircle className="h-[0.85rem] w-[0.85rem] text-amber shrink-0" />
            ) : (
              <XCircle className="h-[0.85rem] w-[0.85rem] text-text-muted shrink-0" />
            )}
            {feature.text}
          </li>
        ))}
      </ul>

      <Link
        href="#booking"
        className={cn(
          "w-full inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg font-semibold text-[0.95rem] transition-all duration-300 border-2 hover:-translate-y-0.5",
          featured
            ? "btn-gradient text-bg-dark border-amber hover:shadow-amber-glow"
            : "bg-transparent text-text-white border-white/25 hover:border-amber hover:text-amber"
        )}
      >
        Get Started
      </Link>
    </motion.div>
  );
}
