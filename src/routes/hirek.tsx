import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site-layout";
import { useNews } from "@/hooks/use-news";
import { formatNewsDate } from "@/lib/news";

export const Route = createFileRoute("/hirek")({
  head: () => ({
    meta: [
      { title: "Hírek — Dr. Molnár István EGYMI" },
      {
        name: "description",
        content: "Aktuális hírek és tájékoztatók iskolánk életéből — beiratkozás, események, tudnivalók.",
      },
      { property: "og:title", content: "Hírek — Dr. Molnár István EGYMI" },
      { property: "og:url", content: "/hirek" },
    ],
    links: [{ rel: "canonical", href: "/hirek" }],
  }),
  component: News,
});

function News() {
  const { data: news, isLoading } = useNews();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Hírek"
        title="Iskolánk életéből"
        description="Friss tájékoztatók, események és fontos határidők diákjaink és szüleik számára."
      />
      <section className="container-page py-14 md:py-20">
        {isLoading ? (
          <p className="text-muted-foreground">Hírek betöltése…</p>
        ) : !news?.length ? (
          <p className="text-muted-foreground">Jelenleg nincs megjeleníthető hír.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {news.map((n) => (
              <article
                key={n.id}
                className="flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
              >
                {n.image_url && (
                  <img
                    src={n.image_url}
                    alt={n.title}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-3 text-xs font-bold">
                    {n.tag && (
                      <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">{n.tag}</span>
                    )}
                    <span className="text-muted-foreground">{formatNewsDate(n.published_at)}</span>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-extrabold leading-snug text-foreground">{n.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
