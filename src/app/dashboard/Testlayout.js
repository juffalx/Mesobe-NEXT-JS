'use client';

import { useState } from 'react';
import RevenueChart from './RevenueChart';
import { getOrders } from '@/lib/db';

export default async function Layout({ children }) {
  const [view, setView] = useState('chart');
  const order = await getOrders();
  const Area = ['Bole', 'Kazanchis', 'Megenagna', 'CMC'];
  const byArea = Area.map((area) => ({
    area,
    revenue: order
      .filter((o) => o.area === area)
      .reduce((sum, o) => sum + o.total, 0),
  }));

  console.log('byArea is ', byArea);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        gap: '16px',
      }}
    >
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setView('table')}
          className={`rounded-md px-4 py-2 ${
            view === 'table'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          Table
        </button>

        <button
          onClick={() => setView('chart')}
          className={`rounded-md px-4 py-2 ${
            view === 'chart'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          Chart
        </button>
      </div>

      <div>
        {view === 'chart' ? (
          children
        ) : (
          <table>
            <caption>Your orders, most recent first</caption>
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {byArea.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{etb(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
