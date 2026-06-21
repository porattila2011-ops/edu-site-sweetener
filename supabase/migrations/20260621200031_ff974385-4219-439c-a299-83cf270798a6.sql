REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.claim_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_admin() TO authenticated;

-- Storage policies for the news-images bucket
CREATE POLICY "Anyone can view news images"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'news-images');

CREATE POLICY "Admins can upload news images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update news images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete news images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'admin'));