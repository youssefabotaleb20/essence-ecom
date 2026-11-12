# Essence redo: pages, sections and copy

Agreed structure with Youssef on 2026-11-12. Copy is a draft for his review. English first; Spanish is translated from this at build time. Everything about the house and its products is invented for the demo.

## Page map
| Route | Page |
| --- | --- |
| `/` | Home |
| `/shop` | Shop, filters: All, Fragrance, Skincare, and by note (`/shop?note=vetiver`) |
| `/p/:slug` | Product (fragrance or skincare layout) |
| bag drawer | Opens over any page |
| `/checkout` | Mock checkout, then confirmation |
| `/about` | The house, with contact on the same page |
| `*` | Not found |

## The range
Fragrances are eau de parfum, 50 ml or 100 ml.

| # | Name | Top | Heart | Base | Family | 50 / 100 ml |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Salt Fig | Bergamot, pink pepper | Fig leaf, sea salt | Vetiver, cedar | Green | $118 / $165 |
| 2 | Black Tea Smoke | Lemon, black tea | Birch tar, cardamom | Guaiac wood, labdanum | Woody | $124 / $172 |
| 3 | Orange Blossom Noon | Neroli, mandarin | Orange blossom, jasmine | White musk, ambrette | Floral | $112 / $158 |
| 4 | Cold Iris | Carrot seed, pink pepper | Iris, violet leaf | Suede musk, sandalwood | Powdery | $138 / $190 |
| 5 | Cardamom Milk | Cardamom, ginger | Rice, tonka bean | Sandalwood, benzoin | Warm | $118 / $165 |
| 6 | Wet Cedar | Grapefruit, juniper | Cedar, cypress | Oakmoss, ambrette | Woody | $112 / $158 |

Skincare lists its key ingredients with their amounts.

| # | Name | Size | Key ingredients | Price |
| --- | --- | --- | --- | --- |
| 7 | Gel Cleanser | 150 ml | Glycerin, panthenol 1% | $26 |
| 8 | Niacinamide Serum | 30 ml | Niacinamide 5%, zinc PCA 1% | $34 |
| 9 | Barrier Cream | 50 ml | Squalane 5%, ceramides 1% | $42 |
| 10 | Vitamin C Serum | 30 ml | Ethyl ascorbic acid 10% | $48 |
| 11 | Lactic Acid Toner | 120 ml | Lactic acid 5%, pH 3.8 | $30 |
| 12 | Mineral Sunscreen SPF 30 | 50 ml | Zinc oxide 18% | $38 |

Extra item (not one of the 12): **Discovery set**, six 2 ml vials, one of each fragrance, $28.

Images: drawn SVG bottles in each product's liquid colour (decided at build time, 2026-11-12), so no photo licences are needed.

## Home
1. **Hero (Pour), changed 2026-11-12 after Youssef found the first hero bland.** A full-width "Essence" with dark liquid filling the lower half of the screen; where the wave crosses the letters they turn fig green. Three small bottles (Orange Blossom Noon, Salt Fig, Black Tea Smoke) float on the surface, bubbles rise, and a click or tap makes a soft ripple. Line: "Fragrance and skincare with every note and every percentage on the label." Buttons: "Shop the collection", "Try all six". The liquid drains as you scroll.
   Then **Featured fragrance: Salt Fig**, the notes scroll (top, heart, base) with the light-to-dark shift.
2. **The collection (index list).** Heading "The collection". Filter: All, Fragrance, Skincare. Each row: name, notes (or key ingredient with %), size, price. Hover or tap shows a small image. Row links to the product.
3. **Shop by note.** Heading "Shop by note". Line: "Start from a note you already like." Every note in the range as plain words; each one opens the shop filtered to it.
4. **Discovery set.** Heading "Try all six". Copy: "Six 2 ml vials, one of each fragrance. Wear each one for a day before you choose a full bottle." Price $28, button "Add the discovery set".
5. **The house.** Heading "What's in the bottle". Copy: "Essence is a small fragrance and skincare house. We list every note and every percentage on the page, so you know what you're putting on your skin." Link "About the house".
6. **Footer (deep green).** Shop, About, Contact, language switch (English / Español), and "Essence is a design demo by Youssef Abotaleb. Nothing here is for sale." with a link to his portfolio.

## Product, fragrance
1. Top band (light): name, "Eau de parfum", one-line description, size picker 50 ml / 100 ml, price, "Add to bag", gallery.
2. Top notes band: "Top notes, first 15 minutes", the notes, one sentence.
3. Heart band (mid tone): "Heart, the next few hours", the notes, one sentence.
4. Base band (deep): "Base, into the evening", the notes, one sentence.
5. Wear (deep): how long it lasts and how close it sits, e.g. "Six to eight hours. Close to the skin after the first hour."
6. Full ingredient list, collapsed by default ("Show full ingredients").
7. "Pairs well with": two other products. Repeat "Add to bag" at the end.

## Product, skincare
1. Top band: name, size, one line on what it does, price, "Add to bag", gallery.
2. Key ingredients bands, light to deep: one band per ingredient with its amount and what it does, e.g. "Niacinamide 5%. Evens tone and helps with oil."
3. How to use: real steps in order (numbered, because it is a sequence).
4. Suits: skin types. Full ingredient list (INCI names), collapsed.
5. "Pairs well with": two products.

## Shop
Heading "Shop". Filter tabs All / Fragrance / Skincare, plus an active-note chip when filtered by note ("Vetiver, clear"). Image grid here (the index list is on Home). Empty filter state: "Nothing in the range has that note yet. See all twelve."

## Bag drawer
Items with image, name, size, quantity stepper, price, "Remove". Subtotal. Button "Go to checkout". Shipping line: "Shipping is calculated at checkout."
- Empty: "Your bag is empty. Not sure where to start? Try the discovery set." with "Add the discovery set".
- After adding: the bag count updates and the drawer opens with "Added to bag".

## Checkout (mock)
Steps: Contact (email), Delivery (name, address, city, country), Payment (card fields, clearly marked demo; no real input is sent anywhere).
- Note at the top: "This is a demo checkout. Nothing is charged and nothing ships."
- Button "Place order". Errors name the field and the fix, e.g. "Enter an email address, like name@example.com."
- Confirmation: "Order placed" with the order summary and "Back to the shop". Clears the bag.

## About and contact
1. "The house": a short paragraph on why every note and percentage is listed.
2. "How we make it": three short facts about the (invented) process, written plainly.
3. Contact: form (name, email, message) with button "Send message", then "Message sent. This is a demo, so it went nowhere." Plus the demo notice.

## Not found
"This page doesn't exist. It may have moved when the range changed." Button "Go to the shop".
