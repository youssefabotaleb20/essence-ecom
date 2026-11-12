# Essence redo: components

All custom (Tailwind with the DESIGN.md tokens; no component library).

| Component | Behaviour |
| --- | --- |
| Header | Wordmark, Shop, About, bag button with count, language switch. Sticky; on deep bands it switches to the deep colours. Mobile: menu sheet. |
| NoteBand | Full-width band with stage label, notes and one sentence. Takes a tone (light, mid, deep) so the page steps from light to dark. Also used for skincare ingredients. |
| IndexRow | Collection list row: name, notes or key ingredient, size, price. Shows a small image on hover (desktop) or tap (touch). Whole row is the link. |
| FilterTabs | All / Fragrance / Skincare, synced to the URL. Keyboard reachable. |
| NoteChip / NoteIndex | Notes as words; a chip shows the active note filter with "clear". |
| ProductCard | Shop grid item: image, name, short line, price. |
| Gallery | 2-3 images, swipe on touch, arrows and thumbnails on desktop. |
| SizePicker | 50 ml / 100 ml radio group; price updates. |
| QtyStepper | Minus, count, plus; limits 1-10. |
| AddToBag | Button that adds, updates the count and opens the drawer with "Added to bag". |
| BagDrawer | Side sheet; focus trapped; Esc closes; empty state as in SCREENS.md. |
| Disclosure | "Show full ingredients" expand/collapse. |
| CheckoutForm | Fields with inline errors, demo payment fields, confirmation view. |
| ContactForm | Name, email, message; mock send. |
| LanguageSwitch | English / Español, remembered in localStorage. |
| Footer | Deep band, links, demo notice, portfolio link. |
| Wordmark | Redrawn "Essence" logo in Mona Sans at narrow width, as inline SVG. |
