"use client";

import { SectionEditor } from "@/components/admin/SectionEditor";
import {
  InlineTextArea,
  DarkPreviewContainer,
} from "@/components/admin/inline";
import type { FooterData } from "@/lib/admin-types";

export default function FooterPage() {
  return (
    <SectionEditor
      section="footer"
      title="Footer"
      description="Footer text and SEO paragraph."
    >
      {({ data, updateField }) => {
        const footer = data as unknown as FooterData;
        return (
          <DarkPreviewContainer sectionBg="dark">
            <div className="space-y-8">
              {/* Brand section */}
              <div className="max-w-md">
                <div className="text-text-white text-[1.3rem] font-bold mb-2">
                  Adam&apos;s<span className="text-amber-400">AutoShine</span>
                </div>
                <InlineTextArea
                  value={footer.brandTagline}
                  onChange={(v) => updateField("brandTagline", v)}
                  className="text-[0.9rem] text-text-muted leading-relaxed"
                  placeholder="Brand tagline..."
                />
              </div>

              {/* SEO text */}
              <div className="pt-6 border-t border-border-subtle">
                <span className="text-xs text-text-muted/40 mb-2 block">SEO Paragraph</span>
                <InlineTextArea
                  value={footer.seoText}
                  onChange={(v) => updateField("seoText", v)}
                  className="text-[0.8rem] text-text-muted opacity-60 leading-relaxed text-center"
                  placeholder="SEO-optimized footer text..."
                />
              </div>

              {/* Copyright preview */}
              <div className="pt-5 border-t border-border-subtle text-center">
                <p className="text-[0.85rem] text-text-muted">
                  &copy; {new Date().getFullYear()} Adam&apos;s AutoShine. All rights reserved.
                </p>
              </div>
            </div>
          </DarkPreviewContainer>
        );
      }}
    </SectionEditor>
  );
}
