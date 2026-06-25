import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEFOPEvents, type EFOPEvent } from "@/hooks/use-efop-events";
import { uploadFile } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X, Loader2, ChevronUp, ChevronDown } from "lucide-react";

type FormState = {
  id: string | null;
  title: string;
  date: string;
  description: string;
  images_count: number;
  is_carousel: boolean;
  sort_order: number;
};

const EMPTY_FORM: FormState = {
  id: null,
  title: "",
  date: new Date().toISOString().slice(0, 10),
  description: "",
  images_count: 6,
  is_carousel: false,
  sort_order: 0,
};

export function EFOPAdmin() {
  const queryClient = useQueryClient();
  const { data: events = [], isLoading } = useEFOPEvents();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  function startNew() {
    const nextSort = Math.max(...events.map((e) => e.sort_order), 0) + 1;
    setForm({ ...EMPTY_FORM, sort_order: nextSort });
    setEditing(true);
  }

  function startEdit(event: EFOPEvent) {
    setForm({
      id: event.id,
      title: event.title,
      date: event.date,
      description: event.description,
      images_count: event.images_count,
      is_carousel: event.is_carousel,
      sort_order: event.sort_order,
    });
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
    setForm(EMPTY_FORM);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        date: form.date,
        description: form.description.trim(),
        images_count: Math.max(1, form.images_count),
        is_carousel: form.is_carousel,
        sort_order: form.sort_order,
      };

      if (!payload.title || !payload.date) {
        toast.error("A cím és a dátum kötelező.");
        setSaving(false);
        return;
      }

      if (form.id) {
        const { error } = await supabase.from("efop_events").update(payload).eq("id", form.id);
        if (error) throw error;
        toast.success("Esemény frissítve.");
      } else {
        const { error } = await supabase.from("efop_events").insert(payload);
        if (error) throw error;
        toast.success("Esemény hozzáadva.");
      }

      await queryClient.invalidateQueries({ queryKey: ["efop_events"] });
      cancelEdit();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "A mentés nem sikerült.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Biztosan törölnéd ezt az eseményt?")) return;
    try {
      const { error } = await supabase.from("efop_events").delete().eq("id", id);
      if (error) throw error;
      toast.success("Esemény törölve.");
      await queryClient.invalidateQueries({ queryKey: ["efop_events"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "A törlés nem sikerült.");
    }
  }

  async function handleMove(id: string, direction: "up" | "down") {
    const index = events.findIndex((e) => e.id === id);
    if (index === -1) return;

    const event = events[index];
    const newSort = direction === "up" ? event.sort_order + 1 : event.sort_order - 1;

    try {
      const { error } = await supabase.from("efop_events").update({ sort_order: newSort }).eq("id", id);
      if (error) throw error;
      await queryClient.invalidateQueries({ queryKey: ["efop_events"] });
    } catch (err) {
      toast.error("Az átrendezés nem sikerült.");
    }
  }

  if (isLoading) {
    return (
      <p className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Események betöltése…
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {editing ? (
        <form onSubmit={handleSave} className="rounded-2xl border border-border/60 bg-card p-6 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Esemény címe *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="pl. Teadélután a fonalműhelyben"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Dátum (YYYY.MM.DD) *</Label>
              <Input
                id="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                placeholder="2023.11.16."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Leírás</Label>
            <Textarea
              id="description"
              rows={5}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Az esemény leírása..."
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="images">Képek száma *</Label>
              <Input
                id="images"
                type="number"
                min="1"
                value={form.images_count}
                onChange={(e) => setForm((f) => ({ ...f, images_count: parseInt(e.target.value) || 1 }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sort">Sorrend</Label>
              <Input
                id="sort"
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <Switch
                  checked={form.is_carousel}
                  onCheckedChange={(checked) => setForm((f) => ({ ...f, is_carousel: checked }))}
                />
                <span className="text-sm text-muted-foreground">Karussel nézet</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={cancelEdit}>
              Mégse
            </Button>
            <Button type="submit" variant="hero" disabled={saving}>
              {saving ? "Mentés…" : "Mentés"}
            </Button>
          </div>
        </form>
      ) : (
        <Button onClick={startNew} className="w-full" variant="outline">
          <Plus className="h-4 w-4" /> Új esemény
        </Button>
      )}

      <div className="space-y-3">
        {events.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Még nincs egyetlen esemény sem. Kattints az „Új esemény" gombra.
          </p>
        ) : (
          events.map((event, index) => (
            <div
              key={event.id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-border/60 bg-card p-4"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-1">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                {event.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                )}
                <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                  <span>{event.images_count} kép</span>
                  <span>{event.is_carousel ? "Karussel" : "Rács"}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleMove(event.id, "up")}
                  disabled={index === 0}
                  title="Fent"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleMove(event.id, "down")}
                  disabled={index === events.length - 1}
                  title="Lent"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => startEdit(event)}
                  title="Szerkesztés"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(event.id)}
                  title="Törlés"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
