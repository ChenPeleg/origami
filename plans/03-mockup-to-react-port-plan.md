# Plan: port the Birch & Washi mockup into the React app

Status: **implemented.** Progress is tracked in [section 9](#9-order-of-work); what changed while building is in [section 11](#11-implementation-notes). Source of truth for the look and behaviour is [`docs/design/demo.html`](../docs/design/demo.html) (the page GitHub Pages serves today). Source of truth for requirements is [`docs/prd.md`](../docs/prd.md).

## 1. Goal and scope

Rebuild the five mockup screens (catalog, search, guide overview, folding step, completed) as React pages with the same look, content, RTL behaviour, keyboard support and saved progress.

In scope: components, services, models, hooks, routes, styling tokens, tests and stories for the above.

Not in scope (listed in section 10): the PRD features the mockup does not show (sortable catalog table, 4 guides, clear-progress dialog), and deleting the old activity-approval code.

## 2. What the mockup contains

| Mockup part (`demo.html`) | What it does |
|---|---|
| `T` | 44 UI strings, in `en` and `he` |
| `GUIDES` + geometry constants | 2 guides (cup: 5 steps, puppy: 4 steps). Each has name, description, alt text, paper colors, tape pattern, minutes, a final diagram and per-step text, tip and diagram |
| `draw()` | Turns a diagram description into SVG: projects points, draws polygons, fold lines, curved arrows with heads, dots, eyes, nose |
| `store`, `progress`, `lang` | `localStorage` for language and the current step of each guide |
| `results()` | Search: substring match over name and description in both languages; three states (hint, results, no results) |
| `vCatalog`, `vSearch`, `vGuide`, `vStep`, `vDone` | The five screens |
| `chrome()`, `setMenu()` | Navbar, language button, mobile menu, footer, `lang`/`dir` on `<html>` |
| `render()` | Hash router, step clamping, progress writes, document title, scroll to top and focus on the `h1` |
| `keydown` handler | Arrow keys for Back/Next (swapped in RTL), Escape closes the menu |
| CSS | Tokens, cut-card buttons, paper scraps, washi tape, ruler progress bar, fold notation, 760px breakpoint, rotation only with motion allowed |

## 3. Reuse map

| Existing piece | Decision | Notes |
|---|---|---|
| `AppButton` (`src/common`) | **Reuse, restyle** | Its `as` prop already covers link buttons (`as={Link}`). Only the class maps change: `primary` = coral, `secondary` = scrap paper, sizes `sm` (44px) and `md` (48px). API stays the same. |
| `AppInput` | **Reuse, restyle default** | Used for the search field with `type="search"`. |
| `Navbar` (`src/components`) | **Rewrite in place** | Same file and role, new content. |
| `MainLayout` | **Rewrite in place** | Skip link, navbar, `<main>`, footer. |
| `TranslationService`, `useTranslate`, `useLanguage` | **Reuse, extend** | Add parameters, direction, saved language. See 5.1. |
| `LocalStorageService` | **Reuse as is** | The only door to `localStorage` (AC-17). |
| `WindowService` | **Reuse, extend** | Add `navigator.language`, `document.title`, `scrollTo` to `WindowLike` and to `WindowMock`. |
| `GlobalState` | **Reuse, trim** | Keeps `language`. `theme` goes away with the dark-mode toggle (the mockup has no dark mode; AX-9 says optional). |
| Services DI (`ServicesProvider`, `useService`, `injectedServices`, test bed) | **Reuse as is** | New services register in `injectedServices.ts`. |
| `AppModal` | Not used now | Ready for the PRD clear-progress confirmation (AC-16). |
| `AppDropdown`, `AppSelect` | **Not used** | The mobile menu is a list of navigation links with `aria-expanded` (AC-54), not a `role="menu"`. The language switch is one button, not a select. |
| `AppToast`, `AppTooltip`, `AppPopover`, `AppAccordion`, `AppMultiList`, `AppFormField`, `AppDateInput`, `AppTextArea` | Not used | Left untouched. |

## 4. Foundations

### 4.1 Design tokens (Tailwind v4, `src/index.css`)

Add a `@theme` block so every value is a normal utility:

- Colors: `table` `#E9D6B4`, `scrap` `#FFFDF8`, `shade` `#F3EEE2`, `ink` `#2B2118`, `muted` `#55432F`, `coral` `#C8452A`, `teal` `#1F7A7A`, `mustard` `#E8B94A`.
- Fonts: `font-display` (Secular One), `font-body` (Assistant), `font-hand` (Amatic SC).
- Shadows: `shadow-cut` (3px 3px 0 ink), `shadow-cut-hover`, `shadow-cut-press`, `shadow-scrap`.
- Breakpoint: set `--breakpoint-md` to `47.5rem` (760px) so `md:` matches the mockup.

Add a few `@utility` rules for things utilities cannot express readably. This is the "unavoidable custom CSS" case:

- `tape-stripes`, `tape-dots`, `tape-bands` (the three washi patterns), `tape-torn` (the torn-end `clip-path`).
- `bg-ruler` (tick marks of the progress bar), `bg-birch` (page gradient).

Add to `@layer base`: body font and color, and the global `:focus-visible` outline (3px teal).

Everything else is plain utilities: logical properties (`ms-*`, `me-*`, `start-*`), `rtl:` for the tip rotation, and `md:motion-safe:` for scrap rotation.

### 4.2 `index.html`

Add the Google Fonts links from the mockup, set the title to the app name, and start with `lang="en" dir="ltr"` (the language hook corrects it on load).

### 4.3 Routing

| Path | Page |
|---|---|
| `/` | `CatalogPage` |
| `/search` | `SearchPage` |
| `/guide/:guideId` | `GuideOverviewPage` |
| `/guide/:guideId/step/:stepNumber` | `GuideStepPage` |
| `/guide/:guideId/done` | `GuideDonePage` |
| anything else, or an unknown guide | redirect to `/` (same as the mockup) |

Switch `BrowserRouter` to `HashRouter` and set Vite `base: './'`. This keeps the mockup URLs and meets TC-4 / AC-20 (deep links reload on a static host under a sub-path, such as GitHub Pages, with no rewrites).

### 4.4 App shell

`App.tsx` keeps `ServicesProvider` and `GlobalStateContextProvider`. Remove `UserProvider`, `AppModalNotice`, `ReactQueryProvider`, `ToastProvider` and the `useAppInit` call from the tree. This is required, not cleanup: today `AppModalNotice` opens a "session expired" modal whenever there is no logged-in user.

## 5. Services

All services extend `AbstractBaseService`, are registered in `injectedServices.ts`, and get a test file in `test/services/`. Components call them through `useService`. Components hold no rules of their own.

### 5.1 `TranslationService` (extend)

| Method | Purpose |
|---|---|
| `t(key, lang, params?)` | Adds `{name}` placeholders, so "Step {n} of {total}" is one string, not a concatenation |
| `tl(text: LocalizedText, lang)` | Picks the language from guide content |
| `getDirection(lang)` | `'rtl' \| 'ltr'` (moves out of `useLanguage`) |
| `getNextLanguage(lang)` | The language the toggle button switches to |
| `resolveInitialLanguage()` | Saved language, else browser language if `he`/`en`, else English (Q-2) |
| `saveLanguage(lang)` | Persists through `LocalStorageService` |

Also: remove Arabic (`Language.Arabic`, `ar.json`) per L-13, and add the 44 mockup strings to `he.json` and `en.json` using the existing key style.

### 5.2 `GuidesService` (new)

Owns the guide catalog. Data comes from `src/content/guides/` (section 6).

| Method | Purpose |
|---|---|
| `getAllGuides()` | Ordered list |
| `getGuideById(id)` | Guide or `null` |
| `searchGuides(query)` | Returns `{ status: 'idle' \| 'results' \| 'empty', guides }`. Trim, lower-case, substring over name and description in both languages (the mockup rule) |

### 5.3 `GuideProgressService` (new)

Owns saved progress. Uses `LocalStorageService` only. The stored shape is private and versioned: `{ version: 1, guides: { [guideId]: { currentStep } } }`.

| Method | Purpose |
|---|---|
| `getResumeStep(guideId)` | Step number or `null` |
| `visitStep(guideId, step)` | Saves the current step (called when a step page opens) |
| `completeGuide(guideId)` | Clears the guide's progress (mockup behaviour) |
| `restartGuide(guideId)` | Clears the guide's progress |
| `clearAll()` | For P-4 later |

The API uses domain verbs so the PRD statuses (In progress, Completed, done steps) can be added later without touching components.

### 5.4 `GuideFlowService` (new)

Owns step-flow rules and URLs. Pure logic, no storage.

| Method | Purpose |
|---|---|
| `paths.catalog()`, `.search()`, `.guide(id)`, `.step(id, n)`, `.done(id)` | The only place route strings are built |
| `clampStep(guide, raw)` | Parses the URL value and clamps to `1..N` |
| `getStepView(guide, n)` | Returns `{ step, total, percent, prevPath \| null, nextPath, isLast, jumpItems: { number, path, state: 'done' \| 'current' \| 'todo' }[] }` |
| `getKeyboardTarget(key, direction, stepView)` | ArrowRight/ArrowLeft to next/prev path, swapped in RTL; `null` otherwise |
| `getOverviewActions(guide, resumeStep)` | Returns start, or continue + restart, with their paths |

### 5.5 `FoldDiagramService` (new)

Owns all diagram geometry (the mockup `draw()` function). It returns data, not markup.

| Method | Purpose |
|---|---|
| `buildRenderModel(diagram)` | Returns `{ paper: { points, face }[], marks: DiagramMark[] }` in viewBox units (400 x 300) |

Inside: point projection (scale, origin, y up), polygon point strings, the quadratic curve of an arrow and its two head lines, radii for eye and nose. Tests compare against values taken from the mockup output.

### 5.6 `PageService` (new, small)

| Method | Purpose |
|---|---|
| `setTitle(heading)` | `"{heading} – {brand}"` through `WindowService` |
| `scrollToTop()` | Through `WindowService` |

## 6. Models and content

`src/models/Guide.ts`:

```ts
type LocalizedText = Record<Language, string>;
type Point = [number, number];
type PaperFace = 'back' | 'backShade' | 'front' | 'flap';
type FoldShape =
    | { kind: 'poly'; points: Point[]; face: PaperFace }
    | { kind: 'valley' | 'mountain'; from: Point; to: Point }
    | { kind: 'arrow' | 'arrowBehind'; from: Point; to: Point; bend: number }
    | { kind: 'dot' | 'eye' | 'nose'; at: Point };
interface FoldDiagram { scale: number; origin: Point; shapes: FoldShape[] }
interface GuideStep { instruction: LocalizedText; tip: LocalizedText; diagram: FoldDiagram }
interface Guide {
    id: string;
    name: LocalizedText; description: LocalizedText; coverAlt: LocalizedText;
    level: 1 | 2 | 3; sheets: number; minutes: number;
    tape: TapePattern; paperColor: string; flapColor: string;
    requirementKeys: string[];      // translation keys; replaces the `g.id === 'cup'` check
    cover: FoldDiagram; steps: GuideStep[];
}
```

Content files: `src/content/guides/paperCup.ts`, `puppyFace.ts` (each with its geometry constants) and `index.ts`. Guide text stays next to its guide as `LocalizedText`, so a missing language is a type error (AC-27).

## 7. Components

Folders follow the repo layout: generic design-system pieces in `src/common/` (with story, test and README entry), app-specific pieces in `src/components/`, screens in `src/pages/`. Every component is presentational: it gets data and paths from a page or a service.

### 7.1 `src/common/` (generic)

| Component | Status | Props | Mockup source | Notes |
|---|---|---|---|---|
| `AppButton` | modify | unchanged | `.b`, `.b.p`, `.b.sm` | Square, 2px ink border, `shadow-cut`, hover and press offsets, disabled look. `danger`, `ghost`, `link` remapped to the new tokens. |
| `AppInput` | modify | unchanged | `.search input` | Square, 2px ink border, inset shadow. |
| `AppPaperScrap` | new | `as?`, `tapes?: { pattern, position }[]`, `className?`, `children` | `.scrap` | Polymorphic like `AppButton`, because a catalog card is a link. Renders its tapes. |
| `AppWashiTape` | new | `pattern: 'stripes' \| 'dots' \| 'bands'`, `position: 'left' \| 'center' \| 'right'` | `.tape`, `.w1`-`.w3` | Decorative, `aria-hidden`. Positions are physical on purpose (the mockup does not mirror them). |
| `AppProgressBar` | new | `value`, `max`, `min?`, `label` | `.prog` | `role="progressbar"` with the aria values; ruler background; fill uses logical inset. |
| `AppHandNote` | new | `as?`, `size?: 'md' \| 'lg'`, `className?`, `children` | `.hand`, `.resume` | Handwritten teal text. |

### 7.2 `src/components/layout/`

| Component | Props | Mockup source | Behaviour |
|---|---|---|---|
| `Navbar` (moved here, rewritten) | none | `.bar`, `chrome()`, `setMenu()` | Sticky bar: `BrandLogo`, nav links (Catalog, Search) as `NavLink` with the tape underline on the current page, `LanguageToggle`, menu button. Below `md` the links sit in a panel toggled by the button (`aria-expanded`, `aria-controls`). Closes on route change and on Escape. Open/closed is local UI state. |
| `BrandLogo` | none | `.brand` | Three-triangle SVG and the app name, links to the catalog. |
| `LanguageToggle` | none | `#lang` | `AppButton size="sm"`. Label is the other language's name, with `lang` set to that language and an `aria-label`. Calls `setLanguage` from `useLanguage`. |
| `SkipLink` | none | `.skip` | Visible on focus, targets `#main`. |
| `AppFooter` | none | `footer` | One translated line. |
| `PageHeading` | `children`, `className?`, `titleText?` | `h1[tabindex=-1]` in every view | Renders the `h1`. On mount: sets the document title via `PageService`, and, unless this is the first page load, scrolls to top and focuses itself. A language change does not move focus. |
| `BackLink` | `to`, `children` | `crumb()` | Link with a `DirectionalArrow` pointing back. |
| `DirectionalArrow` | `direction: 'back' \| 'forward'` | the `←`/`→` swaps | `aria-hidden` arrow that mirrors in RTL. One place for all arrow mirroring. |

### 7.3 `src/components/guide/`

| Component | Props | Mockup source | Behaviour |
|---|---|---|---|
| `FoldDiagram` | `diagram`, `paperColor`, `flapColor`, `label` | `draw()` + fold CSS | Calls `FoldDiagramService.buildRenderModel` and maps the result to SVG elements. `role="img"` with `aria-label`. Wrapper has `dir="ltr"` so diagrams never mirror. Valley, mountain, arrow and "behind" styles live here. |
| `GuideCover` | `guide` | `.cover` | 4:3 shade box with the guide's cover `FoldDiagram` and localized alt. Used on the card, the overview and the completed screen. |
| `GuideMeta` | `guide` | `meta()` | List: `DifficultyDots`, sheets, minutes, step count. |
| `DifficultyDots` | `level: 1 \| 2 \| 3` | `level()` | Three dots plus the level name as text, so meaning does not depend on color. |
| `GuideCard` | `guide`, `resumeStep: number \| null`, `tapes` | `card()` | `AppPaperScrap as={Link}` with cover, title, description, meta and, if there is progress, the "continue from step n" `AppHandNote`. |
| `GuideGrid` | `guides`, `resumeSteps` | `.grid` | Responsive list of `GuideCard`. Alternates tape layout (two tapes / one centered) and the rotation by position. Used by the catalog and by search results. |
| `RequirementsList` | `requirementKeys` | `.need` | "What you need" heading and list with the triangle bullet. |
| `GuideActions` | `actions` (from `GuideFlowService.getOverviewActions`), `onRestart` | `.actions` in `vGuide` | "Start folding", or "Continue · Step n" plus "Start over". |

### 7.4 `src/components/step/`

| Component | Props | Mockup source | Behaviour |
|---|---|---|---|
| `StepHeader` | `stepView`, `guideName` | `.stephd`, `.prog` | `PageHeading` with "Step n of N", the guide name label, and `AppProgressBar`. |
| `StepInstruction` | `instruction`, `tip` | `.instr`, `.tip` | Instruction text and the tilted handwritten tip (tilt flips in RTL). |
| `StepNavButtons` | `stepView` | `.nav2` | Back (a disabled `AppButton` on step 1, else a link) and Next or Finish (primary). Arrows through `DirectionalArrow`. |
| `FoldLegend` | none | `.key` | Legend for valley, mountain and direction with small inline SVG samples. |
| `StepJumpNav` | `items` (`jumpItems` from the step view), `label` | `.jump` | `nav` with numbered links; `aria-current="step"` on the current one; done and current styles. |

### 7.5 `src/components/search/`

| Component | Props | Mockup source | Behaviour |
|---|---|---|---|
| `SearchForm` | `value`, `onChange` | `.search` | `role="search"` form, visually hidden label, `AppInput type="search"`. Submit does nothing. |
| `SearchEmptyState` | `message` | `.empty` | `TapeRollsIllustration` and an `AppHandNote`. Used for both the hint and the no-results state. |
| `TapeRollsIllustration` | none | `rolls()` | Decorative SVG of three tape rolls. |

### 7.6 `src/pages/`

Pages only wire things together: read route params, call services, pass results down.

| Page | Composition | Logic it delegates |
|---|---|---|
| `CatalogPage` | `PageHeading`, lead text, `GuideGrid` | `GuidesService.getAllGuides`, `GuideProgressService.getResumeStep` |
| `SearchPage` | `PageHeading`, `SearchForm`, live region with `GuideGrid` or `SearchEmptyState` | `GuidesService.searchGuides`. The query lives in the `?q=` URL parameter, so it survives going into a guide and back (the mockup keeps it too) and is not persisted (A-36). |
| `GuideOverviewPage` | `BackLink`, `AppPaperScrap` with `GuideCover`, `PageHeading`, description, `GuideMeta`, `RequirementsList`, `GuideActions` | `useGuide`, `GuideFlowService.getOverviewActions`, `GuideProgressService.restartGuide` |
| `GuideStepPage` | `BackLink`, `AppPaperScrap` with `StepHeader`, `FoldDiagram`, `StepInstruction`, `StepNavButtons`, `FoldLegend`; then `StepJumpNav` | `useGuide`, `clampStep` (redirect if the URL value was out of range), `getStepView`, `visitStep` on open, `useStepKeyboardNav` |
| `GuideDonePage` | `AppPaperScrap` with `PageHeading`, text, `GuideCover`, `AppHandNote`; two `AppButton` links | `useGuide`, `completeGuide` on open |

The old pages (`HomePage`, `ProfilePage`, `NewFormPage`, `EditFormPage`) leave the routes.

### 7.7 Hooks (`src/hooks/`)

| Hook | Purpose |
|---|---|
| `useLanguage` (modify) | Starts from `resolveInitialLanguage`, saves on change, sets `lang` and `dir` through `WindowService` |
| `useTranslate` (modify) | Returns `t(key, params?)`, `tl(localizedText)`, `language`, `direction` |
| `useGuide` | Reads `:guideId`, returns the guide or `null`; pages redirect to `/` on `null` |
| `useStepKeyboardNav(stepView)` | One `keydown` listener. Ignores inputs and modifier keys, asks `GuideFlowService.getKeyboardTarget`, then navigates |

## 8. Tests and stories

- **Service tests** (`test/services/`, with `ServicesTestBed`): search states and matching; progress save, resume, complete, restart and bad stored data; step clamping, step view, RTL key mapping, paths; diagram geometry against mockup values; language resolution, parameters and key parity between `he.json` and `en.json`.
- **Component tests** (Testing Library): navbar menu toggle and `aria-expanded`; language switch changes text and `dir`; step page Back/Next/Finish and jump links; search live results; disabled Back on step 1; focus lands on the `h1` after navigation.
- **Stories**: one per new component in `src/common/` and `src/components/`, checked in LTR and RTL with the existing direction toolbar. The Storybook a11y check stays on `error`.
- **Parity check**: compare each screen with `demo.html` at 375px and 1280px, in English and Hebrew.

## 9. Order of work

Each step is one small, reviewable change. All repo checks (`typecheck`, `lint`, `test`) pass after each.

- [x] **1. Foundations:** tokens and utilities in `index.css`, fonts in `index.html`, `HashRouter`, Vite `base`, trimmed app shell.
- [x] **2. Language:** `TranslationService` changes, Arabic removed, mockup strings added, `useLanguage` / `useTranslate` updated, `WindowService` extended.
- [x] **3. Common components:** restyle `AppButton` and `AppInput`; add `AppPaperScrap`, `AppWashiTape`, `AppProgressBar`, `AppHandNote`.
- [x] **4. Layout:** `Navbar`, `LanguageToggle`, `SkipLink`, `AppFooter`, `PageHeading`, `BackLink`, `DirectionalArrow`, `MainLayout`, `PageService`.
- [x] **5. Content and diagrams:** models, guide content files, `GuidesService`, `FoldDiagramService`, `FoldDiagram`, `GuideCover`.
- [x] **6. Catalog:** `GuideMeta`, `DifficultyDots`, `GuideCard`, `GuideGrid`, `CatalogPage`, `GuideProgressService`.
- [x] **7. Overview and step flow:** `GuideFlowService`, overview page and its components, step page and its components, done page, keyboard hook.
- [x] **8. Search:** `SearchForm`, `SearchEmptyState`, `TapeRollsIllustration`, `SearchPage`.
- [x] **9. Parity pass** against the mockup, then switch the Pages workflow from copying `demo.html` to building the app.

Also done:

- [x] Service tests, component tests and app-flow tests (section 8).
- [x] A story for every new component, and for `AppButton`.
- [x] `src/common/README.md` and `docs/design/README.md` updated.

Not done (by decision, see section 10):

- [ ] D-1: PRD statuses (Completed, done steps).
- [ ] D-2: sortable catalog table, 4 guides, clear-progress dialog.
- [ ] D-3: delete the old activity-approval code (AC-22).

## 10. Decisions for the owner

| # | Question | Recommendation |
|---|---|---|
| D-1 | The mockup forgets a finished guide (the overview shows "Start" again). The PRD wants a Completed status with "Restart" (AC-51) and done marks per step (AC-11, AC-14). | Port the mockup behaviour first. `GuideProgressService` already hides the storage shape, so the PRD statuses are a later change in one service. |
| D-2 | The PRD lists a sortable catalog table, 4 guides and a clear-progress dialog. The mockup has none of them. | Keep them out of this port; plan them after parity. |
| D-3 | The old activity-approval code (pages, `FormsDataService`, `UserService`, `ApiService`, generated API, axios, TanStack Query). | This port only disconnects it from the app shell. Delete it in a separate change with the AC-22 check, so this diff stays readable. |
| D-4 | Fonts load from Google Fonts, as in the mockup. | Keep for now. Self-hosting is a small later change if offline or privacy needs it (A-24 is still open). |
| D-5 | Translation keys: the repo uses Hebrew-named keys. | Follow the existing style for the new strings. Say so if you prefer English keys; that is the cheapest moment to switch. |

The implementation followed the recommendation in every row, because no other answer was given. Each one can still be changed.

## 11. Implementation notes

What turned out different from the plan above:

- **Document language moved to `PageService`.** `setDocumentLanguage` sets `lang` and `dir` on `<html>`; `useLanguage` only calls it. The lint rules do not allow a hook to change a value it got from another hook.
- **Focus rule lives in `PageService.enterPage(path)`.** It answers "did the user navigate here?" so `PageHeading` takes focus after navigation, but not on the first load, not on a language switch and not while typing in search.
- **`PageHeading` takes a `title` prop** (text for both the `h1` and the document title) and a `size` (`page` or `step`) instead of `titleText`.
- **The page background is on `MainLayout`, not on `body`** (the `bg-birch` utility). The old shared components and their stories keep their neutral background.
- **`SkipLink` moves focus with a click handler.** With hash routing, a plain `#main` link would change the route.
- **`GuideProgressService.getResumeSteps()`** was added, so list pages read all progress in one call.
- **Level names** got three keys (Easy, Medium, Advanced) because the model has three levels; the mockup only shows Easy.
- **Translation strings:** 48 new keys instead of 44. Text with numbers became one string with placeholders, and "1 sheet" got a plural form.
- **Search placeholder color** is the muted ink instead of the browser default grey, for contrast. This is the only visible difference from the mockup.
- **Storybook:** app components use a new `AppProvidersDecorator` (router, services, global state). The toolbar direction also picks the language, so RTL shows Hebrew.
- **Pages workflow** now runs the tests, builds the app and publishes it. The mockup is still published as `mockup.html`.

How parity was checked: screenshots of all five screens, at 375px and 1280px, in English and Hebrew, compared pixel by pixel with `demo.html`. They match except for the search placeholder color and a few anti-aliasing pixels.
