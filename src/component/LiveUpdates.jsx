'use client';

import { useEffect, useState } from 'react';

export default function LiveUpdates() {
  const [message, setMessage] = useState('Connecting...');
  const [time, setTime] = useState('');

  useEffect(() => {
    const source = new EventSource('/api/live');

    source.onopen = () => {
      setMessage('Connected');
    };

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setMessage(data.message);
      setTime(data.time);
    };

    source.onerror = () => {
      setMessage('Connection interrupted. Reconnecting...');
    };

    return () => {
      source.close();
    };
  }, []);

  return (
    <section>
      <h2>Live Updates Demo</h2>
      <p>Status: {message}</p>
      <p>Last update: {time || 'Waiting for first update...'}</p>
    </section>
  );
}
