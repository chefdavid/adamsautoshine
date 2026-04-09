import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { status } = body;

  if (!status || !["new", "read", "archived"].includes(status)) {
    return NextResponse.json(
      { error: "Invalid status. Must be 'new', 'read', or 'archived'" },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin
    .from("form_submissions")
    .update({ status })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
