# Plan: Enable Storybook Interaction Tests (Vitest Integration)

## Overview

`@storybook/addon-vitest` is already installed and listed in `.storybook/main.ts`. The integration with Vitest needs to be wired up so that stories can be run as tests (including `play` functions and accessibility checks). Currently `vitest.config.ts` only has the regular test project; the Storybook project is missing.

## Steps

### 1. Add a Storybook Vitest project to `vitest.config.ts`

Follow the pattern described in the [Storybook Vitest addon docs](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon):

```typescript
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

// Inside defineConfig → test.projects, add:
{
  extends: true,
  plugins: [
    storybookTest({ configDir: '.storybook' }),
  ],
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
    setupFiles: ['.storybook/vitest.setup.ts'],
  },
},
```

### 2. Create `.storybook/vitest.setup.ts`

This file is the setup file Vitest uses before running story tests. Minimal content:

```typescript
import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/react-vite';
import * as projectAnnotations from './preview';

const project = setProjectAnnotations([projectAnnotations]);

beforeAll(project.beforeAll);
```

### 3. Add `play` functions to key stories

Add interaction tests using `@testing-library/user-event` and Testing Library matchers inside `play` functions for at least:

- `AppInput` — type into input, assert value visible
- `AppDropdown` — click trigger, assert menu item visible, click item
- `AppModal` — click open button, assert modal title, click close, assert gone
- `AppToast` — trigger a toast (via `useToast`), assert toast text visible, dismiss

### 4. Update accessibility test mode

In `.storybook/preview.ts`, change the a11y test mode from `'todo'` to `'error'` so accessibility violations fail in CI:

```typescript
a11y: {
  test: 'error',
},
```

### 5. Add a `test-storybook` script to `package.json`

```json
"test-storybook": "vitest run --project storybook"
```

## Success Criteria

- [ ] `vitest.config.ts` has a `storybook` project configured
- [ ] `.storybook/vitest.setup.ts` created
- [ ] `play` functions added to at least four stories
- [ ] a11y mode set to `'error'` in `preview.ts`
- [ ] `npm run test-storybook` runs and passes
- [ ] No TypeScript errors
