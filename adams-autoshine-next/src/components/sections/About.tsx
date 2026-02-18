"use client";

import { Users, SprayCan } from "lucide-react";
import { ScrollReveal } from "@/components/custom/ScrollReveal";
import { getIcon } from "@/lib/icon-map";
import type { AboutData } from "@/lib/admin-types";

interface AboutProps {
  data: AboutData;
}

export function About({ data }: AboutProps) {
  return (
    <section id="about" className="py-25 bg-bg-dark">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 items-center">
          <ScrollReveal>
            <div className="w-full aspect-[4/3] flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-bg-card to-bg-card-hover border border-border-subtle rounded-3xl">
              <SprayCan className="h-16 w-16 text-amber opacity-30" />
              <span className="text-text-muted font-medium">
                Adam&apos;s Autoshine
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <span className="inline-flex items-center gap-2 bg-amber/10 border border-border-accent rounded-full px-5 py-2 text-amber text-[0.85rem] font-medium uppercase tracking-wider mb-4">
              <Users className="h-4 w-4" />
              Our Story
            </span>
            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-bold text-text-white mb-5 leading-tight">
              {data.heading} <span className="text-amber">{data.headingAccent}</span>
            </h2>
            <p className="text-[0.95rem] text-text-muted mb-4 leading-relaxed">
              {data.paragraph1}
            </p>
            <p className="text-[0.95rem] text-text-muted mb-7 leading-relaxed">
              {data.paragraph2}
            </p>
            <div className="flex gap-6 flex-wrap max-md:flex-col max-md:gap-4">
              {(data.valueBadges || []).map((badge) => {
                const BadgeIcon = getIcon(badge.icon);
                return (
                  <div key={badge.text} className="flex items-center gap-2.5">
                    <BadgeIcon className="h-5 w-5 text-amber" />
                    <span className="text-[0.85rem] font-medium text-text-light">
                      {badge.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
