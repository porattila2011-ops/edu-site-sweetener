import { useState } from "react";
import { useGalleryFolders, useGalleryImages } from "@/hooks/use-gallery";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Loader2, Check } from "lucide-react";

export function ImagePicker({
  value,
  onChange,
  onClose,
}: {
  value: string;
  onChange: (url: string) => void;
  onClose: () => void;
}) {
  const { data: folders, isLoading: foldersLoading } = useGalleryFolders();
  const [activeFolder, setActiveFolder] = useState<string>("");
  const [imageUrl, setImageUrl] = useState(value);

  const folderList = folders ?? [];
  const currentFolder = activeFolder || folderList[0]?.id;

  const handleSelect = (url: string) => {
    onChange(url);
    onClose();
  };

  const handleDirectUrl = () => {
    if (imageUrl.trim()) {
      onChange(imageUrl);
      onClose();
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={currentFolder || "direct"} onValueChange={setActiveFolder}>
        <TabsList className="mb-4 flex h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="direct">🔗 Közvetlen URL</TabsTrigger>
          {folderList.map((folder) => (
            <TabsTrigger key={folder.id} value={folder.id}>
              {folder.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="direct" className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-muted-foreground">
              Képe URL-je
            </label>
            <Input
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Button
              variant="hero"
              size="sm"
              onClick={handleDirectUrl}
              className="w-full"
              disabled={!imageUrl.trim()}
            >
              Kiválasztás
            </Button>
          </div>
        </TabsContent>

        {folderList.map((folder) => (
          <TabsContent key={folder.id} value={folder.id}>
            <GalleryImagePicker
              folderId={folder.id}
              onSelect={handleSelect}
              currentValue={value}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function GalleryImagePicker({
  folderId,
  onSelect,
  currentValue,
}: {
  folderId: string;
  onSelect: (url: string) => void;
  currentValue: string;
}) {
  const { data: images, isLoading } = useGalleryImages(folderId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Betöltés…
      </div>
    );
  }

  const imageList = images ?? [];

  if (imageList.length === 0) {
    return (
      <div className="rounded-lg border border-border/60 bg-background p-6 text-center text-sm text-muted-foreground">
        <p>Nincs kép ebben a mappában.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {imageList.map((image) => (
        <button
          key={image.id}
          onClick={() => onSelect(image.file_url)}
          className={`relative overflow-hidden rounded-lg border-2 transition-colors ${
            currentValue === image.file_url
              ? "border-primary bg-primary/10"
              : "border-border/60 hover:border-primary/50"
          }`}
        >
          <img
            src={image.file_url}
            alt={image.name}
            className="aspect-square w-full object-cover"
          />
          {currentValue === image.file_url && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Check className="h-6 w-6 text-white" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
            <p className="truncate text-xs font-medium text-white">{image.name}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
