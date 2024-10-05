# Silicon AB - Slutuppgift - HTML och CSS

## Beskrivning

Silicon AB är ett projekt som utvecklades som en slutuppgift för HTML & CSS-kursen. Det är en webbplats byggd med moderna webbteknologier och verktyg. Jag har använt AI-verktyget Phind för att utveckla och skriva en del av koden, men framför allt dokumentationen. Jag har även använt Phind AI för att skriva 100% av Vite-konfigurationen, då jag inte har tillräcklig kunskap om detta i nuläget.

## Förutsättningar/Krav

Innan du börjar, se till att du har följande installerat på din dator:

- [Node.js](https://nodejs.org/) (som inkluderar npm)
- [Git](https://git-scm.com/)

## Hämta och använda den senaste versionen

1. Gå till [Releases](https://github.com/dittanvändarnamn/dittprojekt/releases) sidan för detta repository.
2. Under "Releases", ladda ner zip-filen som innehåller den byggda versionen av projektet.
3. Packa upp zip-filen på din lokala maskin.
4. Öppna `index.html` från din lokala server eller genom ett plugin i Vscode som heter Live Server
<https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer>

## Installation (För Utvecklare)

Detta om du vill utveckla vidare eller bara leka med projektet.

1. Klona repositoryn:

    ```powershell
    git clone https://github.com/Chugarah/Silicon-AB.git
    ```

2. Klona repositoryn:

    ```powershell
    cd Silicon-AB
    ```

3. Installera NPM paketen:

    ```powershell
    npm install --save
    ```

## Användning

För att starta utvecklingsservern:

```powershell
npm run dev
```

För att bygga projektet för produktion:

```powershell
// Windows:
npm run build:windows
// Unix
npm run build:unix
```

## Miljökonfigurationer

Detta projekt använder följande .env-filer för att hantera olika miljöer:

1. `.env.unix`: Produktionsinställningar för Unix.
2. `.env.windows`: Produktionsinställningar för Windows.

För närvarande är dessa produktionsinställningar väldigt enkla och styr endast namnet på applikationen den grundläggande sökvägen för projektet.

### Användning Env konfigurationer

För att använda dessa konfigurationer, uppdatera din `package.json` med följande skript:

```env
VITE_APP_TITLE="Silicon AB"
VITE_SHORT_APP_TITLE="SI"
VITE_OUTPUT_DIR=./dist
VITE_ASSETS_DIR=./assets
VITE_BASE=./
```

## Förklaring av miljövariabler

1. **`VITE_APP_TITLE="Silicon AB"`**  
   Detta värde anger det fullständiga namnet på applikationen. Det används ofta i titeln på webbläsarfliken eller på andra platser där applikationens namn behöver visas.

2. **`VITE_SHORT_APP_TITLE="SI"`**  
   Detta är en förkortad version av applikationens namn. Det kan användas där det behövs ett kortare namn, till exempel som ikontext eller i mindre gränssnittselement.

3. **`VITE_OUTPUT_DIR=./dist`**  
   Anger vilken mapp den byggda versionen av projektet ska placeras i. I detta fall kommer alla produktionsfiler att sparas i mappen `./dist`.

4. **`VITE_ASSETS_DIR=./assets`**  
   Definierar var projektets resurser (bilder, typsnitt, etc.) ska placeras efter byggprocessen. Här kommer resurser att sparas i mappen `./assets`.

5. **`VITE_BASE=./`**  
   Anger den grundläggande sökvägen för applikationen. Detta används för att definiera hur applikationen laddar sina resurser. Här betyder det att den relativa sökvägen är roten av projektet.

## Teknologier

### Språk

[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![SCSS](https://img.shields.io/badge/SCSS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)](https://sass-lang.com/)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Verktyg

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)

## Projektstruktur

Använde mig av Vscode plugin som heter Draw Folder Structure

<https://marketplace.visualstudio.com/items?itemName=jmkrivocapich.drawfolderstructure>

```plaintext
Silicon-AB
├── public
│   └── vite.svg
└── src
    ├── assets
    │   ├── fonts
    │   │   ├── Font-Awesome
    │   │   │   ├── fa-brands-400.ttf
    │   │   │   ├── fa-brands-400.woff2
    │   │   │   ├── fa-regular-400.ttf
    │   │   │   ├── fa-regular-400.woff2
    │   │   │   ├── fa-solid-900.ttf
    │   │   │   ├── fa-solid-900.woff2
    │   │   │   ├── fa-v4compatibility.ttf
    │   │   │   └── fa-v4compatibility.woff2
    │   │   └── Manrope
    │   │       ├── Manrope-Bold.ttf
    │   │       ├── Manrope-ExtraBold.ttf
    │   │       ├── Manrope-ExtraLight.ttf
    │   │       ├── Manrope-Light.ttf
    │   │       ├── Manrope-Medium.ttf
    │   │       ├── Manrope-Regular.ttf
    │   │       ├── Manrope-SemiBold.ttf
    │   │       └── Manrope-VariableFont_wght.ttf
    │   └── images
    │       ├── svg
    │       └── favicon.ico
    ├── js
    │   ├── modules
    │   └── main.js
    ├── scss
    │   ├── abstracts
    │   │   ├── _functions.scss
    │   │   ├── _index.scss
    │   │   ├── _mixins.scss
    │   │   ├── _utilities.scss
    │   │   └── _variables.scss
    │   ├── base
    │   │   ├── _core.scss
    │   │   ├── _index.scss
    │   │   └── _typography.scss
    │   ├── components
    │   │   ├── _buttons.scss
    │   │   ├── _icons.scss
    │   │   ├── _index.scss
    │   │   └── _radio.scss
    │   ├── layout
    │   │   ├── _grid.scss
    │   │   ├── _index.scss
    │   │   └── _layout.scss
    │   ├── pages
    │   │   ├── _index.scss
    │   │   └── _main-page.scss
    │   ├── vendors
    │   │   ├── _font-awesome.scss
    │   │   └── _index.scss
    │   └── main.scss
    └── workers.js
├── .env
├── .env.unix
├── .env.windows
├── .eslintrc.js
├── .gitignore
├── cspell.config.yaml
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── Silicon Design Template.fig
└── vite.config.js

```

## Förklaring

Denna mappstruktur representerar filsystemet för projektet "Silicon-AB". Här följer en översikt av dess innehåll och syfte:

## 1. Rotmappen: `Silicon-AB`

Detta är huvudmappen för projektet. Den innehåller alla filer och undermappar som används i utvecklingen.

## 2. `public`

Denna mapp innehåller offentligt tillgängliga resurser som kan nås direkt via webbläsaren. I denna mapp finns:

- `vite.svg`: En SVG-bild som används i projektet.

## 3. `src`

Denna mapp innehåller all källkod för projektet, inklusive skript, stilar och bilder.

### a. `assets`

Denna mapp innehåller alla tillgångar som används i projektet.

- **`fonts`**: Innehåller olika typsnitt som används i designen.
  - **`Font-Awesome`**: Innehåller typsnittsfiler för Font Awesome.
    - Flera filtyper för olika varianter av ikoner och tecken (`.ttf` och `.woff2`).
  - **`Manrope`**: Innehåller typsnittsfiler för Manrope-typsnittet med olika vikter (fet, lätt osv.).

- **`images`**: Här finns bildresurser som används i projektet.
  - **`svg`**: En mapp som innehåller SVG-bilder för olika ikoner och grafik.
  - `favicon.ico`: Ikonfilen för webbläsarfliken.

### b. `js`

Denna mapp innehåller JavaScript-filer som används i projektet.

- **`modules`**: En mapp för olika JavaScript-moduler.
- `main.js`: Huvud-JavaScript-filen som initierar applikationen.

### c. `scss`

Denna mapp innehåller SCSS-filer (Sass), vilket är en preprocessor för CSS som gör det lättare att skriva och hantera stilar.

- **`abstracts`**: Innehåller hjälpfunktioner och variabler som används i andra stilar.
  - `_functions.scss`, `_mixins.scss`, etc.
- **`base`**: Grundläggande stilar för projektet.
  - `_core.scss`, `_typography.scss`, etc.
- **`components`**: Stilar för olika komponenter i applikationen.
  - `_buttons.scss`, `_icons.scss`, etc.
- **`layout`**: Stilar som definierar layouten för olika delar av projektet.
  - `_grid.scss`, `_layout.scss`, etc.
- **`pages`**: Stilar specifika för olika sidor.
  - `_index.scss`, `_main-page.scss`, etc.
- **`vendors`**: Stilar från externa bibliotek och verktyg.
  - `_font-awesome.scss`, `_index.scss`, etc.
- `main.scss`: Huvud-Stylesheet som importerar alla andra stilar.

### d. `workers.js`

Innehåller koden för web workers, om projektet använder dem.

## 4. Konfigurationsfiler

- `.env`, `.env.unix`, `.env.windows`: Miljökonfigurationsfiler för olika plattformar.
- `.eslintrc.js`: Konfiguration för ESLint, ett verktyg för att analysera och förbättra JavaScript-kod.
- `.gitignore`: Fil som specificerar vilka filer eller mappar som ska ignoreras av Git-versioneringssystemet.
- `cspell.config.yaml`: Konfiguration för stavningskontroll.
- `eslint.config.js`: Ytterligare konfiguration för ESLint.
- `index.html`: Huvud-HTML-filen för projektet.
- `package-lock.json` och `package.json`: Filer som innehåller information om projektets beroenden och konfigurationer.
- `README.md`: En dokumentationsfil för projektet, som ofta innehåller information om installation, användning och bidrag.
- `Silicon Design Template.fig`: En fil som antas vara en designmall (möjligen skapad i Figma).
- `vite.config.js`: Konfigurationsfil för Vite, en modern frontend-byggare.

## Licens

Gör vad ni vill med detta :)
