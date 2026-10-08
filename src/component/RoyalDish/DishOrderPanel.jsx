'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { fmt } from '@/lib/format';

const TEFF_EXTRA = 60;
const EGG_EXTRA = 40;

export default function DishOrderPanel({ dish }) {
  const addItem = useCartStore((state) => state.addItem);

  const [heat, setHeat] = useState('traditional');
  const [injera, setInjera] = useState('blend');
  const [sides, setSides] = useState(['ayib']);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const extra =
    (injera === 'teff' ? TEFF_EXTRA : 0) +
    (sides.includes('egg') ? EGG_EXTRA : 0);
  const unitPrice = dish.price + extra;
  const total = unitPrice * qty;

  const toggleSide = (sideId) => {
    setSides((prev) =>
      prev.includes(sideId)
        ? prev.filter((s) => s !== sideId)
        : prev.length < 2
          ? [...prev, sideId]
          : prev
    );
  };

  const optionLabel = () => {
    const parts = [
      heat === 'mild'
        ? 'Mild'
        : heat === 'fiery'
          ? 'Fiery Awaze'
          : 'Traditional Heat',
      injera === 'teff' ? '100% Pure Teff' : 'Standard Teff & Barley',
    ];
    if (sides.includes('egg')) parts.push('Extra Braised Egg');
    return parts.join(' · ');
  };

  const handleAdd = () => {
    addItem(dish, qty, {
      option: optionLabel(),
      optionPrice: extra,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="doro-right">
      <div className="doro-title-row">
        <h1>
          {dish.name}{' '}
          <small>({dish.spice || 'Traditional food'})</small>
        </h1>
        <b className="doro-price">{fmt(unitPrice)}</b>
      </div>
      <p className="doro-desc">{dish.desc}</p>
      <p className="doro-meta">
        👥 {dish.servings || 'Serves 1–2'} · Unlimited table injera
        refill · Taxes included
      </p>

      <div className="opt-group">
        <h3>
          1. Heat & Spice Level 🔥 <span className="req">Required</span>
        </h3>
        <div className="opt-row">
          {[
            {
              key: 'mild',
              name: 'Mild',
              info: 'Alicha touch, fragrant cardamoms',
            },
            {
              key: 'traditional',
              name: 'Traditional',
              info: 'Berbere warmth (Recommended)',
            },
            {
              key: 'fiery',
              name: 'Fiery Awaze',
              info: 'Served with Awaze & Mitmita dip',
            },
          ].map((o) => (
            <button
              key={o.key}
              className={heat === o.key ? 'opt-card selected' : 'opt-card'}
              onClick={() => setHeat(o.key)}
            >
              <b>{o.name}</b>
              <small>{o.info}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="opt-group">
        <h3>
          2. Traditional Injera Base 🫓{' '}
          <span className="req">Choose 1</span>
        </h3>
        <div className="opt-col">
          <button
            className={
              injera === 'blend' ? 'opt-line selected' : 'opt-line'
            }
            onClick={() => setInjera('blend')}
          >
            <span>
              <b>Standard Teff & Barley Blend</b>
              <small>
                Spongy, tart sourdough, naturally soft (Traditional)
              </small>
            </span>
            <em>Included</em>
          </button>
          <button
            className={injera === 'teff' ? 'opt-line selected' : 'opt-line'}
            onClick={() => setInjera('teff')}
          >
            <span>
              <b>100% Pure Organic Brown Teff</b>
              <small>
                Naturally 100% Gluten-Free, iron-rich nutty grain
              </small>
            </span>
            <em>+{fmt(TEFF_EXTRA)}</em>
          </button>
        </div>
      </div>

      <div className="opt-group">
        <h3>
          3. Complimentary Side Accents{' '}
          <span className="req">{sides.length}/2 selected</span>
        </h3>
        <div className="opt-row two">
          {[
            {
              key: 'ayib',
              name: 'Fresh Ayib',
              info: 'Mild fresh cottage curd',
              price: 0,
            },
            {
              key: 'gomen',
              name: 'Stewed Gomen',
              info: 'Garlic infused collard greens',
              price: 0,
            },
            {
              key: 'awaze',
              name: 'House Awaze Paste',
              info: 'Aged tej and berbere sauce',
              price: 0,
            },
            {
              key: 'egg',
              name: 'Extra Braised Egg',
              info: 'Slow cooked in the wat broth',
              price: EGG_EXTRA,
            },
          ].map((s) => (
            <button
              key={s.key}
              className={
                sides.includes(s.key) ? 'opt-card selected' : 'opt-card'
              }
              onClick={() => toggleSide(s.key)}
            >
              <b>{s.name}</b>
              <small>{s.info}</small>
              {s.price > 0 && (
                <span className="price-tag">+{fmt(s.price)}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div
        className="order-action-row"
        style={{
          marginTop: '24px',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
        }}
      >
        <div
          className="qty-selector"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px',
          }}
        >
          <button onClick={() => setQty((q) => Math.max(1, q - 1))}>
            -
          </button>
          <span>{qty}</span>
          <button onClick={() => setQty((q) => q + 1)}>+</button>
        </div>

        <button
          className="add-to-cart-btn"
          onClick={handleAdd}
          style={{
            flex: 1,
            padding: '12px',
            background: '#b91c1c',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {added ? 'Added! (Added!)' : `Add to cart - ${fmt(total)}`}
        </button>
      </div>
    </div>
  );
}
