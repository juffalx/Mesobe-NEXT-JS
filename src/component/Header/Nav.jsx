'use client';

import { useState } from 'react';
import Link from 'next/link';
import './Nav.css';

const LINKS = [
  { href: '/menu', label: 'Menu' },
  { href: '/', label: 'Featured Dish' },
  { href: '/cart', label: 'Order & Cart' },
  { href: '/checkout', label: 'Delivery & Checkout' },
  { href: '/orders', label: 'My Orders' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav" aria-label="Main">
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-label">{open ? 'Close menu' : 'Open menu'}</span>
      </button>

      <ul
        id="primary-nav"
        className={open ? 'nav-links is-open' : 'nav-links'}
        onClick={() => setOpen(false)}
      >
        {LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
