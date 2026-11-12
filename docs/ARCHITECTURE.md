# Essence architecture

## Components

| Part | What it does |
| --- | --- |
| `src/main.jsx` | `BrowserRouter` with `basename` set to Vite's base path |
| `src/App.jsx` | Routes: `/`, `/store`, `/store/:target`, `/product/:id`, `/about`, `/contact`, `/cart`, and a 404 page |
| `src/context/LogicContext.jsx` | Shared state: language, products, search, cart helpers, toast messages |
| `src/i18n.jsx` + `public/locales/` | English and Spanish strings |
| `src/components/` | One file per page or widget (Header, Footer, Store, Product, Cart, About and so on) |
| `public/products.json` | The product catalogue |
| `public/404.html` | Sends deep links back to `index.html` so client-side routes work on GitHub Pages |

## Data flow

The catalogue is fetched once from `products.json` in the site's own folder. The cart is stored in `localStorage`. There's no backend.

## Hosting

GitHub Pages through `.github/workflows/deploy.yml`, built with `VITE_BASE_PATH=/essence-ecom/`.

## Key decisions

- **BrowserRouter plus a 404 redirect** instead of HashRouter, so URLs stay clean. GitHub Pages serves `404.html` for unknown paths, which saves the path and loads the app, and the app then restores the route.
- **A static JSON catalogue** keeps hosting free and the demo self-contained.
- **The About page button links to the portfolio** (it used to go to Linktree).

## Links

- Live demo: https://youssefabotaleb20.github.io/essence-ecom/
- Portfolio (the site this demo is shown on): https://youssefabotaleb20.github.io/Portfolio/
- Every "View my portfolio" or "Built by Youssef Abotaleb" link in the demo points to the portfolio. There are no Linktree links any more (changed 2026-11-12).
