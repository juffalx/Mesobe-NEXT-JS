'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const restaurants = [
  {
    id: 1,
    name: 'Doro Wat',
    latitude: 9.03,
    longitude: 38.74,
    price: 350,
  },
  {
    id: 2,
    name: 'Kitfo',
    latitude: 9.04,
    longitude: 38.75,
    price: 400,
  },
  {
    id: 3,
    name: 'Beyaynetu',
    latitude: 9.02,
    longitude: 38.73,
    price: 220,
  },
];

export default function Map() {
  return (
    <MapContainer
      center={[9.03, 38.74]}
      zoom={13}
      style={{ height: 'clamp(280px, 60vh, 480px)', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          position={[restaurant.latitude, restaurant.longitude]}
        >
          <Popup>
            <h3>{restaurant.name}</h3>
            <p>Price: {restaurant.price} ETB</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
