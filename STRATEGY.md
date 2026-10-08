# Rendering strategy for Mesob House

For every route two questions: does it depend on who is asking, and how stale may it be?

| Route | Strategy | Why |
| --- | --- | --- |
| `/` | Static | Landing text is the same for everyone. The only data is one add-on dish, read once at build time |
| `/menu` | ISR, `revalidate = 3600` | Dishes change a few times a day, so an hour old is fine and speed matters most |
| `/menu/[id]` | Static via `generateStaticParams` | The dish ids are known at build time, one page per dish. `dynamicParams = false` makes any other id a real 404 |
| `/cart` | Static shell with a client leaf | The cart lives in this browser (localStorage), so the server cannot know it. `page.js` is a server component, `CurrentOrderCart` is the client leaf |
| `/checkout` | Dynamic | `getSession()` reads the `session` cookie with `cookies()`, so the answer depends on the request. `checkout/layout.js` also sets `force-dynamic` for anything added under it later |
| `/login`, `/signup` | Static shell with a client form | Same markup for everyone. The session cookie is set later by a server action, not while rendering |
| `/api/dishes`, `/api/dishes/[id]`, `/api/orders` | Dynamic (route handlers) | Called by something outside the pages. `POST` can never be static |
| not-found | Static | One 404 page for every unknown path and for `notFound()` |

## Which read forces checkout to be dynamic

`await cookies()` inside `lib/session.js`, called from `app/checkout/page.js`. The page redirects to `/login?next=/checkout` when there is no session, so it cannot be built ahead of time.

`getSession()` is only called from `checkout/page.js`, the `placeOrder` action and `api/orders`. It is deliberately not called from the root layout or the header. The header gets the user name from the client store, otherwise every route in the app would turn dynamic.

## One route that changed once the sentence was written

`/checkout`. The first guess was static, because the form markup is the same for everyone. Writing the reason showed that the guard decides what the person sees (the form or a redirect to login), so the page depends on the request and has to be dynamic.

## Layouts

- `app/layout.js` owns `html` and `body`, imports `globals.css` and renders `Providers`, the header, the page and the footer
- `app/menu/layout.js` adds the cart bar for every route under `/menu`. It stays mounted when you go from `/menu` to `/menu/doro-wat`, so the bar keeps its place and only the page changes
- `app/checkout/layout.js` only sets `dynamic = 'force-dynamic'`

## Streaming and special files

- `menu/page.js` awaits the dishes itself and `menu/loading.js` covers the segment while it waits. In the production build `/menu` is already static, so the loading file only shows on a cold regeneration or in dev
- `app/error.js` and `app/menu/error.js` are client components (error boundaries need state). The header, footer and cart bar sit in layouts above them, so they survive an error
- `app/not-found.js` renders for unknown paths and for `notFound()` in `menu/[id]`

## Redirects from the Vite routes

| Old route | New route |
| --- | --- |
| `/orderCart` | `/cart` |
| `/delivery`, `/Delibery` | `/checkout` |
| `/future` | `/` |

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

- ○ Static: `/`, `/cart`, `/login`, `/signup`, `/menu` (revalidates every 1h)
- ● SSG: `/menu/[id]`, 14 pages, one per dish
- ƒ Dynamic: `/checkout` and the three route handlers
