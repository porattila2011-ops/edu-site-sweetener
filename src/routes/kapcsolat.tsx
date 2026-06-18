import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, IdCard } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site-layout";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/kapcsolat")({
  head: () => ({
    meta: [
      { title: "Kapcsolat — Dr. Molnár István EGYMI" },
      {
        name: "description",
        content:
          "Elérhetőségeink: 4220 Hajdúböszörmény, Radnóti Miklós u. 5. Telefon, e-mail és térkép.",
      },
      { property: "og:title", content: "Kapcsolat — Dr. Molnár István EGYMI" },
      { property: "og:url", content: "/kapcsolat" },
    ],
    links: [{ rel: "canonical", href: "/kapcsolat" }],
  }),
  component: Contact,
});

const ITEMS = [
  { icon: MapPin, label: "Cím", value: SITE.address, href: undefined },
  { icon: Phone, label: "Telefon", value: SITE.phone, href: SITE.phoneHref },
  { icon: Mail, label: "E-mail", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: IdCard, label: "OM azonosító", value: SITE.om, href: undefined },
  { icon: Clock, label: "Ügyfélfogadás", value: "Hétfő–Péntek 8:00–16:00", href: undefined },
];

function Contact() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Kapcsolat"
        title="Vegye fel velünk a kapcsolatot"
        description="Kérdésével, beiratkozással vagy szolgáltatásainkkal kapcsolatban szívesen segítünk."
      />
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <ul className="space-y-4">
              {ITEMS.map((i) => (
                <li
                  key={i.label}
                  className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-soft)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                    <i.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{i.label}</p>
                    {i.href ? (
                      <a href={i.href} className="font-display text-lg font-extrabold text-foreground hover:text-primary">
                        {i.value}
                      </a>
                    ) : (
                      <p className="font-display text-lg font-extrabold text-foreground">{i.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border/60 shadow-[var(--shadow-soft)]">
            <iframe
              title="Térkép — Dr. Molnár István EGYMI"
              src="https://www.google.com/maps?q=Hajd%C3%BAb%C3%B6sz%C3%B6rm%C3%A9ny%20Radn%C3%B3ti%20Mikl%C3%B3s%20u.%205&output=embed"
              className="h-full min-h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
