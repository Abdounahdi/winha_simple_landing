# وينها! — Winha landing

Next.js 16 (App Router) + Sass. The page is the greeting screen: on entry,
Winha card symbols cut through a single medallion in the centre of the
screen — one replacing the last, no dissolve — winding up, blurring through a
flat-out stretch, dragging to a halt, and landing on the wordmark. The greeting
then lifts away to reveal the hero underneath.

```bash
npm run dev
```

## Where things are

| Path | What |
|---|---|
| `src/components/GreetingScreen/cutSequence.ts` | **The timing.** All tuning constants live at the top of this file. |
| `src/components/GreetingScreen/GreetingScreen.tsx` | Drives the sequence, decoding, skip and hand-off. |
| `src/components/GreetingScreen/GreetingScreen.module.scss` | Medallion, ogee frame, reveal. |
| `src/components/Hero/` | The page the greeting reveals. |
| `src/styles/_tokens.scss` | Brand palette, type and easing. Bare `@use "tokens"` resolves via `sassOptions.loadPaths`. |
| `src/data/symbols.ts` | The 57 symbols, generated from `public/symbols/`. |

## Tuning the sequence

Everything that shapes the feel is in `cutSequence.ts`:

- `WIND_UP_CUTS` / `FLAT_OUT_CUTS` / `SLOW_DOWN_CUTS` — how many cuts each
  phase gets. Their sum is how many cuts a run makes — currently 27, drawn from
  the twelve-card intro deck in `introDeck.ts`, so it cycles that deck just over
  twice. **This is the lever for length** — see `FASTEST_MS`.
- `SLOWEST_START_MS`, `FASTEST_MS`, `SLOWEST_END_MS` — the gap at each end and
  at full speed. `FASTEST_MS` is four frames at 60fps, ~15 cards a second. Two
  frames is the technical floor — below that cuts share a display refresh and
  drop — but the useful floor is higher: the faster the run, the more it blurs
  into one texture rather than reading as a stack of distinct cards. Past about
  six frames it stops reading as a shuffle and becomes a slideshow. So a
  shorter sequence is bought by cutting fewer symbols, not by cutting them
  faster.
- `FINAL_HOLD_MS` — how long the last symbol sits alone before the wordmark.

`REVEAL_HOLD_MS` in `GreetingScreen.tsx` controls how long the wordmark holds
before the greeting lifts. `LEAVE_MS` there must match `$leave-duration` in the
stylesheet.

At the current settings the cuts run ~2.4s and the wordmark lands at ~2.7s;
the greeting has cleared the page by ~4.2s.
Click anywhere, or press Esc / Enter / Space, to skip to the wordmark.

## Assets

`public/symbols/` and `public/brand/` are generated, not hand-authored:

- Symbols come from `../winha_game_symbols` — alpha-trimmed, padded to a square
  so every symbol reads at the same optical size inside the medallion, resized
  to 512px and encoded as WebP. 188MB of source PNG becomes 3MB.
- The wordmark comes from the packaging artwork with its white ground knocked
  out, so it can sit on the pale ceramic field.

## Hero scatter

`SCATTER` in `src/components/Hero/Hero.tsx` holds 18 symbols placed in the
margins around the copy column, each with a `depth` that fades, shrinks and
softens the far ones so the group reads as layers. The list is ordered
most-iconic first and narrower viewports drop the tail (12 below 1100px, 8
below 820px, 6 below 640px) rather than rearranging it — so when adding a
symbol, put anything close to the centre column near the end.

## Motion preference

Under `prefers-reduced-motion: reduce` the cut sequence never starts — the
greeting renders at its end state, holds, and lifts.
