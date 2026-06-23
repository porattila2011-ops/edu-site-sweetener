import { useState } from "react";
import { useGalleryFolders, useCreateGalleryFolder, useDeleteGalleryFolder } from "@/hooks/use-gallery";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { GalleryFolderContent } from "./gallery-folder-content";

export function GalleryAdmin() {
  const { data: folders, isLoading } = useGalleryFolders();
  const createFolder = useCreateGalleryFolder();
  const deleteFolder = useDeleteGalleryFolder();
  const [newFolderName, setNewFolderName] = useState("");
  const [activeFolder, setActiveFolder] = useState<string>("");

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    await createFolder.mutateAsync({ name: newFolderName });
    setNewFolderName("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Betöltés…
      </div>
    );
  }

  const folderList = folders ?? [];
  const currentFolder = activeFolder || folderList[0]?.id;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/60 bg-background p-4">
        <h4 className="font-display text-sm font-extrabold text-foreground">Új mappa létrehozása</h4>
        <div className="mt-3 flex gap-2">
          <Input
            placeholder="Mappa neve (pl. 'Rendezvények', 'Diákok')"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateFolder();
            }}
            className="flex-1"
          />
          <Button
            variant="hero"
            size="sm"
            onClick={handleCreateFolder}
            disabled={createFolder.isPending || !newFolderName.trim()}
          >
            <Plus className="h-4 w-4" /> Létrehozás
          </Button>
        </div>
      </div>

      {folderList.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-background p-8 text-center text-muted-foreground">
          <p>Nincs még mappa. Hozz létre egyet a fentebb lévő formban!</p>
        </div>
      ) : (
        <Tabs value={currentFolder} onValueChange={setActiveFolder}>
          <TabsList className="mb-4 flex h-auto flex-wrap justify-start gap-1">
            {folderList.map((folder) => (
              <TabsTrigger key={folder.id} value={folder.id} className="flex items-center gap-2">
                {folder.name}
                <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                  {folder.image_count ?? 0}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {folderList.map((folder) => (
            <TabsContent key={folder.id} value={folder.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display text-base font-extrabold text-foreground">{folder.name}</h4>
                  {folder.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{folder.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteFolder.mutate(folder.id)}
                  disabled={deleteFolder.isPending}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <GalleryFolderContent folderId={folder.id} />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
