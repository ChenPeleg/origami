# Plan: Remove Default Storybook Boilerplate

## Overview

The Storybook scaffold created several example files that are not part of this project. These files pollute the story list and introduce confusion. This plan covers removing them cleanly.

## Files to Delete

### Example components (no longer needed)
- `src/stories/Button.tsx`
- `src/stories/Button.stories.ts`
- `src/stories/button.css`
- `src/stories/Header.tsx`
- `src/stories/Header.stories.ts`
- `src/stories/header.css`
- `src/stories/Page.tsx`
- `src/stories/Page.stories.ts`
- `src/stories/page.css`

### Default welcome/configure page
- `src/stories/Configure.mdx`

### Storybook asset images (referenced only by Configure.mdx)
- `src/stories/assets/` (entire directory)

## Files to Keep

- `src/stories/DirectionExample.stories.tsx` — project-specific demo story for the RTL/LTR direction switcher

## After Deletion

- Verify Storybook still starts without errors (`npm run storybook`)
- Verify `npm run build-storybook` succeeds
- Verify `npm run typecheck` passes (no dangling imports)

## Success Criteria

- [ ] All boilerplate files listed above deleted
- [ ] `DirectionExample.stories.tsx` and the `.storybook/` directory untouched
- [ ] `npm run storybook` starts without errors
- [ ] `npm run build-storybook` succeeds
- [ ] No TypeScript errors
