'use client';

import { MapContainer, TileLayer } from 'react-leaflet';

export default function Map() {
  return (
    <MapContainer
      center={[9.03, 38.74]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
