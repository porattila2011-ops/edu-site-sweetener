import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type AchievementItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
};

export function useAchievements() {
  return useQuery({
    queryKey: ["achievements"],
    queryFn: async (): Promise<AchievementItem[]> => {
      const { data, error } = await supabase
        .from("achievements")
        .select("id,title,description,icon,sort_order")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as AchievementItem[];
    },
  });
}
