import { ImageResponse } from 'next/og';

export const alt = 'Mesob House, Ethiopian food delivery in Addis Ababa';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: '#8f2f1e',
          color: '#fff4e6',
        }}
      >
        <div style={{ fontSize: 40, color: '#fdeeda' }}>ETHIOPIAN FOOD DELIVERY</div>
        <div style={{ fontSize: 120, fontWeight: 700, marginTop: 20 }}>Mesob House</div>
        <div style={{ fontSize: 44, marginTop: 30 }}>
          Handcrafted wats, delivered hot across Addis Ababa
        </div>
      </div>
    ),
    size
  );
}
