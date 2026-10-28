import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { getKitchenOrders } from '@/lib/orders';
import '../orders/orders.css';

export const metadata = {
  title: 'Kitchen',
  robots: { index: false, follow: false },
};

export default async function KitchenPage() {
  const session = await getSession();
  if (!session) redirect('/login?next=/kitchen');

  const orders = await getKitchenOrders();
  if (!orders) redirect('/');

  return (
    <main className="order-page">
      <p className="kicker">STAFF ONLY</p>
      <h1>Kitchen</h1>

      <section className="order-card">
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <table className="kitchen-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Dishes</th>
                <th>Deliver to</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderNo}>
                  <td data-label="Order">{order.orderNo}</td>
                  <td data-label="Dishes">
                    {order.lines.map((line) => `${line.qty} x ${line.name}`).join(', ')}
                  </td>
                  <td data-label="Deliver to">
                    {order.details.street}, {order.details.subcity}
                  </td>
                  <td data-label="Status">{order.status.replace(/_/g, ' ').toLowerCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
