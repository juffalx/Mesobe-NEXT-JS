'use server';

import { z } from 'zod';
import { loginSchema, signupSchema } from '@/lib/schemas';
import { createSession, destroySession } from '@/lib/session';
import { processOrder } from '@/lib/orders';

export async function signIn(input) {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }
  const user = { phone: parsed.data.phone };
  await createSession(user);
  return { ok: true, user };
}

export async function signUp(input) {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }
  const { name, phone, email } = parsed.data;
  const user = { name, phone, email };
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
