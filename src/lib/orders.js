import 'server-only';
import { z } from 'zod';
import { orderSchema } from './schemas';
import { COUPON_CODE, priceCart } from './pricing';
import { getDishes } from './menu';
import { getSession } from './session';

const orders = (globalThis.mesobOrders ??= []);

export async function processOrder(input) {
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: 422,
      body: {
        error: 'Validation failed',
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      },
    };
  }

  const session = await getSession();
  if (!session) {
    return { status: 401, body: { error: 'Please sign in to place an order' } };
  }

  const { lines, coupon, ...details } = parsed.data;

  if (coupon && coupon !== COUPON_CODE) {
    return {
      status: 422,
      body: {
        error: 'Validation failed',
        fieldErrors: { coupon: ['Invalid coupon code'] },
      },
    };
  }

  const dishes = await getDishes();
  const priced = [];
  for (const line of lines) {
    const dish = dishes.find((item) => item.id === line.id);
    if (!dish) {
      return { status: 422, body: { error: `Unknown dish: ${line.id}` } };
    }
    const unitPrice = dish.price + line.optionPrice;
    priced.push({
      id: dish.id,
      name: dish.name,
      option: line.option,
      qty: line.qty,
      unitPrice,
      lineTotal: unitPrice * line.qty,
    });
  }

  const order = {
    orderNo: `MH-${Date.now().toString().slice(-6)}`,
    owner: session.phone,
    details,
    lines: priced,
    coupon,
    totals: priceCart(priced, coupon),
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  };
  orders.push(order);

  return { status: 201, body: { order } };
}

const STEPS = [
  { status: 'PENDING', after: 0 },
  { status: 'PREPARING', after: 10 },
  { status: 'ON_THE_WAY', after: 25 },
  { status: 'DELIVERED', after: 40 },
];

function currentStatus(order) {
  const seconds = (Date.now() - new Date(order.createdAt).getTime()) / 1000;
  return STEPS.findLast((step) => seconds >= step.after).status;
}

export async function getOrder(orderNo) {
  const session = await getSession();
  if (!session) return null;

  const order = orders.find(
    (item) => item.orderNo === orderNo && item.owner === session.phone
  );
  if (!order) return null;

  return { ...order, status: currentStatus(order) };
}

export async function getOrdersFor(phone) {
  return orders
    .filter((order) => order.owner === phone)
    .map((order) => ({ ...order, status: currentStatus(order) }))
    .reverse();
}
