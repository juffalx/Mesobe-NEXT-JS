import { notFound } from 'next/navigation';
import RoyalDish from '@/component/RoyalDish/RoyalDish';
import { getDish, getDishes } from '@/lib/menu';

export const dynamicParams = false;

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: dish.id }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) notFound();

  return <RoyalDish dish={dish} />;
}
