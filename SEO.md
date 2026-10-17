# Metadata and discovery (Day 44)

## What is set where

| Route | Title | Description | Extras |
| --- | --- | --- | --- |
| Root layout | Template `%s · Mesob House`, default title | Site description | `metadataBase`, Open Graph site name and locale |
| `/` | Default title | Own description | Canonical `/`, Restaurant JSON-LD, sitemap priority 1 |
| `/menu` | Menu | Own description | Canonical `/menu`, still ISR (hourly) |
| `/menu/[id]` | The dish name | `name, price ETB. description` from the dish | `generateMetadata`, canonical, generated 1200 x 630 preview image, MenuItem JSON-LD |
| `/cart`, `/checkout`, `/orders`, `/orders/[id]`, `/kitchen`, `/login`, `/signup` | Short title | none | `noindex`, and `Disallow` in `robots.txt` |
| `/sitemap.xml` | | | Home, `/menu` and every dish, from `getDishes()` |
| `/robots.txt` | | | Allows `/`, disallows private routes and `/api/`, points to the sitemap |

`NEXT_PUBLIC_SITE_URL` (in `.env` and `.env.example`) is the base address. It is copied into the build, so on the platform set it to the real address **before** building. If it is wrong, the preview image, canonical links, sitemap and JSON-LD all point to the wrong site.

The site-wide preview (`app/opengraph-image.jsx`) and the one for each dish (`app/menu/[id]/opengraph-image.jsx`) are drawn with `ImageResponse`. They are made on request, not at build time.

## Checked on my machine (`npm run build` then `npm run start`)

| Check | Result |
| --- | --- |
| `/robots.txt` | 7 private paths disallowed, `Sitemap:` line present |
| `/sitemap.xml` | 16 URLs: home, `/menu` and 14 dishes. No private routes |
| `/menu/doro-wat` source | `<title>Royal Doro Wat · Mesob House</title>`, description with name and price, canonical, `og:title`, `og:description`, `og:url`, `og:image` (1200 x 630) and `twitter:card` |
| `/menu/doro-wat/opengraph-image` | 200, `image/png`, about 48 kB, looks right |
| JSON-LD | `MenuItem` price is 650 ETB, the same number the page shows. `Restaurant` has only facts that are on the home page |
| `<h1>` count on `/`, `/menu`, `/menu/doro-wat`, `/login`, `/signup` | 1 each. The logo and the footer brand used to be `h1` too, so there were 2 or 3 per page |
| `/cart` and `/orders/...` as a guest | `noindex, nofollow` |

Every one of these URLs said `http://localhost:3000`, because that is what `.env` says. This proves the tags exist. It does **not** prove they work on the internet.

## To do on the deployed site

1. Set `NEXT_PUBLIC_SITE_URL` on the platform, then build.
2. Open the dish page, view source, and check that `og:image` starts with your real address.
3. Paste a dish link in Telegram, or a preview debugger, and look at the card.
4. Open `/sitemap.xml` and `/robots.txt` on the live address.
5. Platforms keep a preview for days. If you change the design, test with a different dish link.

## Notes

- The dish JSON-LD uses `dish.price`. The page shows the same number before any extra option is chosen.
- The old test routes (`/products`, `/docs`, `/test`, `/menu/Test`) are not in the sitemap. They have no metadata. Delete them before you present.
- A title is the dish name first and the brand after, as in the slide, so it stays short.
