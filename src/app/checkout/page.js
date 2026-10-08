import { redirect } from 'next/navigation';
import CheckoutDelivery from '@/component/CheckoutDelivery/CheckoutDelivery';
import { getSession } from '@/lib/session';

export default async function CheckoutPage() {
  const session = await getSession();

  if (!session) redirect('/login?next=/checkout');

  return <CheckoutDelivery />;
}
