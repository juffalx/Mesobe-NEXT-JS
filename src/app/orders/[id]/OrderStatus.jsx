'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

const STEPS = ['PENDING', 'PREPARING', 'ON_THE_WAY', 'DELIVERED'];

const LABELS = {
  PENDING: 'Order received',
  PREPARING: 'The kitchen is preparing your food',
  ON_THE_WAY: 'Your order is on the way',
  DELIVERED: 'Delivered. Enjoy your meal!',
};

export default function OrderStatus({ id, initial }) {
  const { data, error } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initial,
    refreshInterval: (latest) => (latest?.status === 'DELIVERED' ? 0 : 5000),
  });

  const current = STEPS.indexOf(data.status);

  return (
    <div className="order-status">
      <h2>{LABELS[data.status]}</h2>
      <ol className="order-steps">
        {STEPS.map((step, index) => (
          <li key={step} className={index <= current ? 'done' : ''}>
            {step.replace(/_/g, ' ').toLowerCase()}
          </li>
        ))}
      </ol>
      {error && <p className="order-error">Could not refresh. Showing the last known status.</p>}
    </div>
  );
}
