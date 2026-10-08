export const COUPON_CODE = 'GURSHA2025';
export const COUPON_DISCOUNT = 200;
export const FREE_DELIVERY_MIN = 1200;
const PACKAGING_FEE = 60;
const DELIVERY_FEE = 80;
const VAT_RATE = 0.15;

export function priceCart(items, coupon) {
  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const packaging = count === 0 ? 0 : PACKAGING_FEE;
  const freeDelivery = subtotal >= FREE_DELIVERY_MIN;
  const delivery = count === 0 ? 0 : freeDelivery ? 0 : DELIVERY_FEE;
  const vat = Math.round((subtotal + packaging + delivery) * VAT_RATE);
  const discount = coupon ? COUPON_DISCOUNT : 0;
  const grand = Math.max(0, subtotal + packaging + delivery + vat - discount);

  return { count, subtotal, packaging, freeDelivery, delivery, vat, discount, grand };
}
