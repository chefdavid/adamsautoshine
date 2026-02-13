"use client";

import { SectionEditor } from "@/components/admin/SectionEditor";
import {
  InlineText,
  InlineArrayManager,
  DarkPreviewContainer,
} from "@/components/admin/inline";
import type { ServiceOptionData, TimeOptionData } from "@/lib/admin-types";

export default function ServiceOptionsPage() {
  return (
    <SectionEditor
      section="service-options"
      title="Service Options"
      description="Booking form dropdown options."
    >
      {({ data, updateField }) => {
        const services = (data as Record<string, unknown>).services as ServiceOptionData[] || [];
        const times = (data as Record<string, unknown>).times as TimeOptionData[] || [];
        return (
          <DarkPreviewContainer sectionBg="section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Services Dropdown */}
              <div>
                <h3 className="text-base font-semibold text-text-white mb-4">Service Dropdown</h3>
                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6">
                  <InlineArrayManager
                    items={services}
                    onChange={(items) => updateField("services", items)}
                    createItem={() => ({ value: "", label: "" })}
                    addLabel="Add Service Option"
                    className="space-y-2"
                    renderItem={(item, _, update) => (
                      <div className="flex items-center gap-3 px-4 py-3 bg-bg-input border border-border-subtle rounded-lg">
                        <InlineText
                          value={item.label}
                          onChange={(v) => update({ ...item, label: v })}
                          className="text-[0.9rem] text-text-white flex-1"
                          placeholder="Display label..."
                        />
                        <span className="text-text-muted/40 text-xs">|</span>
                        <InlineText
                          value={item.value}
                          onChange={(v) => update({ ...item, value: v })}
                          className="text-[0.8rem] text-text-muted/60"
                          placeholder="value"
                        />
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="text-base font-semibold text-text-white mb-4">Time Slots</h3>
                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6">
                  <InlineArrayManager
                    items={times}
                    onChange={(items) => updateField("times", items)}
                    createItem={() => ({ value: "", label: "" })}
                    addLabel="Add Time Slot"
                    className="space-y-2"
                    renderItem={(item, _, update) => (
                      <div className="flex items-center gap-3 px-4 py-3 bg-bg-input border border-border-subtle rounded-lg">
                        <InlineText
                          value={item.label}
                          onChange={(v) => update({ ...item, label: v })}
                          className="text-[0.9rem] text-text-white flex-1"
                          placeholder="Display label..."
                        />
                        <span className="text-text-muted/40 text-xs">|</span>
                        <InlineText
                          value={item.value}
                          onChange={(v) => update({ ...item, value: v })}
                          className="text-[0.8rem] text-text-muted/60"
                          placeholder="value"
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </DarkPreviewContainer>
        );
      }}
    </SectionEditor>
  );
}
