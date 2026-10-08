import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const value = useMemo(
    () => ({
      items,
      addItem: (dish) => setItems((current) => [...current, dish]),
      remove: (index) =>
        setItems((current) => current.filter((_, i) => i !== index)),
      clear: () => setItems([]),
    }),
    [items],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const cart = useContext(CartContext)

  if (cart === null) {
    throw new Error('useCart must be used inside a CartProvider')
  }

  return cart
}
