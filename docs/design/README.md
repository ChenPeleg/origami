# Design: Birch & Washi

Status: **final style, chosen by the owner.** It is Workbench variation 3C. Everything in an older style is in [archive/](archive/).

## In the app

The style is implemented in the React app. The tokens (colors, fonts, shadows, the 760px breakpoint) and the pattern utilities (washi tape, ruler, birch table) are in [`src/index.css`](../../src/index.css). The building blocks are `AppButton`, `AppPaperScrap`, `AppWashiTape`, `AppProgressBar` and `AppHandNote` in [`src/common/`](../../src/common/README.md).

GitHub Pages serves the app. The demo below stays the style reference and is published next to the app as `mockup.html`.

## Demo

**[demo.html](demo.html)** is the reference for the style. It is one HTML file with no build step: open it in a browser.

It contains:
- **Navigation:** a top bar with Catalog, Search and the language switch. Below 760px the links move into a menu button.
- **Two guides, complete:** Paper Cup (5 steps) and Puppy Face (4 steps), each with a cover, an overview, every folding step and a completion screen.
- **Screens:** catalog, search (empty, results, no results), guide overview, folding step, completed.
- **Responsive layout:** mobile first, desktop from 760px.
- **Hebrew (RTL) and English.** UI arrows mirror. Fold diagrams never mirror.
- **Saved progress** per guide (in `localStorage`), keyboard arrows for Back and Next, visible focus, reduced-motion support.

The demo loads its three fonts from Google Fonts. Offline it falls back to system fonts.

## The style

**Meaning.** Folding is something you do with your hands, on a table. The app looks like a modern craft studio: a pale birch table, paper scraps held by patterned washi tape, pencil marks and handwritten tips.

| Token | Value | Use |
|---|---|---|
| Birch (table) | `#E9D6B4` | page background, with a soft light gradient and no grain lines |
| Scrap paper | `#FFFDF8` | every content surface, and the navigation bar |
| Paper shade | `#F3EEE2` | cover and diagram backgrounds |
| Ink | `#2B2118` | text, button borders and shadows |
| Muted ink | `#55432F` | secondary text |
| Coral | `#C8452A` | actions, progress, fold arrows |
| Teal | `#1F7A7A` | fold lines, handwritten tips, focus ring, current step |
| Mustard | `#E8B94A` | tape decoration only, never text |

- **Type:** *Secular One* for headings and buttons, *Assistant* for reading text, *Amatic SC* only for short handwritten notes. All three support Hebrew.
- **Scraps:** content sits on off-white paper with a soft shadow and square corners.
- **Washi tape:** three patterns only: coral stripes, teal dots, mustard bands, with torn ends.
- **Buttons:** square, 2px ink border, hard offset shadow, like cut card. The primary button is coral.
- **Progress:** a ruler-style bar with tick marks.
- **Fold notation:** valley = dashed teal line, mountain = dash-dot teal line, direction = coral arrow, "fold behind" = dotted coral arrow. Meaning never depends on color alone.
- **Rotation** of scraps is decoration. It is on only from 760px and only when reduced motion is off. The reading layout and focus order stay straight.

## Files

| Path | What |
|---|---|
| `demo.html` | the style reference (this style, all screens) |
| `sample-*.svg` | the first sample illustrations from the PRD round (Q-7). They predate this style; the demo draws its own diagrams. |
| `archive/mockups-v1/` | the first screen mockups in the old generic style. Still valid for flows and the US/AC mapping, not for the look. |
| `archive/style-options/round-1/` | the five style systems. Workbench was chosen. |
| `archive/style-options/round-2/` | the four Workbench variations, with the 3C board: [03c-workbench-birch-washi.png](archive/style-options/round-2/03c-workbench-birch-washi.png). |
