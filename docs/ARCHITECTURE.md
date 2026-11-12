# Essence architecture

## Components

| Part | What it does |
| --- | --- |
| `src/main.jsx` | `BrowserRouter` with `basename` set to Vite's base path |
| `src/App.jsx` | Routes (`/`, `/shop`, `/p/:slug`, `/checkout`, `/about`, 404), page transition veil, smooth scroll, bag drawer and add-to-bag droplet. Pages other than Home load lazily. |
| `src/index.css` | Design tokens (`@theme`): colours, type scale, radius, easing. Components use only these. |
| `src/data/products.js` | The 12 products and the discovery set, with English and Spanish copy, notes, key ingredients, sizes and prices. Also builds the note index. |
| `src/data/notes.js` | Every note and fragrance family with its Spanish name |
| `src/locales/` + `src/i18n.js` | Interface strings in English and Spanish, bundled; the chosen language is kept in `localStorage` |
| `src/lib/bag.jsx` | Bag state (lines, totals, open state, droplet flight), saved to `localStorage` |
| `src/lib/tokens.js` | JS copies of the colour tokens, used for scroll-driven colour |
| `src/components/AccordScroller.jsx` | The signature section: a sticky stage that plays notes or ingredients in order while the ground colour, liquid level and vapour change with scroll |
| `src/components/ProductArt.jsx` | Drawn SVG bottles, droppers, jars, tubes and vials with a moving liquid line |
| `src/components/` (others) | Header, Footer, Wordmark, BagDrawer, Droplet, IndexList, NoteIndex, DiscoverySet, HouseBand, AddToBag, Magnetic, SplitWord, Field and small icons |
| `src/pages/` | Home, Shop, Product, Checkout, About, NotFound |
| `public/404.html` | Sends deep links back to `index.html` so client-side routes work on GitHub Pages |

## Data flow

The catalogue is a JS module bundled with the app, so there are no requests for data. Product copy is picked per language with `useLang().pick`. Adding to the bag updates the bag context, which saves to `localStorage`, starts the droplet animation from the button to the bag icon and then opens the bag. Checkout validates in the browser and clears the bag on "Place order"; nothing leaves the browser. There's no backend.

## Hosting

GitHub Pages through `.github/workflows/deploy.yml`, built with `VITE_BASE_PATH=/<repo name>/` (the repo is `essence-ecom`).

## Key decisions

- **Full rebuild as a fragrance and skincare house (2026-11-12).** The old streetwear catalogue used real brand names and their product photos; every product is now invented. The plan is in `docs/plan/`.
- **Drawn SVG products instead of stock photos.** Twelve stock shots rarely look like one set, they need licences, and a drawing lets the liquid move and drain with scroll.
- **One light-to-dark scroll instead of a dark mode.** The page itself moves from sage to bottle green, so a separate dark theme was dropped (Youssef's call).
- **Tailwind with our own tokens, no daisyUI.** daisyUI's defaults made the old site look templated.
- **Heavy motion, all of it switchable.** Framer Motion drives it; `MotionConfig reducedMotion="user"` and a CSS fallback turn it off for people who ask their system for less motion. Hover-only effects run only with a fine pointer, and Lenis only on desktop, so phones keep native scrolling.
- **Different layouts on phones where it helps:** bottom-sheet bag, sticky buy bar, accordion index rows, swipe rows for notes and vials.
- **Translations bundled** instead of fetched over HTTP, so the first paint has the right language and there is one less request.
- **BrowserRouter plus a 404 redirect** instead of HashRouter, so URLs stay clean on GitHub Pages.

## Links

- Live demo: https://youssefabotaleb20.github.io/essence-ecom/
- Portfolio (the site this demo is shown on): https://youssefabotaleb20.github.io/Portfolio/
