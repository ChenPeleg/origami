# Copilot Instructions

## Project Overview

This is a **React Starter Kit** — a minimal, opinionated boilerplate with working examples. New features are added gradually and kept purposeful. The goal is a clean base that future projects can build on, not a monolith.

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** — build tool and dev server
- **Tailwind CSS v4** — utility-first styling
- **React Router v7** — file-based routing pattern
- **TanStack Query v5** — server state and data fetching
- **Axios** — HTTP client (wrapped in `src/services/Api.service.ts`)
- **Headless UI v2** — accessible unstyled components (used by `src/common/`)
- **Storybook 10** — component documentation and interaction tests
- **Vitest + Testing Library** — unit and integration tests
- **ESLint + typescript-eslint + Prettier** — linting and formatting

## Repository Layout

```
src/
├── common/        # Shared, reusable UI components — prefer these over raw HTML
├── components/    # Active screens and feature-local component trees
├── config/        # Per-environment configuration (dev / staging / prod / tests)
├── errors/        # Error boundary and custom error types
├── generated/     # Auto-generated API types — DO NOT edit manually
├── hooks/         # Custom React hooks
├── layouts/       # Starter-kit modal notice; active shell is components/layout
├── models/        # Domain model types and interfaces
├── pages/         # Unrouted starter-kit example pages
├── query/         # TanStack Query client setup and query hooks
├── scripts/       # Code-generation helper scripts
├── services/      # API, local storage, logging, translation, versioning
├── stores/        # Global state via React context
└── stories/       # Storybook stories
```

## Conventions

### Feature components (`src/components/`)
- Follow the [concatenated-component-tree skill (v1.0.0)](https://github.com/ChenPeleg/skills/blob/v1.0.0/skills/concatenated-component-tree/SKILL.md).
- Keep each feature in one flat folder; active route components live with their children, not in `src/pages/`.
- A child's filename adds a segment to its parent's name (e.g. `GuideGrid` renders `GuideGridCard`); exported component names match filenames.
- Preserve PascalCase in existing feature folders. Use kebab-case for greenfield features.
- Shared pieces use the feature prefix (`GuideCover`); non-components use a `Utils` segment or live in `models/`.
- Keep stories beside their components. When renaming a parent, cascade its prefix through descendants and update all imports.
- Only introduce a subfolder when a section grows past about six files, retaining full filename prefixes.

### Component library (`src/common/`)
- Always prefer components from `src/common/` (e.g. `AppButton`, `AppInput`, `AppModal`, `AppSelect`, `AppToast`) over raw HTML equivalents.
- Import via the barrel: `import { AppButton } from '@/common'`.
- Full props API is documented in [`src/common/README.md`](../src/common/README.md).

### Styling
- Use **Tailwind CSS utility classes** for all styling. Do not write custom CSS unless unavoidable.
- Follow the existing class-ordering convention enforced by `prettier-plugin-tailwindcss`.

### State management
- **Server state** → TanStack Query (`src/query/`).
- **Global client state** → React context in `src/stores/`.
- Avoid prop-drilling beyond two levels; lift state or use context.

### API calls
- All HTTP calls go through `src/services/Api.service.ts`. Do not call `axios` directly in components.
- API types live in `src/generated/` and are regenerated with `npm run swagger-codegen`.

### TypeScript
- All new files must be `.ts` or `.tsx`. No plain JavaScript.
- Prefer explicit return types on exported functions.
- Do not use `any` — use `unknown` and narrow when needed.

### Testing
- Unit tests live next to the source file or in `test/`.
- Use Vitest + Testing Library. Avoid snapshot tests.
- Run with `npm run test`; Storybook interaction tests with `npm run test-storybook`.

### Linting and formatting
- `npm run lint` — ESLint
- `npm run format` — Prettier
- Both must pass before committing.

## Environment Configuration

| Script | Mode | Config file |
|---|---|---|
| `npm run dev` | development | `.env.development` |
| `npm run build:stage` | staging | `.env.staging` |
| `npm run build` | production | `.env.production` |

Per-environment constants are in `src/config/config.*.ts` and unified in `src/config/appConfig.ts`.

## Adding New Features

1. Keep features minimal — add only what is genuinely reusable.
2. Add a Storybook story for any new component in `src/common/` or `src/components/`.
3. Document new `src/common/` components in `src/common/README.md`.
