import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type AdminUser = {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export function useAdminUsers() {
  return useQuery({
    queryKey: ["admin_users"],
    queryFn: async (): Promise<AdminUser[]> => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("user_id, created_at")
        .eq("role", "admin");
      if (error) throw error;

      // Fetch user details for each admin from auth metadata
      const users = await Promise.all(
        (data ?? []).map(async (row) => {
          try {
            const { data: authData } = await supabase.auth.admin.getUserById(row.user_id);
            return {
              id: row.user_id,
              email: authData?.user?.email || "Unknown",
              created_at: row.created_at,
              updated_at: row.created_at,
            };
          } catch {
            // Fallback if auth.admin is not available
            return {
              id: row.user_id,
              email: "Unknown",
              created_at: row.created_at,
              updated_at: row.created_at,
            };
          }
        })
      );
      return users;
    },
  });
}

export function useGrantAdminAccess() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("user_roles")
        .insert({
          user_id: userId,
          role: "admin",
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_users"] });
      toast.success("Admin hozzáférés megadva");
    },
    onError: (error: Error) => {
      toast.error(`Hiba: ${error.message}`);
    },
  });
}

export function useRevokeAdminAccess() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", "admin");
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_users"] });
      toast.success("Admin hozzáférés visszavonva");
    },
    onError: (error: Error) => {
      toast.error(`Hiba: ${error.message}`);
    },
  });
}
