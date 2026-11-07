# Plan: Add Dark Mode Toggle

## Overview

Add a dark mode toggle to the `Navbar` that allows users to switch between light and dark themes. The preference should persist across sessions using `localStorage`, and the chosen theme should apply Tailwind's `dark:` variant classes throughout the app.

## Steps

### 1. Enable Tailwind Dark Mode

In `tailwind.config` (or `index.css` for Tailwind v4 configuration), confirm or set the dark mode strategy to `'class'` so that adding the `dark` class on `<html>` activates dark styles:

```css
/* tailwind v4 — index.css */
@custom-variant dark (&:where(.dark, .dark *));
```

### 2. Add `theme` to `GlobalState`

Extend `GlobalState` in `src/stores/GlobalState.tsx`:

```typescript
export type Theme = 'light' | 'dark';

export interface GlobalState {
  language: Language;
  theme: Theme;
}
```

Add a `setTheme` action and persist the value to `localStorage` (key: `'app-theme'`). Read from `localStorage` on initial state so the preference survives page reloads.

### 3. Apply Theme Class on the `<html>` Element

In `src/hooks/useAppInit.tsx` (or a new `useTheme` hook), watch the `theme` value from `GlobalState` and toggle the `dark` class on `document.documentElement`:

```typescript
useEffect(() => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}, [theme]);
```

### 4. Add Toggle Button to `Navbar`

In `src/components/Navbar.tsx`, add a sun/moon icon toggle button next to the language switcher. Use inline SVG icons (sun for light, moon for dark) or import from a library already in the project.

```tsx
<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label={t('dark_mode_toggle')}>
  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
</button>
```

### 5. Add Translation Keys

Add keys in all locale files (`en.json`, `he.json`, `ar.json`):

- `dark_mode_toggle` — accessible label for the toggle button
- `theme_dark` / `theme_light` — optional label text

### 6. Update Components with Dark-Mode Styles

Add `dark:` variants to the most visible UI elements:

- `MainLayout` / body background
- `Navbar` header background + text
- Form cards / page containers
- Common components (at minimum `AppInput`, `AppSelect`, `AppModal`)

## Success Criteria

- [ ] `GlobalState` includes `theme` with `localStorage` persistence
- [ ] `document.documentElement` gets `dark` class when dark mode is active
- [ ] Toggle button in `Navbar` switches between light and dark
- [ ] Button uses accessible `aria-label`
- [ ] At least the navbar and main background have dark-mode styles
- [ ] Preference persists after page reload
- [ ] No TypeScript errors
