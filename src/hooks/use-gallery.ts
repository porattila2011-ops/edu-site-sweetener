import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// SETUP: These tables need to be created in your Supabase database.
// Run these SQL commands in the Supabase SQL Editor:
//
// CREATE TABLE gallery_folders (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   name TEXT NOT NULL,
//   description TEXT,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
//   created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
// );
//
// CREATE TABLE gallery_images (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   folder_id UUID NOT NULL REFERENCES gallery_folders(id) ON DELETE CASCADE,
//   name TEXT NOT NULL,
//   file_path TEXT NOT NULL,
//   file_url TEXT NOT NULL,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
//   created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
// );
//
// Then enable RLS and create policies for public read and admin write access.
// Also create an "images" storage bucket and enable public access.

export type GalleryFolder = {
  id: string;
  name: string;
  description: string | null;
  image_count?: number;
  created_at: string;
  created_by: string;
};

export type GalleryImage = {
  id: string;
  folder_id: string;
  name: string;
  file_path: string;
  file_url: string;
  created_at: string;
  created_by: string;
};

export function useGalleryFolders() {
  return useQuery({
    queryKey: ["gallery_folders"],
    queryFn: async (): Promise<GalleryFolder[]> => {
      const { data, error } = await supabase
        .from("gallery_folders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useGalleryImages(folderId?: string) {
  return useQuery({
    queryKey: ["gallery_images", folderId],
    queryFn: async (): Promise<GalleryImage[]> => {
      let query = supabase.from("gallery_images").select("*");
      if (folderId) query = query.eq("folder_id", folderId);
      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: folderId !== undefined,
  });
}

export function useCreateGalleryFolder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, description }: { name: string; description?: string }) => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("gallery_folders")
        .insert({
          name,
          description: description || null,
          created_by: session.session.user.id,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery_folders"] });
      toast.success("Mappa létrehozva");
    },
    onError: (error: Error) => {
      toast.error(`Hiba: ${error.message}`);
    },
  });
}

export function useDeleteGalleryFolder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (folderId: string) => {
      const { error } = await supabase.from("gallery_folders").delete().eq("id", folderId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery_folders"] });
      queryClient.invalidateQueries({ queryKey: ["gallery_images"] });
      toast.success("Mappa törölve");
    },
    onError: (error: Error) => {
      toast.error(`Hiba: ${error.message}`);
    },
  });
}

export function useUploadGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      folderId,
      file,
      name,
    }: {
      folderId: string;
      file: File;
      name: string;
    }) => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error("Not authenticated");

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `gallery/${folderId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data, publicUrl } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      const { data: imageData, error: dbError } = await supabase
        .from("gallery_images")
        .insert({
          folder_id: folderId,
          name,
          file_path: filePath,
          file_url: publicUrl,
          created_by: session.session.user.id,
        })
        .select()
        .single();
      if (dbError) throw dbError;
      return imageData;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["gallery_images", variables.folderId] });
      queryClient.invalidateQueries({ queryKey: ["gallery_images"] });
      toast.success("Kép feltöltve");
    },
    onError: (error: Error) => {
      toast.error(`Hiba: ${error.message}`);
    },
  });
}

export function useDeleteGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (imageId: string) => {
      const { data: image } = await supabase
        .from("gallery_images")
        .select("file_path")
        .eq("id", imageId)
        .single();

      if (image?.file_path) {
        await supabase.storage.from("images").remove([image.file_path]);
      }

      const { error } = await supabase.from("gallery_images").delete().eq("id", imageId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery_images"] });
      toast.success("Kép törölve");
    },
    onError: (error: Error) => {
      toast.error(`Hiba: ${error.message}`);
    },
  });
}
