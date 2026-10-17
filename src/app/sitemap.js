import { getDishes } from '@/lib/menu';
import { SITE_URL } from '@/lib/site';

export default async function sitemap() {
  const dishes = await getDishes();

  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/menu`, priority: 0.8 },
    ...dishes.map((dish) => ({
      url: `${SITE_URL}/menu/${dish.id}`,
      priority: 0.6,
    })),
  ];
}
