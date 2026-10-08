# Rendering strategy for Addis Eats

For every route two questions: does it depend on who is asking, and how stale may it be?

| Route | Strategy | Why |
| --- | --- | --- |
| `/` | Static | The welcome text never changes between builds |
| `/menu` | ISR, `revalidate = 3600` | Dishes change a few times a day, so an hour old is fine and speed matters most |
| `/menu/[id]` | Static via `generateStaticParams` | The ids are known at build time: one page per dish and one per category. `dynamicParams = false` makes anything else a real 404 |
| `/cart` | Static shell with a client leaf | `page.js` is a server component, `CartList` is client and reads the cart context, because the cart is the person's own private state |
| `/checkout` | Dynamic | Reads the `session` cookie with `cookies()`, and `checkout/layout.js` also sets `dynamic = 'force-dynamic'` for everything under it |
| `/docs/[[...slug]]` | Dynamic | Optional catch-all with no `generateStaticParams`, so the build cannot know the paths |
| `/order/history` | Static for now | A placeholder. Once it shows a real person's orders it must become dynamic |
| `/products`, `/products/electronics`, `/test` | Static | Placeholders from Day 36 with nothing request specific |

## Which read forces checkout to be dynamic

`await cookies()` in `app/checkout/page.js`. The response now depends on the request, so the page cannot be built ahead of time. The layout's `force-dynamic` states the same rule for every route added under checkout later.

## Layouts

- `app/layout.js` owns `html` and `body`, imports `globals.css` and renders the header, the page and the footer
- `app/menu/layout.js` adds the category sidebar for every route under `/menu`. It stays mounted when you go from `/menu` to `/menu/kitfo`, so only the page changes
- The sidebar categories link to `/menu/breakfast`, `/menu/main-dishes` and `/menu/drinks`. They are path segments, not `?category=`, because `searchParams` would make the route dynamic and lose the static speed

## Streaming

- `menu/page.js` awaits the dishes itself, and `menu/loading.js` shows the skeleton while it waits, so the sidebar renders first
- `getDishes` waits 800 ms on purpose so the skeleton is visible in `npm run dev`. In the production build the page is already static, so nothing streams
- `menu/loading.js` covers the whole segment while a dish page loads

## Build output

```
Route (app)                Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├ ○ /cart
├ ƒ /checkout
├ ƒ /docs/[[...slug]]
├ ○ /menu                          1h      1y
├   /menu/[id]
│ ├ ● /menu/firfir
│ ├ ● /menu/chechebsa
│ ├ ● /menu/doro-wat
│ └ ● [+7 more paths]
├ ○ /order/history
├ ○ /products
├ ○ /products/electronics
└ ○ /test


○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

- ○ Static: `/`, `/cart`, `/menu` (revalidates every 1h), `/order/history`, `/products`, `/products/electronics`, `/test`
- ● SSG: `/menu/[id]`, 10 pages: 7 dishes and 3 categories
- ƒ Dynamic: `/checkout`, `/docs/[[...slug]]`
