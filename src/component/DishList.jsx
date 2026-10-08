import Link from 'next/link'
import AddToCartButton from './AddToCartButton'
import { slugify } from '../data/dishes'

export default function DishList({ dishes }) {
  return (
    <ul className="grid gap-2">
      {dishes.map((dish) => (
        <li
          key={dish.id}
          data-category={slugify(dish.category)}
          className="dish-item flex items-center justify-between gap-3 rounded border p-3"
        >
          <Link href={`/menu/${dish.id}`} className="flex-1 font-bold">
            {dish.name}
          </Link>
          <span>{dish.price} ETB</span>
          <AddToCartButton dish={dish} />
        </li>
      ))}
    </ul>
  )
}
