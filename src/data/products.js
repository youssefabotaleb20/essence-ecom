// The Essence range. Invented for the demo: no real brand, product or claim.
// Prices are USD. Colours are the liquid inside, used by ProductArt and the page tint.

const FRAGRANCE_INCI = 'Alcohol denat., parfum (fragrance), aqua (water), limonene, linalool, citral, geraniol, coumarin.';

export const products = [
  {
    slug: 'salt-fig', type: 'fragrance', name: 'Salt Fig', family: 'green',
    liquid: '#B9C49A', shape: 'round',
    sizes: [{ ml: 50, price: 118 }, { ml: 100, price: 165 }],
    line: { en: 'Green fig and sea air over dry vetiver.', es: 'Higo verde y aire de mar sobre vetiver seco.' },
    notes: { top: ['bergamot', 'pinkPepper'], heart: ['figLeaf', 'seaSalt'], base: ['vetiver', 'cedar'] },
    say: {
      top: { en: 'Bright and a little sharp when it first goes on.', es: 'Luminoso y algo punzante al aplicarlo.' },
      heart: { en: 'The green, milky part of the fig, with a dry salt edge.', es: 'La parte verde y lechosa del higo, con un borde de sal seca.' },
      base: { en: 'Smoky roots and pencil wood. This is what stays on a jumper the next day.', es: 'Raíces ahumadas y madera de lápiz. Es lo que queda en el jersey al día siguiente.' },
    },
    wear: { hours: '6–8', en: 'Close to the skin after the first hour.', es: 'Cerca de la piel después de la primera hora.' },
    inci: FRAGRANCE_INCI, pairs: ['wet-cedar', 'barrier-cream'],
  },
  {
    slug: 'black-tea-smoke', type: 'fragrance', name: 'Black Tea Smoke', family: 'woody',
    liquid: '#7A5338', shape: 'square',
    sizes: [{ ml: 50, price: 124 }, { ml: 100, price: 172 }],
    line: { en: 'Strong tea, a struck match and warm resin.', es: 'Té fuerte, una cerilla recién encendida y resina cálida.' },
    notes: { top: ['lemon', 'blackTea'], heart: ['birchTar', 'cardamom'], base: ['guaiac', 'labdanum'] },
    say: {
      top: { en: 'A cup of strong black tea with a squeeze of lemon.', es: 'Una taza de té negro fuerte con un chorro de limón.' },
      heart: { en: 'Birch tar brings the smoke; cardamom keeps it from getting heavy.', es: 'La brea de abedul trae el humo; el cardamomo evita que pese.' },
      base: { en: 'Dark, sweet resin that reads like leather by the evening.', es: 'Resina oscura y dulce que, por la noche, recuerda al cuero.' },
    },
    wear: { hours: '8–10', en: 'Noticeable for the first three hours. One spray is enough.', es: 'Se nota durante las primeras tres horas. Con una pulverización basta.' },
    inci: FRAGRANCE_INCI, pairs: ['cardamom-milk', 'gel-cleanser'],
  },
  {
    slug: 'orange-blossom-noon', type: 'fragrance', name: 'Orange Blossom Noon', family: 'floral',
    liquid: '#E7C57A', shape: 'tall',
    sizes: [{ ml: 50, price: 112 }, { ml: 100, price: 158 }],
    line: { en: 'Orange blossom in full sun, clean and a little honeyed.', es: 'Azahar a pleno sol, limpio y algo meloso.' },
    notes: { top: ['neroli', 'mandarin'], heart: ['orangeBlossom', 'jasmine'], base: ['whiteMusk', 'ambrette'] },
    say: {
      top: { en: 'Juicy mandarin and the green, bitter side of neroli.', es: 'Mandarina jugosa y el lado verde y amargo del neroli.' },
      heart: { en: 'The flower itself: white, waxy, a little honeyed.', es: 'La flor misma: blanca, cerosa, algo melosa.' },
      base: { en: 'Soft musk, like skin warmed by the sun.', es: 'Almizcle suave, como piel calentada por el sol.' },
    },
    wear: { hours: '5–7', en: 'Light and close. Good for daytime and hot weather.', es: 'Ligero y cercano. Ideal de día y con calor.' },
    inci: FRAGRANCE_INCI, pairs: ['cold-iris', 'mineral-sunscreen'],
  },
  {
    slug: 'cold-iris', type: 'fragrance', name: 'Cold Iris', family: 'powdery',
    liquid: '#C8C3D4', shape: 'round',
    sizes: [{ ml: 50, price: 138 }, { ml: 100, price: 190 }],
    line: { en: 'Iris root, cool and earthy, finished in soft suede.', es: 'Raíz de iris, fresca y terrosa, con un final de ante suave.' },
    notes: { top: ['carrotSeed', 'pinkPepper'], heart: ['iris', 'violetLeaf'], base: ['suedeMusk', 'sandalwood'] },
    say: {
      top: { en: 'Earthy carrot seed, which is how real iris root smells at first.', es: 'Semilla de zanahoria terrosa, que es como huele al principio la raíz de iris.' },
      heart: { en: 'Powdery iris and the green snap of violet leaf.', es: 'Iris atalcado y el toque verde de la hoja de violeta.' },
      base: { en: 'Suede and creamy sandalwood. Quiet, but it lasts.', es: 'Ante y sándalo cremoso. Discreto, pero dura.' },
    },
    wear: { hours: '7–9', en: 'Sits close all day; people notice it when they lean in.', es: 'Se queda cerca todo el día; se nota al acercarse.' },
    inci: FRAGRANCE_INCI, pairs: ['salt-fig', 'niacinamide-serum'],
  },
  {
    slug: 'cardamom-milk', type: 'fragrance', name: 'Cardamom Milk', family: 'warm',
    liquid: '#E3CFAE', shape: 'square',
    sizes: [{ ml: 50, price: 118 }, { ml: 100, price: 165 }],
    line: { en: 'Spiced rice pudding, without the sugar overload.', es: 'Arroz con leche especiado, sin exceso de azúcar.' },
    notes: { top: ['cardamom', 'ginger'], heart: ['rice', 'tonka'], base: ['sandalwood', 'benzoin'] },
    say: {
      top: { en: 'Fresh cardamom pods and a bite of ginger.', es: 'Vainas de cardamomo frescas y un toque de jengibre.' },
      heart: { en: 'Steamed rice and tonka: creamy, nutty, comforting.', es: 'Arroz al vapor y tonka: cremoso, a fruto seco, reconfortante.' },
      base: { en: 'Benzoin adds a vanilla warmth that stays on wool scarves.', es: 'El benjuí aporta una calidez de vainilla que se queda en las bufandas.' },
    },
    wear: { hours: '8–10', en: 'Warm and steady. Best in cooler weather.', es: 'Cálido y constante. Mejor con frío.' },
    inci: FRAGRANCE_INCI, pairs: ['black-tea-smoke', 'barrier-cream'],
  },
  {
    slug: 'wet-cedar', type: 'fragrance', name: 'Wet Cedar', family: 'woody',
    liquid: '#93A88D', shape: 'tall',
    sizes: [{ ml: 50, price: 112 }, { ml: 100, price: 158 }],
    line: { en: 'A cedar forest after rain, with grapefruit to wake it up.', es: 'Un bosque de cedros después de la lluvia, con pomelo para despertarlo.' },
    notes: { top: ['grapefruit', 'juniper'], heart: ['cedar', 'cypress'], base: ['oakmoss', 'ambrette'] },
    say: {
      top: { en: 'Grapefruit peel and crushed juniper berries.', es: 'Piel de pomelo y bayas de enebro machacadas.' },
      heart: { en: 'Wet bark and cypress needles.', es: 'Corteza mojada y agujas de ciprés.' },
      base: { en: 'Damp moss and a soft, musky ambrette.', es: 'Musgo húmedo y una ambreta suave y almizclada.' },
    },
    wear: { hours: '6–8', en: 'Fresh for the first hours, then green and woody.', es: 'Fresco las primeras horas, luego verde y amaderado.' },
    inci: FRAGRANCE_INCI, pairs: ['salt-fig', 'lactic-acid-toner'],
  },
  {
    slug: 'gel-cleanser', type: 'skincare', name: 'Gel Cleanser', liquid: '#D6E2DA', shape: 'tube',
    sizes: [{ ml: 150, price: 26 }],
    line: { en: 'A low-foam gel that cleans without leaving skin tight.', es: 'Un gel de poca espuma que limpia sin dejar la piel tirante.' },
    key: [
      { name: { en: 'Glycerin', es: 'Glicerina' }, amount: '', does: { en: 'Holds water in the skin while you wash.', es: 'Retiene agua en la piel mientras te lavas.' } },
      { name: { en: 'Panthenol', es: 'Pantenol' }, amount: '1%', does: { en: 'Calms and softens after cleansing.', es: 'Calma y suaviza después de la limpieza.' } },
    ],
    use: { en: ['Wet your face with lukewarm water.', 'Massage a small amount in for 30 seconds.', 'Rinse and pat dry.'], es: ['Moja la cara con agua tibia.', 'Masajea una pequeña cantidad durante 30 segundos.', 'Aclara y seca con toques suaves.'] },
    suits: { en: 'All skin types, including sensitive.', es: 'Todo tipo de piel, incluida la sensible.' },
    inci: 'Aqua (water), glycerin, coco-glucoside, sodium cocoyl glutamate, panthenol, xanthan gum, citric acid, sodium benzoate, potassium sorbate.',
    pairs: ['niacinamide-serum', 'barrier-cream'],
  },
  {
    slug: 'niacinamide-serum', type: 'skincare', name: 'Niacinamide Serum', liquid: '#EDEEE6', shape: 'dropper',
    sizes: [{ ml: 30, price: 34 }],
    line: { en: 'A light water serum for uneven tone and oily patches.', es: 'Un sérum acuoso y ligero para el tono irregular y las zonas grasas.' },
    key: [
      { name: { en: 'Niacinamide', es: 'Niacinamida' }, amount: '5%', does: { en: 'Evens tone and helps with oil.', es: 'Unifica el tono y ayuda con el exceso de grasa.' } },
      { name: { en: 'Zinc PCA', es: 'Zinc PCA' }, amount: '1%', does: { en: 'Keeps shine down through the day.', es: 'Reduce los brillos durante el día.' } },
    ],
    use: { en: ['After cleansing, put 3 drops on your fingertips.', 'Press into the face and neck.', 'Follow with a moisturiser.'], es: ['Después de limpiar, pon 3 gotas en las yemas de los dedos.', 'Presiona sobre la cara y el cuello.', 'Aplica después una crema hidratante.'] },
    suits: { en: 'Oily, combination and uneven skin.', es: 'Piel grasa, mixta e irregular.' },
    inci: 'Aqua (water), niacinamide, pentylene glycol, zinc PCA, tamarindus indica seed gum, xanthan gum, phenoxyethanol, ethylhexylglycerin.',
    pairs: ['gel-cleanser', 'vitamin-c-serum'],
  },
  {
    slug: 'barrier-cream', type: 'skincare', name: 'Barrier Cream', liquid: '#F1EEE6', shape: 'jar',
    sizes: [{ ml: 50, price: 42 }],
    line: { en: 'A rich cream for dry or stripped skin.', es: 'Una crema rica para piel seca o castigada.' },
    key: [
      { name: { en: 'Squalane', es: 'Escualano' }, amount: '5%', does: { en: 'Replaces lost oils without feeling greasy.', es: 'Repone los aceites perdidos sin sensación grasa.' } },
      { name: { en: 'Ceramides', es: 'Ceramidas' }, amount: '1%', does: { en: 'Help rebuild the skin barrier.', es: 'Ayudan a reconstruir la barrera cutánea.' } },
    ],
    use: { en: ['Warm a pea-sized amount between your fingers.', 'Smooth over the face as the last step at night.'], es: ['Calienta una cantidad del tamaño de un guisante entre los dedos.', 'Extiende sobre la cara como último paso por la noche.'] },
    suits: { en: 'Dry, tight or over-exfoliated skin.', es: 'Piel seca, tirante o sobreexfoliada.' },
    inci: 'Aqua (water), squalane, glycerin, cetearyl alcohol, ceramide NP, ceramide AP, ceramide EOP, phytosphingosine, cholesterol, sodium lauroyl lactylate, carbomer, phenoxyethanol.',
    pairs: ['gel-cleanser', 'lactic-acid-toner'],
  },
  {
    slug: 'vitamin-c-serum', type: 'skincare', name: 'Vitamin C Serum', liquid: '#E3AC4E', shape: 'dropper',
    sizes: [{ ml: 30, price: 48 }],
    line: { en: 'A stable vitamin C for dull skin, in an amber bottle.', es: 'Una vitamina C estable para la piel apagada, en frasco ámbar.' },
    key: [
      { name: { en: 'Ethyl ascorbic acid', es: 'Ácido etil ascórbico' }, amount: '10%', does: { en: 'Brightens and fades dark marks over weeks.', es: 'Ilumina y atenúa las manchas con las semanas.' } },
      { name: { en: 'Vitamin E', es: 'Vitamina E' }, amount: '0.5%', does: { en: 'Helps the vitamin C stay stable.', es: 'Ayuda a que la vitamina C se mantenga estable.' } },
    ],
    use: { en: ['Use in the morning after cleansing.', 'Apply 4 drops to the face.', 'Finish with sunscreen.'], es: ['Úsalo por la mañana después de limpiar.', 'Aplica 4 gotas en la cara.', 'Termina con protector solar.'] },
    suits: { en: 'Dull skin and dark marks.', es: 'Piel apagada y manchas.' },
    inci: 'Aqua (water), 3-O-ethyl ascorbic acid, propanediol, glycerin, tocopherol, hydroxyethylcellulose, sodium citrate, phenoxyethanol.',
    pairs: ['mineral-sunscreen', 'niacinamide-serum'],
  },
  {
    slug: 'lactic-acid-toner', type: 'skincare', name: 'Lactic Acid Toner', liquid: '#DCE5E8', shape: 'tall',
    sizes: [{ ml: 120, price: 30 }],
    line: { en: 'A gentle acid toner for smoother texture.', es: 'Un tónico ácido suave para una textura más lisa.' },
    key: [
      { name: { en: 'Lactic acid', es: 'Ácido láctico' }, amount: '5%', does: { en: 'Loosens dead skin for a smoother surface.', es: 'Desprende las células muertas para una superficie más lisa.' } },
      { name: { en: 'pH', es: 'pH' }, amount: '3.8', does: { en: 'Low enough to work, gentle enough for most skin.', es: 'Lo bastante bajo para funcionar y suave para la mayoría de pieles.' } },
    ],
    use: { en: ['Use at night, three times a week to start.', 'Sweep over clean skin with a cotton pad.', 'Wear sunscreen the next day.'], es: ['Úsalo por la noche, tres veces por semana al principio.', 'Pásalo por la piel limpia con un disco de algodón.', 'Usa protector solar al día siguiente.'] },
    suits: { en: 'Rough or congested skin. Not for broken skin.', es: 'Piel áspera o congestionada. No apto para piel dañada.' },
    inci: 'Aqua (water), lactic acid, sodium lactate, glycerin, betaine, allantoin, sodium hydroxide, phenoxyethanol.',
    pairs: ['barrier-cream', 'gel-cleanser'],
  },
  {
    slug: 'mineral-sunscreen', type: 'skincare', name: 'Mineral Sunscreen SPF 30', liquid: '#F3F0EA', shape: 'tube',
    sizes: [{ ml: 50, price: 38 }],
    line: { en: 'A zinc sunscreen that rubs in clear on most skin tones.', es: 'Un protector de zinc que se absorbe sin dejar rastro en la mayoría de tonos de piel.' },
    key: [
      { name: { en: 'Zinc oxide', es: 'Óxido de zinc' }, amount: '18%', does: { en: 'Blocks UVA and UVB without chemical filters.', es: 'Bloquea UVA y UVB sin filtros químicos.' } },
    ],
    use: { en: ['Apply as the last step in the morning.', 'Use two finger-lengths for the face and neck.', 'Reapply every two hours in the sun.'], es: ['Aplícalo como último paso por la mañana.', 'Usa dos dedos de producto para la cara y el cuello.', 'Vuelve a aplicarlo cada dos horas al sol.'] },
    suits: { en: 'All skin types.', es: 'Todo tipo de piel.' },
    inci: 'Zinc oxide, aqua (water), caprylic/capric triglyceride, coco-caprylate, polyglyceryl-3 polyricinoleate, glycerin, magnesium sulfate, tocopherol.',
    pairs: ['vitamin-c-serum', 'gel-cleanser'],
  },
];

export const discoverySet = {
  slug: 'discovery-set', type: 'set', name: 'Discovery set', liquid: '#D49A4A', shape: 'vial',
  sizes: [{ ml: 12, price: 28 }],
  line: { en: 'Six 2 ml vials, one of each fragrance.', es: 'Seis viales de 2 ml, uno de cada fragancia.' },
};

export const allItems = [...products, discoverySet];
export const bySlug = (slug) => allItems.find((p) => p.slug === slug);
export const fragrances = products.filter((p) => p.type === 'fragrance');
export const skincare = products.filter((p) => p.type === 'skincare');

/** Every note used by any fragrance, in first-seen order, with the products that have it. */
export const noteIndex = (() => {
  const map = new Map();
  for (const p of fragrances) {
    for (const stage of ['top', 'heart', 'base']) {
      for (const n of p.notes[stage]) {
        if (!map.has(n)) map.set(n, []);
        if (!map.get(n).includes(p.slug)) map.get(n).push(p.slug);
      }
    }
  }
  return map;
})();

export const priceFrom = (p) => Math.min(...p.sizes.map((s) => s.price));
