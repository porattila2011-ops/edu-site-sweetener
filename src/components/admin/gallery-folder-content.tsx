import { useRef, useState } from "react";
import { useGalleryImages, useUploadGalleryImage, useDeleteGalleryImage } from "@/hooks/use-gallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Upload, Loader2, Copy, Check } from "lucide-react";

export function GalleryFolderContent({ folderId }: { folderId: string }) {
  const { data: images, isLoading } = useGalleryImages(folderId);
  const uploadImage = useUploadGalleryImage();
  const deleteImage = useDeleteGalleryImage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageName, setImageName] = useState("");
  const [copiedId, setCopiedId] = useState<string>("");

  const handleFileSelect = async (file: File) => {
    const name = imageName || file.name.replace(/\.[^/.]+$/, "");
    await uploadImage.mutateAsync({
      folderId,
      file,
      name,
    });
    setImageName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Betöltés…
      </div>
    );
  }

  const imageList = images ?? [];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/60 border-dashed bg-background p-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              placeholder="Kép neve (opcionális)"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="hero"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadImage.isPending}
            >
              <Upload className="h-4 w-4" /> Feltöltés
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
            className="hidden"
          />
          <p className="text-xs text-muted-foreground">Támogatott formátumok: JPG, PNG, GIF, WebP</p>
        </div>
      </div>

      {imageList.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-background p-8 text-center text-muted-foreground">
          <p>Nincs még kép ebben a mappában.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {imageList.map((image) => (
            <div
              key={image.id}
              className="flex items-center gap-4 rounded-lg border border-border/60 bg-background p-4"
            >
              <img
                src={image.file_url}
                alt={image.name}
                className="h-16 w-16 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-foreground">{image.name}</p>
                <p className="text-xs text-muted-foreground">{image.file_url}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(image.file_url, image.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                {copiedId === image.id ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteImage.mutate(image.id)}
                disabled={deleteImage.isPending}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
