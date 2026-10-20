'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function OrdersOverTimeChart({ data = [] }) {
  const chartData = Array.isArray(data) ? data : [];

  const formatDate = (value) =>
    new Date(`${value}T00:00:00`).toLocaleDateString('en-ET', {
      day: '2-digit',
      month: 'short',
    });

  return (
    <section>
      <h2>Orders Over Time (orders per day)</h2>

      {chartData.length === 0 ? (
        <p role="status">
          No dated order records are available for this chart.
        </p>
      ) : (
        <>
          <div style={{ height: 300, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis allowDecimals={false} />
                <Tooltip labelFormatter={(label) => formatDate(label)} />
                <Line type="monotone" dataKey="orders" name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <table>
            <caption>Daily order counts</caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Orders</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((item) => (
                <tr key={item.date}>
                  <td>{formatDate(item.date)}</td>
                  <td>{item.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}
