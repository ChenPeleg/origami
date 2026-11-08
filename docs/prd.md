# Origami Guides App: Product Requirements Document (PRD)

Status: DRAFT, reviewed. Owner answers to Q-1..Q-7 recorded; approval pending owner sign-off after review of 2 sample SVGs (Q-7, N6). Date: 2026-11-08.
Note: form fields and validation from the older plan template are not applicable to this app.
Source: `spec/prd-notes.txt` (read-only). Every requirement cites a note (N1-N7, numbered by paragraph order) or an assumption (A-n, section 11).

| Note | Content |
|---|---|
| N1 | Purely front end; maybe in the app stores via Capacitor |
| N2 | Very basic origami guides with pictures; maybe 3D emulation later |
| N3 | Steps go from very simple and easy to modern/complex |
| N4 | Hebrew and English, at the user's choice |
| N5 | Clean and simple graphics, but also nice and modern |
| N6 | Clear images as SVG, not Figma, before spec approval; mobile first, desktop compatible |
| N7 | User can keep progress; first stages totally front end; server save later |

## 1. Problem, goals and success measures

**Problem.** People who want to learn origami need very basic picture-based guides in their own language, on their phone. The notes do not state the problem; it is inferred (A-1). (N2)

**Goals**
- G1. Basic origami guides, each with pictures. (N2)
- G2. Guides and steps ordered from very simple to more complex. (N3)
- G3. Hebrew and English, chosen by the user. (N4)
- G4. Clean, simple, modern visual style. (N5)
- G5. Clear SVG images, not Figma-only. (N6)
- G6. Mobile first, also desktop compatible. (N6)
- G7. User keeps progress. (N7)
- G8. Pure front end in v1. (N1, N7)

**Success measures** (confirmed by owner, Q-6; basis A-2)
- SM1. A first-time user finishes a guide on a phone without help.
- SM2. Progress survives closing and reopening the app.
- SM3. 100% of UI and guide text exists in both languages.
- SM4. Every guide step has an SVG image.
- SM5. The app works with no backend.

## 2. Users and roles

- **Learner** is the single role. They follow guides, pick a language, and keep progress. (N2, N4, N7)
- No admin, author or account holder in v1 (A-3). Roles may change if a server is added later. (N7)
- Beginners are implied. (N2, N3)

## 3. Scope

**In scope for v1**
- Static, client-only app with no server. (N1, N7)
- Exactly 4 guides with pictures: 2 Beginner, 1 Intermediate, 1 Advanced, ordered simple to complex. (N2, N3, Q-1, A-9)
- Hebrew and English (Hebrew is right-to-left, A-4). (N4)
- Clean, simple, modern visuals. (N5)
- SVG illustrations with no dependency on Figma. (N6)
- Mobile-first responsive layout that also works on desktop. (N6)
- Local progress and language saving on the device. (N4, N7, A-8)

**Out of scope for v1, planned later (see section 4)**
- Capacitor packaging for the stores. (N1)
- 3D emulation, including 3D-ready assets or naming (non-v1). (N2)
- Server-side saving. (N7)
- Offline reopening of the app; only an already-loaded page works offline (Q-3 B, A-11).

**Out of scope, assumed (A-5)**
- Accounts and login, social features, languages other than he/en, user-authored guides, video.
- The existing activity-approval features in the repo (forms, auth, API client). The repo is reused and this code is stripped (Q-5 A, A-12, R-4).

## 4. Phasing

| Phase | Content | Source |
|---|---|---|
| v1 | Front-end only, local save, he/en, 4 SVG guides, mobile first. Ships after owner approves the PRD following the SVG sample review (Q-7) | N1-N7 |
| Later: Capacitor | Store packaging. v1 must not block it (A-6, TC-4) | N1 |
| Later: 3D | 3D emulation of folds. Content stays structured so it can be added | N2 |
| Later: Server | Server save, possibly "something else". Behind a storage boundary (TC-3) | N7 |

## 5. User stories

- **US-1.** As a learner, I want to browse a list of basic origami guides, so that I can choose one of the 4 guides. (N2, A-9, A-17)
- **US-2.** As a learner, I want each step shown with a picture and short text, so that I can see what to fold. (N2, N6)
- **US-3.** As a learner, I want guides and steps to run from very simple to more complex, so that I build skill gradually. (N3)
- **US-4.** As a learner, I want to choose Hebrew or English, so that I can use my language. (N4)
- **US-5.** As a Hebrew-speaking learner, I want the layout right to left, so that it feels natural. (N4, A-4)
- **US-6.** As a learner on a phone, I want a small-screen layout, so that I can follow while folding. (N6)
- **US-7.** As a learner on a desktop, I want the app to work on a large screen. (N6)
- **US-8.** As a learner, I want a clean modern interface, so that guides are easy to read. (N5)
- **US-9.** As a learner, I want my progress saved, so that I can leave and resume. (N7)
- **US-10.** As a learner, I want the app to work without an account or server. (N1, N7)
- **US-11a (v1).** As the product owner, I want to review 2 sample SVG illustrations before approving the spec, and all step images delivered as SVG (SM4). (N6, Q-7)
- **US-11b (not v1).** As the product owner, I want a later 3D asset or naming per step. (N2)

## 6. Workflows and status

### 6.1 Content model (N2, N4, N6)
- **Guide**: one origami model with a title, a difficulty level, an ordered list of steps, and a finished-model image.
- **Step**: step number, short instruction, one SVG diagram. An optional fold-name tag (A-13).
- Every title and instruction exists in Hebrew and English. Diagrams hold no embedded text (A-14).
- The model leaves room to attach a 3D asset to a step later. (N2)

### 6.2 Easy-to-complex progression (N3)
- Each guide has a difficulty level on a fixed scale, Beginner to Advanced (A-15).
- The catalog is sorted simplest to most complex and shows each level.
- Steps within a guide go from basic to harder folds in fixed order.
- v1 ships exactly 4 guides: 2 Beginner, 1 Intermediate, 1 Advanced. (N2, N3, Q-1 B, A-9)
- Any guide can be opened at any time. The order is a recommendation, not a lock (A-16).

### 6.3 Step flow
1. Open the app. It loads in the saved language, else the browser language if Hebrew or English, else English. A language switcher is on every screen. (N4, Q-2 A, A-7)
2. Choose a guide from the catalog (A-17).
3. Overview: finished-model image, difficulty, step count, and Start, or Resume if progress exists. A Completed guide shows the overview with Restart. (N7, Q-4 A, A-20)
4. Step view: image, instruction, and "Step n of N". Next advances and marks the step done. Back returns. The user can jump to a step; the target becomes Current and other marks are unchanged (Q-4 A, A-18).
5. Last step: a completion screen offers a return to the catalog. Back from it returns to the last step (Q-4 A, A-19).
6. The language can be switched at any time. The guide and step stay the same and only the text changes. (N4)

### 6.4 Status and transitions (N7)

Guide status: Not started, In progress, Completed. Step status: Not done, Current, Done.

| From | Event | To |
|---|---|---|
| Not started | Start, then Next on step 1 | In progress |
| In progress | Next on non-final step | In progress, current step advances |
| In progress | Back | In progress, done marks are kept (A-19) |
| In progress | Next on final step | Completed |
| In progress | Jump to step | In progress, target Current, other marks unchanged (Q-4 A, A-18) |
| Completed | Back | In progress, last step Current, Done marks kept (Q-4 A, A-19) |
| Completed | Reopen guide | Overview with Restart shown (Q-4 A, A-20) |
| Completed or In progress | Restart | Not started, progress cleared (A-20) |

Saved data holds one record per guide (status, current step, done steps, last-updated) and one global language setting. (N4, N7, A-8)

### 6.5 Progress saving
- v1: on-device browser storage, automatic after each step change, restored on launch. No account, no data leaves the device. (N1, N7, A-8)
- Missing or corrupt saved data starts clean without an error. (A-21)
- Later: a server or other store sits behind a single save/load boundary. Records carry a version number. (N7, TC-3)
- Local save must keep working inside a Capacitor wrapper. (N1)
- Offline: only an already-loaded page keeps working; no service worker or PWA. Reopening offline is deferred to Capacitor. (Q-3 B, A-6, A-11, TC-11)

## 7. UX, localization, accessibility, privacy and SVG requirements

### 7.1 Look and feel
- **UX-1** Clean, simple, modern style: whitespace, one restrained palette, a few consistent components. (N5)
- **UX-2** Mobile first: base styles target a narrow portrait phone. (N6)
- **UX-3** The desktop layout uses the available width and is usable with mouse and keyboard. (N6)
- **UX-4** Touch targets are at least 44x44 CSS px and nothing requires hover. (N6, N1, A-22)
- **UX-5** Each step shows one clear illustration and short text. (N2, N5)
- **UX-6** The guide list shows difficulty with a cue that does not rely on color alone. (N3)
- **UX-7** The UI shows saved progress (for example "step 3 of 8") and lets the user resume. (N7)
- **UX-8** The layout leaves room for a future 3D preview. No 3D in v1. (N2)

### 7.2 Localization
- **L-1** Exactly two languages, Hebrew and English. (N4)
- **L-2** The user chooses the language. A language switcher is on every screen, applies without reload, and is saved. (N4, N7, Q-2 A)
- **L-3** The default language on first launch is the browser language if Hebrew or English, otherwise English (Q-2 A, A-7).
- **L-4** Hebrew uses `dir="rtl"` and `lang="he"`. English uses `dir="ltr"` and `lang="en"`. Both are set on the document root and update on switch. (N4)
- **L-5** The layout uses logical properties so lists, progress and navigation mirror in RTL. (N4)
- **L-6** All user-facing text, including alt text, comes from per-language resources. (N4)
- **L-7** Both languages are complete for every guide before it ships. (N4, N2)
- **L-8** Step order and progress are language-independent. (N4, N7)
- **L-9** Illustrations hold no embedded text. Labels are live text or numbered markers. (N6, N4)
- **L-10** Fold direction in illustrations does not mirror under RTL. Directional UI icons do mirror. (N4, N6, A-23)
- **L-11** Fonts support both scripts and are bundled. (N4, N5, A-24)
- **L-12** Numbers and plurals are formatted per locale, and mixed-direction text displays correctly. (N4)
- **L-13** Arabic is removed from the product and the repo, including locale files and switcher entries. (N4, A-10)

### 7.3 Accessibility (WCAG level confirmed by owner, Q-6 A, A-25; AX-2..AX-9 assumed)
- **AX-1** Target WCAG 2.2 AA. (Q-6 A)
- **AX-2** Full keyboard operation, logical focus order in both LTR and RTL, visible focus.
- **AX-3** Semantic HTML, a correct `lang` attribute, and an announced language change.
- **AX-4** Text contrast of at least 4.5:1 and graphics of at least 3:1. Color is never the sole carrier of meaning.
- **AX-5** Each instructional illustration has a non-empty text alternative in both Hebrew and English; a missing or empty alt fails the content check. The step text also describes the action in words. (N2, N6, N4)
- **AX-6** Text scales to 200% and reflows at 320 CSS px without horizontal scroll. Pinch-zoom is not blocked.
- **AX-7** Honor `prefers-reduced-motion`.
- **AX-8** Progress and step changes are exposed to screen readers.
- **AX-9** Dark mode is optional and not required in v1 (A-26).

### 7.4 Privacy (N1, N7)
- **P-1** In v1 no network call carries user data. Data is stored only on the device.
- **P-2** Only language, per-guide progress and the schema version are stored. No name, email or identifier (A-27).
- **P-3** No analytics, tracking or third-party scripts. Fonts and assets are bundled.
- **P-4** The user can clear their saved progress in the app. (N7, A-20)
- **P-5** The stored format is versioned, so a later server save can be added. Any server save needs its own privacy review. (N7, A-8)
- **P-6** If the app goes to the stores, the privacy disclosure says "no data collected" for v1. (N1, A-6, A-27)

### 7.5 SVG illustrations (N2, N5, N6)
- **S-1** All illustrations are SVG files in the repo. Figma is not a runtime or build dependency. (N6)
- **S-2** Each step has its own clear image and each guide has a cover image. (N2, N6)
- **S-3** The visual language is consistent (palette, stroke weight, corners). (N5)
- **S-4** A fixed fold-notation key (valley, mountain, arrows, paper sides) is used, with styles that do not depend on color alone (A-28).
- **S-5** Each image shows the paper state after the step and marks the fold or part acted on.
- **S-6** SVGs use `viewBox`, no fixed pixel size and no embedded raster images. (N6)
- **S-7** Each SVG is at most 20 KB, with no external references. (N1, N6, Q-6 A)
- **S-8** SVGs hold no text. Colors use CSS variables or `currentColor`. (N4)
- **S-9** Each SVG has an accessible title wired to the localized alt text (AX-5).
- **S-10** Parts are consistently named so a later 3D or animated version is possible. Not v1. (N2)
- **S-11** The product owner reviews and approves 2 sample SVGs before PRD approval. (N6, Q-7 A, US-11a)

## 8. Technical constraints

| ID | Constraint | Source |
|---|---|---|
| TC-1 | v1 is a static client-only web app with no backend and no server-side rendering. Core use makes no network calls. | N1, N7 |
| TC-2 | Persistence is browser-side storage only. It covers progress and language. | N7 |
| TC-3 | Progress storage sits behind a replaceable abstraction, with a versioned schema. | N7 |
| TC-4 | The build is a static output packageable via Capacitor: base-path-safe asset URLs, routing without server rewrites, no cookies or server state. | N1 |
| TC-5 | Guide content (steps, text, order, difficulty) is data-driven and bundled. | N2, N3 |
| TC-6 | Step images are SVG, authored in the repo, with no raster diagrams. | N6 |
| TC-7 | Content stays structured so a future 3D emulation is possible. No 3D dependency now. | N2 |
| TC-8 | UI is he/en with RTL-safe layout. | N4 |
| TC-9 | Mobile-first responsive layout with touch-sized targets. | N6 |
| TC-10 | A small set of design tokens gives a clean modern style. | N5 |
| TC-11 | Offline: only an already-loaded page keeps working. No service worker or PWA. Reopening offline is deferred to Capacitor. | N1, Q-3 B, A-11 |
| TC-12 | No leftover API, auth or activity code or dependencies remain (axios, TanStack Query, Swagger client, dev proxy, Arabic locale). | N1, Q-5 A, A-12 |
| TC-13 | Supports the latest evergreen browsers and Capacitor webviews. The version list is open (Q-8). | N6, A-29 |

**Existing stack.** The repo is reused (Q-5 A). React 19, Vite, TypeScript, Tailwind 4, react-router 7, Vitest and Storybook stay. There is a `LocalStorageService` and an i18n layer with he/en/ar. Leftover axios, TanStack Query, the Swagger client, the dev proxy, auth/activity code and the Arabic locale are stripped (TC-12); AC-22 and R-4 are the guard. The router mode must work without server rewrites (hash or memory routing is likely; a design decision). Capacitor is not installed and installing it is out of v1 scope. All guide content and SVGs are new work.

## 9. Acceptance criteria

Format: `AC-n`, a checkable statement, covered stories, requirement IDs, verification (test or manual).

### 9.1 Content and progression

- **AC-1.** Given the app opens, when the catalog renders, then it lists exactly 4 bundled guides (2 Beginner, 1 Intermediate, 1 Advanced), each with title, cover image and difficulty level. Covers: US-1, US-3. Reqs: G1, Q-1 B, 6.2, A-9, A-15, A-17, S-2, TC-5. Verify: test.
- **AC-2.** Given a guide in the catalog, when selected, then an overview shows the finished-model image, difficulty, step count and a Start button (Resume if progress exists). Covers: US-1, US-9. Reqs: 6.3, UX-7. Verify: test.
- **AC-3.** Given the catalog, then guides are ordered Beginner to Advanced and show their level. Covers: US-3. Reqs: G2, A-15. Verify: test.
- **AC-4.** Given any guide, it opens regardless of other guides' status (no locks). Covers: US-1, US-3. Reqs: A-16. Verify: test.
- **AC-5.** Given each of the 4 guides, every step has a sequential number starting at 1 with no gaps, a non-empty instruction in he and en, and exactly one SVG diagram (1 step = 1 SVG file, none shared or missing). Step order is fixed in the data; a manual review by the owner confirms steps run from basic to harder folds. Covers: US-2, US-3. Reqs: 6.1, 6.2, UX-5, S-2, TC-5, L-7. Verify: test (schema and file-existence check) plus manual order review.
- **AC-6.** Given the step view, it shows the image, the instruction and "Step n of N". Covers: US-2. Reqs: UX-5, UX-7. Verify: test.
- **AC-7.** Difficulty is shown with a text label or icon, not color alone. Covers: US-3, US-8. Reqs: UX-6, AX-4. Verify: test, manual.

### 9.2 Step flow and progress

- **AC-8.** Given Not started, Start makes step 1 Current; Next on step 1 marks it Done, the guide In progress and step 2 Current. Covers: US-2, US-9. Reqs: 6.4. Verify: test.
- **AC-9.** Back shows the previous step and removes no Done mark. Covers: US-9. Reqs: 6.4, A-19. Verify: test.
- **AC-10.** Next on the final step sets the guide Completed and shows a completion screen with return to catalog. Covers: US-2, US-9. Reqs: 6.3, 6.4. Verify: test.
- **AC-11.** Jumping to a specific step makes it Current and leaves all other step marks unchanged. Covers: US-2. Reqs: 6.3, 6.4, Q-4 A, A-18. Verify: test.
- **AC-12.** Restart returns the guide to Not started and clears its progress. Covers: US-9. Reqs: 6.4, A-20. Verify: test.
- **AC-13.** After closing and reopening, status, current step and done steps are restored, Resume is offered and the position is shown. Covers: US-9. Reqs: G7, SM2, 6.5, UX-7, P-2. Verify: test, manual.
- **AC-14.** Storage holds one record per guide (status, current step, done steps, last-updated), one language setting and a schema version, nothing else. Covers: US-9, US-10. Reqs: 6.5, P-2, P-5, TC-2, TC-3. Verify: test.
- **AC-15.** Missing or corrupt saved data starts clean with no error. Covers: US-9, US-10. Reqs: 6.5, A-21. Verify: test.
- **AC-16.** Clearing saved progress (after confirmation) removes all guide progress. Covers: US-9, US-10. Reqs: P-4. Verify: test.
- **AC-17.** UI saves and loads progress only through one storage interface, replaceable by a test double. Covers: US-9, US-10. Reqs: TC-3, P-5, R-1. Verify: test.
- **AC-50.** Given a Completed guide, when the user presses Back on the completion screen, then the last step is shown as Current, the guide is In progress and all Done marks are kept. Covers: US-2, US-9. Reqs: 6.3 step 5, 6.4, Q-4 A, A-19. Verify: test.
- **AC-51.** Given a Completed guide, when the user reopens it from the catalog, then the overview is shown with Restart (not Start or Resume), and Restart returns the guide to Not started. Covers: US-1, US-9. Reqs: 6.3 step 3, 6.4, Q-4 A, A-20. Verify: test.

### 9.3 No server, privacy, Capacitor readiness

- **AC-18.** Given the production build is loaded and the network is then disabled, the already-loaded page keeps working and a guide can be followed to completion with progress saved; no request carries user data. Reopening the app offline is not required in v1 (deferred to Capacitor). Covers: US-10. Reqs: G8, SM5, TC-1, TC-11, P-1, Q-3 B, A-11. Verify: manual, test.
- **AC-19.** No analytics or third-party script; fonts and assets bundled. Covers: US-10. Reqs: P-3, L-11, S-7. Verify: build audit.
- **AC-20.** Served from a plain static server under a non-root base path with no rewrites, every route loads, including reload of a deep route. Covers: US-10. Reqs: TC-4, R-3. Verify: manual.
- **AC-21.** No cookies set, no server state. Covers: US-10. Reqs: TC-1, P-1. Verify: test.
- **AC-22.** No leftover axios, TanStack Query, Swagger client, dev proxy, auth or activity code or dependency remains in the source or in `package.json`. Covers: US-10. Reqs: TC-1, TC-12, Q-5 A, A-12, R-4. Verify: dependency check (`package.json` and lockfile) plus bundle check and source grep.

### 9.4 Language and RTL

- **AC-23.** Exactly Hebrew and English are offered (no Arabic). Covers: US-4. Reqs: L-1, L-13, A-10. Verify: test.
- **AC-24.** Selecting a language changes all UI text, guide titles, instructions and alt text immediately without reload; it is saved and restored. Covers: US-4. Reqs: L-2, L-6, G3, N4. Verify: test.
- **AC-25.** On first launch with no saved choice, a Hebrew browser language gives Hebrew, an English one gives English, and any other gives English; a saved choice always wins. Covers: US-4. Reqs: L-3, Q-2 A, A-7. Verify: test.
- **AC-26.** Switching language mid-guide leaves guide, step and progress unchanged. Covers: US-4, US-9. Reqs: L-8, 6.3. Verify: test.
- **AC-27.** Every guide, step, title, instruction and UI string exists in both languages (key parity). Covers: US-4. Reqs: L-7, SM3, L-6, TC-8. Verify: test.
- **AC-28.** Hebrew sets `dir="rtl"` `lang="he"`; English `dir="ltr"` `lang="en"`; both update on switch. Covers: US-4, US-5. Reqs: L-4, AX-3, A-4. Verify: test.
- **AC-29.** In Hebrew, lists, progress and Back/Next placement mirror, directional icons mirror, and layout uses logical properties. Covers: US-5. Reqs: L-5, L-10, UX-3. Verify: manual, style lint.
- **AC-30.** In Hebrew, fold diagrams are not mirrored. Covers: US-5. Reqs: L-10, A-23, R-5. Verify: test, manual.
- **AC-31.** Hebrew numbers, plurals and mixed-direction text display correctly; bundled fonts render both scripts. Covers: US-5. Reqs: L-11, L-12. Verify: manual.
- **AC-52.** A language switcher is present and operable on every screen (catalog, overview, step view, completion screen, any settings or clear-progress screen). Covers: US-4. Reqs: L-2, Q-2 A, 6.3 step 1. Verify: test.

### 9.5 Responsive layout

- **AC-32.** At 320-430 px portrait, single column, no horizontal scroll, mobile-first styles. Covers: US-6. Reqs: UX-2, TC-9, G6, AX-6. Verify: test, manual on phone.
- **AC-33.** Interactive controls are at least 44x44 CSS px and nothing requires hover. Covers: US-6. Reqs: UX-4, A-22. Verify: test, manual.
- **AC-34.** At 1280 px or wider the layout uses width sensibly and all functions work with mouse and keyboard. Covers: US-7. Reqs: UX-3, G6. Verify: manual, test.
- **AC-35.** The step view contains a reserved, empty layout region for a future 3D preview (a named container that reserves no visible blank space on phone widths and renders no 3D content), and the production bundle contains no 3D library (for example three.js) and no 3D asset. Covers: US-6, US-7. Reqs: UX-8, TC-7, N2. Verify: test (DOM check), bundle check.
- **AC-36.** The main flow (open, choose guide, step through, complete, switch language, resume) works in the latest evergreen Chrome, Safari, Firefox and Edge and in Capacitor webviews; the exact version list is open (Q-8). Covers: US-6, US-7. Reqs: TC-13, A-29, TC-9, Q-8. Verify: manual.

### 9.6 Look and feel, accessibility

- **AC-37.** Colors, spacing and type sizes on all screens come from one shared design-token set (no hard-coded color values in components, checked by lint or grep), and the owner records an explicit "clean, simple, modern" sign-off on the catalog, overview, step and completion screens in both he and en. Covers: US-8. Reqs: UX-1, TC-10, G4, S-3, N5. Verify: test (token lint), manual owner sign-off.
- **AC-38.** Text contrast at least 4.5:1, graphics at least 3:1. Covers: US-8. Reqs: AX-4, AX-1. Verify: automated scan.
- **AC-39.** Keyboard-only completion of the full flow in LTR and RTL, with logical focus order and visible focus. Covers: US-7, US-8. Reqs: AX-2, UX-3. Verify: manual, test.
- **AC-40.** Semantic elements are used; automated a11y scan reports no serious violations. Covers: US-8. Reqs: AX-1, AX-3. Verify: test.
- **AC-41.** Language change and step advance are announced to screen readers; progress is exposed. Covers: US-8, US-9. Reqs: AX-3, AX-8. Verify: test, manual.
- **AC-42.** At 200% zoom and 320 px, content reflows without horizontal scroll; pinch-zoom not blocked. Covers: US-6, US-8. Reqs: AX-6. Verify: manual, test.
- **AC-43.** With `prefers-reduced-motion`, non-essential animation is off. Covers: US-8. Reqs: AX-7. Verify: test.

### 9.7 SVG illustrations

- **AC-44.** Every guide has an SVG cover and every step its own SVG, stored in the repo; no raster diagrams, no Figma dependency. Covers: US-2, US-11a. Reqs: S-1, S-2, TC-6, G5, SM4. Verify: asset audit.
- **AC-45.** Each SVG has a `viewBox`, no fixed width/height, no external references, no `<text>`, uses CSS variables or `currentColor`, and is at most 20 KB (Q-6 A). Covers: US-2, US-11a. Reqs: S-6, S-7, S-8, L-9, A-14, Q-6 A. Verify: lint script.
- **AC-46.** Each SVG has an accessible title tied to localized alt text; the alt text is non-empty in both he and en for every step and cover image (a missing or empty alt fails the check); and the step text describes the action in words. Covers: US-2, US-11a. Reqs: AX-5, S-9, L-6, L-7. Verify: test.
- **AC-47.** Sample SVGs share one style and one fold-notation key not reliant on color alone; each shows the paper state after the step and marks the part acted on. Covers: US-2, US-8, US-11a. Reqs: S-3, S-4, S-5, AX-4, A-28. Verify: manual.
- **AC-48.** Sign-off gate: the PRD is not approved until the owner has reviewed 2 sample SVGs and recorded approval in section 13. Covers: US-11a. Reqs: S-11, N6, Q-7 A. Verify: manual.
- **AC-49.** (Not v1.) SVG parts use consistent names so a later 3D or animated version is possible; not needed for v1 function and not a v1 release gate. Covers: US-11b. Reqs: S-10, TC-7, N2. Verify: manual.

### 9.8 Traceability

| Story | ACs |
|---|---|
| US-1 | AC-1, 2, 4, 51 |
| US-2 | AC-5, 6, 8, 10, 11, 44-47, 50 |
| US-3 | AC-1, 3, 4, 5, 7 |
| US-4 | AC-23-28, 52 |
| US-5 | AC-28-31 |
| US-6 | AC-32, 33, 35, 36, 42 |
| US-7 | AC-34, 35, 36, 39 |
| US-8 | AC-7, 37-43, 47 |
| US-9 | AC-2, 8-10, 12-17, 26, 41, 50, 51 |
| US-10 | AC-14-22 |
| US-11a | AC-44-48 |
| US-11b | AC-49 (not v1) |

Gaps: P-6 (store disclosure) has no v1 AC because packaging is out of v1; AX-9 (dark mode) is optional. The AC-45 size budget is set (20 KB per SVG, Q-6 A). AC-1 (4 guides, Q-1 B) and AC-25 (Q-2 A) are no longer pending. AC-36's browser version list is still open (Q-8). AC-37 and AC-48 depend on owner judgement and sign-off. AC-49 (US-11b) is not a v1 criterion.

## 10. Risks

| ID | Risk | Mitigation to consider |
|---|---|---|
| R-1 | The data shape is wrong when moving to a server. | Versioned schema and storage interface (TC-3). |
| R-2 | The OS or browser clears local storage, losing progress. | Accepted in v1 (A-8). Revisit with a server. |
| R-3 | Router history mode breaks under Capacitor or static hosting. | Choose a routing mode that needs no rewrites (TC-4). |
| R-4 | Leftover API, auth and activity code adds weight or network calls. | Strip it (Q-5 A, TC-12). Guard with AC-22. |
| R-5 | Blind RTL mirroring corrupts fold diagrams. | L-10. Decide per image (N4, N6). |
| R-6 | Content and SVG authoring effort is high for 4 guides. | Cap at 4 guides (Q-1 B). Owner reviews 2 sample SVGs before approval (Q-7). |
| R-7 | A user reopens the app offline and it does not load. | Accepted in v1 (Q-3 B, TC-11). Deferred to Capacitor. |

## 11. Assumptions

| ID | Assumption |
|---|---|
| A-1 | The problem statement is inferred, as the notes give none. |
| A-2 | Success measures SM1-SM5 are confirmed by the product owner (Q-6 A, 2026-11-08). |
| A-3 | Single learner role. |
| A-4 | Hebrew requires a right-to-left layout. |
| A-5 | The out-of-scope list in section 3 is assumed. |
| A-6 | "In the stalls via capacitor" means app stores via Capacitor. v1 must not block it. Capacitor packaging is after the first release. |
| A-7 | The default language follows the browser, falling back to English. If the user has no saved choice, the first-use language is chosen by that rule (Q-2). |
| A-8 | "Progress" means which guides and steps are done plus the current position, stored per device with no sync, export or import in v1. The data is a few KB, so `localStorage` is enough. |
| A-9 | A catalog screen exists. The list of guides in v1 is 4 guides: 2 Beginner, 1 Intermediate, 1 Advanced (Q-1 B). The models are chosen in Design. |
| A-10 | Arabic, which exists in the code, is dropped from the product. |
| A-11 | The product is a front end that works offline once the page is loaded, with all assets bundled. Reopening offline is deferred to Capacitor (Q-3 B). No service worker or PWA is required. |
| A-12 | The existing activity-approval features are not part of this product. The repo is reused and that code is stripped (Q-5 A, TC-12, AC-22). |
| A-13 | Fold-name tags are optional. |
| A-14 | Diagrams hold no text, so one SVG set serves both languages. |
| A-15 | A fixed difficulty scale, Beginner to Advanced. The labels are a UX decision. |
| A-16 | Guides are not locked behind earlier ones. |
| A-17 | The catalog screen of A-9 is the app's start screen (cites A-7, A-9). |
| A-18 | Jump-to-step navigation is included. Jump makes the target Current and leaves other marks unchanged (Q-4 A). |
| A-19 | Going Back never un-marks a done step. Back from Completed returns to the last step (Q-4 A). |
| A-20 | A Restart action exists and clears that guide's progress. Reopening a Completed guide shows the overview with Restart (Q-4 A). |
| A-21 | Corrupt saved data starts clean, handled silently. A valid saved language is used. |
| A-22 | 44x44 px targets and no hover dependence form the mobile and Capacitor baseline. |
| A-23 | Illustrations do not mirror in RTL. |
| A-24 | Fonts are bundled, with the Hebrew font chosen in the design step. |
| A-25 | The accessibility targets are not in the notes. WCAG 2.2 AA is confirmed by the product owner (Q-6 A, 2026-11-08). |
| A-26 | Dark mode is optional. |
| A-27 | The no-collection stance follows from "totally front end". |
| A-28 | The notation follows common origami conventions. The exact style is a design-step decision. |
| A-29 | Target browsers are current evergreen mobile and desktop browsers and the Capacitor webviews. |

## 12. Open questions

See `docs/open-questions.md`. Q-1..Q-7 are resolved (owner chose option A/B as recorded there). Q-8 (browser version list) remains open, non-blocking.

## 13. Approval

Decision: pending owner sign-off after review of the 2 sample SVGs (Q-7). Not approved. Design outputs are in `docs/design/`.
