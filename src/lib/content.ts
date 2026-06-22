import heroImg from "@/assets/hero.jpg";
import gardenImg from "@/assets/garden.jpg";
import classroomImg from "@/assets/classroom.jpg";

export type ContentFieldType = "text" | "textarea" | "image";

export type ContentField = {
  key: string;
  label: string;
  type: ContentFieldType;
  default: string;
  help?: string;
};

export type ContentSection = {
  id: string;
  label: string;
  description?: string;
  fields: ContentField[];
};

export const CONTENT_SECTIONS: ContentSection[] = [
  {
    id: "contact",
    label: "Kapcsolati adatok",
    description: "Ezek az adatok az egész weboldalon megjelennek (fejléc, lábléc, Kapcsolat oldal).",
    fields: [
      { key: "site.address", label: "Cím", type: "text", default: "4220 Hajdúböszörmény, Radnóti Miklós u. 5." },
      { key: "site.phone", label: "Telefonszám", type: "text", default: "+36 52 561 847" },
      { key: "site.email", label: "E-mail cím", type: "text", default: "info@drmolnar.edu.hu" },
      { key: "site.om", label: "OM azonosító", type: "text", default: "038512" },
      { key: "site.head", label: "Intézményvezető", type: "text", default: "Orosz Henrietta Mária" },
      { key: "site.founded", label: "Alapítás éve", type: "text", default: "1979" },
      { key: "site.office_hours", label: "Ügyfélfogadás", type: "text", default: "Hétfő–Péntek 8:00–16:00" },
    ],
  },
  {
    id: "home",
    label: "Kezdőlap",
    fields: [
      { key: "home.hero_badge", label: "Felső címke", type: "text", default: "Hajdúböszörmény · 1979 óta" },
      { key: "home.hero_title", label: "Főcím", type: "text", default: "Ahol minden gyermek a saját ütemében" },
      { key: "home.hero_highlight", label: "Főcím kiemelt része", type: "text", default: "virágozhat ki" },
      {
        key: "home.hero_subtitle",
        label: "Bevezető szöveg",
        type: "textarea",
        default:
          "A Dr. Molnár István EGYMI óvodája, általános és készségfejlesztő iskolája, valamint kollégiuma befogadó, gyermekközpontú gyógypedagógiai környezetet kínál.",
      },
      { key: "home.hero_image", label: "Főkép", type: "image", default: heroImg },
      { key: "home.stat_number", label: "Statisztika – szám", type: "text", default: "45+ év" },
      { key: "home.stat_label", label: "Statisztika – felirat", type: "text", default: "gyógypedagógiai tapasztalat" },
      { key: "home.about_title", label: "Értékek – cím", type: "text", default: "Türelem, elfogadás és sok-sok öröm" },
      {
        key: "home.about_text",
        label: "Értékek – szöveg",
        type: "textarea",
        default:
          "Hisszük, hogy minden gyermek képes fejlődni, ha a megfelelő figyelmet és környezetet kapja. Gyógypedagógusaink egyénre szabott módszerekkel kísérik a tanulókat.",
      },
      { key: "home.value_1_title", label: "1. érték – cím", type: "text", default: "Bázisiskola" },
      { key: "home.value_1_text", label: "1. érték – szöveg", type: "textarea", default: "Bázisiskola" },
      { key: "home.value_2_title", label: "2. érték – cím", type: "text", default: "Ökoiskola" },
      { key: "home.value_2_text", label: "2. érték – szöveg", type: "textarea", default: "Az iskolakert és a fenntarthatóságra nevelés a mindennapjaink része." },
      { key: "home.value_3_title", label: "3. érték – cím", type: "text", default: "Boldog Iskola" },
      { key: "home.value_3_text", label: "3. érték – szöveg", type: "textarea", default: "Olyan légkört teremtünk, ahol a gyermekek örömmel tanulnak és fejlődnek." },
      { key: "home.garden_image", label: "Kép – iskolakert", type: "image", default: gardenImg },
      { key: "home.classroom_image", label: "Kép – tanterem", type: "image", default: classroomImg },
      { key: "home.cta_title", label: "Kapcsolat sáv – cím", type: "text", default: "Kérdése van? Keressen minket!" },
      {
        key: "home.cta_text",
        label: "Kapcsolat sáv – szöveg",
        type: "textarea",
        default:
          "Munkatársaink készséggel segítenek a beiratkozással, a szolgáltatásokkal és minden egyéb kérdésével kapcsolatban.",
      },
    ],
  },
  {
    id: "about",
    label: "Iskolánkról oldal",
    fields: [
      {
        key: "about.page_description",
        label: "Oldal leírása",
        type: "textarea",
        default:
          "Több mint négy évtizede nyújtunk gyógypedagógiai nevelést, oktatást és gondoskodást Hajdúböszörményben és térségében.",
      },
      {
        key: "about.intro_p1",
        label: "Bemutatkozás – 1. bekezdés",
        type: "textarea",
        default:
          "A Dr. Molnár István Egységes Gyógypedagógiai Módszertani Intézmény 1979-ben kezdte meg működését. Az eltelt évtizedek során folyamatosan bővült feladatköre, hogy a sajátos nevelési igényű gyermekek és fiatalok minél teljesebb körű ellátást kapjanak.",
      },
      {
        key: "about.intro_p2",
        label: "Bemutatkozás – 2. bekezdés",
        type: "textarea",
        default:
          "Intézményünk az óvodás kortól a készségfejlesztő iskoláig kíséri a tanulókat, kollégiumi elhelyezéssel és önálló életvitelre felkészítő programokkal. Célunk, hogy minden gyermek biztonságban, elfogadó közösségben, a saját ütemében fejlődhessen.",
      },
      {
        key: "about.intro_p3",
        label: "Bemutatkozás – 3. bekezdés",
        type: "textarea",
        default:
          "Ökoiskolaként és Boldog Iskolaként kiemelt figyelmet fordítunk a fenntarthatóságra nevelésre és a gyermekek érzelmi jóllétére — az iskolakert, az állatbarát szemlélet és a közösségi élmények mindennapjaink részei.",
      },
    ],
  },
  {
    id: "hirek",
    label: "Hírek oldal",
    fields: [
      { key: "hirek.page_description", label: "Oldal leírása", type: "textarea", default: "Friss tájékoztatók, események és fontos határidők diákjaink és szüleik számára." },
    ],
  },
  {
    id: "dokumentumtar",
    label: "Dokumentumtár oldal",
    fields: [
      { key: "dokumentumtar.page_description", label: "Oldal leírása", type: "textarea", default: "Intézményünk hivatalos szabályzatai, munkatervei és nyomtatványai egy helyen." },
    ],
  },
  {
    id: "buszkesegeink",
    label: "Büszkeségeink oldal",
    fields: [
      { key: "buszkesegeink.page_description", label: "Oldal leírása", type: "textarea", default: "Elismeréseink és kiemelt programjaink, amelyek a gyermekek fejlődését és jóllétét szolgálják." },
    ],
  },
  {
    id: "kapcsolat",
    label: "Kapcsolat oldal",
    fields: [
      { key: "kapcsolat.page_title", label: "Oldal címe", type: "text", default: "Vegye fel velünk a kapcsolatot" },
      { key: "kapcsolat.page_description", label: "Oldal leírása", type: "textarea", default: "Kérdésével, beiratkozással vagy szolgáltatásainkkal kapcsolatban szívesen segítünk." },
    ],
  },
];

export const CONTENT_DEFAULTS: Record<string, string> = Object.fromEntries(
  CONTENT_SECTIONS.flatMap((s) => s.fields.map((f) => [f.key, f.default])),
);

export function phoneToHref(phone: string): string {
  return "tel:" + phone.replace(/[^\d+]/g, "");
}
