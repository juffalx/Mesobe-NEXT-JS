import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, getDish, getDishes, slugify } from '../../../data/dishes';

export const dynamicParams = false;

export async function generateStaticParams() {
  const dishes = await getDishes();
  const dishIds = dishes.map((dish) => ({ id: dish.id }));
  const categoryIds = CATEGORIES.map((category) => ({ id: slugify(category) }));
  return [...dishIds, ...categoryIds];
}

export default async function MenuSegmentPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (dish) {
    return (
      <article>
        <Link href="/menu">Back to menu</Link>
        <h1 className="mt-2 text-2xl font-bold">{dish.name}</h1>
        <p>{dish.category}</p>
        <p className="font-bold">{dish.price} ETB</p>
      </article>
    );
  }

  const category = CATEGORIES.find((name) => slugify(name) === id);

  if (!category) notFound();

  const dishes = await getDishes();
  const categoryDishes = dishes.filter((d) => d.category === category);

  return (
    <article>
      <Link href="/menu">Back to menu</Link>
      <h1 className="mt-2 mb-4 text-2xl font-bold">{category}</h1>
      <ul className="grid gap-2">
        {categoryDishes.map((d) => (
          <li key={d.id} className="flex justify-between rounded border p-3">
            <Link href={`/menu/${d.id}`} className="font-bold">
              {d.name}
            </Link>
            <span>{d.price} ETB</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
