import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type DocumentItem = {
  id: string;
  category: string;
  title: string;
  file_url: string;
  file_path: string | null;
  sort_order: number;
};

export function useDocuments() {
  return useQuery({
    queryKey: ["documents"],
    queryFn: async (): Promise<DocumentItem[]> => {
      const { data, error } = await supabase
        .from("documents")
        .select("id,category,title,file_url,file_path,sort_order")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as DocumentItem[];
    },
  });
}
