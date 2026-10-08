export const CATEGORIES = ['Breakfast', 'Main Dishes', 'Drinks']

export function slugify(text) {
  return text.toLowerCase().trim().replace(/\s+/g, '-')
}

export const dishes = [
  { id: 'firfir', name: 'Injera Firfir', category: 'Breakfast', price: 180 },
  { id: 'chechebsa', name: 'Chechebsa', category: 'Breakfast', price: 150 },
  { id: 'doro-wat', name: 'Doro Wat', category: 'Main Dishes', price: 650 },
  { id: 'kitfo', name: 'Kitfo', category: 'Main Dishes', price: 520 },
  { id: 'shiro', name: 'Shiro', category: 'Main Dishes', price: 220 },
  { id: 'tej', name: 'Tej', category: 'Drinks', price: 120 },
  { id: 'buna', name: 'Buna', category: 'Drinks', price: 60 },
]

export async function getDishes() {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return dishes
}

export async function getDish(id) {
  return dishes.find((dish) => dish.id === id)
}
