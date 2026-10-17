# Authentication and protection (Day 42)

## How sign in works here

1. The form posts the phone number and password to the `signIn` server action.
2. `checkUser` in `lib/users.js` compares the password with the stored scrypt hash. A wrong phone and a wrong password give the same message.
3. `createSession` in `lib/session.js` makes a random id, keeps the user in a server-side map (a database session) and sets the `session` cookie with the id.
4. The browser sends the cookie on every request.
5. `getSession()` reads the cookie and returns the user, or `null`.
6. `signOut` deletes the session from the map and clears the cookie.

Cookie flags: `httpOnly`, `sameSite: 'lax'`, `secure` (on in production, off in dev so plain `http://localhost` still works), `maxAge` 7 days.

Users and sessions are kept in memory, so a server restart signs everyone out and removes accounts made with sign up. One staff account is created the first time someone signs in or up. Its phone and password come from `STAFF_PHONE` and `STAFF_PASSWORD` (see `.env.example`). In development the password defaults to `kitchen123`. In production the server refuses to start without `STAFF_PASSWORD` (`src/instrumentation.js` checks the environment when the server boots).

I chose a database session (the cookie holds an id) because it can be cancelled at once. The trade is one lookup per request.

## Layers per route

Next.js 16 renamed `middleware.js` to `proxy.js` (same idea, the function is called `proxy`). It sits in `src/proxy.js`, beside `app/`. The matcher is `/checkout/:path*`, `/orders/:path*` and `/kitchen/:path*`.

| Route or action | Proxy | Page | Action or data function | What each layer proves |
| --- | --- | --- | --- | --- |
| `/menu`, `/menu/[id]` | none | none | none | Public on purpose |
| `/checkout` | cookie exists and looks like a session id | `getSession()`, redirect to `/login?next=/checkout` | `placeOrder` checks the session again | Proxy: skip the work. Page: the right screen. Action: the real check |
| `/orders` | same | `getSession()` | `getOrdersFor(session.phone)` | The query is scoped to the session phone, no id comes from the request |
| `/orders/[id]` | same | `getSession()`, `notFound()` | `getOrder(id)` only returns an order whose owner is the session phone | Someone else's order is a 404 |
| `cancelOrder` | not applied (an action can be called without the page) | | session, then ownership, then status | 401 not signed in, 404 no such order, 403 not yours, 409 too late |
| `/kitchen` | same | `getSession()` | `getKitchenOrders()` returns `null` unless `session.role === 'staff'` | The role is checked where the data leaves, not in the markup |

The proxy only proves that a cookie exists. It cannot tell if the session is real, because it does not read the session map.

## Return to the page after sign in

The proxy sets `next` to the path the person wanted. After sign in, `nextPath()` accepts it only if it starts with `/` and does not start with `//` or `/\`. Anything else goes to `/`.

## The three attacks (run against `next start`)

| Attack | Result |
| --- | --- |
| Open `/checkout`, `/orders`, `/orders/MH-111111`, `/kitchen` with no cookie | 307 to `/login?next=...` |
| Send a cookie that is not a session id (`session=abc`) | 307 to `/login` |
| Call `placeOrder` and `cancelOrder` with a made-up but well-formed session id | `401` from the action itself. The proxy is not involved |
| Cancel another user's order | `403 This order is not yours`. Order stays active |
| Read another user's order at `/orders/MH-...` and `/api/orders/MH-...` | 404 both |
| Open `/kitchen` as a customer | 307 to `/` |
| Cancel the same order twice | second call is `409` |
| `?next=` with `https://evil.com`, `//evil.com`, `/\evil.com`, `javascript:alert(1)` | all go to `/` |
| Wrong password, unknown phone | same error message for both |
| Sign up with a phone number that exists | refused |

## Not covered yet

- No rate limit on sign in. Someone could try passwords without limit.
- No password reset.
- Sessions are lost when the server restarts.
- There is no sign in link for staff in the header. Staff go to `/kitchen` directly.
