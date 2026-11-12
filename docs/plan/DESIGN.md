# Essence redo: design

Agreed with Youssef on 2026-11-12. Preview: https://claude.ai/artifact/LfNwZj2AEVA9JNHpkuwc8Z

## The idea: Accord
A scent's structure is the layout. Every fragrance page scrolls through its top, heart and base notes in order, and the page moves from light sage to deep bottle green as it goes, the way the scent gets deeper on skin. Skincare uses the same structure for its key ingredients and their amounts. This light-to-dark scroll is the one bold thing; everything else stays quiet and precise.

## Palette (one system, light into dark)
| Role | Hex | Use |
| --- | --- | --- |
| bg | #E4E9E4 | Page ground (sage glass) |
| surface | #F1F4F1 | Raised areas, product top band, inputs |
| mid | #B9C4BC | Heart-notes band, transitions |
| ink | #1E2B25 | Text on light (bottle green) |
| muted | #66756C | Secondary text on light (#4F5D55 for small text) |
| accent | #8F5416 | Amber: buttons, links and labels on light |
| deep | #1F3029 | Bottle ground: base-notes bands, footer |
| deep-surface | #283B33 | Raised areas on deep |
| deep-ink | #E8ECE6 | Text on deep |
| deep-muted | #A9B7AE | Secondary text on deep |
| deep-accent | #D49A4A | Amber on deep |
| fig | #B9C49A | Hero letters under the liquid |
| line | #CDD3CD | Hairlines and borders on light |
States (to confirm contrast in the build): success #2F6B4A, error #A3322A, focus ring = accent (deep-accent on deep).

No dark mode (Youssef's call); the light-to-dark scroll does that job.

## Type
- Headings and UI: **Mona Sans**. Headings at width 75%, weight 400-500, tracking about -2%. Buttons and labels at width 100%, weight 500.
- Body: **Newsreader**, 400, with an italic for occasional notes. Line height 1.55-1.6, measure about 60-65ch.
- Sentence case everywhere; no all-caps labels.
- Scale (px): 13, 15, 17 (body), 20, 26, 34, 44, 60, 76.

## Shape and space
- Radius: 3px on buttons and inputs, 6px on the rare card, 0 on full-width bands.
- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Borders by role only; no shadow on every card.

## Motion
Heavy, by Youssef's call on 2026-11-12 ("heavy and creative, well used"). Every effect is tied to the scent idea or to an action:
- **Wordmark intro:** on the first visit the wordmark condenses from wide to narrow (Mona Sans width axis) and the drop falls into place.
- **Pour hero:** the screen fills with dark liquid behind a full-width "Essence"; letters under the wave turn fig green, small bottles float and tilt with the surface, bubbles rise, the pointer or a tap makes ripples, and scrolling drains it.
- **Name reveal:** product and page names condense letter by letter out of a blur, from wide to narrow.
- **Accord scroll (the signature):** a sticky stage where the ground moves sage to mid to bottle green, the notes play top, heart, base, each condensing out of a blur, the liquid level drops, and vapour drifts up from the bottle.
- **Collection index:** on desktop a bottle preview follows the cursor and the row name widens on hover; on phones each row opens as an accordion with the bottle.
- **Shop by note:** desktop words sharpen and widen on hover; phones get two drifting rows to swipe.
- **Discovery set:** six vials fan out from one stack as the section scrolls in; phones get a swipeable row.
- **House band:** the sentence reads itself in word by word with scroll.
- **Add to bag:** a drop of that product's liquid arcs into the bag icon, the badge bumps, then the bag opens.
- **Route change:** a deep-green veil rises over the old page and lifts off the new one.
- **Small touches:** magnetic buttons on desktop, smooth wheel scrolling (Lenis) on desktop only, header hides on scroll down.
- Phones: bag is a bottom sheet you can drag down, product pages get a sticky buy bar, menu opens as a circle wipe.
- prefers-reduced-motion turns all of it off and shows the static layout.

## Logo
Redrawn wordmark: "Essence" in Mona Sans at its narrowest width, followed by an amber drop (`src/components/Wordmark.jsx`).

## Product images
Drawn SVG bottles, droppers, jars and tubes in each product's liquid colour (`src/components/ProductArt.jsx`) instead of stock photos, so the twelve read as one set, need no licences, and the liquid can move.

## Avoid
Cream + gold "luxury perfume" look, all-caps eyebrows, numbered markers, fade-up on every section, identical rounded cards with shadows.
