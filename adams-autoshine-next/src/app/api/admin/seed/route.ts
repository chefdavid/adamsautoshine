import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getDefaults } from "@/lib/defaults";
import type { SectionKey } from "@/lib/admin-types";

const SECTIONS: SectionKey[] = [
  "hero",
  "services",
  "why-us",
  "stats",
  "pricing",
  "gallery",
  "booking-perks",
  "testimonials",
  "faqs",
  "service-options",
  "contact",
  "seo",
  "footer",
  "about",
  "cta-banner",
];

export async function POST() {
  try {
    const rows = SECTIONS.map((section) => ({
      section,
      data: getDefaults(section),
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabaseAdmin
      .from("site_content")
      .upsert(rows, { onConflict: "section" });

    if (error) {
      return NextResponse.json(
        { error: "Failed to seed content", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${SECTIONS.length} sections`,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
