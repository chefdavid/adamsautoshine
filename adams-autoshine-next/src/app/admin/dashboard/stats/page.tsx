"use client";

import { SectionEditor } from "@/components/admin/SectionEditor";
import {
  InlineText,
  InlineArrayManager,
  DarkPreviewContainer,
} from "@/components/admin/inline";
import type { StatData } from "@/lib/admin-types";

export default function StatsPage() {
  return (
    <SectionEditor
      section="stats"
      title="Stats & Numbers"
      description="Impressive numbers shown on the site."
    >
      {({ data, updateData }) => {
        const stats = data as unknown as StatData[];
        return (
          <DarkPreviewContainer sectionBg="dark">
            <div className="bg-bg-card border border-border-subtle rounded-3xl p-12">
              <InlineArrayManager
                items={stats}
                onChange={(items) => updateData(items as unknown as Record<string, unknown>)}
                createItem={() => ({ value: 0, suffix: "", label: "" })}
                addLabel="Add Stat"
                className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                renderItem={(item, index, update) => (
                  <div className="text-center relative">
                    {index < stats.length - 1 && (
                      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-[50px] bg-border-subtle" />
                    )}
                    <div className="flex items-baseline justify-center">
                      <InlineText
                        value={String(item.value)}
                        onChange={(v) => update({ ...item, value: parseInt(v) || 0 })}
                        className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-amber-400"
                        placeholder="0"
                        inputType="number"
                      />
                      <InlineText
                        value={item.suffix || ""}
                        onChange={(v) => update({ ...item, suffix: v })}
                        className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-amber-400"
                        placeholder="+"
                      />
                    </div>
                    <InlineText
                      value={item.label}
                      onChange={(v) => update({ ...item, label: v })}
                      tag="div"
                      className="text-[0.9rem] text-text-muted mt-2 font-medium"
                      placeholder="Label..."
                    />
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
