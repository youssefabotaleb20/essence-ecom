# Essence

A responsive e-commerce storefront in English and Spanish, built as a front-end concept for [Youssef Abotaleb's portfolio](https://youssefabotaleb20.github.io/Portfolio/). It isn't a real shop: nothing can be bought.

**Live demo:** https://youssefabotaleb20.github.io/essence-ecom/

## Stack

React 19, Vite 6, Tailwind CSS 4 with daisyUI, React Router 7, Framer Motion, react-icons.

## Features

- Home, store (all, men, women), product, cart, about and contact pages
- English and Spanish, with the translations in `public/locales/`
- Cart kept in `localStorage`
- Search bar and product modal

## Run locally

```bash
npm ci
npm run dev        # http://localhost:5173
```

## Environment variables

| Name | Where | Purpose |
| --- | --- | --- |
| `VITE_BASE_PATH` | build only | Base path for GitHub Pages. The deploy workflow sets it to `/essence-ecom/`; locally it defaults to `/`. |

## Deploy

Every push to `main` builds the site and deploys it to GitHub Pages through `.github/workflows/deploy.yml`.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how it fits together.
