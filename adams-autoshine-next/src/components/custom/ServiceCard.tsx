"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { staggerItem } from "./StaggerContainer";
import type { Service } from "@/types";

interface ServiceCardProps extends Service {
  index?: number;
}

export function ServiceCard({ icon: Icon, title, description, features, index }: ServiceCardProps) {
  const num = String(index ?? 0).padStart(2, "0");

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-white border border-black/[0.06] rounded-2xl p-9 overflow-hidden transition-all duration-300 hover:border-amber/30 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber to-amber-light scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center justify-center w-15 h-15 bg-amber/10 border border-amber/20 rounded-xl text-amber transition-all duration-300 group-hover:bg-amber group-hover:text-white group-hover:border-amber">
          <Icon className="h-6 w-6" />
        </div>
        <span className="text-[0.75rem] font-semibold text-[#94A3B8] uppercase tracking-widest">
          service — {num}
        </span>
      </div>

      <h3 className="text-[1.2rem] font-bold text-[#0F172A] mb-3 uppercase tracking-wide">
        {title}
      </h3>
      <p className="text-[0.9rem] text-[#64748B] mb-4 leading-relaxed">
        {description}
      </p>
      <ul className="flex flex-col gap-2">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2.5 text-[0.85rem] text-[#334155]"
          >
            <Check className="h-3.5 w-3.5 text-amber shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
