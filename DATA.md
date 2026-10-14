# Client data fetching (Day 41)

Server components still do every read that can be done on the server. SWR is only used where the person triggers the fetch or where the data must refresh on its own.

All queries use one fetcher: `src/lib/fetcher.js`.

| Query | Key | Refresh rule | Why |
| --- | --- | --- | --- |
| Order status | `/api/orders/${id}` | `refreshInterval` 5000 ms, stops when the status is `DELIVERED`. `fallbackData` is the order the server already rendered | The status changes while the person watches. After delivery nothing changes, so polling stops |
| Menu search and paging | `/api/dishes?q=${term}&cat=${cat}&page=${page}` | Default SWR rules (revalidate on focus and reconnect). `keepPreviousData: true` | The key holds everything the result depends on, so a new term, category or page is a new cache entry |
| Menu on arrival | no key, `null` | Not fetched | Page one comes from the server component, so no request is made until there is a search term or the person goes to page 2 |

## Decisions

- **Debounce 300 ms.** `useDebounce` waits until the person stops typing. Without it there is one request per key press.
- **`null` key.** When the search box is empty and the page is 1, the key is `null`. SWR does not fetch and the server cards are shown.
- **`keepPreviousData`.** The old list stays on screen while the next one loads, so the list does not flash empty between terms.
- **Race safety.** SWR shows the data that belongs to the current key. If "tib" answers after "tibs", the old answer is ignored.
- **Page size 8.** `/api/dishes` and `MenuBrowser` use the same number, so page one from the server and page one from the API are the same list.
- **No `staleTime`.** That is a TanStack Query setting. SWR has no staleTime, the nearest options are `dedupingInterval` (default 2 s) and `refreshInterval`. I left the defaults for the search and set `refreshInterval` only for the order status.

## Page number and the URL

The page number is part of the API query string (`/api/dishes?page=2`), so the API can be called and linked directly. The `/menu` address stays the same when the person changes page. `/menu` is a static ISR page (see `STRATEGY.md`). Reading `?page=` from the address bar would need `useSearchParams` and a Suspense boundary, and that would move the server-rendered cards out of the first HTML. Keeping the menu static was more important.

Only page one of the menu is in the server HTML. Dishes on page two are still reachable at `/menu/[id]`.

## Order page

`/orders/[id]` is a server component. It reads the session, loads the order with `getOrder(id)` (which only returns the order if it belongs to the signed-in phone number) and passes it to `OrderStatus` as `initial`. The person sees the real status on the first paint, with no spinner. SWR starts polling after hydration.
