import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site-layout";
import { NEWS } from "@/lib/site";

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
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Hírek"
        title="Iskolánk életéből"
        description="Friss tájékoztatók, események és fontos határidők diákjaink és szüleik számára."
      />
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {NEWS.map((n) => (
            <article
              key={n.title}
              className="flex flex-col rounded-3xl border border-border/60 bg-card p-7 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 text-xs font-bold">
                <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">{n.tag}</span>
                <span className="text-muted-foreground">{n.date}</span>
              </div>
              <h2 className="mt-4 font-display text-xl font-extrabold leading-snug text-foreground">{n.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
