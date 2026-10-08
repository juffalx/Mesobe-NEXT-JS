'use client'

import { useCart } from '../cart/CartContext'

export default function CartList() {
  const { items, remove, clear } = useCart()
  const total = items.reduce((sum, item) => sum + item.price, 0)

  if (items.length === 0) {
    return <p className="my-2">Your cart is empty.</p>
  }

  return (
    <div>
      <ul className="my-2 grid gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between gap-3">
            <span>
              {item.name} - {item.price} ETB
            </span>
            <button onClick={() => remove(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <p className="font-bold">Total: {total} ETB</p>
      <button onClick={clear} className="mt-2 rounded bg-yellow-400 px-3 py-1">
        Clear cart
      </button>
    </div>
  )
}
