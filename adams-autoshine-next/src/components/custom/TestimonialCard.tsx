"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { staggerItem } from "./StaggerContainer";
import type { Testimonial } from "@/types";

export function TestimonialCard({ text, initials, name, location }: Testimonial) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4 }}
      className="bg-bg-card border border-border-subtle rounded-2xl p-8 transition-colors duration-300 hover:border-border-accent"
    >
      <div className="flex gap-1 text-amber text-[0.9rem] mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="text-[0.95rem] text-text-light leading-relaxed mb-6 italic">
        &ldquo;{text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-amber to-amber-dark rounded-full flex items-center justify-center text-bg-dark font-bold text-[0.9rem]">
          {initials}
        </div>
        <div>
          <strong className="block text-text-white text-[0.9rem]">
            {name}
          </strong>
          <span className="text-[0.8rem] text-text-muted">{location}</span>
        </div>
      </div>
    </motion.div>
  );
}
