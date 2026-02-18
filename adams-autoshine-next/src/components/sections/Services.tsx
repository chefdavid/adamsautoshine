"use client";

import { Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/custom/SectionHeader";
import { StaggerContainer } from "@/components/custom/StaggerContainer";
import { ServiceCard } from "@/components/custom/ServiceCard";
import { getIcon } from "@/lib/icon-map";
import type { ServiceData } from "@/lib/admin-types";

interface ServicesProps {
  data: ServiceData[];
}

export function Services({ data }: ServicesProps) {
  return (
    <section id="services" className="py-25 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-5">
        <SectionHeader
          icon={Sparkles}
          tag="What We Offer"
          title="Our Car Detailing"
          titleAccent="Services"
          subtitle="Comprehensive auto detailing packages tailored to your vehicle's needs. From a quick exterior wash to a complete paint correction, Adam's Autoshine has you covered."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((service) => (
            <ServiceCard
              key={service.title}
              icon={getIcon(service.icon)}
              title={service.title}
              description={service.description}
              features={service.features}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
