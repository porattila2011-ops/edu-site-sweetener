import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useContent } from "@/hooks/use-content";
import { CONTENT_SECTIONS, CONTENT_DEFAULTS, type ContentField } from "@/lib/content";
import { uploadFile } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, X, Save, Image as ImageIcon } from "lucide-react";
import { ImagePicker } from "./image-picker";

export function ContentAdmin() {
  const queryClient = useQueryClient();
  const { map, isLoading } = useContent();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    const init: Record<string, string> = {};
    for (const key of Object.keys(CONTENT_DEFAULTS)) {
      init[key] = map[key] ?? CONTENT_DEFAULTS[key];
    }
    setValues(init);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  function setValue(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleImageUpload(field: ContentField, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingKey(field.key);
    try {
      const { url } = await uploadFile("site-images", file);
      setValue(field.key, url);
      toast.success("Kép feltöltve.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "A kép feltöltése nem sikerült.");
    } finally {
      setUploadingKey(null);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const rows = Object.entries(values).map(([key, value]) => ({ key, value }));
      const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
      if (error) throw error;
      await queryClient.invalidateQueries({ queryKey: ["site_content"] });
      toast.success("Tartalom mentve. Az oldal frissül.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "A mentés nem sikerült.");
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) {
    return (
      <p className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Tartalom betöltése…
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {CONTENT_SECTIONS.map((section) => (
        <div key={section.id} className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
          <h2 className="font-display text-xl font-extrabold text-foreground">{section.label}</h2>
          {section.description && (
            <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
          )}
          <div className="mt-6 grid gap-5">
            {section.fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                {field.type === "text" && (
                  <Input
                    id={field.key}
                    value={values[field.key] ?? ""}
                    onChange={(e) => setValue(field.key, e.target.value)}
                  />
                )}
                {field.type === "textarea" && (
                  <Textarea
                    id={field.key}
                    rows={4}
                    value={values[field.key] ?? ""}
                    onChange={(e) => setValue(field.key, e.target.value)}
                  />
                )}
                {field.type === "image" && (
                  <div className="space-y-3">
                    {values[field.key] && (
                      <div className="relative w-fit">
                        <img
                          src={values[field.key]}
                          alt="Előnézet"
                          className="h-32 w-auto rounded-xl object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setValue(field.key, "")}
                          className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          id={field.key}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(field, e)}
                          disabled={uploadingKey === field.key}
                        />
                        {uploadingKey === field.key && (
                          <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" /> Feltöltés…
                          </p>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setPickerOpen(field.key)}
                        className="mt-auto"
                      >
                        <ImageIcon className="h-4 w-4" /> Galéria
                      </Button>
                    </div>

                    {pickerOpen === field.key && (
                      <div className="rounded-lg border border-border/60 bg-card p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <h4 className="font-semibold text-foreground">Kép kiválasztása</h4>
                          <button
                            type="button"
                            onClick={() => setPickerOpen(null)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <ImagePicker
                          value={values[field.key] ?? ""}
                          onChange={(url) => setValue(field.key, url)}
                          onClose={() => setPickerOpen(null)}
                        />
                      </div>
                    )}
                  </div>
                )}
                {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="sticky bottom-4 flex justify-end">
        <Button variant="hero" size="lg" onClick={handleSave} disabled={saving || !!uploadingKey}>
          <Save className="h-5 w-5" /> {saving ? "Mentés…" : "Összes módosítás mentése"}
        </Button>
      </div>
    </div>
  );
}
