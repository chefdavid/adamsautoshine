import { supabase } from "@/lib/supabase/client";
import type { SectionKey, SectionDataMap } from "@/lib/admin-types";
import { getDefaults } from "@/lib/defaults";

export async function getContent<K extends SectionKey>(
  section: K
): Promise<SectionDataMap[K]> {
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("section", section)
      .single();

    if (error || !data) {
      return getDefaults(section);
    }

    return data.data as SectionDataMap[K];
  } catch {
    return getDefaults(section);
  }
}

export async function getAllContent(): Promise<{
  [K in SectionKey]?: SectionDataMap[K];
}> {
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("section, data");

    if (error || !data || data.length === 0) {
      return {};
    }

    const content: Record<string, unknown> = {};
    for (const row of data) {
      content[row.section] = row.data;
    }
    return content as { [K in SectionKey]?: SectionDataMap[K] };
  } catch {
    return {};
  }
}
