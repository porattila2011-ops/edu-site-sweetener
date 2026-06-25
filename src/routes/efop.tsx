import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site-layout";
import { useContent } from "@/hooks/use-content";
import { useEFOPEvents } from "@/hooks/use-efop-events";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/efop")({
  head: () => ({
    meta: [
      { title: "EFOP 3.1.6-16-2017-00036 projekt — Dr. Molnár István EGYMI" },
      {
        name: "description",
        content: "EFOP pályázati projekt eseményei, galériái és szakmai napok — fejlesztő nevelés-oktatás.",
      },
      { property: "og:title", content: "EFOP projekt" },
      { property: "og:url", content: "/efop" },
    ],
    links: [{ rel: "canonical", href: "/efop" }],
  }),
  component: EFOP,
});

function EFOP() {
  const { c } = useContent();
  const { data: dbEvents = [], isLoading } = useEFOPEvents();

  const defaultEvents = [
    {
      id: "1",
      title: '"Teadélután" a fonalműhelyben',
      date: "2023.11.16.",
      description: "",
      images_count: 12,
      is_carousel: false,
    },
    {
      id: "2",
      title: "Kendereskert",
      date: "2023.09.26.",
      description:
        "2023.09.26-án intézményünk 135 tanulója, 65 pedagógus, gyógypedagógiai aszisztens részvételével kirándultunk Hajdúnánásra a Kendereskertbe. A kedves szívélyes fogadtatást követően a majorságban dolgozó házigazda vezetésével megtekintettük a háztáji állatokat, a csodálatos zöldséges kertet, és a csengő kiállítást.",
      images_count: 6,
      is_carousel: false,
    },
    {
      id: "3",
      title: "Mókás Kutya Nap",
      date: "2023.06.13.",
      description:
        '2023.06.13-án "Mókás Kutya Nap" Avagy az állatasszisztált fejlesztőtevékenység helye a fejlesztő nevelés-oktatásban szülősegítő programunkra vártuk az érdeklődő szülőket és gyermekeiket.',
      images_count: 9,
      is_carousel: true,
    },
    {
      id: "4",
      title: "Gyermek és családi nap",
      date: "2023.06.02.",
      description:
        "2023.06.02-én Gyermek-és családi napra vártuk az intézmény tanulóit és szüleit. A program keretében a gyermekek és szüleik különböző tevékenységekbe kapcsolódhattak be. Táncházat biztosítottunk egy táncpedagógus vezetésével, volt arcfestés, társasjátékok kipróbálásának lehetősége, kézműves műhely, lufihajtogató bohóc. Az iskolakert bemutatása, illetve kertbüfé, ahol a kertben termesztett zöldségek és gyümölcsök kóstolására nyílott lehetőség. Tízóraira rétessel, ebédre pizzával vártuk a gyerekeket és a vendégeket. A nap zárása és fénypontja a meglepetés bábelőadás volt, melyet a Palánta Sorsfordító Alapítvány bábművészei adtak elő tanulóink és valamennyi kedves vendég nagy örömére. Minden tanuló ezen a napon egy ajándékcsomagot vehetett át, melyet az EFOP 3.1.6-16 pályázat biztosított.",
      images_count: 15,
      is_carousel: true,
    },
    {
      id: "5",
      title: "Projektbemutató",
      date: "2023.05.19.",
      description:
        "2023.05.19-én projektbemutató szakmai nap keretében mutattuk be a fejlesztő nevelés-oktatás és az utazó gyógypedagógusi, konduktori hálózatban végzett pályázati munkánkat.",
      images_count: 12,
      is_carousel: false,
    },
    {
      id: "6",
      title: "Újra játékra fel! (5.b osztály)",
      date: "2023.05.05.",
      description:
        "Újra játékra fel! szerveztünk 2023.05.05-én szülőérzékenyítő programot a Hajdúböszörményi Bocskai István Általános Iskola 5.b osztályába. Az utazó gyógypedagógusok célja a pályázat keretében a szemléletformáló tevékenységek megvalósítása, megszervezése.",
      images_count: 4,
      is_carousel: true,
    },
    {
      id: "7",
      title: "Újra játékra fel! (5.b osztály)",
      date: "2023.04.13.",
      description:
        "Újra játékra fel! szerveztünk szülőérzékenyítő programot 2023.04.13-án, ahol egy konkrét osztályközösséget szólítottunk meg.",
      images_count: 12,
      is_carousel: false,
    },
    {
      id: "8",
      title: "Szülősegítő program",
      date: "2023.03.21.",
      description:
        'Szülősegítő programot valósítottunk meg 2023.03.21-én a fejlesztő nevelés-oktatásban. Állatasszisztált köszöntő kör, a szűkebb tágabb környezet megismerése címmel.',
      images_count: 13,
      is_carousel: true,
    },
    {
      id: "9",
      title: "Nyárra fel!",
      date: "2022.05.28.",
      description:
        "2022.05.28-án társasjátékok, olvasástechnikát fejlesztő játékok bemutatására, kipróbálására vártunk minden érdeklődő kedves gyereket, szülőt!",
      images_count: 5,
      is_carousel: false,
    },
    {
      id: "10",
      title: "Napirend használata a fejlesztő nevelés-oktatásban",
      date: "2022.05.06.",
      description:
        "Szülősegítő programot szerveztünk 2022.05.06-án, ahol konkrét gyakorlati példák, folyamatábrák segítségével próbáltunk segítséget adni a szülőknek a napirend strukturálásához.",
      images_count: 8,
      is_carousel: false,
    },
    {
      id: "11",
      title: "Hogyan tanulunk mi játékosan?",
      date: "2021.12.11.",
      description:
        "Avagy a játék, szabadidő hasznos eltöltése a fejlesztő nevelés-oktatásban szülősegítő programot szerveztünk 2021.12.11-én.",
      images_count: 12,
      is_carousel: true,
    },
    {
      id: "12",
      title: "Adventi várakozás szülő klub!",
      date: "2019.12.13.",
      description:
        "Szeretettel hívtunk, vártunk minden szülőt és érdeklődőt 2019.12.13-án egy kis karácsonyi készülődésre, beszélgetésre.",
      images_count: 6,
      is_carousel: false,
    },
  ];

  const events = dbEvents.length > 0 ? dbEvents : defaultEvents;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={c("efop.hero_eyebrow")}
        title={c("efop.hero_title")}
        description={c("efop.hero_description")}
      />

      <section className="container-page py-14 md:py-20">
        <div className="space-y-16">
          {events.map((event, index) => (
            <article key={event.id}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">{event.title}</h2>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">{event.date}</p>
                {event.description && (
                  <p className="text-base text-muted-foreground mt-4 leading-relaxed">{event.description}</p>
                )}
              </div>

              {/* Gallery */}
              <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                {event.is_carousel ? (
                  <div className="overflow-x-auto">
                    <div className="flex gap-3 p-4 sm:p-6">
                      {Array.from({ length: event.images_count }).map((_, idx) => (
                        <div
                          key={idx}
                          className="flex-shrink-0 w-48 h-48 sm:w-64 sm:h-64 rounded-lg overflow-hidden bg-muted flex items-center justify-center"
                        >
                          <div className="text-center text-muted-foreground text-sm">
                            <p className="font-medium">Kép</p>
                            <p className="text-xs">{idx + 1}/{event.images_count}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-4 sm:p-6">
                    {Array.from({ length: event.images_count }).map((_, idx) => (
                      <div
                        key={idx}
                        className="aspect-square rounded-lg overflow-hidden bg-muted flex items-center justify-center"
                      >
                        <div className="text-center text-muted-foreground text-xs">
                          <p className="font-medium">Kép</p>
                          <p>{idx + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {index < events.length - 1 && <div className="mt-12 border-b border-border/30" />}
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-card">
        <div className="container-page py-14 md:py-20">
          <h2 className="text-2xl font-bold text-foreground mb-4">{c("efop.about_title")}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed max-w-2xl">
            <p>{c("efop.about_p1")}</p>
            <p>{c("efop.about_p2")}</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
