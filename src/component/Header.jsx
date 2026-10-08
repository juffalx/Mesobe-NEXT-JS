import Link from 'next/link'
import CartBadge from './CartBadge'

const links = [
  { href: '/menu', label: 'Menu' },
  { href: '/checkout', label: 'Checkout' },
]

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-300 px-6 py-4 text-red-900">
      <Link href="/" className="text-xl font-bold">
        Addis Eats
      </Link>
      <nav className="flex gap-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        <Link href="/cart">
          Cart <CartBadge />
        </Link>
      </nav>
    </header>
  )
}
