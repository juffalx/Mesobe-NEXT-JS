import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { COUPON_CODE, priceCart } from '@/lib/pricing';

const lineKey = (id, option) => `${id}|${option || ''}`;

const makeLine = (dish, qty, opts = {}) => {
  const optionPrice = opts.optionPrice || 0;
  const unitPrice = dish.price + optionPrice;
  return {
    forImg: dish.forImg,
    id: dish.id,
    name: dish.name,
    option: opts.option || null,
    optionPrice,
    unitPrice,
    qty,
    lineTotal: unitPrice * qty,
  };
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      orderNote: '',

      addItem: (dish, qty = 1, opts = {}) => {
        const key = lineKey(dish.id, opts.option);
        const items = get().items;
        const existing = items.find(
          (item) => lineKey(item.id, item.option) === key
        );

        if (existing) {
          const nextQty = existing.qty + qty;
          set({
            items: items.map((item) =>
              lineKey(item.id, item.option) === key
                ? { ...item, qty: nextQty, lineTotal: item.unitPrice * nextQty }
                : item
            ),
          });
          return;
        }

        set({ items: [...items, makeLine(dish, qty, opts)] });
      },

      updateQty: (id, option, qty) => {
        const key = lineKey(id, option);
        set({
          items:
            qty <= 0
              ? get().items.filter(
                  (item) => lineKey(item.id, item.option) !== key
                )
              : get().items.map((item) =>
                  lineKey(item.id, item.option) === key
                    ? { ...item, qty, lineTotal: item.unitPrice * qty }
                    : item
                ),
        });
      },

      removeItem: (id, option) => {
        const key = lineKey(id, option);
        set({
          items: get().items.filter(
            (item) => lineKey(item.id, item.option) !== key
          ),
        });
      },

      clearCart: () => set({ items: [], coupon: null, orderNote: '' }),

      applyCoupon: (code) => {
        if ((code || '').trim().toUpperCase() === COUPON_CODE) {
          set({ coupon: COUPON_CODE });
          return { ok: true };
        }
        set({ coupon: null });
        return { ok: false };
      },

      setOrderNote: (orderNote) => set({ orderNote }),
    }),
    { name: 'mesob-cart', skipHydration: true }
  )
);

export const selectCart = (state) => {
  const { items, coupon, orderNote } = state;
  return { items, coupon, orderNote, ...priceCart(items, coupon) };
};

export const useCart = () => {
  const state = useCartStore();
  return { ...state, ...selectCart(state) };
};
