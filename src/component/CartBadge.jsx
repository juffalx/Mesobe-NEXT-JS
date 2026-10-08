'use client'

import { useCart } from '../cart/CartContext'

export default function CartBadge() {
  const { items } = useCart()

  return <span>({items.length})</span>
}
