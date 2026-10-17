import { ImageResponse } from 'next/og';
import { getDish } from '@/lib/menu';

export const alt = 'Mesob House dish';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  const name = dish ? dish.name : 'Mesob House';
  const price = dish ? `${dish.price} ETB` : '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#8f2f1e',
          color: '#fff4e6',
        }}
      >
        <div style={{ fontSize: 40, color: '#fdeeda' }}>MESOB HOUSE</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 100, fontWeight: 700 }}>{name}</div>
          <div style={{ fontSize: 64, marginTop: 24, color: '#fdeeda' }}>{price}</div>
        </div>
        <div style={{ fontSize: 36 }}>Delivered hot across Addis Ababa</div>
      </div>
    ),
    size
  );
}
