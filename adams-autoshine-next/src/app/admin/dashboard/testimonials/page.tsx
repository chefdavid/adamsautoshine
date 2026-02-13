"use client";

import { SectionEditor } from "@/components/admin/SectionEditor";
import {
  InlineText,
  InlineTextArea,
  InlineArrayManager,
  DarkPreviewContainer,
} from "@/components/admin/inline";
import { Star } from "lucide-react";
import type { TestimonialData } from "@/lib/admin-types";

export default function TestimonialsPage() {
  return (
    <SectionEditor
      section="testimonials"
      title="Testimonials"
      description="Customer reviews shown on the site."
    >
      {({ data, updateData }) => {
        const testimonials = data as unknown as TestimonialData[];
        return (
          <DarkPreviewContainer sectionBg="dark">
            <InlineArrayManager
              items={testimonials}
              onChange={(items) => updateData(items as unknown as Record<string, unknown>)}
              createItem={() => ({ text: "", initials: "", name: "", location: "" })}
              addLabel="Add Testimonial"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              renderItem={(item, _, update) => (
                <div className="bg-bg-card border border-border-subtle rounded-2xl p-8 transition-colors hover:border-border-accent">
                  {/* Stars */}
                  <div className="flex gap-1 text-amber-400 text-[0.9rem] mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <InlineTextArea
                    value={item.text}
                    onChange={(v) => update({ ...item, text: v })}
                    className="text-[0.95rem] text-text-light leading-relaxed mb-6 italic"
                    placeholder="Review text..."
                  />

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center shrink-0">
                      <InlineText
                        value={item.initials}
                        onChange={(v) => update({ ...item, initials: v })}
                        className="text-bg-dark font-bold text-[0.9rem]"
                        placeholder="JM"
                      />
                    </div>
                    <div>
                      <InlineText
                        value={item.name}
                        onChange={(v) => update({ ...item, name: v })}
                        tag="span"
                        className="block text-text-white text-[0.9rem]"
                        placeholder="Name..."
                      />
                      <InlineText
                        value={item.location}
                        onChange={(v) => update({ ...item, location: v })}
                        className="text-[0.8rem] text-text-muted"
                        placeholder="Location..."
                      />
                    </div>
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
