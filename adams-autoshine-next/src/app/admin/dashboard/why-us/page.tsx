"use client";

import { SectionEditor } from "@/components/admin/SectionEditor";
import {
  InlineText,
  InlineTextArea,
  InlineArrayManager,
  DarkPreviewContainer,
} from "@/components/admin/inline";
import type { WhyReasonData } from "@/lib/admin-types";

export default function WhyUsPage() {
  return (
    <SectionEditor
      section="why-us"
      title="Why Choose Us"
      description="Reasons customers should pick you."
    >
      {({ data, updateData }) => {
        const reasons = data as unknown as WhyReasonData[];
        return (
          <DarkPreviewContainer sectionBg="dark">
            <InlineArrayManager
              items={reasons}
              onChange={(items) => updateData(items as unknown as Record<string, unknown>)}
              createItem={() => ({ number: "05", title: "", description: "" })}
              addLabel="Add Reason"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              renderItem={(item, _, update) => (
                <div className="p-8 rounded-2xl bg-bg-card border border-border-subtle text-center transition-colors hover:border-border-accent">
                  <InlineText
                    value={item.number}
                    onChange={(v) => update({ ...item, number: v })}
                    tag="div"
                    className="text-[2.5rem] font-extrabold text-amber-400 opacity-30 leading-none mb-3"
                    placeholder="01"
                  />
                  <InlineText
                    value={item.title}
                    onChange={(v) => update({ ...item, title: v })}
                    tag="h3"
                    className="text-[1.05rem] font-semibold text-text-white mb-2"
                    placeholder="Title..."
                  />
                  <InlineTextArea
                    value={item.description}
                    onChange={(v) => update({ ...item, description: v })}
                    className="text-[0.9rem] text-text-muted leading-relaxed"
                    placeholder="Description..."
                  />
                </div>
              )}
            />
          </DarkPreviewContainer>
        );
      }}
    </SectionEditor>
  );
}
