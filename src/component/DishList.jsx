import Link from 'next/link'
import { getDishes } from '../data/dishes'

export default async function DishList() {
  const dishes = await getDishes()

  return (
    <ul className="grid gap-2">
      {dishes.map((dish) => (
        <li key={dish.id} className="flex justify-between rounded border p-3">
          <Link href={`/menu/${dish.id}`} className="font-bold">
            {dish.name}
          </Link>
          <span>{dish.price} ETB</span>
        </li>
      ))}
    </ul>
  )
}
