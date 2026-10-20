'use client';
import { ResponsiveContainer } from 'recharts';

export default function RevenueTable({ data }) {

    console.log("data id is ",data);
  const etb = (v) =>
    new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      maximumFractionDigits: 0,
    }).format(v);

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <table>
          <caption>Your orders, most recent first</caption>
          <thead>
            <tr>
              <th scope="col">Order</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{etb(o.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ResponsiveContainer>
    </div>
  );
}
