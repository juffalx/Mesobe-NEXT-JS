'use client';

import { Fragment, useState } from 'react';
import useSWR from 'swr';
import './FullMenu.css';
import DishCard from './DishCard';
import Pager from './Pager';
import { CATEGORIES } from '@/lib/categories';
import { fetcher } from '@/lib/fetcher';
import { useDebounce } from '@/lib/useDebounce';

const PAGE_SIZE = 8;

export default function MenuBrowser({ cards, children }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [page, setPage] = useState(1);
  const term = useDebounce(query.trim(), 300);

  const useApi = term !== '' || page > 1;
  const params = new URLSearchParams({ q: term, cat, page });
  const { data, isLoading } = useSWR(useApi ? `/api/dishes?${params}` : null, fetcher, {
    keepPreviousData: true,
  });
  const result = useApi ? data : undefined;

  const local = cards.filter((card) => cat === 'all' || card.cat === cat);
  const pages = useApi ? (result?.pages ?? 1) : Math.max(1, Math.ceil(local.length / PAGE_SIZE));

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
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
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
              onClick={() => {
                setCat(c.key);
                setPage(1);
              }}
            >
              {c.label} ({countFor(c.key)})
            </button>
          ))}
        </div>
      </header>

      <section className="menu-grid">
        {useApi
          ? result?.items.map((dish) => <DishCard key={dish.id} dish={dish} />)
          : local.slice(0, PAGE_SIZE).map((card) => (
              <Fragment key={card.id}>{card.node}</Fragment>
            ))}
        {useApi && isLoading && <p className="no-results">Searching…</p>}
        {useApi && result?.items.length === 0 && (
          <p className="no-results">No dishes found here. Try another name or page.</p>
        )}
      </section>

      <Pager page={page} pages={pages} onChange={setPage} />
    </main>
  );
}
