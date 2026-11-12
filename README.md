# Essence

A storefront for Essence, an invented fragrance and skincare house, built as a front-end demo for [Youssef Abotaleb's portfolio](https://youssefabotaleb20.github.io/Portfolio/). Every fragrance page scrolls through its top, heart and base notes, and the page moves from sage to bottle green as the scent gets deeper. Nothing can really be bought: the brand, the products and the checkout are all made up.

**Live demo:** https://youssefabotaleb20.github.io/essence-ecom/

## Stack

React 19, Vite 6, Tailwind CSS 4 (our own design tokens, no component library), Framer Motion, Lenis (smooth wheel scrolling on desktop), React Router 7, i18next.

## Features

- Home with the Salt Fig notes scroll, the collection as an index list, shop by note, the discovery set and the house story
- Shop with fragrance, skincare and note filters (`/shop?type=skincare`, `/shop?note=vetiver`)
- Product pages: fragrances scroll through their notes, skincare through its key ingredients and their amounts
- 12 products plus a discovery set, drawn as SVG bottles in each product's liquid colour
- Bag (side panel on desktop, draggable bottom sheet on phones), kept in `localStorage`
- Mock checkout with field validation and an order confirmation
- About page with a mock contact form
- English and Spanish
- Heavy motion that turns off with the system's reduced-motion setting

## Run locally

```bash
npm ci
npm run dev        # http://localhost:5173
npm run lint
npm run build
```

## Environment variables

| Name | Where | Purpose |
| --- | --- | --- |
| `VITE_BASE_PATH` | build only | Base path for GitHub Pages. The deploy workflow sets it to `/<repo name>/`; locally it defaults to `/`. |

## Deploy

Every push to `main` builds the site and deploys it to GitHub Pages through `.github/workflows/deploy.yml`.

## Docs

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): how it fits together and why
- [docs/plan/](docs/plan/): the brief, stack, design, pages and components agreed before the build
