import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getDefaults } from "@/lib/defaults";
import { revalidatePath } from "next/cache";
import type { SectionKey } from "@/lib/admin-types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;

  try {
    const { data, error } = await supabaseAdmin
      .from("site_content")
      .select("data")
      .eq("section", section)
      .single();

    if (error || !data) {
      const defaults = getDefaults(section as SectionKey);
      return NextResponse.json({ data: defaults });
    }

    return NextResponse.json({ data: data.data });
  } catch {
    const defaults = getDefaults(section as SectionKey);
    return NextResponse.json({ data: defaults });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;

  try {
    const body = await request.json();

    const { error } = await supabaseAdmin
      .from("site_content")
      .upsert(
        {
          section,
          data: body.data,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "section" }
      );

    if (error) {
      return NextResponse.json(
        { error: "Failed to save" },
        { status: 500 }
      );
    }

    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
