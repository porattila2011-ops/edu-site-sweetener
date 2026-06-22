import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, GraduationCap } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { useContent } from "@/hooks/use-content";
import { phoneToHref } from "@/lib/content";

export function SiteFooter() {
  const { c } = useContent();
  const phone = c("site.phone");
  return (
    <footer className="mt-24 border-t border-border/60 bg-sidebar">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-display text-lg font-extrabold">
              MI
            </span>
            <span className="font-display text-lg font-extrabold">Dr. Molnár István EGYMI</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {SITE.fullName}
          </p>
          <p className="mt-3 text-xs font-semibold text-muted-foreground">
            OM azonosító: {SITE.om} · Alapítva: {SITE.founded}
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
              <span>{SITE.address}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href={SITE.phoneHref} className="hover:text-primary">
                {SITE.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href={`mailto:${SITE.email}`} className="hover:text-primary">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Dr. Molnár István EGYMI. Minden jog fenntartva.</p>
          <p className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" /> Befogadó · Ökoiskola · Boldog Iskola
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
