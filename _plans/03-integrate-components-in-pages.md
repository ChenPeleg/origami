# Plan: Integrate Common Components into Pages

## Overview

The existing pages (`HomePage`, `NewFormPage`, `EditFormPage`, `ProfilePage`) and `Navbar` use raw `<button>` and `<select>` HTML elements in several places where the common components should be used instead. This plan ensures the app uses its own design system consistently.

## Current State

| Page / Component | Raw elements still in use |
|---|---|
| `HomePage` | `<button>` for "Edit", "Delete", "Create" actions; `window.confirm` for delete |
| `NewFormPage` | `<input>`, `<select>`, `<textarea>` outside of `AppFormField`; plain `<button>` |
| `EditFormPage` | Same as `NewFormPage` |
| `ProfilePage` | Check for raw elements |
| `Navbar` | `<select>` for language switcher (could use `AppSelect` or `AppDropdown`) |

## Replacements to Make

### 1. Form pages (`NewFormPage`, `EditFormPage`)

- Wrap every field in `<AppFormField>` with `label`, `required`, and optional `helpText`
- Replace `<input type="text">` → `<AppInput>`
- Replace `<input type="date">` → `<AppDateInput>`
- Replace `<textarea>` → `<AppTextArea>`
- Replace `<select>` → `<AppSelect>`
- Replace submit and cancel `<button>` elements with a consistently styled button (create `AppButton` if it doesn't exist yet, or use a shared Tailwind class extracted to a small component)

### 2. `HomePage`

- Replace "Edit" and "Delete" `<button>` elements with consistently styled buttons
- Replace `window.confirm` delete dialog with `<AppModal>` confirmation dialog
- Replace "Create new form" `<button>` with a consistently styled primary button

### 3. `Navbar` language switcher

- Replace the raw `<select>` with `<AppSelect>` (or keep as `<AppDropdown>` — choose the one that looks better)

### 4. Add `AppButton` common component (if needed)

If no shared button component exists, create one:

```typescript
interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}
```

- Export from `src/common/index.ts`
- Add Storybook stories

## Implementation Notes

- Maintain all existing functionality — only replace the element type, not the logic
- Preserve translation calls (`t(...)`) on all labels
- Keep RTL-friendly classes (`ms-*`, `ps-*`, `text-start`) where possible

## Success Criteria

- [ ] `NewFormPage` and `EditFormPage` use `AppFormField`, `AppInput`, `AppDateInput`, `AppTextArea`, `AppSelect`
- [ ] `HomePage` delete confirmation uses `AppModal` instead of `window.confirm`
- [ ] `Navbar` language switcher replaced with `AppSelect` or `AppDropdown`
- [ ] All buttons use a consistent style (via `AppButton` or a shared Tailwind utility)
- [ ] `AppButton` component created and exported (if introduced)
- [ ] No TypeScript errors
- [ ] All existing functionality preserved
