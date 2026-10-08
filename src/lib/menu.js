import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { DISHES } from './fallbackDishes';

const CAT_MAP = {
  stews: 'wat',
  wat: 'wat',
  traditional: 'wat',
  tibs: 'tibs',
  grills: 'tibs',
  raw: 'tibs',
  cured: 'tibs',
  kitfo: 'tibs',
  fasting: 'fasting',
  tsom: 'fasting',
  vegan: 'fasting',
  breakfast: 'bites',
  bites: 'bites',
  drinks: 'drinks',
  beverages: 'drinks',
  extras: 'extras',
  injera: 'extras',
};

const normalize = (raw) => ({
  forImg: raw.id,
  id: raw.slug || raw.id,
  name: raw.nameEn || raw.name || raw.slug || 'Unnamed dish',
  price: Number(raw.priceETB ?? raw.price ?? 0),
  cat:
    Object.entries(CAT_MAP).find(([key]) =>
      String(raw.category || '')
        .toLowerCase()
        .includes(key)
    )?.[1] || 'wat',
  tag: raw.tag || '',
  tagline: raw.tagline || '',
  spice: raw.spiceLevel || raw.spice || '1/5',
  desc: raw.description || raw.desc || '',
  servings: raw.servings || '',
  isFasting: Boolean(raw.isFasting),
  amName: raw.nameAm || 'no amharic name',
});

export async function getDishes() {
  try {
    const file = path.join(process.cwd(), 'public', 'menu.json');
    const menu = JSON.parse(await readFile(file, 'utf8'));
    const list = menu.data || menu.menu || menu.dishes || [];
    if (list.length > 0) return list.map(normalize);
  } catch {}
  return DISHES.map((dish) => ({
    ...dish,
    forImg: dish.forImg || dish.id,
    amName: dish.amName || 'no amharic name',
  }));
}

export async function getDish(id) {
  const dishes = await getDishes();
  return dishes.find((dish) => dish.id === id) || null;
}
