"use client";

import { ImageIcon } from "lucide-react";
import { SectionHeader } from "@/components/custom/SectionHeader";
import { ScrollReveal } from "@/components/custom/ScrollReveal";
import { getIcon } from "@/lib/icon-map";
import { cn } from "@/lib/utils";
import type { GalleryItemData } from "@/lib/admin-types";

interface GalleryProps {
  data: GalleryItemData[];
}

export function Gallery({ data }: GalleryProps) {
  return (
    <section id="gallery" className="py-25 bg-bg-dark">
      <div className="max-w-[1200px] mx-auto px-5">
        <SectionHeader
          icon={ImageIcon}
          tag="See The Results"
          title="Our Recent"
          titleAccent="Work"
          subtitle="Real results on real vehicles. See why Enid car owners trust Adams Autoshine for their detailing needs."
        />

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item) => {
              const ItemIcon = getIcon(item.icon);
              return (
                <div
                  key={item.tag}
                  className={cn(
                    "group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer",
                    item.wide && "lg:col-span-2 max-lg:col-span-1"
                  )}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-bg-card to-bg-card-hover border border-border-subtle rounded-xl transition-colors duration-300 group-hover:border-border-accent">
                    <ItemIcon className="h-10 w-10 text-amber opacity-50" />
                    <span className="text-[0.9rem] text-text-muted font-medium">
                      {item.label}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-transparent flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[0.9rem] font-semibold text-text-white">
                      {item.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
