import { supabase } from "@/integrations/supabase/client";

// 10 évig érvényes aláírt link (privát tárolókhoz)
export const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 10;

export async function uploadFile(
  bucket: string,
  file: File,
): Promise<{ path: string; url: string }> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: false,
    contentType: file.type || undefined,
  });
  if (upErr) throw upErr;
  const { data, error: urlErr } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, SIGNED_URL_TTL);
  if (urlErr) throw urlErr;
  return { path, url: data.signedUrl };
}
