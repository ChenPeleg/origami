# Plan: Add Settings Page

## Overview

Add a `/settings` route with a settings page where users can configure application preferences. Initial options: theme (light/dark) and notification preferences.

## Route

| Path        | Description   | Purpose                                  |
|-------------|---------------|------------------------------------------|
| `/settings` | Settings Page | Configure user preferences for the app  |

## Steps

### 1. Create `SettingsPage.tsx`

**Location**: `src/pages/SettingsPage.tsx`

Sections to include:

#### Appearance
- **Theme** — light / dark / system radio group (integrates with the dark mode toggle from plan 08)

#### Notifications (UI-only for now, values stored locally)
- **Email notifications** — toggle (checkbox) for receiving email updates
- **In-app notifications** — toggle for in-app alerts

#### Language
- Move language selection here (or duplicate it from the Navbar) as a `<AppSelect>` field wrapped in `<AppFormField>`

### 2. Store Settings in `GlobalState` (or a new `SettingsContext`)

Extend `GlobalState` (if plan 08 is already done, `theme` is already there) or create a dedicated `SettingsContext`:

```typescript
export interface UserSettings {
  theme: Theme;                  // 'light' | 'dark' | 'system'
  emailNotifications: boolean;
  inAppNotifications: boolean;
}
```

Persist all settings to `localStorage` (key: `'app-settings'`). Read on init.

### 3. Add Route to `AppRoutes.tsx`

```tsx
<Route path="/settings" element={<SettingsPage />} />
```

### 4. Add Navigation Link in `Navbar`

Add a "Settings" entry to the user avatar `AppDropdown` menu (alongside the existing Profile and Admin links):

```tsx
{ label: t('ניווט_הגדרות'), onClick: () => navigate('/settings') }
```

### 5. Add Translation Keys

Add keys to all locale files (`en.json`, `he.json`, `ar.json`):

- `ניווט_הגדרות` / `settings_nav` — navbar link
- `כותרת_הגדרות` / `settings_title` — page heading
- `הגדרות_ערכת_נושא` / `settings_theme` — section label
- `הגדרות_התראות` / `settings_notifications` — section label
- `הגדרות_שפה` / `settings_language` — section label
- Individual option labels for theme choices and notification toggles

### 6. Use Common Components Throughout

- Section headings styled consistently
- Each setting row uses `<AppFormField>` as the wrapper
- Radio buttons / checkboxes styled with Tailwind
- Save/Reset buttons styled using the shared button style (or `AppButton` from plan 07)
- Use `useToast` to show a success toast when settings are saved

## Success Criteria

- [ ] `/settings` route accessible and rendered inside `MainLayout`
- [ ] Page has Appearance, Notifications, and Language sections
- [ ] Theme setting reflects current state and updates on change
- [ ] Notification toggles save to `localStorage`
- [ ] Language selector works (same behaviour as Navbar switcher)
- [ ] Settings link appears in Navbar user dropdown
- [ ] All user-visible strings translated (en/he/ar)
- [ ] Success toast shown on save
- [ ] No TypeScript errors
