# Server and client boundary

Every component, which side it runs on, and why.

| File | Runs on | Why |
| --- | --- | --- |
| `app/layout.js` | Server | Owns `html` and `body`, passes children into `Providers`, imports nothing client except through `Providers` |
| `app/providers.jsx` | Client | `"use client"`. Context needs state, so the cart provider lives here and the layout stays on the server |
| `component/Header.jsx`, `Footer.jsx` | Server | Pure markup and links |
| `component/CartBadge.jsx` | Client | Reads the cart count from context. A tiny leaf inside the server header |
| `app/menu/page.js` | Server | `async`, awaits the dishes directly. No hooks, no loading flag, no error state |
| `app/menu/FilterShell.jsx` | Client | Holds the selected category. Receives the server `DishList` as `children`, it never imports it |
| `app/menu/CategoryBar.jsx` | Client by import | Buttons for the categories. It has no directive of its own, it joins the client bundle because `FilterShell` imports it |
| `component/DishList.jsx` | Server | Markup from data. Ships no JavaScript of its own |
| `component/AddToCartButton.jsx` | Client | `onClick` that writes to the cart. Receives a plain `dish` object, which can cross the boundary |
| `app/menu/[id]/page.js` | Server | `async`, `generateStaticParams`, `notFound()` |
| `app/cart/page.js` | Server | Only the heading |
| `component/CartList.jsx` | Client | Lists, removes and clears items from the cart context |
| `app/menu/error.js` | Client | `"use client"` is required, error boundaries need state |
| `app/checkout/page.js` | Server | Reads the `session` cookie with `cookies()` |

`"use client"` appears in 6 files: `providers.jsx`, `FilterShell.jsx`, `CartBadge.jsx`, `AddToCartButton.jsx`, `CartList.jsx` and `error.js`. All are small leaves, none sit on a page or a layout.

## How the filter works across the boundary

`FilterShell` cannot filter its `children`, because the server already rendered them. Each dish `li` in `DishList` has `data-category`, and when a category is selected `FilterShell` renders one `<style>` rule that hides every `.dish-item` with another category. The dishes stay server HTML, only the button state is client code.

## First Load JS for `/menu`

Measured with `npm run measure` after `npm run build`. Next.js 16 no longer prints sizes in the build table, so `scripts/first-load-js.mjs` adds up every script that `.next/server/app/menu.html` loads.

| | Before (whole page `"use client"`, `useEffect` loading and error state) | After (server page, client leaves) |
| --- | --- | --- |
| Scripts | 9 | 9 |
| Raw | 564.2 kB | 563.5 kB |
| Gzip | 173.9 kB | 173.6 kB |
| Dishes in the HTML | No, only "Loading..." | Yes, all 7 |
| HTML size | 9.2 kB | 14.7 kB |

### What the difference means

- The JavaScript total barely moves, 0.3 kB gzip. About 170 kB of it is React and the Next.js runtime, which every route pays, and this menu is only 7 dishes. The saving grows with the number of dishes and with libraries that would otherwise be imported into the client
- The real gain here is the HTML. Before, the server sent an empty "Loading..." page and the browser had to download, run and fetch before any dish appeared, and a crawler saw no dishes. After, the dishes are already in the first response
- The `useEffect`, three state variables and the loading and error branches are gone from the menu page. `loading.js` and `error.js` hold those states now

## Rules used

- Start on the server and add `"use client"` only where something needs state, an event handler or context
- When a hook error appears, extract the interactive part into its own file instead of adding the directive to the page
- Pass server content into a client shell as `children`, never import it
- Props crossing the boundary are plain data. `DishList` passes a `dish` object, never a function
