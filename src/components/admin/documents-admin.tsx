import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useDocuments, type DocumentItem } from "@/hooks/use-documents";
import { uploadFile } from "@/lib/storage";
import { DOCUMENTS } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, X, Loader2, Trash2, FileText, Pencil } from "lucide-react";

type FormState = {
  id: string | null;
  category: string;
  title: string;
  file_url: string;
  file_path: string | null;
  sort_order: number;
};

const EMPTY_FORM: FormState = {
  id: null,
  category: "",
  title: "",
  file_url: "",
  file_path: null,
  sort_order: 0,
};

const DEFAULT_CATEGORIES = DOCUMENTS.map((g) => g.category);

export function DocumentsAdmin() {
  const queryClient = useQueryClient();
  const { data: docs, isLoading } = useDocuments();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const categories = Array.from(
    new Set([...(docs?.map((d) => d.category) ?? []), ...DEFAULT_CATEGORIES]),
  );

  const grouped = (docs ?? []).reduce<Record<string, DocumentItem[]>>((acc, d) => {
    (acc[d.category] ??= []).push(d);
    return acc;
  }, {});

  function startNew() {
    setForm(EMPTY_FORM);
    setEditing(true);
  }

  function startEdit(d: DocumentItem) {
    setForm({
      id: d.id,
      category: d.category,
      title: d.title,
      file_url: d.file_url,
      file_path: d.file_path,
      sort_order: d.sort_order,
    });
    setEditing(true);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url, path } = await uploadFile("documents", file);
      setForm((f) => ({
        ...f,
        file_url: url,
        file_path: path,
        title: f.title || file.name.replace(/\.[^.]+$/, ""),
      }));
      toast.success("Fájl feltöltve.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "A feltöltés nem sikerült.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.category.trim() || !form.title.trim()) {
      toast.error("A kategória és a cím kötelező.");
      return;
    }
    if (!form.file_url) {
      toast.error("Tölts fel egy fájlt.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        category: form.category.trim(),
        title: form.title.trim(),
        file_url: form.file_url,
        file_path: form.file_path,
        sort_order: form.sort_order,
      };
      if (form.id) {
        const { error } = await supabase.from("documents").update(payload).eq("id", form.id);
        if (error) throw error;
        toast.success("Dokumentum frissítve.");
      } else {
        const { error } = await supabase.from("documents").insert(payload);
        if (error) throw error;
        toast.success("Dokumentum hozzáadva.");
      }
      await queryClient.invalidateQueries({ queryKey: ["documents"] });
      setEditing(false);
      setForm(EMPTY_FORM);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "A mentés nem sikerült.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(d: DocumentItem) {
    if (!confirm("Biztosan törlöd ezt a dokumentumot?")) return;
    try {
      const { error } = await supabase.from("documents").delete().eq("id", d.id);
      if (error) throw error;
      if (d.file_path) {
        await supabase.storage.from("documents").remove([d.file_path]);
      }
      await queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Dokumentum törölve.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "A törlés nem sikerült.");
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Tölts fel PDF vagy más fájlokat, és rendezd kategóriákba a Dokumentumtárba.
        </p>
        {!editing && (
          <Button variant="hero" onClick={startNew}>
            <Plus className="h-5 w-5" /> Új dokumentum
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
              {form.id ? "Dokumentum szerkesztése" : "Új dokumentum"}
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
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="doc-category">Kategória *</Label>
                <Input
                  id="doc-category"
                  list="doc-categories"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="pl. Szabályzatok"
                />
                <datalist id="doc-categories">
                  {categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doc-order">Sorrend</Label>
                <Input
                  id="doc-order"
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doc-title">Megjelenő név *</Label>
              <Input
                id="doc-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="pl. Házirend 2025"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doc-file">Fájl *</Label>
              {form.file_url && (
                <p className="flex items-center gap-2 text-sm text-foreground">
                  <FileText className="h-4 w-4 text-primary" /> Fájl feltöltve
                </p>
              )}
              <Input
                id="doc-file"
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.odt,.ods"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              {uploading && (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Feltöltés…
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="hero" disabled={saving || uploading}>
                {saving ? "Mentés…" : form.id ? "Módosítás mentése" : "Dokumentum mentése"}
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
        <p className="text-muted-foreground">Dokumentumok betöltése…</p>
      ) : !docs?.length ? (
        <p className="text-muted-foreground">
          Még nincs feltöltött dokumentum. Kattints az „Új dokumentum” gombra.
        </p>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-display text-lg font-extrabold text-foreground">{category}</h3>
              <div className="mt-3 grid gap-3">
                {items.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-[var(--shadow-soft)]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                      <FileText className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-bold text-foreground">{d.title}</span>
                    <div className="flex gap-2">
                      <Button variant="soft" size="icon" onClick={() => startEdit(d)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(d)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
