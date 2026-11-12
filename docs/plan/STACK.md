# Essence redo: stack

Agreed with Youssef on 2026-11-12.

| Layer | Choice | Why |
| --- | --- | --- |
| Frontend | Vite + React (rebuild in place) | Youssef knows it, it matches React work clients ask for on Fiverr/Upwork, and GitHub Pages hosting stays as it is. Astro was the faster/SEO option; not chosen. |
| Routing | React Router | Already used; works with the Pages base path. |
| Styling | Tailwind CSS 4 with our own design tokens, no daisyUI | daisyUI's defaults make it look templated; tokens keep every colour and size agreed in DESIGN.md. |
| Motion | Framer Motion + Lenis (desktop smooth scroll) | Heavy motion agreed in DESIGN.md; Lenis only runs with a mouse or trackpad. |
| i18n | i18next, English + Spanish bundled in `src/locales/` | Kept from the current site; bundling removes the extra fetch. |
| Data | Static `products.json`, 12 invented products (6 fragrance, 6 skincare) | No backend in this demo. |
| Cart | localStorage, mock checkout | Static demo; nothing can be bought. |
| Backend / DB / Auth | None | Not needed for the brief. |
| Hosting | GitHub Pages via Actions (`deploy.yml`), base path from the repo name | Free, already set up; the live URL stays https://youssefabotaleb20.github.io/essence-ecom/. |
| Repo | Existing `essence-ecom`, rebuild on a branch | Keeps the live URL and portfolio link. The repo was already renamed from `essence-ecom-`; the Mac clone's remote URL was updated to match on 2026-11-12. |
| Removed | daisyUI, animate.css, react-icons, i18next-http-backend | Replaced by our own tokens, Framer Motion and inline SVG icons. |
| Logo | Redrawn during the design phase | Youssef's call. |
