# React Starter Kit

A minimal, opinionated React starter kit with boilerplate and examples. It is designed to provide a solid base for new projects while staying lean — features are added gradually and kept purposeful.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Data fetching | TanStack Query v5 |
| HTTP client | Axios |
| Accessible UI | Headless UI v2 |
| Component docs | Storybook 10 |
| Unit tests | Vitest + Testing Library |
| Linting | ESLint + typescript-eslint |
| Formatting | Prettier + prettier-plugin-tailwindcss |

## Features

- **Multi-environment builds** — separate configs for `development`, `staging`, and `production` via `.env.*` files and Vite modes.
- **Reusable component library** — `src/common/` contains ready-to-use, styled components (Button, Input, Modal, Toast, Dropdown, Select, Accordion, Popover, FormField, MultiList …). See [`src/common/README.md`](src/common/README.md) for full API docs.
- **Service layer** — `src/services/` holds thin wrappers for API calls, local storage, logging, translation, and versioning.
- **Storybook stories** — components are documented with interactive stories; Storybook interaction tests run inside Vitest.
- **API code generation** — `npm run swagger-codegen` generates typed API clients from an OpenAPI/Swagger spec.
- **Docker backend** — a `docker-compose` file spins up a local backend for development.

## Getting Started

**Requirements:** Node ≥ 24.0.0

```bash
npm install
npm run dev        # start dev server
```

### Other scripts

```bash
npm run build          # production build
npm run build:stage    # staging build
npm run lint           # ESLint
npm run format         # Prettier
npm run test           # unit tests (Vitest)
npm run test-storybook # Storybook interaction tests
npm run storybook      # start Storybook dev server
npm run typecheck      # TypeScript type-check only
npm run swagger-codegen # regenerate API types from Swagger spec
```

### Local backend

```bash
docker compose up --build -d
```

- Django admin: http://localhost:8000/admin/
- REST API: http://localhost:8000/api/

## Project Structure

```
src/
├── common/        # Reusable UI components (see src/common/README.md)
├── components/    # Active screens and their feature-local component trees
├── config/        # Environment-specific configuration
├── errors/        # Error boundary and error types
├── generated/     # Auto-generated API types (do not edit)
├── hooks/         # Custom React hooks
├── layouts/       # Starter-kit modal notice (active shell is components/layout)
├── models/        # Domain model types
├── pages/         # Unrouted starter-kit example pages
├── query/         # TanStack Query setup and query hooks
├── scripts/       # Code-generation scripts
├── services/      # API, storage, logging, translation services
├── stores/        # Global state (React context)
└── stories/       # Storybook stories
```

### Feature component trees

The active app follows the [concatenated-component-tree skill (v1.0.0)](https://github.com/ChenPeleg/skills/blob/v1.0.0/skills/concatenated-component-tree/SKILL.md).
Each feature lives in a flat `src/components/<feature>/` folder. Filenames
mirror the render tree: a child adds a segment to its parent's name.
Existing PascalCase is preserved, and exported component names match filenames.
Stories stay beside the components they describe.

```text
components/
├── catalog/
│   └── Catalog.tsx
├── guide/
│   ├── GuideCover.tsx
│   ├── GuideDone.tsx
│   ├── GuideDoneContent.tsx
│   ├── GuideFoldDiagram.tsx
│   ├── GuideGrid.tsx
│   ├── GuideGridCard.tsx
│   ├── GuideMeta.tsx
│   ├── GuideMetaDifficultyDots.tsx
│   ├── GuideOverview.tsx
│   ├── GuideOverviewActions.tsx
│   ├── GuideOverviewRequirements.tsx
│   ├── GuideStep.tsx
│   ├── GuideStepContent.tsx
│   ├── GuideStepContentFoldLegend.tsx
│   ├── GuideStepContentHeader.tsx
│   ├── GuideStepContentInstruction.tsx
│   ├── GuideStepContentJumpNav.tsx
│   ├── GuideStepContentNavButtons.tsx
│   └── GuideUtilsFoldNotation.ts
├── layout/
│   ├── Layout.tsx
│   ├── LayoutBackLink.tsx
│   ├── LayoutDirectionalArrow.tsx
│   ├── LayoutFooter.tsx
│   ├── LayoutNavbar.tsx
│   ├── LayoutNavbarBrandLogo.tsx
│   ├── LayoutNavbarLanguageToggle.tsx
│   ├── LayoutPageHeading.tsx
│   └── LayoutSkipLink.tsx
└── search/
    ├── Search.tsx
    ├── SearchEmptyState.tsx
    ├── SearchEmptyStateTapeRollsIllustration.tsx
    └── SearchForm.tsx
```

Pieces shared across sections, such as `GuideCover` and `GuideMeta`, use the
feature prefix rather than a single parent's prefix. Non-components use a
`Utils` segment or live in `models/`. Keep folders flat; split a large section
into a subfolder only when it grows past about six files, retaining full prefixes.
`AppRoutes.tsx` imports active screens directly from their feature folders.
The reusable `src/common/` library, services, domain models, and unrouted
starter-kit examples retain their existing organization.
