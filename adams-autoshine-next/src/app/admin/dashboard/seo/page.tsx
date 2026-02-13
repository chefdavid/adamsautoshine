"use client";

import { SectionEditor } from "@/components/admin/SectionEditor";
import {
  InlineText,
  InlineTextArea,
  DarkPreviewContainer,
} from "@/components/admin/inline";
import { Search } from "lucide-react";
import type { SEOData } from "@/lib/admin-types";

export default function SEOPage() {
  return (
    <SectionEditor
      section="seo"
      title="SEO & Metadata"
      description="Search engine optimization settings."
    >
      {({ data, updateField }) => {
        const seo = data as unknown as SEOData;
        return (
          <DarkPreviewContainer sectionBg="section">
            {/* Google Search Preview */}
            <div className="mb-10">
              <h3 className="text-sm font-medium text-text-muted mb-4 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Google Search Preview
              </h3>
              <div className="bg-white rounded-xl p-6 max-w-xl">
                <div className="text-[0.8rem] text-green-700 mb-1">adamsautoshine.com</div>
                <InlineText
                  value={seo.title}
                  onChange={(v) => updateField("title", v)}
                  tag="h3"
                  className="text-[1.2rem] text-blue-700 hover:underline font-medium leading-snug mb-1"
                  placeholder="Page title..."
                />
                <InlineTextArea
                  value={seo.description}
                  onChange={(v) => updateField("description", v)}
                  className="text-[0.85rem] text-gray-600 leading-relaxed"
                  placeholder="Meta description..."
                />
              </div>
              <div className="flex gap-4 mt-2 text-xs text-text-muted/50">
                <span>Title: {(seo.title || "").length}/60</span>
                <span>Description: {(seo.description || "").length}/160</span>
              </div>
            </div>

            {/* Keywords */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-text-muted mb-3">Keywords</h3>
              <div className="bg-bg-card border border-border-subtle rounded-xl p-5">
                <InlineTextArea
                  value={seo.keywords}
                  onChange={(v) => updateField("keywords", v)}
                  className="text-[0.9rem] text-text-light"
                  placeholder="Comma-separated keywords..."
                />
              </div>
              <p className="text-[0.75rem] text-text-muted/40 mt-1">Comma-separated keywords</p>
            </div>

            {/* Open Graph */}
            <div>
              <h3 className="text-sm font-medium text-text-muted mb-4">Open Graph (Social Sharing)</h3>
              <div className="bg-bg-card border border-border-subtle rounded-xl p-6 space-y-4">
                <div>
                  <label className="text-xs text-text-muted/60 mb-1 block">OG Title</label>
                  <InlineText
                    value={seo.ogTitle}
                    onChange={(v) => updateField("ogTitle", v)}
                    className="text-[0.95rem] text-text-white font-medium"
                    placeholder="OG title..."
                  />
                </div>
                <div>
                  <label className="text-xs text-text-muted/60 mb-1 block">OG Description</label>
                  <InlineTextArea
                    value={seo.ogDescription}
                    onChange={(v) => updateField("ogDescription", v)}
                    className="text-[0.9rem] text-text-muted"
                    placeholder="OG description..."
                  />
                </div>
                <div>
                  <label className="text-xs text-text-muted/60 mb-1 block">OG Image URL</label>
                  <InlineText
                    value={seo.ogImage}
                    onChange={(v) => updateField("ogImage", v)}
                    className="text-[0.85rem] text-text-muted break-all"
                    placeholder="Image URL..."
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
