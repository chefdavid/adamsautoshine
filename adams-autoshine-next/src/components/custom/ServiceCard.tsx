"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { staggerItem } from "./StaggerContainer";
import type { Service } from "@/types";

export function ServiceCard({ icon: Icon, title, description, features }: Service) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-bg-card border border-border-subtle rounded-2xl p-9 overflow-hidden transition-colors duration-300 hover:border-border-accent hover:bg-bg-card-hover hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber to-amber-light scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="flex items-center justify-center w-15 h-15 bg-gradient-to-br from-amber/15 to-amber/5 border border-border-accent rounded-xl text-amber text-[1.4rem] mb-5 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-amber group-hover:to-amber-dark group-hover:text-bg-dark group-hover:border-amber">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="text-[1.2rem] font-semibold text-text-white mb-3">
        {title}
      </h3>
      <p className="text-[0.9rem] text-text-muted mb-4 leading-relaxed">
        {description}
      </p>
      <ul className="flex flex-col gap-2">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2.5 text-[0.85rem] text-text-light"
          >
            <Check className="h-3.5 w-3.5 text-amber shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
