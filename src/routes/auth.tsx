import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout, PageHero } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Bejelentkezés — Dr. Molnár István EGYMI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Fiók létrehozva! Bejelentkezés folyamatban…");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Ismeretlen hiba történt.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Szerkesztői felület"
        title={mode === "login" ? "Bejelentkezés" : "Fiók létrehozása"}
        description="Jelentkezz be a hírek kezeléséhez. Ezt az oldalt csak a szerkesztők használják."
      />
      <section className="container-page py-14 md:py-20">
        <div className="mx-auto max-w-md rounded-3xl border border-border/60 bg-card p-7 shadow-[var(--shadow-soft)] md:p-9">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail cím</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pl. szerkeszto@drmolnar.edu.hu"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Jelszó</Label>
              <Input
                id="password"
                type="password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Legalább 6 karakter"
              />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading
                ? "Folyamatban…"
                : mode === "login"
                  ? "Bejelentkezés"
                  : "Fiók létrehozása"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? "Még nincs fiókod?" : "Már van fiókod?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="font-bold text-primary hover:underline"
            >
              {mode === "login" ? "Regisztrálj" : "Jelentkezz be"}
            </button>
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-md text-center">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" /> Vissza a főoldalra
            </Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
