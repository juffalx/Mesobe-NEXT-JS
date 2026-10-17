import { notFound } from 'next/navigation';
import RoyalDish from '@/component/RoyalDish/RoyalDish';
import { getDish, getDishes } from '@/lib/menu';

export const dynamicParams = false;

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: dish.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) return { title: 'Dish not found' };

  const description = `${dish.name}, ${dish.price} ETB. ${dish.desc}`;

  return {
    title: dish.name,
    description,
    alternates: { canonical: `/menu/${dish.id}` },
    openGraph: {
      title: `${dish.name} · Mesob House`,
      description,
      url: `/menu/${dish.id}`,
      siteName: 'Mesob House',
      locale: 'en_ET',
      type: 'website',
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) notFound();

  return <RoyalDish dish={dish} />;
}
