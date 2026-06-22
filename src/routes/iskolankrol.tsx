import { createFileRoute } from "@tanstack/react-router";
import { Building2, Users, Target, CalendarDays, IdCard, UserCog } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site-layout";
import { useContent } from "@/hooks/use-content";

export const Route = createFileRoute("/iskolankrol")({
  head: () => ({
    meta: [
      { title: "Iskolánkról — Dr. Molnár István EGYMI" },
      {
        name: "description",
        content:
          "Intézményünk bemutatása, fenntartói és intézményi adatok. Gyógypedagógiai nevelés Hajdúböszörményben 1979 óta.",
      },
      { property: "og:title", content: "Iskolánkról — Dr. Molnár István EGYMI" },
      { property: "og:url", content: "/iskolankrol" },
    ],
    links: [{ rel: "canonical", href: "/iskolankrol" }],
  }),
  component: About,
});

const PILLARS = [
  {
    icon: Users,
    title: "Egyénre szabott fejlesztés",
    text: "Gyógypedagógusaink, konduktoraink és pszichológusaink minden gyermeket a saját képességeihez igazított programmal kísérnek.",
  },
  {
    icon: Target,
    title: "Módszertani központ",
    text: "Egységes Gyógypedagógiai Módszertani Intézményként utazó gyógypedagógusi és konduktori hálózatot is működtetünk.",
  },
  {
    icon: Building2,
    title: "Tagintézmény",
    text: "A Kalkuttai Teréz Anya Tagintézmény tovább bővíti az ellátható gyermekek és szolgáltatások körét.",
  },
];

function About() {
  const { c } = useContent();
  const facts = [
    { icon: IdCard, label: "OM azonosító", value: c("site.om") },
    { icon: UserCog, label: "Vezető", value: c("site.head") },
    { icon: CalendarDays, label: "Alapítás éve", value: c("site.founded") },
    { icon: Building2, label: "Székhely", value: "Hajdúböszörmény" },
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Iskolánkról"
        title="Intézményünk bemutatása"
        description="Több mint négy évtizede nyújtunk gyógypedagógiai nevelést, oktatást és gondoskodást Hajdúböszörményben és térségében."
      />

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground lg:col-span-2">
            <p>{c("about.intro_p1")}</p>
            <p>{c("about.intro_p2")}</p>
            <p>{c("about.intro_p3")}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {PILLARS.map((p) => (
                <div key={p.title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-extrabold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-border/60 bg-sidebar p-7 shadow-[var(--shadow-soft)]">
            <h2 className="font-display text-lg font-extrabold text-foreground">Intézményi adatok</h2>
            <ul className="mt-5 space-y-4">
              {facts.map((f) => (
                <li key={f.label} className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{f.label}</p>
                    <p className="font-display font-extrabold text-foreground">{f.value}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl bg-card p-4 text-sm text-muted-foreground">
              <p className="font-bold text-foreground">Cím</p>
              <p className="mt-1">{c("site.address")}</p>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
