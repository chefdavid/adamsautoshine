"use client";

import { Star } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";
import { SectionHeader } from "@/components/custom/SectionHeader";
import { StaggerContainer } from "@/components/custom/StaggerContainer";
import { TestimonialCard } from "@/components/custom/TestimonialCard";
import { ScrollReveal } from "@/components/custom/ScrollReveal";
import type { TestimonialData } from "@/lib/admin-types";

interface TestimonialsProps {
  data: TestimonialData[];
  googleUrl?: string;
}

export function Testimonials({ data, googleUrl }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-25 bg-bg-dark">
      <div className="max-w-[1200px] mx-auto px-5">
        <SectionHeader
          icon={Star}
          tag="Customer Reviews"
          title="What Our Customers"
          titleAccent="Say"
          subtitle="Don't just take our word for it. Here's what Enid car owners say about our detailing services."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </StaggerContainer>

        {googleUrl && (
          <ScrollReveal className="text-center mt-10">
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg font-semibold text-[0.95rem] bg-transparent text-text-white border-2 border-white/25 transition-all duration-300 hover:border-amber hover:text-amber hover:-translate-y-0.5"
            >
              <FaGoogle />
              See All Google Reviews
            </a>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
