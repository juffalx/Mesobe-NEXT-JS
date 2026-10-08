'use client';

import Link from 'next/link';
import './FullMenu.css';
import { useCart } from '@/store/useCartStore';
import { fmt } from '@/lib/format';

export default function MenuCartBar() {
  const { count, subtotal } = useCart();

  return (
    <div className="menu-cart-bar">
      <span>
        🧺 Selected: <b>{count} items</b> · {fmt(subtotal)}
      </span>
      <Link href="/cart" className="btn-red bar-btn">
        Proceed to Cart →
      </Link>
    </div>
  );
}
