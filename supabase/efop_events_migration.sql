-- Create efop_events table for managing EFOP project events
CREATE TABLE IF NOT EXISTS public.efop_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT DEFAULT '',
  images_count INTEGER NOT NULL DEFAULT 6,
  is_carousel BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.efop_events ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read
CREATE POLICY "Allow public read access" ON public.efop_events
  FOR SELECT USING (true);

-- Allow admin users to manage
CREATE POLICY "Allow admin full access" ON public.efop_events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_efop_events_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER efop_events_updated_at
BEFORE UPDATE ON public.efop_events
FOR EACH ROW
EXECUTE FUNCTION public.update_efop_events_updated_at();

-- Insert default events
INSERT INTO public.efop_events (title, date, description, images_count, is_carousel, sort_order) VALUES
  ('"Teadélután" a fonalműhelyben', '2023.11.16.', '', 12, FALSE, 0),
  ('Kendereskert', '2023.09.26.', '2023.09.26-án intézményünk 135 tanulója, 65 pedagógus, gyógypedagógiai aszisztens részvételével kirándultunk Hajdúnánásra a Kendereskertbe. A kedves szívélyes fogadtatást követően a majorságban dolgozó házigazda vezetésével megtekintettük a háztáji állatokat, a csodálatos zöldséges kertet, és a csengő kiállítást.', 6, FALSE, 1),
  ('Mókás Kutya Nap', '2023.06.13.', '2023.06.13-án "Mókás Kutya Nap" Avagy az állatasszisztált fejlesztőtevékenység helye a fejlesztő nevelés-oktatásban szülősegítő programunkra vártuk az érdeklődő szülőket és gyermekeiket.', 9, TRUE, 2),
  ('Gyermek és családi nap', '2023.06.02.', '2023.06.02-én Gyermek-és családi napra vártuk az intézmény tanulóit és szüleit. A program keretében a gyermekek és szüleik különböző tevékenységekbe kapcsolódhattak be. Táncházat biztosítottunk egy táncpedagógus vezetésével, volt arcfestés, társasjátékok kipróbálásának lehetősége, kézműves műhely, lufihajtogató bohóc. Az iskolakert bemutatása, illetve kertbüfé, ahol a kertben termesztett zöldségek és gyümölcsök kóstolására nyílott lehetőség. Tízóraira rétessel, ebédre pizzával vártuk a gyerekeket és a vendégeket. A nap zárása és fénypontja a meglepetés bábelőadás volt, melyet a Palánta Sorsfordító Alapítvány bábművészei adtak elő tanulóink és valamennyi kedves vendég nagy örömére. Minden tanuló ezen a napon egy ajándékcsomagot vehetett át, melyet az EFOP 3.1.6-16 pályázat biztosított.', 15, TRUE, 3),
  ('Projektbemutató', '2023.05.19.', '2023.05.19-én projektbemutató szakmai nap keretében mutattuk be a fejlesztő nevelés-oktatás és az utazó gyógypedagógusi, konduktori hálózatban végzett pályázati munkánkat.', 12, FALSE, 4),
  ('Újra játékra fel! (5.b osztály)', '2023.05.05.', 'Újra játékra fel! szerveztünk 2023.05.05-én szülőérzékenyítő programot a Hajdúböszörményi Bocskai István Általános Iskola 5.b osztályába. Az utazó gyógypedagógusok célja a pályázat keretében a szemléletformáló tevékenységek megvalósítása, megszervezése.', 4, TRUE, 5),
  ('Újra játékra fel! (5.b osztály)', '2023.04.13.', 'Újra játékra fel! szerveztünk szülőérzékenyítő programot 2023.04.13-án, ahol egy konkrét osztályközösséget szólítottunk meg.', 12, FALSE, 6),
  ('Szülősegítő program', '2023.03.21.', 'Szülősegítő programot valósítottunk meg 2023.03.21-én a fejlesztő nevelés-oktatásban. Állatasszisztált köszöntő kör, a szűkebb tágabb környezet megismerése címmel.', 13, TRUE, 7),
  ('Nyárra fel!', '2022.05.28.', '2022.05.28-án társasjátékok, olvasástechnikát fejlesztő játékok bemutatására, kipróbálására vártunk minden érdeklődő kedves gyereket, szülőt!', 5, FALSE, 8),
  ('Napirend használata a fejlesztő nevelés-oktatásban', '2022.05.06.', 'Szülősegítő programot szerveztünk 2022.05.06-án, ahol konkrét gyakorlati példák, folyamatábrák segítségével próbáltunk segítséget adni a szülőknek a napirend strukturálásához.', 8, FALSE, 9),
  ('Hogyan tanulunk mi játékosan?', '2021.12.11.', 'Avagy a játék, szabadidő hasznos eltöltése a fejlesztő nevelés-oktatásban szülősegítő programot szerveztünk 2021.12.11-én.', 12, TRUE, 10),
  ('Adventi várakozás szülő klub!', '2019.12.13.', 'Szeretettel hívtunk, vártunk minden szülőt és érdeklődőt 2019.12.13-án egy kis karácsonyi készülődésre, beszélgetésre.', 6, FALSE, 11)
ON CONFLICT DO NOTHING;
