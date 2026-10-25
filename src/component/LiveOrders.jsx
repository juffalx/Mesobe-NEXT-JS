'use client';

import { useEffect, useState } from 'react';

export default function LiveOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadOrders() {
      try {
        const response = await fetch('/api/orders', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to load orders');
        }

        const data = await response.json();
        const latestOrders = Array.isArray(data) ? data : data.orders;

        if (!Array.isArray(latestOrders)) {
          throw new Error('Unexpected API response');
        }

        if (active) {
          setOrders(latestOrders);
          setError('');
        }
      } catch {
        if (active) {
          setError('Could not load orders. Retrying soon.');
        }
      }
    }

    loadOrders();

    const intervalId = setInterval(loadOrders, 5000);

    return () => {
      active = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section>
      <h2>Live Orders</h2>

      {error && <p>{error}</p>}

      {!error && orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <p key={order.orderNo}>
          Order: {order.orderNo} — {order.status}
        </p>
      ))}
    </section>
  );
}
