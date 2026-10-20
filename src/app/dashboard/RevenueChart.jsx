'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function RevenueChart({ data }) {
  // console.log('data is ', data);

  const etb = (v) =>
    new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      maximumFractionDigits: 0,
    }).format(v);

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="area" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
