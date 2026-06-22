CREATE POLICY "Public can read documents bucket" ON storage.objects FOR SELECT USING (bucket_id = 'documents');
CREATE POLICY "Admins can upload documents bucket" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'documents' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update documents bucket" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'documents' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete documents bucket" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'documents' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read site-images bucket" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');
CREATE POLICY "Admins can upload site-images bucket" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update site-images bucket" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete site-images bucket" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'::app_role));