# Design samples (Origami Guides App)

Status: **draft for owner review** (PRD Q-7, AC-37, AC-48). Nothing here changes `docs/prd.md`.
Guide names, step counts and progress states in the mockups are fictional placeholders. No personal data is used.

## Sample SVG illustrations (US-11a, AC-44..48)

| File | Bytes | Alt text (English) | Alt text (Hebrew) |
|---|---|---|---|
| `sample-step-fold-in-half.svg` | ~1.1 KB | Square paper with a dashed valley-fold line across the middle and an arrow folding the top half down. | נייר מרובע עם קו קיפול עמק מקווקו באמצע וחץ המקפל את החצי העליון כלפי מטה. |
| `sample-cover-paper-boat.svg` | ~0.9 KB | Finished paper boat floating on water, with a triangular sail and a trapezoid hull. | סירת נייר גמורה צפה על המים, עם מפרש משולש וגוף טרפזי. |

- Both: `viewBox="0 0 320 240"`, no `<text>`, far below the 20 KB limit, colours via CSS variables with fallbacks.
- RTL-safe: fold diagrams are never mirrored (AC-30). Only UI arrows (Back/Next) mirror.
- Notation key: valley fold = dashed line; mountain fold = dash-dot line; paper sides are told apart by fill, not colour alone.

## Screens

Naming: `<screen>-<mobile|desktop>-<he|en>.png`. Mobile is 390 px wide, desktop 1280 px wide. Hebrew is RTL.

| Screens (mobile/desktop x he/en) | User stories | Acceptance criteria |
|---|---|---|
| `catalog-*` (guide list with difficulty badges, progress state, language switch) | US-1, 3, 4, 6, 7, 8, 9 | AC-1, 4, 7, 52 |
| `overview-*` (guide overview) | US-1, 3, 9 | AC-2, 7, 52 |
| `step-*` (step view: picture, text, progress bar, jump-to-step, Back/Next) | US-2, 5, 6, 7, 9 | AC-30, 35, 52 |
| `completed-*` (completion, restart, clear progress) | US-9 | AC-52 |

The language switcher (44 px segments) appears on every screen (AC-52). Difficulty uses dots plus a text label, not colour alone (AC-7). The reserved 3D container (AC-35) is an empty, hidden element and so is invisible in the images.

## Sources and re-rendering

`src/mockup.html` (takes `?lang=he|en&screen=catalog|overview|step|completed`) and `src/frame.html` (fixes the viewport width) are the sources. PNGs are headless Edge screenshots of them.

## For the owner to review

1. The SVG style and notation key (AC-47, AC-48, Q-7) and the choice of the two sample models.
2. The "clean, simple, modern" sign-off on all four screens in he and en (AC-37).
3. Hebrew font choice (A-24): mockups use a system fallback stack, not final Heebo/Assistant.
4. The clear-progress confirmation dialog is not drawn; only the button appears (P-4).
5. Tulip and Crane cards reuse the sample step image as a placeholder cover.
6. Q-8 (browser list) remains open; PRD approval remains pending.
