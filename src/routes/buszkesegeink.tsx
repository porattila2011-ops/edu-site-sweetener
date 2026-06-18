import { createFileRoute } from "@tanstack/react-router";
import { Award, Leaf, PawPrint, Smile, Trophy, Sprout } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site-layout";

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

const AWARDS = [
  { icon: Leaf, title: "Ökoiskola", text: "A fenntarthatóságra nevelés elismeréseként viseljük az Ökoiskola címet." },
  { icon: Smile, title: "Boldog Iskola", text: "A gyermekek érzelmi jóllétét középpontba helyező Boldog Iskola program tagja." },
  { icon: PawPrint, title: "Állatbarát intézmény", text: "Elnyertük az Állatbarát cím elismerést a felelős állattartásra nevelésért." },
  { icon: Sprout, title: "Iskolakert", text: "Saját iskolakertünk élő tanterem, ahol a gyermekek a természettel ismerkednek." },
  { icon: Award, title: "EFOP pályázatok", text: "EFOP-3.1.6 fejlesztési programok megvalósításával bővítettük szolgáltatásainkat." },
  { icon: Trophy, title: "Közösségi sikerek", text: "Tanulóink rendszeresen szép eredményeket érnek el sport- és kulturális versenyeken." },
];

function Pride() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Büszkeségeink"
        title="Amire büszkék vagyunk"
        description="Elismeréseink és kiemelt programjaink, amelyek a gyermekek fejlődését és jóllétét szolgálják."
      />
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AWARDS.map((a) => (
            <div
              key={a.title}
              className="rounded-3xl border border-border/60 bg-card p-7 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf/15 text-leaf">
                <a.icon className="h-7 w-7" />
              </span>
              <h2 className="mt-5 font-display text-xl font-extrabold text-foreground">{a.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
