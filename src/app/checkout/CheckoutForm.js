'use client';

import { useActionState } from 'react';
import { placeOrder } from '../actions';

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(placeOrder, null);

  return (
    <form action={formAction} className="mt-6 space-y-3">
      <input name="name" placeholder="Name" />
      <input name="phone" placeholder="Phone" />
      {state?.fieldErrors?.phone && (
        <p role="alert">{state.fieldErrors.phone[0]}</p>
      )}
      <input name="dishId" placeholder="Dish ID" />
      <input name="quantity" type="number" placeholder="Quantity" />
      <input name="notes" placeholder="Notes" />

      <button type="submit" disabled={pending}>
        {pending ? 'Sending...' : 'Order'}
      </button>

      {state?.id && <p>Order created: {state.id}</p>}
    </form>
  );
}
