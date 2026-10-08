'use client';

import { Fragment, useState } from 'react';
import './FullMenu.css';
import { CATEGORIES } from '@/lib/categories';

export default function MenuBrowser({ cards, children }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');

  const visible = cards.filter((card) => {
    const matchCat = cat === 'all' || card.cat === cat;
    const matchText = card.name.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchText;
  });

  const countFor = (key) =>
    key === 'all' ? cards.length : cards.filter((card) => card.cat === key).length;

  return (
    <main className="menu-page">
      <header className="menu-head">
        {children}

        <div className="menu-tools">
          <input
            className="menu-search"
            placeholder="Search dishes by name (e.g. Kitfo, Shiro, Tibs, Doro Wat)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="menu-tags">
            <span>🌾 100% Pure Teff Injera</span>
            <span>🌿 Fasting / Tsom Friendly</span>
            <span>🌶 Berbere Spiced</span>
          </div>
        </div>

        <div className="menu-cats">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={cat === c.key ? 'chip active' : 'chip'}
              onClick={() => setCat(c.key)}
            >
              {c.label} ({countFor(c.key)})
            </button>
          ))}
        </div>
      </header>

      <section className="menu-grid">
        {visible.map((card) => (
          <Fragment key={card.id}>{card.node}</Fragment>
        ))}
        {visible.length === 0 && (
          <p className="no-results">
            No dishes match “{query}”. Try another name.
          </p>
        )}
      </section>
    </main>
  );
}
