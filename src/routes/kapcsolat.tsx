import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, IdCard, Users } from "lucide-react";
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
  const email2 = c("site.email2");

  const contactItems = [
    { icon: MapPin, label: "Cím", value: c("site.address"), href: undefined as string | undefined },
    { icon: Phone, label: "Telefon", value: phone, href: phoneToHref(phone) },
    { icon: Mail, label: "E-mail (1.)", value: email, href: `mailto:${email}` },
    { icon: Mail, label: "E-mail (2.)", value: email2, href: `mailto:${email2}` },
    { icon: IdCard, label: "OM azonosító", value: c("site.om"), href: undefined as string | undefined },
    { icon: Clock, label: "Ügyfélfogadás", value: c("site.office_hours"), href: undefined as string | undefined },
  ];

  const leaders = [
    { title: c("site.leader_1_title"), name: c("site.leader_1_name"), phone: c("site.leader_1_phone") },
    { title: c("site.leader_2_title"), name: c("site.leader_2_name"), phone: c("site.leader_2_phone") },
    { title: c("site.leader_3_title"), name: c("site.leader_3_name"), phone: c("site.leader_3_phone") },
    { title: c("site.leader_4_title"), name: c("site.leader_4_name"), phone: c("site.leader_4_phone") },
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
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-lg font-extrabold text-foreground mb-4">Elérhetőségek</h2>
              <ul className="space-y-4">
                {contactItems.map((i) => (
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

            <div>
              <h2 className="font-display text-lg font-extrabold text-foreground mb-4">Intézmény vezetői</h2>
              <ul className="space-y-3">
                {leaders.map((leader, idx) => (
                  <li key={idx} className="rounded-2xl border border-border/60 bg-card p-4 shadow-[var(--shadow-soft)]">
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary mt-0.5">
                        <Users className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-primary">{leader.title}</p>
                        <p className="font-display text-base font-extrabold text-foreground">{leader.name}</p>
                        {leader.phone && (
                          <a href={phoneToHref(leader.phone)} className="text-sm text-muted-foreground hover:text-primary">
                            {leader.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
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
