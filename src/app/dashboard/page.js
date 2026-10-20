import { getOrders } from '@/lib/db';
import RevenueChart from './RevenueChart';
import RevenueTable from './OrderTable.jsx';
export default async function DashboardPage() {
  const order = await getOrders();

  //   console.log('order is ', order);
  const Area = ['Bole', 'Kazanchis', 'Megenagna', 'CMC'];
  const byArea = Area.map((area) => ({
    area,
    revenue: order
      .filter((o) => o.area === area)
      .reduce((sum, o) => sum + o.total, 0),
    id: area,
  }));

  //   console.log('by area is ', byArea);
  return (
    <>
      <RevenueChart data={byArea} />
      <RevenueTable data={byArea} />
    </>
  );
}
