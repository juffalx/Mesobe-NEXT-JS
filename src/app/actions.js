'use server';

import { z } from 'zod';
import { loginSchema, signupSchema } from '@/lib/schemas';
import { createSession, destroySession } from '@/lib/session';
import { cancelUserOrder, processOrder } from '@/lib/orders';
import { addUser, checkUser } from '@/lib/users';

export async function signIn(input) {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }
  const user = checkUser(parsed.data.phone, parsed.data.password);
  if (!user) {
    return {
      ok: false,
      fieldErrors: { password: ['Phone number or password is incorrect.'] },
    };
  }
  await createSession(user);
  return { ok: true, user };
}

export async function signUp(input) {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }
  const { name, phone, email, password } = parsed.data;
  const user = addUser({ name, phone, email, password });
  if (!user) {
    return {
      ok: false,
      fieldErrors: { phone: ['This phone number is already registered.'] },
    };
  }
  await createSession(user);
  return { ok: true, user };
}

export async function signOut() {
  await destroySession();
}

export async function placeOrder(input) {
  const { status, body } = await processOrder(input);
  if (status !== 201) {
    return { ok: false, status, ...body };
  }
  return { ok: true, orderNo: body.order.orderNo };
}

export async function cancelOrder(orderNo) {
  if (typeof orderNo !== 'string') return { ok: false, error: 'Bad request' };

  const { status, error } = await cancelUserOrder(orderNo);
  if (status !== 200) return { ok: false, status, error };
  return { ok: true };
}
