"use client";

import Link from "next/link";
import { Tag, Info } from "lucide-react";
import { SectionHeader } from "@/components/custom/SectionHeader";
import { StaggerContainer } from "@/components/custom/StaggerContainer";
import { PricingCard } from "@/components/custom/PricingCard";
import { ScrollReveal } from "@/components/custom/ScrollReveal";
import type { PricingTierData } from "@/lib/admin-types";

interface PricingProps {
  data: PricingTierData[];
}

export function Pricing({ data }: PricingProps) {
  return (
    <section id="pricing" className="py-25 bg-[#F0F4F8]">
      <div className="max-w-[1200px] mx-auto px-5">
        <SectionHeader
          icon={Tag}
          tag="Transparent Pricing"
          title="Choose Your"
          titleAccent="Detailing Package"
          subtitle="Simple, upfront pricing with no hidden fees. Select the package that fits your vehicle's needs and budget."
        />

        <StaggerContainer className="grid grid-cols-1 max-lg:max-w-[480px] max-lg:mx-auto lg:grid-cols-3 gap-6 items-stretch">
          {data.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </StaggerContainer>

        <ScrollReveal>
          <div className="mt-10 max-w-[680px] mx-auto">
            <div className="grid grid-cols-3 gap-3 text-center mb-4">
              <div className="bg-bg-card border border-border-subtle rounded-xl px-4 py-3">
                <p className="text-[0.8rem] text-text-muted mb-0.5">Sedan / Coupe</p>
                <p className="text-[0.9rem] font-semibold text-text-white">Base price</p>
              </div>
              <div className="bg-bg-card border border-border-subtle rounded-xl px-4 py-3">
                <p className="text-[0.8rem] text-text-muted mb-0.5">SUV / Crossover / Truck</p>
                <p className="text-[0.9rem] font-semibold text-text-white">+$30–$50</p>
              </div>
              <div className="bg-bg-card border border-border-subtle rounded-xl px-4 py-3">
                <p className="text-[0.8rem] text-text-muted mb-0.5">XL (Full-size / Van / 3-row)</p>
                <p className="text-[0.9rem] font-semibold text-text-white">+$50–$80</p>
              </div>
            </div>
            <p className="text-center text-[0.85rem] text-text-muted">
              <Info className="inline h-4 w-4 text-amber mr-1.5 -mt-0.5" />
              Heavy pet hair, excessive dirt, or smoke odor may require an additional $25–$75 surcharge — we&apos;ll confirm before starting.{" "}
              <Link href="#contact" className="text-amber hover:text-amber-light">
                Contact us
              </Link>{" "}
              for a custom quote.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
