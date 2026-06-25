import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type EFOPEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  images_count: number;
  is_carousel: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

const COLUMNS = "id,title,date,description,images_count,is_carousel,sort_order,created_at,updated_at";

export function useEFOPEvents() {
  return useQuery({
    queryKey: ["efop_events"],
    queryFn: async (): Promise<EFOPEvent[]> => {
      const { data, error } = await supabase
        .from("efop_events")
        .select(COLUMNS)
        .order("sort_order", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as EFOPEvent[];
    },
  });
}
