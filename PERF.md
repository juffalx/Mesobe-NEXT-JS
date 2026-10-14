# Performance and environment (Day 43)

## What I could and could not measure

I ran `npm run build` and `npm run start` (never the dev server) and measured the weight of the page. **I did not run Lighthouse**, so LCP, CLS and INP below are empty on purpose. Fill them in from Chrome (Lighthouse, Slow 4G, 4x CPU slowdown) before you hand this in. The "before" commit is `snapshot of current main` plus the Day 41 and 42 commits, so to measure it:

```
git checkout 'day41 DATA.md and docs'      # or the last Day 42 commit
npm run build && npm run start
```

and then `git checkout main` for the "after" run.

The repo has no dish photos (see README). For the numbers I copied `menu-1.jpg` to `menu-14.jpg` from `public/asset` to the dish file names, about 800 kB each, 1376 x 768. If your real photos are different, your numbers will be different, so run the commands below again.

## Measured: weight of the page (production build, curl, no browser)

| | Before (`<img>`) | After (`next/image`) |
| --- | --- | --- |
| `/menu`, 8 dish photos, phone with 2 columns (640 px wide file) | 6,391 kB | 316 kB as WebP, 324 kB as JPEG |
| `/menu/doro-wat`, main photo on a 390 px phone (1200 px wide file) | 822 kB | 88 kB as WebP |
| One dish photo, by width asked | 822 kB | 384 px: 18 kB, 640 px: 43 kB, 828 px: 64 kB, 1080 px: 98 kB |
| First Load JS of `/menu`, gzip (`npm run measure`) | 183.0 kB | 188.5 kB |

The image weight is about 20 times smaller. First Load JS got 5.5 kB bigger, because search results are rendered on the client now (Day 41) and the dish card with `next/image` is part of that bundle. The fonts are the other new cost: Inter is 48 kB and Playfair Display is 38 kB as woff2 files, preloaded. Before, the site used system fonts (Georgia and Segoe UI) and there was no font request at all. So the fonts are a design choice that costs bytes. What `next/font` gives is no request to Google and a fallback font with matching metrics, so the swap should not move the page.

The "after" numbers depend on the `sizes` value. If `sizes` is missing the browser takes the biggest file.

## What changed and why

| Change | Where | Why |
| --- | --- | --- |
| `<img>` to `Image` with the real ratio (1376 x 768) and `sizes` | `DishCard`, `RoyalDish`, cart, checkout summary, 404 | Smaller files, WebP, `srcset`, lazy loading, space reserved so the page does not jump |
| `priority` on the main photo of the dish page only | `RoyalDish.jsx` | It is the biggest image above the fold. The menu cards stay lazy |
| `img.img-box { height: auto; object-fit: cover }` | `globals.css` | `width` and `height` attributes must not stretch the picture. `cover` keeps the min-height boxes from squashing it |
| Login picture with `width={0} height={0}` and `sizes` | `Login.jsx` | `/login-image.png` is not in this repo, so I do not know its size |
| Inter and Playfair Display with `next/font/local` | `src/app/fonts.js`, `layout.js` | Files are in the repo (`src/app/fonts`, SIL Open Font License) and served from this site. No Google request, not even at build time |
| `.env.example`, `.env`, `.gitignore` uses `.env*.local` | project root | The old line `.env*` also ignored `.env.example` |
| `STAFF_PHONE` and `STAFF_PASSWORD` from the environment, checked with zod when the server boots | `lib/env.js`, `instrumentation.js` | The staff password was written in the code on Day 42 |
| Security headers | `next.config.mjs` | Static rules belong in config, not in the proxy |

## Not needed here

- **Remote images**: none. All photos are in `public/asset`, so `remotePatterns` is not set. If you move photos to a CDN, add the host to `images.remotePatterns` or the build fails.
- **Third-party scripts**: none in the app, so there is nothing to move to `next/script`.
- **Font link tag**: there was none. The site used system fonts.

## Fill in from Lighthouse (Slow 4G, 4x CPU, production build)

| | LCP | CLS | INP | Page weight |
| --- | --- | --- | --- | --- |
| Before | | | | |
| After | | | | |

What I expect the biggest cause to be: the dish photos on `/menu` before, and nothing obvious after. Check the Lighthouse opportunities list to see if I am wrong.

## Environment

| File | In git | What goes in it |
| --- | --- | --- |
| `.env` | yes | Settings that are not secret (`STAFF_PHONE`) |
| `.env.example` | yes | Every variable, with dummy values |
| `.env.local` | no | Your own secrets (`STAFF_PASSWORD`) |
| Platform settings | no | The real secrets in production |

Checks before deploying:

- Every variable is set on the platform: `STAFF_PASSWORD` is required in production, the server stops at start up if it is missing.
- No secret starts with `NEXT_PUBLIC_`: there are no `NEXT_PUBLIC_` variables.
- `.env*.local` is in `.gitignore`: yes.
