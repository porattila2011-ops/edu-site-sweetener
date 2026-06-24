import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useNews } from "@/hooks/use-news";
import { uploadFile } from "@/lib/storage";
import { formatNewsDate, type NewsItem } from "@/lib/news";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X, Loader2 } from "lucide-react";

const NEWS_STORAGE_KEY = "edu-site-news";

type FormState = {
  id: string | null;
  title: string;
  excerpt: string;
  tag: string;
  published_at: string;
  image_url: string | null;
  link_url: string;
};

const EMPTY_FORM: FormState = {
  id: null,
  title: "",
  excerpt: "",
  tag: "",
  published_at: new Date().toISOString().slice(0, 10),
  image_url: null,
  link_url: "",
};

export function NewsAdmin() {
  const queryClient = useQueryClient();
  const { data: news, isLoading } = useNews();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function startNew() {
    setForm(EMPTY_FORM);
    setEditing(true);
  }

  function startEdit(item: NewsItem) {
    setForm({
      id: item.id,
      title: item.title,
      excerpt: item.excerpt,
      tag: item.tag ?? "",
      published_at: item.published_at,
      image_url: item.image_url,
      link_url: item.link_url ?? "",
    });
    setEditing(true);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await uploadFile("news-images", file);
      setForm((f) => ({ ...f, image_url: url }));
      toast.success("Kép feltöltve.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "A kép feltöltése nem sikerült.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        tag: form.tag.trim() || null,
        published_at: form.published_at,
        image_url: form.image_url,
        link_url: form.link_url.trim() || null,
      };
      if (!payload.title || !payload.excerpt) {
        toast.error("A cím és a szöveg kötelező.");
        setSaving(false);
        return;
      }

      const stored = localStorage.getItem(NEWS_STORAGE_KEY);
      const allNews: NewsItem[] = stored ? JSON.parse(stored) : [];

      if (form.id) {
        const idx = allNews.findIndex((n) => n.id === form.id);
        if (idx >= 0) {
          allNews[idx] = { ...allNews[idx], ...payload };
        }
        toast.success("Hír frissítve.");
      } else {
        const newItem: NewsItem = {
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          ...payload,
        } as NewsItem;
        allNews.push(newItem);
        toast.success("Hír közzétéve.");
      }

      localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(allNews));
      await queryClient.invalidateQueries({ queryKey: ["news"] });
      setEditing(false);
      setForm(EMPTY_FORM);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "A mentés nem sikerült.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Biztosan törlöd ezt a hírt?")) return;
    try {
      const stored = localStorage.getItem(NEWS_STORAGE_KEY);
      const allNews: NewsItem[] = stored ? JSON.parse(stored) : [];
      const filtered = allNews.filter((n) => n.id !== id);
      localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(filtered));
      await queryClient.invalidateQueries({ queryKey: ["news"] });
      toast.success("Hír törölve.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "A törlés nem sikerült.");
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="soft" size="sm">
          <Link to="/hirek">Hírek oldal megtekintése</Link>
        </Button>
        {!editing && (
          <Button variant="hero" onClick={startNew}>
            <Plus className="h-5 w-5" /> Új hír
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
              {form.id ? "Hír szerkesztése" : "Új hír"}
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
              <Label htmlFor="title">Cím *</Label>
              <Input
                id="title"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="A hír címe"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tag">Címke</Label>
                <Input
                  id="tag"
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  placeholder="pl. Beiratkozás"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Dátum</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.published_at}
                  onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Szöveg *</Label>
              <Textarea
                id="excerpt"
                required
                rows={4}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="A hír szövege…"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Link (opcionális)</Label>
              <Input
                id="link"
                type="url"
                value={form.link_url}
                onChange={(e) => setForm({ ...form, link_url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Kép</Label>
              {form.image_url && (
                <div className="relative w-fit">
                  <img
                    src={form.image_url}
                    alt="Előnézet"
                    className="h-32 w-auto rounded-xl object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, image_url: null })}
                    className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
              <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
              {uploading && (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Feltöltés…
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="hero" disabled={saving || uploading}>
                {saving ? "Mentés…" : form.id ? "Módosítás mentése" : "Hír közzététele"}
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
        <p className="text-muted-foreground">Hírek betöltése…</p>
      ) : !news?.length ? (
        <p className="text-muted-foreground">Még nincs egyetlen hír sem. Kattints az „Új hír” gombra.</p>
      ) : (
        <div className="grid gap-4">
          {news.map((n) => (
            <article
              key={n.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-[var(--shadow-soft)]"
            >
              {n.image_url ? (
                <img src={n.image_url} alt="" className="h-16 w-24 shrink-0 rounded-lg object-cover" />
              ) : (
                <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
                  Nincs kép
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                  {n.tag && (
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-secondary-foreground">
                      {n.tag}
                    </span>
                  )}
                  <span>{formatNewsDate(n.published_at)}</span>
                </div>
                <h3 className="mt-1 truncate font-display font-extrabold text-foreground">{n.title}</h3>
              </div>
              <div className="flex gap-2">
                <Button variant="soft" size="icon" onClick={() => startEdit(n)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(n.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
