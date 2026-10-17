import TodaySpecial from '@/component/TodaySpecial/TodaySpecial';

export const metadata = {
  description:
    'Order Doro Wat, Tibs, Kitfo and Shiro cooked from scratch and delivered hot across Addis Ababa, paid with cash or TeleBirr.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <TodaySpecial />;
}
