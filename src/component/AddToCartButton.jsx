'use client'

import { useCart } from '../cart/CartContext'

export default function AddToCartButton({ dish }) {
  const { addItem } = useCart()

  return (
    <button
      onClick={() => addItem(dish)}
      className="rounded bg-yellow-400 px-3 py-1"
    >
      Add
    </button>
  )
}
