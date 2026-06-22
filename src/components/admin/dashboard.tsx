import { FileText, Newspaper, FileDown, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AdminDashboard() {
  const sections = [
    {
      icon: FileText,
      title: "Szövegek & Képek",
      description: "Módosítsd az oldal szövegeit, képeit és minden tartalmi elemet",
      items: [
        "Kezdőlap szövegei és képei",
        "Iskolánkról oldal tartalma",
        "Kapcsolati adatok",
        "Oldalak leírásai",
      ],
      color: "text-blue-500",
    },
    {
      icon: Newspaper,
      title: "Hírek",
      description: "Hozz létre új híreket vagy szerkeszd a meglévőket",
      items: [
        "Új hír hozzáadása",
        "Hírek szerkesztése",
        "Hírek törlése",
        "Képek feltöltése",
      ],
      color: "text-orange-500",
    },
    {
      icon: FileDown,
      title: "Dokumentumtár",
      description: "Feltöltsd az intézmény dokumentumait és szabályzatait",
      items: [
        "Dokumentumok feltöltése",
        "Kategóriák szerkesztése",
        "Dokumentumok törlése",
        "PDF-ek kezelése",
      ],
      color: "text-green-500",
    },
    {
      icon: Star,
      title: "Büszkeségeink",
      description: "Szerkeszd az intézmény elismeréseit és programjait",
      items: [
        "Ökoiskola, Boldog Iskola",
        "Állatbarát intézmény",
        "Iskolakert program",
        "Egyéb elismerések",
      ],
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/5 to-primary/10 p-8 shadow-[var(--shadow-soft)]">
        <h2 className="font-display text-2xl font-extrabold text-foreground">
          Üdvözlünk az admin felületen!
        </h2>
        <p className="mt-2 text-muted-foreground">
          Válassz egy szerkesztési kategóriát az alábbiak közül, vagy kattints a fülekre a részletesebb kezeléshez.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="overflow-hidden p-0 shadow-[var(--shadow-soft)]">
              <div className="border-b border-border/60 bg-card p-6">
                <div className="flex items-start gap-4">
                  <div className={`rounded-xl bg-secondary p-3 ${section.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-foreground">
                      {section.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              </div>
              <ul className="space-y-3 bg-card/50 px-6 py-4">
                {section.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-[var(--shadow-soft)]">
        <h3 className="font-display text-lg font-extrabold text-foreground">Útmutató</h3>
        <div className="mt-4 space-y-3 text-sm text-muted-foreground">
          <p>
            <span className="font-bold text-foreground">1. Szövegek és képek:</span> Az oldal összes szövegét és képét itt szerkesztheted. Szakcím után mentsd el az összes módosítást.
          </p>
          <p>
            <span className="font-bold text-foreground">2. Hírek:</span> Hozz létre új híreket, amelyek a Hírek oldalon és a kezdőlapon jelennek meg.
          </p>
          <p>
            <span className="font-bold text-foreground">3. Dokumentumtár:</span> Feltöltsd az intézmény dokumentumait kategóriák szerint.
          </p>
          <p>
            <span className="font-bold text-foreground">4. Büszkeségeink:</span> Szerkeszd az intézmény elismeréseit és programjait.
          </p>
        </div>
      </div>
    </div>
  );
}
