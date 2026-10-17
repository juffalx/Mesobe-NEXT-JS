import CurrentOrderCart from '@/component/CurrentOrderCart/CurrentOrderCart';

export const metadata = {
  title: 'Your cart',
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CurrentOrderCart />;
}
