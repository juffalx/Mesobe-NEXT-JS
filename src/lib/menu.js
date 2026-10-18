import 'server-only';
import { access, readFile } from 'node:fs/promises';
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

const PHOTOS = {
  'doro-wat': 'menu-1',
  'siga-derek-tibs': 'menu-6',
  'shiro-tegamino': 'menu-2',
  kitfo: 'menu-4',
  beyainatu: 'menu-3',
  'misir-wat': 'menu-14',
  'gomen-besiga': 'menu-8',
  firfir: 'menu-17',
  chechebsa: 'menu-9',
  'ful-medames': 'menu-15',
  tej: 'menu-19',
  'je-buna': 'menu-5',
  'injera-3': 'menu-7',
  ayib: 'menu-20',
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

async function loadDishes() {
  try {
    const file = path.join(process.cwd(), 'public', 'menu.json');
    const menu = JSON.parse(await readFile(file, 'utf8'));
    const list = menu.data || menu.menu || menu.dishes || [];
    if (list.length > 0) return list.map(normalize);
  } catch {}
  return DISHES.map((dish) => ({
    ...dish,
    forImg: dish.forImg || PHOTOS[dish.id] || dish.id,
    amName: dish.amName || 'no amharic name',
  }));
}
const hasPhoto = (name) =>
  access(path.join(process.cwd(), 'public', 'asset', `${name}.jpg`)).then(
    () => true,
    () => false
  );

export async function getDishes() {
  const dishes = await loadDishes();
  return Promise.all(
    dishes.map(async (dish) => ({
      ...dish,
      forImg: (await hasPhoto(dish.forImg)) ? dish.forImg : 'empty-mesob',
    }))
  );
}
export async function getDish(id) {
  const dishes = await getDishes();
  return dishes.find((dish) => dish.id === id) || null;
}
