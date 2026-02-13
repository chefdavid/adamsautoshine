"use client";

import { SectionEditor } from "@/components/admin/SectionEditor";
import {
  InlineText,
  DarkPreviewContainer,
} from "@/components/admin/inline";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { ContactData } from "@/lib/admin-types";

export default function ContactPage() {
  return (
    <SectionEditor
      section="contact"
      title="Contact Info"
      description="Business contact details shown across the site."
    >
      {({ data, updateField }) => {
        const contact = data as unknown as ContactData;
        return (
          <DarkPreviewContainer sectionBg="section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Contact Info Card */}
              <div className="bg-bg-card border border-border-subtle rounded-3xl p-8 flex flex-col gap-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center min-w-[44px] h-11 bg-amber-500/10 border border-border-accent rounded-lg">
                    <MapPin className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="block text-text-white text-[0.9rem] font-semibold mb-1">Address</span>
                    <InlineText
                      value={contact.address}
                      onChange={(v) => updateField("address", v)}
                      className="text-[0.9rem] text-text-muted"
                      placeholder="Street address..."
                    />
                    <InlineText
                      value={contact.city}
                      onChange={(v) => updateField("city", v)}
                      className="text-[0.9rem] text-text-muted block"
                      placeholder="City, State, ZIP..."
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center min-w-[44px] h-11 bg-amber-500/10 border border-border-accent rounded-lg">
                    <Phone className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="block text-text-white text-[0.9rem] font-semibold mb-1">Phone</span>
                    <InlineText
                      value={contact.phone}
                      onChange={(v) => updateField("phone", v)}
                      className="text-[0.9rem] text-text-muted"
                      placeholder="Phone number..."
                    />
                    <div className="mt-1 bg-white/5 rounded px-2 py-0.5 inline-block">
                      <span className="text-[0.7rem] text-text-muted/50 mr-1">href:</span>
                      <InlineText
                        value={contact.phoneHref}
                        onChange={(v) => updateField("phoneHref", v)}
                        className="text-[0.7rem] text-text-muted/60"
                        placeholder="tel:..."
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center min-w-[44px] h-11 bg-amber-500/10 border border-border-accent rounded-lg">
                    <Mail className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="block text-text-white text-[0.9rem] font-semibold mb-1">Email</span>
                    <InlineText
                      value={contact.email}
                      onChange={(v) => updateField("email", v)}
                      className="text-[0.9rem] text-text-muted"
                      placeholder="Email..."
                    />
                    <div className="mt-1 bg-white/5 rounded px-2 py-0.5 inline-block">
                      <span className="text-[0.7rem] text-text-muted/50 mr-1">href:</span>
                      <InlineText
                        value={contact.emailHref}
                        onChange={(v) => updateField("emailHref", v)}
                        className="text-[0.7rem] text-text-muted/60"
                        placeholder="mailto:..."
                      />
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center min-w-[44px] h-11 bg-amber-500/10 border border-border-accent rounded-lg">
                    <Clock className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-text-white text-[0.9rem] font-semibold mb-1">Hours</span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[0.8rem] text-text-muted/60 w-16">Weekday</span>
                        <InlineText
                          value={contact.hours?.weekday || ""}
                          onChange={(v) => updateField("hours", { ...contact.hours, weekday: v })}
                          className="text-[0.9rem] text-text-muted"
                          placeholder="Mon-Fri hours..."
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[0.8rem] text-text-muted/60 w-16">Saturday</span>
                        <InlineText
                          value={contact.hours?.saturday || ""}
                          onChange={(v) => updateField("hours", { ...contact.hours, saturday: v })}
                          className="text-[0.9rem] text-text-muted"
                          placeholder="Saturday hours..."
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[0.8rem] text-text-muted/60 w-16">Sunday</span>
                        <InlineText
                          value={contact.hours?.sunday || ""}
                          onChange={(v) => updateField("hours", { ...contact.hours, sunday: v })}
                          className="text-[0.9rem] text-text-muted"
                          placeholder="Sunday hours..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social & Map */}
              <div className="space-y-6">
                {/* Map Embed URL */}
                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6">
                  <h4 className="text-sm font-semibold text-text-white mb-3">Google Maps Embed</h4>
                  <div className="bg-bg-input border border-border-subtle rounded-lg px-4 py-3">
                    <InlineText
                      value={contact.mapEmbedUrl || ""}
                      onChange={(v) => updateField("mapEmbedUrl", v)}
                      className="text-[0.8rem] text-text-muted break-all"
                      placeholder="Maps iframe URL..."
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-bg-card border border-border-subtle rounded-2xl p-6">
                  <h4 className="text-sm font-semibold text-text-white mb-3">Social Links</h4>
                  <div className="space-y-3">
                    {(["facebook", "instagram", "tiktok", "google"] as const).map((platform) => (
                      <div key={platform} className="flex items-center gap-3">
                        <span className="text-[0.8rem] text-text-muted/60 w-20 capitalize">{platform}</span>
                        <div className="flex-1 bg-bg-input border border-border-subtle rounded-lg px-3 py-2">
                          <InlineText
                            value={contact.social?.[platform] || ""}
                            onChange={(v) => updateField("social", { ...contact.social, [platform]: v })}
                            className="text-[0.8rem] text-text-muted"
                            placeholder={`${platform} URL...`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DarkPreviewContainer>
        );
      }}
    </SectionEditor>
  );
}
