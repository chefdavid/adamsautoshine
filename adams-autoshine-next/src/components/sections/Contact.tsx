"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SectionHeader } from "@/components/custom/SectionHeader";
import { ScrollReveal } from "@/components/custom/ScrollReveal";
import { SocialLinks } from "@/components/custom/SocialLinks";
import { GoogleMap } from "@/components/custom/GoogleMap";
import type { ContactData } from "@/lib/admin-types";

interface ContactProps {
  data: ContactData;
}

export function Contact({ data }: ContactProps) {
  return (
    <section id="contact" className="py-25 bg-bg-section">
      <div className="max-w-[1200px] mx-auto px-5">
        <SectionHeader
          icon={MapPin}
          tag="Get In Touch"
          title="Visit Us in"
          titleAccent="Enid, Oklahoma"
          subtitle="Stop by our shop or reach out anytime. We're always happy to answer questions and provide free estimates."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 items-start">
          <ScrollReveal>
            <div className="bg-bg-card border border-border-subtle rounded-3xl p-8 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center min-w-[44px] h-11 bg-amber/10 border border-border-accent rounded-lg text-amber">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <strong className="block text-text-white text-[0.9rem] font-semibold mb-1">
                    Location
                  </strong>
                  <p className="text-[0.9rem] text-text-muted leading-relaxed">
                    {data.address}
                    <br />
                    {data.city}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center min-w-[44px] h-11 bg-amber/10 border border-border-accent rounded-lg text-amber">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <strong className="block text-text-white text-[0.9rem] font-semibold mb-1">
                    Phone
                  </strong>
                  <a
                    href={data.phoneHref}
                    className="text-[0.9rem] text-text-muted hover:text-amber transition-colors"
                  >
                    {data.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center min-w-[44px] h-11 bg-amber/10 border border-border-accent rounded-lg text-amber">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <strong className="block text-text-white text-[0.9rem] font-semibold mb-1">
                    Email
                  </strong>
                  <a
                    href={data.emailHref}
                    className="text-[0.9rem] text-text-muted hover:text-amber transition-colors"
                  >
                    {data.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center min-w-[44px] h-11 bg-amber/10 border border-border-accent rounded-lg text-amber">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <strong className="block text-text-white text-[0.9rem] font-semibold mb-1">
                    Hours
                  </strong>
                  <p className="text-[0.9rem] text-text-muted leading-relaxed">
                    {data.hours?.weekday}
                    <br />
                    {data.hours?.saturday}
                    <br />
                    {data.hours?.sunday}
                  </p>
                </div>
              </div>
            </div>

            <SocialLinks className="mt-5" socialData={data.social} />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <GoogleMap src={data.mapEmbedUrl} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
