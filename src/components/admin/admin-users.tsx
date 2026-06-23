import { useState } from "react";
import { useAdminUsers, useGrantAdminAccess, useRevokeAdminAccess } from "@/hooks/use-admin-users";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

export function AdminUsers() {
  const { data: admins, isLoading } = useAdminUsers();
  const grantAccess = useGrantAdminAccess();
  const revokeAccess = useRevokeAdminAccess();
  const [email, setEmail] = useState("");
  const [loadingEmail, setLoadingEmail] = useState("");

  const handleGrantAccess = async () => {
    if (!email.trim()) return;

    setLoadingEmail(email);
    try {
      // Find user by email - using Supabase REST API
      const { data: users, error } = await supabase
        .from("auth.users")
        .select("id")
        .eq("email", email)
        .limit(1)
        .single();

      if (error) {
        // Fallback: Try admin API if regular query fails
        try {
          const { data: adminData, error: adminError } = await supabase.auth.admin.listUsers();
          if (adminError) throw adminError;

          const user = adminData?.users?.find((u) => u.email === email);
          if (!user) {
            toast.error("A felhasználó nem található");
            return;
          }
          await grantAccess.mutateAsync(user.id);
          setEmail("");
        } catch {
          toast.error("Nem sikerült elérni a felhasználókat");
        }
        return;
      }

      if (!users?.id) {
        toast.error("A felhasználó nem található");
        return;
      }

      await grantAccess.mutateAsync(users.id);
      setEmail("");
    } finally {
      setLoadingEmail("");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Betöltés…
      </div>
    );
  }

  const adminList = admins ?? [];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/60 bg-background p-4">
        <div className="flex gap-2">
          <Input
            placeholder="felhasználó@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGrantAccess();
            }}
            className="flex-1"
          />
          <Button
            variant="hero"
            size="sm"
            onClick={handleGrantAccess}
            disabled={grantAccess.isPending || loadingEmail === email}
          >
            <Plus className="h-4 w-4" /> Megadás
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-display text-sm font-extrabold text-foreground">
          Adminisztrátorok ({adminList.length})
        </h4>
        {adminList.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-background p-4 text-center text-sm text-muted-foreground">
            <p>Nincs más adminisztrátor.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {adminList.map((admin) => (
              <div
                key={admin.id}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-background p-3"
              >
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{admin.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(admin.created_at).toLocaleDateString("hu-HU")}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => revokeAccess.mutate(admin.id)}
                  disabled={revokeAccess.isPending}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
