import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, IdCard } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site-layout";
import { useContent } from "@/hooks/use-content";
import { phoneToHref } from "@/lib/content";

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

function Contact() {
  const { c } = useContent();
  const phone = c("site.phone");
  const email = c("site.email");
  const items = [
    { icon: MapPin, label: "Cím", value: c("site.address"), href: undefined as string | undefined },
    { icon: Phone, label: "Telefon", value: phone, href: phoneToHref(phone) },
    { icon: Mail, label: "E-mail", value: email, href: `mailto:${email}` },
    { icon: IdCard, label: "OM azonosító", value: c("site.om"), href: undefined as string | undefined },
    { icon: Clock, label: "Ügyfélfogadás", value: c("site.office_hours"), href: undefined as string | undefined },
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Kapcsolat"
        title={c("kapcsolat.page_title")}
        description={c("kapcsolat.page_description")}
      />
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <ul className="space-y-4">
              {items.map((i) => (
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
