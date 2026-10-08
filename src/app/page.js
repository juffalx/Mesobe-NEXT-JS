import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Welcome to Addis Eats</h1>
      <p className="my-4">Ethiopian favourites, delivered across Addis Ababa.</p>
      <Link href="/menu" className="rounded bg-yellow-400 px-4 py-2">
        See the menu
      </Link>
    </main>
  )
}
