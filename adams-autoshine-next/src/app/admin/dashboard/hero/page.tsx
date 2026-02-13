"use client";

import { SectionEditor } from "@/components/admin/SectionEditor";
import {
  InlineText,
  InlineTextArea,
  InlineIcon,
  InlineArrayManager,
  DarkPreviewContainer,
} from "@/components/admin/inline";
import type { HeroData } from "@/lib/admin-types";

export default function HeroPage() {
  return (
    <SectionEditor
      section="hero"
      title="Hero Section"
      description="The main banner visitors see first."
    >
      {({ data, updateField }) => {
        const hero = data as unknown as HeroData;
        return (
          <DarkPreviewContainer sectionBg="dark">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              {/* Badge */}
              <div className="flex justify-center">
                <div className="inline-flex bg-amber-500/12 border border-border-accent rounded-full px-5 py-2">
                  <InlineText
                    value={hero.badge}
                    onChange={(v) => updateField("badge", v)}
                    className="text-[0.85rem] font-medium text-amber-400"
                    placeholder="Badge text..."
                  />
                </div>
              </div>

              {/* Heading */}
              <div>
                <InlineText
                  value={hero.heading}
                  onChange={(v) => updateField("heading", v)}
                  tag="h1"
                  className="text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold text-text-white leading-[1.15]"
                  placeholder="Main heading..."
                />
                <InlineText
                  value={hero.headingAccent}
                  onChange={(v) => updateField("headingAccent", v)}
                  tag="span"
                  className="text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold text-amber-400 leading-[1.15] block"
                  placeholder="Accent text..."
                />
              </div>

              {/* Subtitle */}
              <InlineTextArea
                value={hero.subtitle}
                onChange={(v) => updateField("subtitle", v)}
                className="text-[clamp(0.95rem,1.8vw,1.1rem)] text-text-muted leading-relaxed"
                placeholder="Subtitle text..."
              />

              {/* CTA Buttons */}
              <div className="flex gap-4 justify-center flex-wrap">
                <div className="btn-gradient border-2 border-amber-500 rounded-lg px-10 py-4">
                  <InlineText
                    value={hero.ctaText}
                    onChange={(v) => updateField("ctaText", v)}
                    className="font-semibold text-[1.05rem] text-bg-dark"
                    placeholder="CTA text..."
                  />
                </div>
                <div className="bg-transparent border-2 border-white/25 rounded-lg px-8 py-4">
                  <InlineText
                    value={hero.phone}
                    onChange={(v) => updateField("phone", v)}
                    className="font-semibold text-[0.95rem] text-text-white"
                    placeholder="Phone..."
                  />
                </div>
              </div>

              {/* Phone Href (not visual, small helper) */}
              <div className="flex justify-center">
                <div className="bg-white/5 rounded-lg px-4 py-2 text-xs text-text-muted">
                  <span className="opacity-60 mr-2">tel link:</span>
                  <InlineText
                    value={hero.phoneHref}
                    onChange={(v) => updateField("phoneHref", v)}
                    className="text-xs text-text-muted"
                    placeholder="tel:+1..."
                  />
                </div>
              </div>

              {/* Trust Items */}
              <div className="pt-4">
                <InlineArrayManager
                  items={hero.trustItems || []}
                  onChange={(items) => updateField("trustItems", items)}
                  createItem={() => ({ icon: "Star", text: "" })}
                  addLabel="Add Trust Item"
                  className="flex flex-wrap items-center justify-center gap-4"
                  renderItem={(item, _, update) => (
                    <div className="flex items-center gap-2 text-text-muted text-[0.9rem] font-medium">
                      <InlineIcon
                        value={item.icon}
                        onChange={(v) => update({ ...item, icon: v })}
                        className="h-4 w-4 text-amber-400"
                      />
                      <InlineText
                        value={item.text}
                        onChange={(v) => update({ ...item, text: v })}
                        className="text-[0.9rem] text-text-muted"
                        placeholder="Trust item..."
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </DarkPreviewContainer>
        );
      }}
    </SectionEditor>
  );
}
