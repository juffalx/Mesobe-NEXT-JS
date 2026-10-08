export default function CategoryBar({ categories, selected, onSelect }) {
  const all = [{ name: 'All', slug: 'all' }, ...categories]

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {all.map((category) => (
        <button
          key={category.slug}
          onClick={() => onSelect(category.slug)}
          aria-pressed={selected === category.slug}
          className={
            selected === category.slug
              ? 'rounded bg-yellow-400 px-3 py-1 font-bold'
              : 'rounded border px-3 py-1'
          }
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
