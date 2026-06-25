import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout, PageHero } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsAdmin } from "@/components/admin/news-admin";
import { DocumentsAdmin } from "@/components/admin/documents-admin";
import { ContentAdmin } from "@/components/admin/content-admin";
import { AchievementsAdmin } from "@/components/admin/achievements-admin";
import { GalleryAdmin } from "@/components/admin/gallery-admin";
import { AdminUsers } from "@/components/admin/admin-users";
import { EFOPAdmin } from "@/components/admin/efop-admin";
import { toast } from "sonner";
import { LogOut, ShieldCheck, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Szerkesztő felület — Dr. Molnár István EGYMI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [claiming, setClaiming] = useState(false);

  async function refreshRole(uid: string) {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", uid)
      .eq("role", "admin")
      .maybeSingle();
    setIsAdmin(!!data);
  }

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      setUserId(data.session.user.id);
      await refreshRole(data.session.user.id);
      setChecking(false);
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleClaimAdmin() {
    setClaiming(true);
    try {
      const { data, error } = await supabase.rpc("claim_admin");
      if (error) throw error;
      if (data) {
        toast.success("Mostantól admin vagy! Kezelheted a weboldalt.");
        if (userId) await refreshRole(userId);
      } else {
        toast.error("Már van adminisztrátor — kérd meg, hogy adjon hozzáférést.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Hiba történt.");
    } finally {
      setClaiming(false);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (checking) {
    return (
      <SiteLayout>
        <div className="container-page flex items-center justify-center py-32 text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Betöltés…
        </div>
      </SiteLayout>
    );
  }

  if (!isAdmin) {
    return (
      <SiteLayout>
        <PageHero
          eyebrow="Szerkesztői felület"
          title="Adminisztrátori hozzáférés"
          description="A weboldal szerkesztéséhez admin jogosultság szükséges."
        />
        <section className="container-page py-14 md:py-20">
          <div className="mx-auto max-w-md rounded-3xl border border-border/60 bg-card p-8 text-center shadow-[var(--shadow-soft)]">
            <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Ha te vagy az első szerkesztő, kattints az alábbi gombra az admin
              jogosultság megszerzéséhez. Ez csak akkor működik, ha még nincs más admin.
            </p>
            <Button
              variant="hero"
              size="lg"
              className="mt-6 w-full"
              onClick={handleClaimAdmin}
              disabled={claiming}
            >
              {claiming ? "Folyamatban…" : "Admin szeretnék lenni"}
            </Button>
            <Button variant="ghost" size="sm" className="mt-3" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" /> Kijelentkezés
            </Button>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Szerkesztői felület"
        title="Weboldal kezelése"
        description="Itt szerkesztheted a hírek, dokumentumok, oldalszövegek, képek és büszkeségek tartalmát."
      />
      <section className="container-page py-12 md:py-16">
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" /> Kijelentkezés
          </Button>
        </div>

        <Tabs defaultValue="content" className="mt-8">
          <TabsList className="mb-8 flex h-auto flex-wrap justify-start gap-1">
            <TabsTrigger value="content">🎨 Szövegek & Képek</TabsTrigger>
            <TabsTrigger value="gallery">🖼️ Galéria</TabsTrigger>
            <TabsTrigger value="efop">📋 EFOP Projekt</TabsTrigger>
            <TabsTrigger value="news">📰 Hírek</TabsTrigger>
            <TabsTrigger value="documents">📄 Dokumentumtár</TabsTrigger>
            <TabsTrigger value="achievements">⭐ Büszkeségeink</TabsTrigger>
            <TabsTrigger value="users">👥 Adminisztrátorok</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-8">
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
              <ContentAdmin />
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
              <GalleryAdmin />
            </div>
          </TabsContent>

          <TabsContent value="efop">
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
              <EFOPAdmin />
            </div>
          </TabsContent>

          <TabsContent value="news">
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
              <NewsAdmin />
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
              <DocumentsAdmin />
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
              <AchievementsAdmin />
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
              <AdminUsers />
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </SiteLayout>
  );
}
