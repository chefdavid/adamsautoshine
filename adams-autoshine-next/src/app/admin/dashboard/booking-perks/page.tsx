"use client";

import { SectionEditor } from "@/components/admin/SectionEditor";
import {
  InlineText,
  InlineIcon,
  InlineArrayManager,
  DarkPreviewContainer,
} from "@/components/admin/inline";
import type { PerkData } from "@/lib/admin-types";

export default function BookingPerksPage() {
  return (
    <SectionEditor
      section="booking-perks"
      title="Booking Perks"
      description="Benefits shown next to the booking form."
    >
      {({ data, updateData }) => {
        const perks = data as unknown as PerkData[];
        return (
          <DarkPreviewContainer sectionBg="section">
            <div className="max-w-xl space-y-6">
              <InlineArrayManager
                items={perks}
                onChange={(items) => updateData(items as unknown as Record<string, unknown>)}
                createItem={() => ({ icon: "Clock", title: "", description: "" })}
                addLabel="Add Perk"
                className="space-y-5"
                renderItem={(item, _, update) => (
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center min-w-[44px] h-11 bg-amber-500/10 border border-border-accent rounded-lg">
                      <InlineIcon
                        value={item.icon}
                        onChange={(v) => update({ ...item, icon: v })}
                        className="h-5 w-5 text-amber-400"
                      />
                    </div>
                    <div className="flex-1">
                      <InlineText
                        value={item.title}
                        onChange={(v) => update({ ...item, title: v })}
                        tag="span"
                        className="block text-text-white text-[0.95rem] font-semibold"
                        placeholder="Perk title..."
                      />
                      <InlineText
                        value={item.description}
                        onChange={(v) => update({ ...item, description: v })}
                        className="text-[0.85rem] text-text-muted"
                        placeholder="Perk description..."
                      />
                    </div>
                  </div>
                )}
              />
            </div>
          </DarkPreviewContainer>
        );
      }}
    </SectionEditor>
  );
}
