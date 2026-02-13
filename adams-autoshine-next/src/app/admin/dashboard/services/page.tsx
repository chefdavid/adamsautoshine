"use client";

import { SectionEditor } from "@/components/admin/SectionEditor";
import {
  InlineText,
  InlineTextArea,
  InlineIcon,
  InlineArrayManager,
  DarkPreviewContainer,
} from "@/components/admin/inline";
import { Check } from "lucide-react";
import type { ServiceData } from "@/lib/admin-types";

export default function ServicesPage() {
  return (
    <SectionEditor
      section="services"
      title="Services"
      description="The detailing services you offer."
    >
      {({ data, updateData }) => {
        const services = data as unknown as ServiceData[];
        return (
          <DarkPreviewContainer sectionBg="section">
            <InlineArrayManager
              items={services}
              onChange={(items) => updateData(items as unknown as Record<string, unknown>)}
              createItem={() => ({
                icon: "Sparkles",
                title: "",
                description: "",
                features: [""],
              })}
              addLabel="Add Service"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              renderItem={(item, _, update) => (
                <div className="group relative bg-bg-card border border-border-subtle rounded-2xl p-9 transition-all duration-300 hover:border-border-accent hover:bg-bg-card-hover">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 to-amber-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  {/* Icon */}
                  <div className="w-15 h-15 bg-gradient-to-br from-amber-500/15 to-amber-500/5 border border-border-accent rounded-xl flex items-center justify-center mb-5">
                    <InlineIcon
                      value={item.icon}
                      onChange={(v) => update({ ...item, icon: v })}
                      className="h-7 w-7 text-amber-400"
                    />
                  </div>

                  {/* Title */}
                  <InlineText
                    value={item.title}
                    onChange={(v) => update({ ...item, title: v })}
                    tag="h3"
                    className="text-[1.2rem] font-semibold text-text-white mb-2"
                    placeholder="Service title..."
                  />

                  {/* Description */}
                  <InlineTextArea
                    value={item.description}
                    onChange={(v) => update({ ...item, description: v })}
                    className="text-[0.9rem] text-text-muted leading-relaxed mb-5"
                    placeholder="Service description..."
                  />

                  {/* Features */}
                  <div className="space-y-2.5">
                    <InlineArrayManager
                      items={item.features || []}
                      onChange={(features) => update({ ...item, features })}
                      createItem={() => ""}
                      addLabel="Add Feature"
                      renderItem={(feat, fi, updateFeat) => (
                        <div className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                          <InlineText
                            value={feat}
                            onChange={(v) => updateFeat(v)}
                            className="text-[0.85rem] text-text-light"
                            placeholder={`Feature ${fi + 1}...`}
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              )}
            />
          </DarkPreviewContainer>
        );
      }}
    </SectionEditor>
  );
}
