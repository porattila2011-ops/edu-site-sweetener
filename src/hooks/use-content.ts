import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CONTENT_DEFAULTS } from "@/lib/content";

export function useContent() {
  const query = useQuery({
    queryKey: ["site_content"],
    queryFn: async (): Promise<Record<string, string>> => {
      const { data, error } = await supabase.from("site_content").select("key,value");
      if (error) throw error;
      const map: Record<string, string> = {};
      for (const row of data ?? []) map[row.key] = row.value ?? "";
      return map;
    },
  });

  const map = query.data ?? {};
  const c = (key: string): string => {
    const v = map[key];
    if (v !== undefined && v !== "") return v;
    return CONTENT_DEFAULTS[key] ?? "";
  };

  return { c, map, isLoading: query.isLoading };
}
