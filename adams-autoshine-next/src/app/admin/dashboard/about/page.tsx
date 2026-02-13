"use client";

import { SectionEditor } from "@/components/admin/SectionEditor";
import {
  InlineText,
  InlineTextArea,
  InlineIcon,
  InlineArrayManager,
  DarkPreviewContainer,
} from "@/components/admin/inline";
import { ImageIcon } from "lucide-react";
import type { AboutData } from "@/lib/admin-types";

export default function AboutPage() {
  return (
    <SectionEditor
      section="about"
      title="About Us"
      description="Your company story and values."
    >
      {({ data, updateField }) => {
        const about = data as unknown as AboutData;
        return (
          <DarkPreviewContainer sectionBg="dark">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 items-center">
              {/* Image placeholder */}
              <div className="w-full aspect-[4/3] flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-bg-card to-bg-card-hover border border-border-subtle rounded-3xl">
                <ImageIcon className="h-16 w-16 text-amber-400 opacity-30" />
                <span className="text-sm text-text-muted/40">Image placeholder</span>
              </div>

              {/* Text content */}
              <div>
                <div className="inline-flex bg-amber-500/10 border border-border-accent rounded-full px-5 py-2 mb-6">
                  <span className="text-amber-400 text-[0.85rem] font-medium uppercase">About Us</span>
                </div>

                <div className="mb-5">
                  <InlineText
                    value={about.heading}
                    onChange={(v) => updateField("heading", v)}
                    tag="h2"
                    className="text-[clamp(2rem,4vw,2.75rem)] font-bold text-text-white leading-tight inline"
                    placeholder="Heading..."
                  />{" "}
                  <InlineText
                    value={about.headingAccent}
                    onChange={(v) => updateField("headingAccent", v)}
                    tag="span"
                    className="text-[clamp(2rem,4vw,2.75rem)] font-bold text-amber-400 leading-tight"
                    placeholder="Accent..."
                  />
                </div>

                <InlineTextArea
                  value={about.paragraph1}
                  onChange={(v) => updateField("paragraph1", v)}
                  className="text-[0.95rem] text-text-muted leading-relaxed mb-4"
                  placeholder="First paragraph..."
                />

                <InlineTextArea
                  value={about.paragraph2}
                  onChange={(v) => updateField("paragraph2", v)}
                  className="text-[0.95rem] text-text-muted leading-relaxed mb-6"
                  placeholder="Second paragraph..."
                />

                {/* Value badges */}
                <InlineArrayManager
                  items={about.valueBadges || []}
                  onChange={(items) => updateField("valueBadges", items)}
                  createItem={() => ({ icon: "Heart", text: "" })}
                  addLabel="Add Badge"
                  className="flex gap-6 flex-wrap"
                  renderItem={(item, _, update) => (
                    <div className="flex items-center gap-2.5">
                      <InlineIcon
                        value={item.icon}
                        onChange={(v) => update({ ...item, icon: v })}
                        className="h-5 w-5 text-amber-400"
                      />
                      <InlineText
                        value={item.text}
                        onChange={(v) => update({ ...item, text: v })}
                        className="text-[0.85rem] font-medium text-text-light"
                        placeholder="Badge text..."
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
