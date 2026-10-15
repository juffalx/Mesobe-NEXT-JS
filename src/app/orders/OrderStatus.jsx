'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { cancelOrder } from '@/app/actions';

const STEPS = ['PENDING', 'PREPARING', 'ON_THE_WAY', 'DELIVERED'];

const LABELS = {
  PENDING: 'Order received',
  PREPARING: 'The kitchen is preparing your food',
  ON_THE_WAY: 'Your order is on the way',
  DELIVERED: 'Delivered. Enjoy your meal!',
  CANCELLED: 'This order was cancelled',
};

export default function OrderStatus({ id, initial }) {
  const [message, setMessage] = useState('');
  const { data, error, mutate } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initial,
    refreshInterval: (latest) =>
      latest?.status === 'DELIVERED' || latest?.status === 'CANCELLED' ? 0 : 5000,
  });

  const current = STEPS.indexOf(data.status);
  const canCancel = data.status === 'PENDING' || data.status === 'PREPARING';

  const handleCancel = async () => {
    const result = await cancelOrder(id);
    if (!result.ok) {
      setMessage(result.error);
      return;
    }
    setMessage('');
    mutate();
  };

  return (
    <div className="order-status">
      <h2>{LABELS[data.status]}</h2>
      {data.status !== 'CANCELLED' && (
        <ol className="order-steps">
          {STEPS.map((step, index) => (
            <li key={step} className={index <= current ? 'done' : ''}>
              {step.replace(/_/g, ' ').toLowerCase()}
            </li>
          ))}
        </ol>
      )}
      {canCancel && (
        <button className="order-cancel" onClick={handleCancel}>
          Cancel this order
        </button>
      )}
      {message && <p className="order-error">{message}</p>}
      {error && <p className="order-error">Could not refresh. Showing the last known status.</p>}
    </div>
  );
}
