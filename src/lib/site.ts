export const SITE = {
  shortName: "Dr. Molnár István EGYMI",
  fullName:
    "Dr. Molnár István Egységes Gyógypedagógiai Módszertani Intézmény, Óvoda, Általános és Készségfejlesztő Iskola, Kollégium",
  address: "4220 Hajdúböszörmény, Radnóti Miklós u. 5.",
  phone: "+36 52 561 847",
  phoneHref: "tel:+3652561847",
  email: "info@drmolnar.edu.hu",
  om: "038512",
  head: "Orosz Henrietta Mária",
  founded: "1979",
};

export const NAV = [
  { label: "Kezdőlap", to: "/" },
  { label: "Iskolánkról", to: "/iskolankrol" },
  { label: "Hírek", to: "/hirek" },
  { label: "Galéria", to: "/galeria" },
  { label: "Dokumentumtár", to: "/dokumentumtar" },
  { label: "Büszkeségeink", to: "/buszkesegeink" },
  { label: "EFOP Projekt", to: "/efop" },
  { label: "Kapcsolat", to: "/kapcsolat" },
] as const;

export const NEWS = [
  {
    date: "2026. 01. 12.",
    tag: "Beiratkozás",
    title: "Jelentkezés a 2026/2027-os tanév első osztályaiba",
    excerpt:
      "Megnyílt a jelentkezés a következő tanév első osztályaiba. A jelentkezéshez szükséges adatlapot és tudnivalókat a dokumentumtárban érheti el.",
  },
  {
    date: "2025. 12. 03.",
    tag: "Pályaválasztás",
    title: "Adatlap a pályaválasztási kiadványhoz",
    excerpt:
      "Frissítettük a pályaválasztási kiadványhoz tartozó intézményi adatlapot a végzős diákok és szüleik számára.",
  },
  {
    date: "2025. 11. 18.",
    tag: "Tájékoztató",
    title: "Szülői tájékoztatás a hitoktatásról",
    excerpt:
      "Tájékoztatjuk a kedves Szülőket a református és görögkatolikus hitoktatás lehetőségeiről a 2025/2026-os tanévben.",
  },
  {
    date: "2025. 10. 06.",
    tag: "Ökoiskola",
    title: "Új idény az iskolakertben",
    excerpt:
      "Ökoiskola munkacsoportunk diákjaival együtt elültettük az őszi palántákat — a kert egész évben tanterem és élménytér.",
  },
];

export const DOCUMENTS: { category: string; items: string[] }[] = [
  {
    category: "Szabályzatok",
    items: [
      "Dr. Molnár István EGYMI házirendje – 2025",
      "Kollégiumi Házirend",
      "Kalkuttai Teréz Anya Tagintézmény házirendje",
      "SZMSZ 2025",
      "Pedagógiai Program 2025",
      "Közzétételi Lista",
    ],
  },
  {
    category: "Munkatervek és tantervek",
    items: [
      "Főigazgatói munkaterv 2025–2026 tanév",
      "Ökoiskola munkacsoport munkaterve",
      "Tanulásban akadályozott tanulók helyi tanterve",
      "Készségfejlesztő Helyi Tanterv",
      "Intézményvezetői Pályázat",
    ],
  },
  {
    category: "Utazó gyógypedagógusi hálózat",
    items: [
      "Utazó gyógypedagógusi, utazó konduktori hálózat protokollja",
      "Formanyomtatvány a szolgáltatás igénybevételéhez",
    ],
  },
  {
    category: "Iskolapszichológiai szolgáltatás",
    items: [
      "Szülői igénylőlap iskolapszichológiai szolgáltatás kérésére",
      "Pedagógusi igénylőlap iskolapszichológiai szolgáltatás kérésére",
    ],
  },
];
