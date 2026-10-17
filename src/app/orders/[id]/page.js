import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/session';
import { getOrder } from '@/lib/orders';
import { fmt } from '@/lib/format';
import OrderStatus from './OrderStatus';
import '../orders.css';

export const metadata = {
  title: 'Track your order',
  robots: { index: false, follow: false },
};

export default async function OrderPage({ params }) {
  const { id } = await params;

  const session = await getSession();
  if (!session) redirect(`/login?next=/orders/${id}`);

  const order = await getOrder(id);
  if (!order) notFound();

  return (
    <main className="order-page">
      <p className="kicker">ORDER {order.orderNo}</p>
      <h1>Track your order</h1>

      <section className="order-card">
        <OrderStatus id={order.orderNo} initial={order} />
      </section>

      <section className="order-card">
        <ul className="order-lines">
          {order.lines.map((line) => (
            <li key={line.id + (line.option || '')}>
              <span>
                {line.qty} x {line.name}
                {line.option ? ` (${line.option})` : ''}
              </span>
              <b>{fmt(line.lineTotal)}</b>
            </li>
          ))}
        </ul>
        <p className="order-total">
          <span>Total</span>
          <b>{fmt(order.totals.grand)}</b>
        </p>
      </section>

      <Link href="/menu" className="btn-ghost">
        Back to the menu
      </Link>
    </main>
  );
}
