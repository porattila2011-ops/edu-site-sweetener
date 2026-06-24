import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, GraduationCap } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { useContent } from "@/hooks/use-content";
import { phoneToHref } from "@/lib/content";

const FOOTER_LOGOS = [
  {
    src: "/logos/agrarminiszterium.png",
    alt: "Agrárminisztérium logó",
    className: "h-14 max-w-[150px]",
  },
  {
    src: "/logos/Allatbarat.jpg",
    alt: "Állatbarát logó",
    className: "h-14 max-w-[140px]",
  },
  {
    src: "/logos/biokultura-logo.png",
    alt: "Biokultúra logó",
    className: "h-14 max-w-[150px]",
  },
  {
    src: "/logos/boldogiskola_logo_nodate.png",
    alt: "Boldog Iskola logó",
    className: "h-14 max-w-[150px]",
  },
  {
    src: "/logos/esza-logo.png",
    alt: "ESZA logó",
    className: "h-28 max-w-[350px]",
  },
  {
    src: "/logos/iskolakertekert_logo.png",
    alt: "Iskolakertekért logó",
    className: "h-14 max-w-[150px]",
  },
  {
    src: "/logos/MNVH-1.png",
    alt: "MNVH logó",
    className: "h-14 max-w-[150px]",
  },
  {
    src: "/logos/kekbolygo-logo.png",
    alt: "Kék Bolygó logó",
    className: "h-14 max-w-[150px]",
  },
  {
    src: "/logos/Programlogja.png",
    alt: "Program logó",
    className: "h-14 max-w-[150px]",
  },
];

export function SiteFooter() {
  const { c } = useContent();
  const phone = c("site.phone");

  return (
    <footer className="mt-24 border-t border-border/60 bg-sidebar">
      <div className="container-page grid gap-10 pt-14 pb-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <img src="https://cdn.builder.io/api/v1/image/assets%2F33a6f2208867472d836804e5b9731057%2F6d40a2b087c646d7a13afcdecf8b27d1?format=webp&width=800&height=1200" alt="Dr. Molnár István EGYMI" className="h-11 w-11 object-cover rounded-2xl" />
            <span className="font-display text-lg font-extrabold">
              Dr. Molnár István EGYMI
            </span>
          </div>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {SITE.fullName}
          </p>

          <p className="mt-3 text-xs font-semibold text-muted-foreground">
            OM azonosító: {c("site.om")} · Alapítva: {c("site.founded")}
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-extrabold uppercase tracking-wide text-foreground">
            Oldalak
          </h4>

          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-extrabold uppercase tracking-wide text-foreground">
            Elérhetőség
          </h4>

          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{c("site.address")}</span>
            </li>

            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href={phoneToHref(phone)} className="hover:text-primary">
                {phone}
              </a>
            </li>

            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href={"mailto:" + c("site.email")} className="hover:text-primary">
                {c("site.email")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page pb-12">
        <div className="flex flex-wrap items-center justify-center gap-6 rounded-3xl bg-background/60 px-6 py-6">
          {FOOTER_LOGOS.map((logo) => (
            <img
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              className={`${logo.className} w-auto object-contain`}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} Dr. Molnár István EGYMI. Minden jog
            fenntartva.
          </p>

          <p className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" /> Befogadó · Ökoiskola ·
              Boldog Iskola
            </span>

            <Link to="/admin" className="hover:text-primary">
              Szerkesztő
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
