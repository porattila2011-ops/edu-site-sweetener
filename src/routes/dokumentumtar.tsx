import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site-layout";
import { DOCUMENTS } from "@/lib/site";

export const Route = createFileRoute("/dokumentumtar")({
  head: () => ({
    meta: [
      { title: "Dokumentumtár — Dr. Molnár István EGYMI" },
      {
        name: "description",
        content:
          "Intézményi dokumentumok: házirendek, SZMSZ, pedagógiai program, munkatervek, tantervek, igénylőlapok.",
      },
      { property: "og:title", content: "Dokumentumtár — Dr. Molnár István EGYMI" },
      { property: "og:url", content: "/dokumentumtar" },
    ],
    links: [{ rel: "canonical", href: "/dokumentumtar" }],
  }),
  component: Documents,
});

function Documents() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Dokumentumtár"
        title="Letölthető dokumentumok"
        description="Intézményünk hivatalos szabályzatai, munkatervei és nyomtatványai egy helyen."
      />
      <section className="container-page py-14 md:py-20">
        <div className="space-y-12">
          {DOCUMENTS.map((group) => (
            <div key={group.category}>
              <h2 className="font-display text-2xl font-extrabold text-foreground">{group.category}</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {group.items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card px-5 py-4 shadow-[var(--shadow-soft)] transition-colors hover:border-primary/40 hover:bg-secondary/40"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                      <FileText className="h-5 w-5" />
                    </span>
                    <span className="flex-1 text-sm font-bold leading-snug text-foreground">{item}</span>
                    <Download className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-12 rounded-2xl bg-muted px-6 py-5 text-sm text-muted-foreground">
          A dokumentumok PDF formátumban tölthetők le. Amennyiben egy dokumentum nem érhető el, kérjük,
          vegye fel velünk a kapcsolatot.
        </p>
      </section>
    </SiteLayout>
  );
}
