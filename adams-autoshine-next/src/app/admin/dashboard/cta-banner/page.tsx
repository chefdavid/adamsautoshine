"use client";

import { SectionEditor } from "@/components/admin/SectionEditor";
import {
  InlineText,
  InlineTextArea,
  DarkPreviewContainer,
} from "@/components/admin/inline";
import { Phone } from "lucide-react";
import type { CTABannerData } from "@/lib/admin-types";

export default function CTABannerPage() {
  return (
    <SectionEditor
      section="cta-banner"
      title="CTA Banner"
      description="Call-to-action section near the bottom."
    >
      {({ data, updateField }) => {
        const cta = data as unknown as CTABannerData;
        return (
          <div className="relative">
            <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded text-[10px] font-medium text-amber-400/60 bg-white/5 border border-white/5">
              Edit Mode
            </div>
            <div
              className="rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
              style={{
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(10, 10, 26, 0.95) 100%), #0A0A1A",
                colorScheme: "dark",
              }}
            >
              <div className="max-w-[1200px] mx-auto px-5 py-20 text-center">
                <InlineText
                  value={cta.heading}
                  onChange={(v) => updateField("heading", v)}
                  tag="h2"
                  className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-text-white mb-3"
                  placeholder="Heading..."
                />

                <InlineTextArea
                  value={cta.subtitle}
                  onChange={(v) => updateField("subtitle", v)}
                  className="text-[1.05rem] text-text-muted mb-8"
                  placeholder="Subtitle..."
                />

                <div className="flex gap-4 justify-center flex-wrap">
                  <div className="btn-gradient border-2 border-amber-500 rounded-lg px-10 py-4 flex items-center gap-2">
                    <InlineText
                      value={cta.ctaText}
                      onChange={(v) => updateField("ctaText", v)}
                      className="font-semibold text-[1.05rem] text-bg-dark"
                      placeholder="CTA text..."
                    />
                  </div>
                  <div className="bg-transparent border-2 border-white/25 rounded-lg px-8 py-4 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-text-white" />
                    <InlineText
                      value={cta.secondaryCtaText}
                      onChange={(v) => updateField("secondaryCtaText", v)}
                      className="font-semibold text-[0.95rem] text-text-white"
                      placeholder="Secondary CTA..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </SectionEditor>
  );
}
