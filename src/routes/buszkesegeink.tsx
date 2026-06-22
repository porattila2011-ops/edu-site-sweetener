import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site-layout";
import { useAchievements } from "@/hooks/use-achievements";
import { getAchievementIcon } from "@/lib/achievement-icons";

export const Route = createFileRoute("/buszkesegeink")({
  head: () => ({
    meta: [
      { title: "Büszkeségeink — Dr. Molnár István EGYMI" },
      {
        name: "description",
        content:
          "Elismeréseink és kiemelt programjaink: Ökoiskola, Boldog Iskola, Állatbarát intézmény, iskolakert.",
      },
      { property: "og:title", content: "Büszkeségeink — Dr. Molnár István EGYMI" },
      { property: "og:url", content: "/buszkesegeink" },
    ],
    links: [{ rel: "canonical", href: "/buszkesegeink" }],
  }),
  component: Pride,
});

const DEFAULT_AWARDS = [
  { icon: "Leaf", title: "Ökoiskola", description: "A fenntarthatóságra nevelés elismeréseként viseljük az Ökoiskola címet." },
  { icon: "Smile", title: "Boldog Iskola", description: "A gyermekek érzelmi jóllétét középpontba helyező Boldog Iskola program tagja." },
  { icon: "PawPrint", title: "Állatbarát intézmény", description: "Elnyertük az Állatbarát cím elismerést a felelős állattartásra nevelésért." },
  { icon: "Sprout", title: "Iskolakert", description: "Saját iskolakertünk élő tanterem, ahol a gyermekek a természettel ismerkednek." },
  { icon: "Award", title: "EFOP pályázatok", description: "EFOP-3.1.6 fejlesztési programok megvalósításával bővítettük szolgáltatásainkat." },
  { icon: "Trophy", title: "Közösségi sikerek", description: "Tanulóink rendszeresen szép eredményeket érnek el sport- és kulturális versenyeken." },
];

function Pride() {
  const { data } = useAchievements();
  const awards = data && data.length > 0 ? data : DEFAULT_AWARDS;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Büszkeségeink"
        title="Amire büszkék vagyunk"
        description="Elismeréseink és kiemelt programjaink, amelyek a gyermekek fejlődését és jóllétét szolgálják."
      />
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((a, idx) => {
            const Icon = getAchievementIcon(a.icon);
            return (
              <div
                key={`${a.title}-${idx}`}
                className="rounded-3xl border border-border/60 bg-card p-7 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf/15 text-leaf">
                  <Icon className="h-7 w-7" />
                </span>
                <h2 className="mt-5 font-display text-xl font-extrabold text-foreground">{a.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
