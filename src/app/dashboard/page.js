import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { getOrders } from '@/lib/db';
import RevenueChart from './RevenueChart';
import OrdersOverTimeChart from './OrdersOverTimeChart';
import RevenueTable from './OrderTable';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login?next=/dashboard');
  }
  const orders = await getOrders();

  const areas = ['Bole', 'Kazanchis', 'Megenagna', 'CMC', 'Piassa', 'Sarbet'];

  const byArea = areas.map((area) => ({
    area,
    revenue: orders
      .filter((order) => order.area === area)
      .reduce((sum, order) => sum + (Number(order.total) || 0), 0),
  }));

  const dailyOrders = Object.values(
    orders.reduce((groups, order) => {
      if (!order.createdAt) return groups;

      const date = new Date(order.createdAt);

      if (Number.isNaN(date.getTime())) return groups;

      const day = date.toISOString().slice(0, 10);

      if (!groups[day]) {
        groups[day] = { date: day, orders: 0 };
      }

      groups[day].orders += 1;

      return groups;
    }, {})
  ).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <main>
      <h1>Revenue Dashboard</h1>

      <RevenueChart data={byArea} />

      <OrdersOverTimeChart data={dailyOrders} />

      <RevenueTable data={orders} />
    </main>
  );
}
