import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useGalleryFolders, useGalleryImages } from "@/hooks/use-gallery";
import { SiteLayout, PageHero } from "@/components/site-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, X } from "lucide-react";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galéria — Dr. Molnár István EGYMI" },
      {
        name: "description",
        content: "Képek és pillanatképek az iskolánk mindennapjaiból.",
      },
      { property: "og:title", content: "Galéria — Dr. Molnár István EGYMI" },
      { property: "og:url", content: "/galeria" },
    ],
    links: [{ rel: "canonical", href: "/galeria" }],
  }),
  component: Gallery,
});

function Gallery() {
  const { data: folders, isLoading } = useGalleryFolders();
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);
  const [activeFolder, setActiveFolder] = useState<string>("");

  const folderList = folders ?? [];
  const currentFolder = activeFolder || folderList[0]?.id;

  if (isLoading) {
    return (
      <SiteLayout>
        <PageHero
          eyebrow="Galéria"
          title="Képgyűjtemény"
          description="Pillanatképek az iskolánk mindennapjaiból"
        />
        <section className="container-page py-14 md:py-20">
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Betöltés…
          </div>
        </section>
      </SiteLayout>
    );
  }

  if (folderList.length === 0) {
    return (
      <SiteLayout>
        <PageHero
          eyebrow="Galéria"
          title="Képgyűjtemény"
          description="Pillanatképek az iskolánk mindennapjaiból"
        />
        <section className="container-page py-14 md:py-20">
          <div className="rounded-2xl border border-border/60 bg-card p-8 text-center text-muted-foreground">
            <p>Jelenleg nincsenek képek a galériában.</p>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Galéria"
        title="Képgyűjtemény"
        description="Pillanatképek az iskolánk mindennapjaiból"
      />

      <section className="container-page py-14 md:py-20">
        <Tabs value={currentFolder} onValueChange={setActiveFolder}>
          <TabsList className="mb-8 flex h-auto flex-wrap justify-start gap-1">
            {folderList.map((folder) => (
              <TabsTrigger key={folder.id} value={folder.id}>
                {folder.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {folderList.map((folder) => (
            <TabsContent key={folder.id} value={folder.id}>
              <GalleryFolderGrid folderId={folder.id} onImageClick={setSelectedImage} />
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative max-h-full max-w-4xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -right-10 -top-10 rounded-full bg-white p-2 text-black hover:bg-gray-200"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              className="max-h-[90vh] max-w-full rounded-lg"
            />
            <p className="mt-4 text-center text-sm text-white">{selectedImage.name}</p>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}

function GalleryFolderGrid({
  folderId,
  onImageClick,
}: {
  folderId: string;
  onImageClick: (image: { url: string; name: string }) => void;
}) {
  const { data: images, isLoading } = useGalleryImages(folderId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Betöltés…
      </div>
    );
  }

  const imageList = images ?? [];

  if (imageList.length === 0) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-8 text-center text-muted-foreground">
        <p>Nincs kép ebben a mappában.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {imageList.map((image) => (
        <button
          key={image.id}
          onClick={() => onImageClick({ url: image.file_url, name: image.name })}
          className="group relative overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
        >
          <img
            src={image.file_url}
            alt={image.name}
            className="aspect-square w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/40" />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3 text-white">
            <p className="text-sm font-medium">{image.name}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
