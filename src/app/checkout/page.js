import { redirect } from 'next/navigation';
import CheckoutDelivery from '@/component/CheckoutDelivery/CheckoutDelivery';
import { getSession } from '@/lib/session';

export const metadata = {
  title: 'Delivery and checkout',
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  const session = await getSession();

  if (!session) redirect('/login?next=/checkout');

  return <CheckoutDelivery />;
}
