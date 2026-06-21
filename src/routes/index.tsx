import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Leaf,
  HeartHandshake,
  Sun,
  School,
  Baby,
  BookOpen,
  Home as HomeIcon,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { useNews } from "@/hooks/use-news";
import { formatNewsDate } from "@/lib/news";
import heroImg from "@/assets/hero.jpg";
import gardenImg from "@/assets/garden.jpg";
import classroomImg from "@/assets/classroom.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Molnár István EGYMI — Befogadó intézmény Hajdúböszörményben" },
      {
        name: "description",
        content:
          "Óvoda, általános és készségfejlesztő iskola, kollégium. Gyermekközpontú gyógypedagógiai nevelés Hajdúböszörményben — Ökoiskola és Boldog Iskola.",
      },
      { property: "og:title", content: "Dr. Molnár István EGYMI" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const SERVICES = [
  { icon: Baby, title: "Óvoda", text: "Korai fejlesztés és gyógypedagógiai óvodai nevelés a legkisebbeknek." },
  { icon: School, title: "Általános iskola", text: "Tanulásban és értelmileg akadályozott tanulók egyéni fejlesztése." },
  { icon: BookOpen, title: "Készségfejlesztő iskola", text: "Önálló életvitelre és munkára felkészítő gyakorlati képzés." },
  { icon: HomeIcon, title: "Kollégium", text: "Biztonságos, családias bentlakásos otthon a tanulóinknak." },
];

const VALUES = [
  { icon: HeartHandshake, title: "\n", text: "\n" },
  { icon: Leaf, title: "Ökoiskola", text: "Az iskolakert és a fenntarthatóságra nevelés a mindennapjaink része." },
  { icon: Sun, title: "Boldog Iskola", text: "Olyan légkört teremtünk, ahol a gyermekek örömmel tanulnak és fejlődnek." },
];

function Home() {
  const { data: news } = useNews(3);
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-hero-glow">
        <div className="container-page grid items-center gap-10 py-12 md:py-20 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-secondary-foreground">
              <Sparkles className="h-4 w-4" /> Hajdúböszörmény · 1979 óta
            </span>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] text-foreground md:text-6xl">
              Ahol minden gyermek a saját ütemében{" "}
              <span className="text-primary">virágozhat ki</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              A Dr. Molnár István EGYMI óvodája, általános és készségfejlesztő iskolája, valamint
              kollégiuma befogadó, gyermekközpontú gyógypedagógiai környezetet kínál.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/iskolankrol">
                  Ismerd meg az intézményt <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="soft" size="xl">
                <Link to="/dokumentumtar">Dokumentumtár</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold text-muted-foreground">
              <span>🌿 Ökoiskola</span>
              <span>😊 Boldog Iskola</span>
              <span>🐾 Állatbarát intézmény</span>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImg}
              alt="Mosolygó gyermekek és pedagógusok az iskola kertjében"
              width={1600}
              height={1000}
              className="aspect-[16/11] w-full rounded-3xl object-cover shadow-[var(--shadow-card)]"
            />
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-border/60 bg-card px-5 py-4 shadow-[var(--shadow-card)] sm:block">
              <p className="font-display text-3xl font-extrabold text-primary">45+ év</p>
              <p className="text-xs font-bold text-muted-foreground">gyógypedagógiai tapasztalat</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-page py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary">Intézményegységeink</p>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            Egy intézmény, négy biztonságos otthon
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="group rounded-3xl border border-border/60 bg-card p-7 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                <s.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-xl font-extrabold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values / About strip */}
      <section className="bg-accent/40">
        <div className="container-page grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={gardenImg}
              alt="Gyermekek az iskolakertben palántát ültetnek"
              width={1200}
              height={900}
              loading="lazy"
              className="aspect-[3/4] w-full rounded-3xl object-cover shadow-[var(--shadow-soft)]"
            />
            <img
              src={classroomImg}
              alt="Pedagógus segít egy gyermeknek a tanteremben"
              width={1200}
              height={900}
              loading="lazy"
              className="mt-8 aspect-[3/4] w-full rounded-3xl object-cover shadow-[var(--shadow-soft)]"
            />
          </div>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-sun">Értékeink</p>
            <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
              Türelem, elfogadás és sok-sok öröm
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Hisszük, hogy minden gyermek képes fejlődni, ha a megfelelő figyelmet és környezetet
              kapja. Gyógypedagógusaink egyénre szabott módszerekkel kísérik a tanulókat.
            </p>
            <div className="mt-8 space-y-4">
              {VALUES.map((v) => (
                <div key={v.title} className="flex gap-4 rounded-2xl bg-card/70 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sun/15 text-sun">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-extrabold text-foreground">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="container-page py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary">Hírek</p>
            <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">Iskolánk életéből</h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/hirek">
              Összes hír <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {news?.map((n) => (
            <article
              key={n.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[var(--shadow-soft)]"
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
                <h3 className="mt-4 font-display text-lg font-extrabold leading-snug text-foreground">{n.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container-page pb-8">
        <div className="overflow-hidden rounded-[2rem] bg-primary px-7 py-12 text-primary-foreground shadow-[var(--shadow-card)] md:px-14 md:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold md:text-4xl">Kérdése van? Keressen minket!</h2>
              <p className="mt-4 max-w-md text-primary-foreground/85">
                Munkatársaink készséggel segítenek a beiratkozással, a szolgáltatásokkal és minden
                egyéb kérdésével kapcsolatban.
              </p>
              <Button asChild variant="sun" size="xl" className="mt-7">
                <Link to="/kapcsolat">
                  Kapcsolatfelvétel <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-3 text-sm font-semibold">
              <span className="flex items-center gap-3 rounded-2xl bg-primary-foreground/10 px-5 py-4">
                <MapPin className="h-5 w-5" /> {SITE.address}
              </span>
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-3 rounded-2xl bg-primary-foreground/10 px-5 py-4 transition-colors hover:bg-primary-foreground/20"
              >
                <Phone className="h-5 w-5" /> {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 rounded-2xl bg-primary-foreground/10 px-5 py-4 transition-colors hover:bg-primary-foreground/20"
              >
                <Mail className="h-5 w-5" /> {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
