'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/component/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function MapLoader() {
  return <Map />;
}
