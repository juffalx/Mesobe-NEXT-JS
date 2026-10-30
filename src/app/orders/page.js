import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/session';
import { getOrdersForCurrentUser } from '@/lib/orders';
import { fmt } from '@/lib/format';
import './orders.css';

export const metadata = {
  title: 'My orders',
  robots: { index: false, follow: false },
};

export default async function OrdersPage() {
  const session = await getSession();// ሎንግ አድርጓል ወይስ አላደረገም
  if (!session) redirect('/login?next=/orders');

  // 
  const orders = await getOrdersForCurrentUser();
  if (!orders) redirect('/login?next=/orders');
  return (
    <main className="order-page">
      <p className="kicker">MY ACCOUNT</p>
      <h1>My orders</h1>

      {orders.length === 0 && (
        <section className="order-card">
          <p>You have no orders yet.</p>
          <Link href="/menu" className="btn-red">
            Explore the Menu →
          </Link>
        </section>
      )}

      {orders.map((order) => (
        <Link
          key={order.orderNo}
          href={`/orders/${order.orderNo}`}
          className="order-card order-row"
        >
          <span>
            <b>{order.orderNo}</b>
            <small>{new Date(order.createdAt).toLocaleString('en-GB')}</small>
          </span>
          <span className="order-badge">
            {order.status.replace(/_/g, ' ').toLowerCase()}
          </span>
          <b>{fmt(order.totals.grand)}</b>
        </Link>
      ))}
    </main>
  );
}
