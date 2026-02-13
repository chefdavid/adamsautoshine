"use client";

import { CircleHelp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/custom/SectionHeader";
import { ScrollReveal } from "@/components/custom/ScrollReveal";
import type { FAQData } from "@/lib/admin-types";

interface FAQProps {
  data: FAQData[];
}

export function FAQ({ data }: FAQProps) {
  return (
    <section id="faq" className="py-25 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-5">
        <SectionHeader
          icon={CircleHelp}
          tag="Common Questions"
          title="Frequently Asked"
          titleAccent="Questions"
          subtitle="Got questions about car detailing in Enid? We've got answers."
        />

        <ScrollReveal>
          <Accordion
            type="single"
            collapsible
            className="max-w-[800px] mx-auto flex flex-col gap-3"
          >
            {data.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-bg-card border border-border-subtle rounded-xl overflow-hidden data-[state=open]:border-border-accent transition-colors duration-300 px-0"
              >
                <AccordionTrigger className="px-6 py-5 text-left text-base font-medium text-text-white hover:text-amber hover:no-underline [&[data-state=open]>svg]:text-amber [&>svg]:text-amber [&>svg]:h-[0.85rem] [&>svg]:w-[0.85rem]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-[0.9rem] text-text-muted leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}
