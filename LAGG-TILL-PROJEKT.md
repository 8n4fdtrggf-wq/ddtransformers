# Lägga till ett projekt

Projektsidan (projekt.html) nås via länken **Projekt** längst ned på startsidan.
Den visas inte på själva startsidan.

Allt innehåll på projektsidan ligger i en enda fil: **projekt.js**.
Du behöver aldrig röra projekt.html.

## Steg för steg

1. **Bilden.** Spara bilden i mappen `projekt`. Använd en liggande bild, gärna
   minst 1600 px bred, och ett filnamn utan mellanslag och å/ä/ö,
   till exempel `vasteras-2026.jpg`.
2. **Texten.** Öppna `projekt.js` i en textredigerare (Anteckningar, TextEdit
   i läget "Vanlig text", eller VS Code). Kopiera mallen längst ned i filen och
   klistra in den överst i listan, efter raden `/* Lägg nya projekt här, överst. */`.
3. **Fyll i.** Ändra texten mellan citattecknen. Fält du inte behöver lämnar du
   som `""`, så syns de inte på sidan.
4. **Ladda upp.** Ladda upp `projekt.js` och bilden till webbservern, på samma
   plats som tidigare.

## Fälten

| Fält | Exempel | Syns som |
|---|---|---|
| titel | "Krafttransformator till ställverk" | Rubrik. Obligatoriskt. |
| ar | "2026" | År. Styr ordningen, nyast först. |
| plats | "Västerås" | Plats |
| kund | "" | Kund (lämna tomt om kunden inte ska nämnas) |
| tillverkare | "Kolektor Etra" | Tillverkare |
| effekt | "80 MVA" | Effekt |
| spanning | "130 kV" | Spänning |
| text | "En eller två meningar." | Beskrivning |
| bild | "projekt/vasteras-2026.jpg" | Bild. Utan bild blir projektet en textrad. |
| alt | "Transformatorn på plats i ställverket" | Beskrivning av bilden för skärmläsare |

## Vanliga fel

- **Sidan visar "Inga projekt upplagda än" trots att du lagt till ett.**
  Oftast saknas ett kommatecken efter `}` eller ett citattecken. Varje projekt
  ska sluta med `},`.
- **Bilden syns inte.** Kontrollera att filnamnet i `bild` stämmer exakt,
  inklusive stora och små bokstäver, och att bilden ligger i mappen `projekt`.
