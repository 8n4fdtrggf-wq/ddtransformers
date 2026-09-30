# Design System: D&D Transformers

Status: LÅST 2026-09-30. Valt koncept: **Märkplåt** (koncept 1 i pickern).
Riktning: Nameplate-briefen som bas, med två lån:
det synliga fackgridet från industrial-brutalist-ui och luftigheten från minimalist-ui.

Design read: B2B-landningssida för inköpare och elnätsingenjörer på svenska nätbolag
och industrier, med ett tekniskt-industriellt bildspråk, byggd på märkplåten som
metafor. Mode (impeccable): Persuade.

Dials: DESIGN_VARIANCE 6 · MOTION_INTENSITY 3 · VISUAL_DENSITY 5.
Motivering: seriös B2B-publik med högt förtroendekrav (trust-first sänker variance och
motion), men datadrivet innehåll (MVA, kV, länder) motiverar något högre täthet.

## 1. Visual Theme & Atmosphere

En sida som läses som en märkplåt och ett datablad, inte som en startup-sajt.
Matt papper, tryckt bläck, en enda kopparton som går igen där ledaren i en
transformator skulle synas. Raka hörn, synliga linjer som delar in informationen i
fack, siffror i monospace. Stilla i vila; rörelse bara där den förklarar något.
Temat är låst till ljust: sidan emulerar tryck och plåt, och ett mörkt läge skulle
bryta metaforen (medvetet val enligt design-taste 8, "print-emulating").

## 2. Color Palette & Roles

- **Plåtpapper** (#F5F4F1): sidbakgrund. Neutral, nästan ingen värme. Givet av briefen.
- **Stålyta** (#E8E6E1): märkplåtens yta och formulärfält, en ton mörkare än papperet.
- **Bläck** (#14171A): all primär text, 1px-linjer, primärknapp. Aldrig #000.
- **Grafit** (#50565C): sekundär text, etiketter, bildtexter. Kontrast mot papper 6,8:1, mot stålyta 6,0:1.
- **Linje** (rgba(20,23,26,0.14)): tunna avdelare inom ett fack.
- **Koppar** (#B87333): enda accenten. Används för: en ledarlinje per sektion,
  märkplåtens typskylt, fokusring, aktiv rad-hover. Kontrast mot papper 3,5:1 (räcker för fokusring, 3:1),
  därför aldrig för brödtext under 24px.
- **Koppar djup** (#8A5220): samma kulör, mörkare steg, för kopparfärgad text i
  liten grad (5,8:1 mot papper). Räknas inte som en andra accent.

Förbjudet: gradienter, gradienttext, pasteller, andra accentfärger, #000, #FFF.
Undantag från design-taste 4.2 (beige+mässing-förbudet): paletten är namngiven i
briefen och motiveras av ämnet (koppar = lindningsmaterialet).

## 3. Typography Rules

- **Display:** Archivo, vikt 700-800, bredd-axel 112-125 (semi-expanded). Tracking
  -0,02 till -0,035em, radavstånd 0,95-1,05. Rubriker i gemener med versal inledning,
  inte versaler (versaler bara i märkplåtens etiketter).
- **Brödtext:** Archivo 400, 17-18px, radavstånd 1,55, max 62ch.
- **Data / mono:** IBM Plex Mono 400/500 för alla siffror, enheter, telefonnummer,
  etiketter på plåten och tabellhuvuden. `font-variant-numeric: tabular-nums`.
- **Skala:** 13 / 15 / 17 / 22 / 32 / 48 / clamp(44px, 6vw, 88px) för H1,
  clamp(72px, 14vw, 200px) för jättesiffror i sektion 02.
- **Förbjudet:** Inter, serif (i vald riktning), tredje typsnittsfamilj, blandad
  familj för betoning.

## 4. Component Stylings

- **Knappar:** en primär, bläckfylld, papperstext, radie 0, höjd 48px, etikett max 2 ord
  ("Kontakta Jukka"). Hover (bara `hover: hover`): bakgrund till #2A2F34. Active:
  translateY(1px). Fokus: 2px kopparring med 3px offset. Ingen sekundärknapp; telefonnummer
  visas som markerbar mono-text bredvid.
- **Märkplåt:** stålyta, 1px bläckram plus inre ram 6px in, fyra nitar i hörnen,
  etikett/värde i två kolumner, graverad känsla med 1px ljus text-shadow. Ingen skugga.
- **Tabellrader (01 tjänster):** full bredd, index i mono till vänster, rubrik, en
  mening, pil längst till höger. Endast bottenlinje mellan rader. Hover: kopparlinje
  växer från vänster (transform: scaleX).
- **Datablad (02 tillverkare):** två blad sida vid sida med olika vikt (asymmetriskt
  7/5), jättesiffror i Archivo, enhet i mono. Inga kort-skuggor.
- **Formulär (04 kontakt):** spec-blankett. Etikett ovanför fält i mono, fält med
  stålyta och bottenlinje, fel under fältet i koppar djup. Ingen placeholder-som-etikett.
- **Hörn:** radie 0 på allt. Inga skuggor. Inga pills.

## 5. Layout Principles

- 12-kolumnsgrid, max 1320px, gap 24px, sidomarginal 16px (mobil) / 40px (desktop).
- Sektionsavstånd clamp(64px, 10vw, 136px). Hero-topp max 96px.
- Sektioner avgränsas med en hel 1px bläcklinje plus sektionsindex i mono
  (01-04). Indexet är briefens informationsarkitektur och ersätter eyebrows helt;
  inga andra eyebrows på sidan.
- Varje sektion har en egen layoutfamilj: hero = split med objekt, 01 = tabellrader,
  02 = asymmetriskt datablad, 03 = porträtt/text-kolumn, 04 = blankett, footer = rad.
- Under 768px: allt en kolumn, märkplåten under rubriken, tabellrader staplas.
- Hero `min-height: auto` (storleken sätts av innehållet), aldrig 100vh.

## 6. Motion & Interaction

- MOTION_INTENSITY 3. Ett signaturgrepp (väljs i rond 4: line-mask reveal på rubriker
  eller count-up på statistik), plus mikro: rad-hover och nav-understrykning.
- Kurva: cubic-bezier(0.23, 1, 0.32, 1). UI under 300ms; signaturgreppet max 900ms.
- Bara transform och opacity (clip-path tillåtet för mask reveal).
- `prefers-reduced-motion: reduce` = helt statisk sida.
- Hover gated bakom `(hover: hover) and (pointer: fine)`.

## 7. Content Rules

- Innehållslås: länkar tel:+46700900469, mailto:jukka.kotiaho@kolektor.com,
  https://kolektor-etra.se, https://swedish.wayonenergy.com. Sektioner 01-04.
  Statistik 90+ / 40+ / 500 MVA / 420 kV.
- Statistiken tillhör Kolektor Etra (90+ år, 40+ länder, upp till 500 MVA och 420 kV
  enligt kolektor-etra.se) och ska alltid attribueras dit, aldrig till D&D.
- En kontaktperson: Jukka Kotiaho, Åkersberga.
- Inga em-/en-streck i synlig text. Inga utropstecken. Inga AI-floskler.

## 8. Anti-Patterns (Banned)

Tre identiska kort, centrerad hero med två knappar, gradienter, gradienttext, emojis,
rundade hörn, mjuka skuggor, glas/blur i innehåll, dekorativa statusprickar,
scroll-cues, versionsetiketter, bildöverlagrade etiketter, lorem ipsum, placeholders,
påhittade siffror, `window.addEventListener('scroll')`, `100vh`, Inter, #000.
