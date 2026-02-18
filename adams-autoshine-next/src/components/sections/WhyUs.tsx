"use client";

import { Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/custom/SectionHeader";
import { StaggerContainer, staggerItem } from "@/components/custom/StaggerContainer";
import { StatCounter } from "@/components/custom/StatCounter";
import { ScrollReveal } from "@/components/custom/ScrollReveal";
import type { WhyReasonData, StatData } from "@/lib/admin-types";

interface WhyUsProps {
  reasons: WhyReasonData[];
  stats: StatData[];
}

export function WhyUs({ reasons, stats }: WhyUsProps) {
  return (
    <section id="why-us" className="py-25 bg-bg-dark">
      <div className="max-w-[1200px] mx-auto px-5">
        <SectionHeader
          icon={Trophy}
          tag="Why Adam's Autoshine"
          title="Why Enid Trusts"
          titleAccent="Adam's Autoshine"
          subtitle="We're not just another car wash. We're passionate detailing professionals committed to excellence on every vehicle we touch."
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-15">
          {reasons.map((reason) => (
            <motion.div
              key={reason.number}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl bg-bg-card border border-border-subtle text-center transition-colors duration-300 hover:border-border-accent"
            >
              <div className="text-[2.5rem] font-extrabold text-amber opacity-30 mb-3 leading-none">
                {reason.number}
              </div>
              <h3 className="text-[1.05rem] font-semibold text-text-white mb-2.5">
                {reason.title}
              </h3>
              <p className="text-[0.9rem] text-text-muted leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>

        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-bg-card border border-border-subtle rounded-3xl p-12 max-md:p-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="relative">
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
                {index < stats.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-[50px] bg-border-subtle max-lg:hidden" />
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
