# EFOP Projekt Oldal – Szerkesztés Beállítása

## Szükséges Lépések

Az EFOP oldal teljes szerkeszthetővé tétele érdekében végezd el az alábbi lépéseket:

### 1. Supabase Adatbázis Tábla Létrehozása

Nyitsd meg a **Supabase Projekt** SQL Editor-át és futtasd le az alábbi SQL scriptet:

1. Válaszd a **SQL Editor** -> **New Query**-t
2. Másold be a `supabase/efop_events_migration.sql` fájl tartalmát
3. Kattints a **Run** gombra

Ez létrehozza az `efop_events` táblát az összes alapértelmezett eseménnyel.

### 2. Ellenőrzés

A Supabase webes felületén:
- Menj a **Database** -> **Tables** szekcióba
- Keresd meg az `efop_events` táblát
- Nézd meg, hogy az összes esemény bekerült-e

### 3. Admin Felület Használata

Miután a tábla létrehozása megtörtént:

1. Menj az weboldal `/admin` felületre
2. Kattints a **📋 EFOP Projekt** fülre
3. Itt szerkesztheted az összes eseményt:
   - **Új esemény hozzáadása**: Kattints az "Új esemény" gombra
   - **Esemény szerkesztése**: Kattints a ceruza ikonra
   - **Esemény törlése**: Kattints a kuka ikonra
   - **Sorrend módosítása**: Használd a felfelé/lefelé nyilakat

### 4. Szöveg és Címek Szerkesztése

Az EFOP oldal fejléc és "A projektről" szövegei az **"🎨 Szövegek & Képek"** fülön szerkeszthető az **"EFOP projekt oldal"** szekciójában.

## Szerkeszthető Mezők

### Események (📋 EFOP Projekt fülön):
- **Esemény címe**: Az esemény neve
- **Dátum**: Formátum: YYYY.MM.DD (pl. 2023.11.16.)
- **Leírás**: Az esemény részletes leírása
- **Képek száma**: Hány kép tartozik az eseményhez
- **Karussel nézet**: Be/ki kapcsoló – ha bekapcsolt, vízszintes karusselben jelennek meg a képek
- **Sorrend**: A megjelenési sorrend az oldalon

### Oldal szövegei (🎨 Szövegek & Képek fülön):
- **Felső címke** (eyebrow)
- **Főcím** (title)
- **Főcím leírása** (description)
- **"A projektről" cím**
- **"A projektről" 1. bekezdés**
- **"A projektről" 2. bekezdés**

## Megjegyzések

- Az összes módosítás azonnal érvényben lép az oldalon
- Az alapértelmezett események megmaradnak, szerkesztheted vagy törölheted őket
- Az `is_carousel: true` beállítás esetén a képek vízszintesen csúsznak, `false` esetén rácsban jelennek meg
