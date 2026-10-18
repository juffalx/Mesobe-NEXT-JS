# Mesob House on Next.js

Day 40 project. The Day 35 Mesob React capstone (Vite, React Router) rebuilt on the Next.js App Router with server components, route handlers and server actions.

**Deployed:** not deployed yet. Put the address here after Day 48 (Vercel), and set `NEXT_PUBLIC_SITE_URL` to it before the build.

## Run it from a fresh clone

```bash
git clone <your repo address>
cd <folder>
npm install
cp .env.example .env.local      # then set STAFF_PASSWORD (8 characters or more)
npm run build
npm run start
```

Then open http://localhost:3000. Use `npm run dev` only for writing code. Never measure on it.

Useful commands:

| Command | What it does |
| --- | --- |
| `npm run measure -- menu` | First Load JS of a route, after a build |
| `npm run verify` | With the app running, runs the attacks and the discovery checks (see `AUTH.md`). Add an address to check another port: `node scripts/attacks.mjs http://localhost:3100` |

Dish photos are not in this repo. Copy the Vite project's `public/asset` folder to `public/asset`, so `/asset/<forImg>.jpg` and `/asset/empty-mesob.jpg` resolve. If you also have `public/menu.json`, copy it to `public/menu.json` and the app reads it, otherwise it uses `src/lib/fallbackDishes.js`.

## The documents

| File | What is in it |
| --- | --- |
| `STRATEGY.md`, `BOUNDARY.md` | Week 8: rendering strategy per route, server and client boundary |
| `DATA.md` | Day 41: where each piece of data is fetched, every query, its key and refresh rule |
| `AUTH.md` | Day 42: layers per route, what each layer proves, the attacks and the line that stopped each one |
| `PERF.md` | Day 43 and 45: what I measured, the budget table, what is still empty |
| `SEO.md` | Day 44: metadata, previews, sitemap, what I checked |

## Week 9 status

| Area | Status | Evidence |
| --- | --- | --- |
| Accounts | Done | Sign in, sign up and sign out, hashed passwords, flagged cookie. `npm run verify` |
| Protection | Done | Proxy, page check and a check in every action. `AUTH.md` |
| Ownership | Done | Orders are found by the session phone. `npm run verify`, attack 2 |
| Live data | Done | Order status polled every 5 s and seeded by the server. Menu search debounced, 300 ms. `DATA.md` |
| Performance | Partly | Images are about 20 times smaller. First Load JS misses the 120 kB target. Lighthouse numbers are still empty in `PERF.md`. Needs you |
| Discovery | Done | Titles, descriptions, previews, JSON-LD, sitemap, robots. Not yet checked on a live address. `SEO.md` |

## Routes

| Route | Strategy | What it does |
| --- | --- | --- |
| `/` | Static | Je Buna ceremony, extra injera add-on, calls to action |
| `/menu` | ISR 1h | Dishes, search, category chips |
| `/menu/[id]` | Static via params | One dish, options, add to cart |
| `/cart` | Static shell, client leaf | Order lines, coupon, totals |
| `/orders`, `/orders/[id]` | Dynamic | Your own orders, and a live order status |
| `/kitchen` | Dynamic | Staff only |
| `/checkout` | Dynamic | Guarded by the session cookie, validated server action |
| `/login`, `/signup` | Static shell, client form | Forms that call server actions |

Why each one: `STRATEGY.md`. Which component runs where: `BOUNDARY.md`.

## Endpoints

| Method and path | Success | Failure |
| --- | --- | --- |
| `GET /api/dishes` | 200, `{ items, total, pages, page }`. Optional `q`, `cat` and `page` (8 per page) | |
| `GET /api/dishes/[id]` | 200, one dish | 404 `{ "error": "Dish not found" }` |
| `POST /api/orders` | 201 `{ order }` | 400 bad JSON, 422 `{ error, fieldErrors }`, 401 not signed in |

Server components read the data directly. Only the client search and page 2 onward call `/api/dishes`. The order status page polls `GET /api/orders/[id]`. The handlers also serve outside callers and the curl checks below.

```bash
curl localhost:3000/api/dishes | head
curl -i localhost:3000/api/dishes/not-a-dish
curl -i -X POST localhost:3000/api/orders -H "Content-Type: application/json" -d '{"name":"Almaz","phone":"0912"}'
```

The last one returns 422 with `fieldErrors.phone`. With a valid body and no `session` cookie the answer is 401, with the cookie it is 201 and the totals are computed on the server from the dish prices.

## Server actions

| Action | Does |
| --- | --- |
| `signIn`, `signUp` | Validate with the same zod schema as the form, check or create the user, then set an httpOnly `session` cookie |
| `cancelOrder` | Checks the session, then that the order belongs to it, then that it is not too late |
| `signOut` | Deletes the session |
| `placeOrder` | Validates the form and the lines, checks the session, re-prices every line on the server and checks the coupon |

Sign in checks the password against a scrypt hash. Users and sessions are kept in server memory, so a restart signs everyone out. A staff account exists for `/kitchen` (see `AUTH.md`).

## Environment

Copy `.env.example` to `.env.local` and set `STAFF_PASSWORD`. In development it is optional (default `kitchen123`). In production the server will not start without it. See `PERF.md` for the other Day 43 changes (images, fonts, headers).

## Checks I ran on the production build

| Check | Result |
| --- | --- |
| `GET /api/dishes/not-a-dish` | 404 with `{ "error": ... }` |
| `POST /api/orders` with `phone: "0912"` | 422 with `fieldErrors.phone` |
| `POST /api/orders` with a valid body, no cookie | 401 |
| `POST /api/orders` after `signIn`, valid body | 201, totals computed on the server |
| Unknown dish id, bad coupon, negative option price | 422 |
| `placeOrder` action without a session | `{ ok: false, status: 401 }` |
| `GET /checkout` without a cookie | 307 to `/login?next=/checkout` |
| `GET /menu/not-a-dish` | 404 |
| `/menu` HTML | Contains all 14 dish cards |
| Search of `.next/static` for `secret`, `mesobSessions`, `mesobOrders` and `next/headers` | Nothing found. The app uses no environment variables |

Not run here because they need a real browser: throttle to Slow 3G, throw inside the menu page, and the JavaScript disabled check. The last one will fail by design: the cart is in localStorage, so without JavaScript the browser has nothing to send.

## What moved from the Vite project

| Vite | Next.js |
| --- | --- |
| `App.jsx` routes, `Layout.jsx` | Folders under `src/app`, `app/layout.js` |
| `ErrorBoundary.jsx` | `app/error.js`, `app/menu/error.js` |
| `api.js` (`useMenuData`, `findDish`, cache) | `lib/menu.js`, read in server components |
| `data/dishes.js` | `lib/categories.js`, `lib/format.js`, `lib/fallbackDishes.js` |
| `Store/useCartStore.js` | `store/useCartStore.js`, fees moved to `lib/pricing.js` |
| Zod schemas inside the forms | `lib/schemas.js`, shared with the server |
| `RoyalDish.jsx` | `RoyalDish.jsx` (server) and `DishOrderPanel.jsx` (client) |
| `FullMenu.jsx` | `app/menu/page.js`, `MenuBrowser.jsx`, `DishCard.jsx`, `MenuCartBar.jsx` |
| `NotFound404.jsx` | `app/not-found.js` |
| CSS files | Copied unchanged, `index.css`, `Layout.css` and `App.css` merged into `globals.css` |

Not migrated because nothing used them: `Navbar.jsx`, `DishList.jsx`, `CheckoutForm.jsx`, `TodaySpecial/Container/*`, `Login/Main/*`, the unused `image.png`, and the specials loading from `specials.json`.

Fixed on the way:

- `useCartStore.js` imported `findDish` from an absolute `d:/IBT/...` path
- Imports used `../store/...` while the folder is `Store`, which works on Windows and breaks on Linux and Vercel
- `{ { count } && ... }` in the header was always true
- `<img src="">` in the logo was removed, `.logo-img` keeps its size

## Still open

- `<img>` tags: `next/image` is Day 43
- Title and metadata per route: Day 44
- Real sessions and protected routes at the edge: Day 42

## Build output

```
Route (app)                  Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├ ƒ /api/dishes
├ ƒ /api/dishes/[id]
├ ƒ /api/orders
├ ○ /cart
├ ƒ /checkout
├ ○ /login
├ ○ /menu                            1h      1y
├   /menu/[id]
│ ├ ● /menu/doro-wat
│ ├ ● /menu/siga-derek-tibs
│ ├ ● /menu/shiro-tegamino
│ └ ● [+11 more paths]
└ ○ /signup


○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```
