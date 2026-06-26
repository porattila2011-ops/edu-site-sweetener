import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAchievements, type AchievementItem } from "@/hooks/use-achievements";
import { ACHIEVEMENT_ICON_NAMES, getAchievementIcon } from "@/lib/achievement-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, X, Trash2, Pencil } from "lucide-react";

type FormState = {
  id: string | null;
  title: string;
  description: string;
  content: string;
  icon: string;
  sort_order: number;
};

const EMPTY_FORM: FormState = {
  id: null,
  title: "",
  description: "",
  content: "",
  icon: "Award",
  sort_order: 0,
};

export function AchievementsAdmin() {
  const queryClient = useQueryClient();
  const { data: items, isLoading } = useAchievements();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  function startNew() {
    setForm(EMPTY_FORM);
    setEditing(true);
  }

  function startEdit(a: AchievementItem) {
    setForm({
      id: a.id,
      title: a.title,
      description: a.description,
      content: a.content ?? "",
      icon: a.icon,
      sort_order: a.sort_order,
    });
    setEditing(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("A cím kötelező.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        content: form.content.trim() || null,
        icon: form.icon,
        sort_order: form.sort_order,
      };
      if (form.id) {
        const { error } = await supabase.from("achievements").update(payload).eq("id", form.id);
        if (error) throw error;
        toast.success("Büszkeség frissítve.");
      } else {
        const { error } = await supabase.from("achievements").insert(payload);
        if (error) throw error;
        toast.success("Büszkeség hozzáadva.");
      }
      await queryClient.invalidateQueries({ queryKey: ["achievements"] });
      setEditing(false);
      setForm(EMPTY_FORM);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "A mentés nem sikerült.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Biztosan törlöd ezt az elemet?")) return;
    try {
      const { error } = await supabase.from("achievements").delete().eq("id", id);
      if (error) throw error;
      await queryClient.invalidateQueries({ queryKey: ["achievements"] });
      toast.success("Elem törölve.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "A törlés nem sikerült.");
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          A „Büszkeségeink” oldalon megjelenő elismerések és eredmények.
        </p>
        {!editing && (
          <Button variant="hero" onClick={startNew}>
            <Plus className="h-5 w-5" /> Új elem
          </Button>
        )}
      </div>

      {editing && (
        <form
          onSubmit={handleSave}
          className="mb-10 rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)] md:p-8"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-extrabold text-foreground">
              {form.id ? "Elem szerkesztése" : "Új elem"}
            </h2>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditing(false);
                setForm(EMPTY_FORM);
              }}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid gap-5">
            <div className="space-y-2">
              <Label htmlFor="ach-title">Cím *</Label>
              <Input
                id="ach-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="pl. Ökoiskola"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ach-desc">Rövid leírás</Label>
              <Textarea
                id="ach-desc"
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Rövid leírás (kártyán megjelenő)…"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ach-content">Részletes tartalom</Label>
              <Textarea
                id="ach-content"
                rows={6}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Részletes szöveg, amit a részletoldalon látnak…"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ach-icon">Ikon</Label>
                <select
                  id="ach-icon"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {ACHIEVEMENT_ICON_NAMES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ach-order">Sorrend</Label>
                <Input
                  id="ach-order"
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="hero" disabled={saving}>
                {saving ? "Mentés…" : form.id ? "Módosítás mentése" : "Elem mentése"}
              </Button>
              <Button
                type="button"
                variant="soft"
                onClick={() => {
                  setEditing(false);
                  setForm(EMPTY_FORM);
                }}
              >
                Mégse
              </Button>
            </div>
          </div>
        </form>
      )}

      {isLoading ? (
        <p className="text-muted-foreground">Betöltés…</p>
      ) : !items?.length ? (
        <p className="text-muted-foreground">
          Még nincs egyetlen elem sem. A weboldalon az alapértelmezett lista látható, amíg nem adsz hozzá sajátot.
        </p>
      ) : (
        <div className="grid gap-4">
          {items.map((a) => {
            const Icon = getAchievementIcon(a.icon);
            return (
              <article
                key={a.id}
                className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-[var(--shadow-soft)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-leaf/15 text-leaf">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-display font-extrabold text-foreground">{a.title}</h3>
                  {a.description && (
                    <p className="truncate text-sm text-muted-foreground">{a.description}</p>
                  )}
                  {a.content && (
                    <p className="mt-0.5 text-xs text-primary">Van részletes tartalom</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="soft" size="icon" onClick={() => startEdit(a)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
