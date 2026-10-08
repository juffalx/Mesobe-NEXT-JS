export default function DishSkeleton() {
  return (
    <ul className="grid gap-2">
      {[1, 2, 3, 4].map((n) => (
        <li key={n} className="h-12 animate-pulse rounded bg-gray-200" />
      ))}
    </ul>
  )
}
