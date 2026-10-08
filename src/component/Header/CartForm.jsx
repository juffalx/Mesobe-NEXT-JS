'use client';

import Link from 'next/link';
import './CartForm.css';
import { useCart } from '@/store/useCartStore';
import { useAuth } from '@/store/useAuthStore';
import { fmt } from '@/lib/format';
import { signOut } from '@/app/actions';

export default function CartForm() {
  const { logout, user } = useAuth();
  const { count, subtotal } = useCart();

  const handleLogout = async () => {
    await signOut();
    logout();
  };

  return (
    <div className="cart-form">
      <div className="cart-container">
        <Link href="/cart">
          <div className="cart-inner-holder">
            <div className="count">
              <div>
                <p>{count}</p>
                <p>Item</p>
              </div>
            </div>

            <div className="total">
              <div>
                <p>{fmt(subtotal)}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="account-container">
        {user ? (
          <>
            <span className="account-name">{user.name || user.phone}</span>
            <button className="link-btn" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}
