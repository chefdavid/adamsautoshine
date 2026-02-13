"use client";

import { SectionEditor } from "@/components/admin/SectionEditor";
import {
  InlineText,
  InlineIcon,
  InlineToggle,
  InlineArrayManager,
  DarkPreviewContainer,
} from "@/components/admin/inline";
import type { GalleryItemData } from "@/lib/admin-types";

export default function GalleryPage() {
  return (
    <SectionEditor
      section="gallery"
      title="Gallery"
      description="Showcase items displayed in the gallery."
    >
      {({ data, updateData }) => {
        const items = data as unknown as GalleryItemData[];
        return (
          <DarkPreviewContainer sectionBg="dark">
            <InlineArrayManager
              items={items}
              onChange={(items) => updateData(items as unknown as Record<string, unknown>)}
              createItem={() => ({ icon: "Car", label: "", tag: "", wide: false })}
              addLabel="Add Gallery Item"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              renderItem={(item, _, update) => (
                <div className={`group relative rounded-xl overflow-hidden aspect-[4/3] ${
                  item.wide ? "lg:col-span-2" : ""
                }`}>
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-bg-card to-bg-card-hover border border-border-subtle rounded-xl transition-colors hover:border-border-accent">
                    <InlineIcon
                      value={item.icon}
                      onChange={(v) => update({ ...item, icon: v })}
                      className="h-10 w-10 text-amber-400 opacity-50"
                    />
                    <InlineText
                      value={item.label}
                      onChange={(v) => update({ ...item, label: v })}
                      className="text-[0.9rem] text-text-muted font-medium"
                      placeholder="Label..."
                    />
                    <div className="flex items-center gap-3 mt-1">
                      <InlineText
                        value={item.tag}
                        onChange={(v) => update({ ...item, tag: v })}
                        className="text-xs text-text-muted/60"
                        placeholder="Hover tag..."
                      />
                      <InlineToggle
                        value={item.wide || false}
                        onChange={(v) => update({ ...item, wide: v })}
                        label="Wide"
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
