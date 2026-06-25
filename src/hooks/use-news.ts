import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { NewsItem } from "@/lib/news";

const COLUMNS = "id,title,excerpt,tag,image_url,published_at,link_url";

export function useNews(limit?: number) {
  return useQuery({
    queryKey: ["news", limit ?? "all"],
    queryFn: async (): Promise<NewsItem[]> => {
      let query = supabase
        .from("news")
        .select(COLUMNS)
        .order("published_at", { ascending: false })
        .order("created_at", { ascending: false });

      if (limit) query = query.limit(limit);

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as NewsItem[];
    },
  });
}
