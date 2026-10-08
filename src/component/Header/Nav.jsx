import Link from 'next/link';
import './Nav.css';

export default function Nav() {
  return (
    <div className="nav-container">
      <Link href="/menu"><p>Menu</p></Link>
      <Link href="/"><p>Featured Dish</p></Link>
      <Link href="/cart"><p>Order & Cart</p></Link>
      <Link href="/checkout"><p>Delivery & Checkout</p></Link>
    </div>
  );
}
