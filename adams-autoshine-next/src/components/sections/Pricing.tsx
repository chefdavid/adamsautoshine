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
    <section id="pricing" className="py-25 bg-bg-section">
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
          <p className="text-center mt-10 text-[0.9rem] text-text-muted">
            <Info className="inline h-4 w-4 text-amber mr-1.5 -mt-0.5" />
            Prices shown are for sedans. SUVs, trucks, and larger vehicles may
            vary.{" "}
            <Link href="#contact" className="text-amber hover:text-amber-light">
              Contact us
            </Link>{" "}
            for a custom quote.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
