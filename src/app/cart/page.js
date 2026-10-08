'use client'

import { useState } from 'react'
import { dishes } from '../../data/dishes'

export default function CartPage() {
  const [items, setItems] = useState([])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Cart</h1>
      {items.length === 0 && <p className="my-2">Your cart is empty.</p>}
      <ul className="my-2">
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price} ETB
          </li>
        ))}
      </ul>
      <button
        onClick={() => setItems([...items, dishes[4]])}
        className="rounded bg-yellow-400 px-4 py-2"
      >
        Add Shiro
      </button>
    </main>
  )
}
