"use client";

import { SectionEditor } from "@/components/admin/SectionEditor";
import {
  InlineText,
  InlineToggle,
  InlineArrayManager,
  DarkPreviewContainer,
} from "@/components/admin/inline";
import { CheckCircle, XCircle } from "lucide-react";
import type { PricingTierData, PricingFeatureData } from "@/lib/admin-types";

export default function PricingPage() {
  return (
    <SectionEditor
      section="pricing"
      title="Pricing"
      description="Your service packages and pricing tiers."
    >
      {({ data, updateData }) => {
        const tiers = data as unknown as PricingTierData[];
        return (
          <DarkPreviewContainer sectionBg="section">
            <InlineArrayManager
              items={tiers}
              onChange={(items) => updateData(items as unknown as Record<string, unknown>)}
              createItem={() => ({
                name: "",
                tagline: "",
                price: 0,
                decimal: ".99",
                featured: false,
                badge: "",
                features: [],
              })}
              addLabel="Add Tier"
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
              renderItem={(item, _, update) => (
                <div
                  className={`relative flex flex-col rounded-3xl p-10 transition-all ${
                    item.featured
                      ? "border-2 border-amber-500 bg-gradient-to-b from-amber-500/8 to-bg-card shadow-amber-glow"
                      : "bg-bg-card border border-border-subtle"
                  }`}
                >
                  {/* Featured badge */}
                  {item.featured && item.badge && (
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 btn-gradient text-bg-dark text-[0.8rem] font-bold px-6 py-1.5 rounded-b-lg">
                      <InlineText
                        value={item.badge || ""}
                        onChange={(v) => update({ ...item, badge: v })}
                        className="text-[0.8rem] font-bold text-bg-dark"
                        placeholder="Badge..."
                      />
                    </div>
                  )}

                  {/* Featured toggle */}
                  <div className="mb-4">
                    <InlineToggle
                      value={item.featured || false}
                      onChange={(v) => update({ ...item, featured: v })}
                      label="Featured"
                    />
                  </div>

                  {/* Badge text (when featured) */}
                  {item.featured && (
                    <div className="mb-2">
                      <InlineText
                        value={item.badge || ""}
                        onChange={(v) => update({ ...item, badge: v })}
                        className="text-xs text-amber-400"
                        placeholder="Badge label..."
                      />
                    </div>
                  )}

                  {/* Name */}
                  <InlineText
                    value={item.name}
                    onChange={(v) => update({ ...item, name: v })}
                    tag="h3"
                    className="text-[1.4rem] font-bold text-text-white"
                    placeholder="Tier name..."
                  />

                  {/* Tagline */}
                  <InlineText
                    value={item.tagline}
                    onChange={(v) => update({ ...item, tagline: v })}
                    className="text-[0.85rem] text-text-muted mt-1"
                    placeholder="Tagline..."
                  />

                  {/* Price */}
                  <div className="py-6 border-b border-border-subtle mb-6">
                    <div className="flex items-start">
                      <span className="text-amber-400 text-2xl align-super">$</span>
                      <InlineText
                        value={String(item.price)}
                        onChange={(v) => update({ ...item, price: parseInt(v) || 0 })}
                        className="text-[3.5rem] font-extrabold text-text-white leading-none"
                        placeholder="0"
                        inputType="number"
                      />
                      <InlineText
                        value={item.decimal}
                        onChange={(v) => update({ ...item, decimal: v })}
                        className="text-2xl text-text-muted align-super"
                        placeholder=".99"
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1">
                    <InlineArrayManager
                      items={item.features || []}
                      onChange={(features) => update({ ...item, features })}
                      createItem={() => ({ text: "", included: true })}
                      addLabel="Add Feature"
                      renderItem={(feat: PricingFeatureData, _, updateFeat) => (
                        <div className="flex items-center gap-3 py-1.5">
                          <button
                            type="button"
                            onClick={() => updateFeat({ ...feat, included: !feat.included })}
                            className="shrink-0"
                            title="Toggle included"
                          >
                            {feat.included ? (
                              <CheckCircle className="h-4 w-4 text-amber-400" />
                            ) : (
                              <XCircle className="h-4 w-4 text-text-muted/40" />
                            )}
                          </button>
                          <InlineText
                            value={feat.text}
                            onChange={(v) => updateFeat({ ...feat, text: v })}
                            className={`text-[0.9rem] ${
                              feat.included ? "text-text-light" : "text-text-muted/40 line-through"
                            }`}
                            placeholder="Feature text..."
                          />
                        </div>
                      )}
                    />
                  </div>

                  {/* CTA placeholder */}
                  <div className={`mt-8 py-3 text-center rounded-lg font-semibold border-2 text-sm ${
                    item.featured
                      ? "btn-gradient border-amber-500 text-bg-dark"
                      : "bg-transparent border-white/25 text-text-white"
                  }`}>
                    Book Now
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
