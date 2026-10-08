'use client'

import { useState } from 'react'
import CategoryBar from './CategoryBar'

export default function FilterShell({ categories, children }) {
  const [selected, setSelected] = useState('all')

  return (
    <div>
      <CategoryBar
        categories={categories}
        selected={selected}
        onSelect={setSelected}
      />
      {selected !== 'all' && (
        <style>{`.dish-item:not([data-category="${selected}"]) { display: none; }`}</style>
      )}
      {children}
    </div>
  )
}
