# Server and client boundary

Every component, which side it runs on, and why.

| File | Runs on | Why |
| --- | --- | --- |
| `app/layout.js` | Server | Owns `html` and `body`, passes children into `Providers` |
| `app/providers.jsx` | Client | `"use client"`. Rehydrates the cart and auth stores from localStorage after mount, renders `children` untouched |
| `component/Header/Header.jsx`, `Logo.jsx`, `Nav.jsx` | Server | Markup and links only |
| `component/Header/LogoLink.jsx` | Client | The logo goes to `/menu` or `/login` depending on the auth store |
| `component/Header/CartForm.jsx` | Client | Reads item count, subtotal and the user from the stores, and logs out |
| `component/Footer/*` | Server | Markup from `lib/footerLinks.js` |
| `app/page.js`, `TodaySpecial.jsx`, `Section4-6.jsx` | Server | Static text, one dish read at build time |
| `component/common/AddToCartButton.jsx` | Client | `onClick` that writes to the cart store. Receives a plain `dish` object. Used on the home page, the menu cards and the 404 page |
| `app/menu/page.js` | Server | `async`, awaits the dishes directly, `revalidate = 3600` |
| `component/FullMenu/MenuBrowser.jsx` | Client | Holds the search text and the selected category |
| `component/FullMenu/DishCard.jsx` | Server | Card markup. It reaches the client filter as an element inside the `cards` prop |
| `component/FullMenu/MenuCartBar.jsx` | Client | Reads the cart store. Mounted by `menu/layout.js` |
| `app/menu/layout.js` | Server | Passes `children` through and mounts the bar |
| `app/menu/[id]/page.js` | Server | `async`, `generateStaticParams`, `notFound()` |
| `component/RoyalDish/RoyalDish.jsx` | Server | Gallery and story half of the dish page |
| `component/RoyalDish/DishOrderPanel.jsx` | Client | Option, quantity and side state, and the add button. The price in the title changes with the options |
| `app/cart/page.js` | Server | Only renders the client leaf |
| `component/CurrentOrderCart/CurrentOrderCart.jsx` | Client | Lists, changes and clears items, applies the coupon, all from the cart store |
| `app/checkout/page.js` | Server | Reads the `session` cookie through `getSession()` and redirects guests |
| `component/CheckoutDelivery/CheckoutDelivery.jsx` | Client | react-hook-form, the Telebirr verify step, and the call to the `placeOrder` action |
| `component/Login/Login.jsx`, `Signup/Signup.jsx` | Client | react-hook-form forms that call the `signIn` and `signUp` actions |
| `component/NotFound404/NotFound404.jsx` | Server | `async`, picks three favourite dishes from the data |
| `app/error.js`, `app/menu/error.js` | Client | `"use client"` is required, error boundaries need state |
| `app/actions.js` | Server only | `"use server"`. `signIn`, `signUp`, `signOut`, `placeOrder`. Every one of them is a public endpoint and validates its input |
| `lib/menu.js`, `lib/session.js`, `lib/orders.js` | Server only | `import 'server-only'`, so importing them from a client file breaks the build |
| `lib/schemas.js`, `pricing.js`, `format.js`, `categories.js` | Shared | Plain functions and data with no server or client API. The forms and the server use the same schemas and the same price function |

`"use client"` appears in 13 files: `providers.jsx`, `LogoLink`, `CartForm`, `AddToCartButton`, `MenuBrowser`, `MenuCartBar`, `DishOrderPanel`, `CurrentOrderCart`, `CheckoutDelivery`, `Login`, `Signup` and the two `error.js` files. None of them sits on a page or a layout.

Eleven are interactive. Three are forms that need react-hook-form, three read the cart store (cart page, bar, header), and the rest are the providers, one button, one filter, one option panel and the logo link.

## Composition pairs

| Client component | Server content it receives | How |
| --- | --- | --- |
| `Providers` | The whole app | `children` |
| `MenuBrowser` | `DishCard` for every dish, and the page heading | `cards[].node` (an element inside a prop) and `children` |
| `AddToCartButton` | Its label | `children` |
| `MenuLayout` mounts `MenuCartBar` | The page | `children` |

`MenuBrowser` has to filter, so `children` alone would not work. The server builds a `{ id, cat, name, node }` list where `node` is the rendered `DishCard`, and the client decides which of those to show. The client never imports `DishCard`.

## Cart and prices

- The cart lives only in the client store until checkout. `placeOrder` receives `{ id, option, optionPrice, qty }` per line and the coupon code, never a price
- The server looks up each dish price, adds the option price (validated as a whole number from 0 to 200), applies the same `priceCart` function as the browser, and returns the order number

## First Load JS for `/menu`

Measured with `npm run measure menu` after `npm run build`. Before is the Day 35 Vite build of the same project (`vite build`, scripts that `index.html` loads plus the `/menu` chunk). Both were measured without `public/menu.json`, so both use the built-in fallback dishes.

| | Before (Vite SPA) | After (Next.js) |
| --- | --- | --- |
| Scripts | 3 | 11 |
| Raw | 373.0 kB | 571.4 kB |
| Gzip | 114.3 kB | 176.9 kB |
| Dishes in the HTML | No, the page fetches `/menu.json` after it loads | Yes, all 14 |
| HTML size | 0.5 kB | 51.8 kB |

### What the difference means

- The JavaScript went up by about 62 kB gzip. Most of that is the Next.js runtime that every route pays, the same result as the Day 38 menu
- In the Vite build, `CartForm` imported `Login` and `Signup` directly, so zod and react-hook-form were inside the entry file that every page downloads. In Next.js `/menu` does not load them at all. They only arrive on `/login`, `/signup` and `/checkout`
- The login page is the heaviest route now (278.5 kB gzip) because react-hook-form, the zod resolver and zod are all client code there
- The real gain is the HTML. The menu is in the first response, there is no `useEffect` fetch waterfall, and `useMenuData`, the cache and the loading flag are gone

## Rules used

- Start on the server and add `"use client"` only where something needs state, an event handler or a store
- Pass server content into a client component as `children` or as elements in props, never import it
- Props crossing the boundary are plain data. `DishCard` passes `{ id, forImg, name, price }` to the button, never a function
- Anything that touches cookies, files or the menu data starts with `import 'server-only'`
