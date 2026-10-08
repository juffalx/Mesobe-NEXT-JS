'use server';

import { revalidatePath } from 'next/cache';
import { orderSchema } from '@/lib/schema';
import { createOrder, getOrder, getSession, markCancelled } from '@/lib/db';

export async function placeOrder(prevState, formData) {
  const data = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    dishId: formData.get('dishId'),
    quantity: Number(formData.get('quantity')),
    notes: formData.get('notes'),
  };

  const result = orderSchema.safeParse(data);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const order = await createOrder(result.data);

  revalidatePath('/orders');

  return {
    id: order.id,
  };
}

export async function cancelOrder(orderId) {
  const user = await getSession();

  if (!user) {
    throw new Error('Not signed in');
  }

  const order = await getOrder(orderId);

  if (!order) {
    throw new Error('Order not found');
  }

  if (order.userId !== user.id) {
    throw new Error('Not your order');
  }

  await markCancelled(orderId);
}
