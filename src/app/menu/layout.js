import Link from 'next/link';
import { CATEGORIES, slugify } from '../../data/dishes';

export default function MenuLayout({ children }) {
  return (
    <div className="flex gap-6 p-6 text-black-500">
      <aside className="w-48 rounded-lg bg-black-500 p-4 shadow-md ">
        <h2 className="mb-2 font-bold">Menu Categories</h2>
        <ul className="grid gap-1">
          <li>
            <Link href="/menu">All Dishes</Link>
          </li>
          {CATEGORIES.map((category) => (
            <li key={category}>
              <Link href={`/menu/${slugify(category)}`}>{category}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
