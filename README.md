# Addis Eats, Server and Client Components

Day 38 in-class exercise, built on the Day 37 app. Day 37 notes are kept below.

## Run it

```bash
npm install
npm run dev
npm run build
npm run measure
```

## Day 38: what changed

| Step | Done in |
| --- | --- |
| Menu page is an async server component that awaits its dishes | `src/app/menu/page.js` |
| No loading or error state in the page, `loading.js` and `error.js` hold them | `src/app/menu/loading.js`, `error.js` |
| Cart provider in its own client component | `src/app/providers.jsx`, `src/cart/CartContext.jsx` |
| `"use client"` only on small leaves | `FilterShell`, `CartBadge`, `AddToCartButton`, `CartList` |
| Server `DishList` inside client `FilterShell` through `children` | `src/app/menu/page.js`, `src/app/menu/FilterShell.jsx` |
| First Load JS before and after, and every component's side | `BOUNDARY.md` |

## Day 37

## What was changed from the startup

| Step | Done in |
| --- | --- |
| Root layout owns html and body, with header, footer and `globals.css` | `src/app/layout.js`, `src/component/Header.jsx`, `src/component/Footer.jsx` |
| Menu layout with a sidebar that persists | `src/app/menu/layout.js` |
| `revalidate` on the menu route, build shows it static with 1h | `src/app/menu/page.js` |
| `generateStaticParams` on `[id]`, 10 pages in the build (7 dishes and 3 categories) | `src/app/menu/[id]/page.js` |
| Checkout forced dynamic | `src/app/checkout/layout.js`, `src/app/checkout/page.js` |
| Dish list wrapped in Suspense | `src/app/menu/page.js`, `src/component/DishList.jsx` |
| Every route, its strategy and why | `STRATEGY.md` |

## Problems fixed in the startup

- `npm install` failed with ERESOLVE: `eslint-config-next` was on version 14 while Next is 16. It now matches Next at `16.3.8`
- `app/cart/page.js` was both `'use client'` and `async`, and used an undefined `response`, so the build broke
- The dish folder was `[dish]` and threw an Error for a missing dish. It is now `[id]` and a missing dish is a 404
- The 3 second delay was moved from the dish page to the dish list, so the Suspense skeleton shows
- The root layout used `next/font/google`, which needs internet at build time, so it was removed. `globals.css` already sets the font
