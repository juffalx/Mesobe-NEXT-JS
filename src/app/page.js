import TodaySpecial from '@/component/TodaySpecial/TodaySpecial';
import JsonLd from '@/component/JsonLd';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata = {
  description:
    'Order Doro Wat, Tibs, Kitfo and Shiro cooked from scratch and delivered hot across Addis Ababa, paid with cash or TeleBirr.',
  alternates: { canonical: '/' },
};

const restaurant = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: SITE_NAME,
  url: SITE_URL,
  description:
    'Handcrafted Ethiopian wats and honey wine, delivered hot across Addis Ababa.',
  servesCuisine: 'Ethiopian',
  areaServed: 'Addis Ababa',
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={restaurant} />
      <TodaySpecial />
    </>
  );
}
