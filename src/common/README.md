# Common folder

Contains reusable UI components for the project.

## Components

### AppTooltip

Shows contextual information on hover. Pure React implementation (no Headless UI required).

```tsx
import { AppTooltip } from '@/common';

<AppTooltip content="Helpful hint" position="top">
  <button>Hover me</button>
</AppTooltip>
```

**Props**

| Prop       | Type                                    | Default | Description                              |
| ---------- | --------------------------------------- | ------- | ---------------------------------------- |
| `content`  | `React.ReactNode`                       | —       | Content displayed inside the tooltip     |
| `children` | `React.ReactNode`                       | —       | Trigger element                          |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip placement                        |
| `delay`    | `number`                                | `200`   | Delay in ms before tooltip appears       |
| `className`| `string`                                | —       | Additional classes on the tooltip panel  |

---

### AppDropdown

Keyboard-navigable dropdown menu powered by Headless UI `Menu`.

```tsx
import { AppDropdown } from '@/common';

<AppDropdown
  trigger={<button>Open Menu</button>}
  items={[
    { label: 'Edit', onClick: () => {} },
    { label: 'Delete', onClick: () => {}, icon: <TrashIcon /> },
  ]}
/>
```

**Props**

| Prop            | Type                  | Default  | Description                           |
| --------------- | --------------------- | -------- | ------------------------------------- |
| `trigger`       | `React.ReactNode`     | —        | Element that opens the dropdown       |
| `items`         | `AppDropdownItem[]`   | —        | Menu items                            |
| `position`      | `'left' \| 'right'`  | `'left'` | Menu alignment                        |
| `className`     | `string`              | —        | Classes on the wrapper                |
| `menuClassName` | `string`              | —        | Classes on the menu panel             |

**AppDropdownItem**

| Prop       | Type              | Description                        |
| ---------- | ----------------- | ---------------------------------- |
| `label`    | `string`          | Item label                         |
| `onClick`  | `() => void`      | Click handler                      |
| `icon`     | `React.ReactNode` | Optional icon                      |
| `disabled` | `boolean`         | Disables the item                  |
| `divider`  | `boolean`         | Shows a divider after this item    |

---

### AppPopover

Floating content panel that opens/closes on click. Powered by Headless UI `Popover`.

```tsx
import { AppPopover } from '@/common';

<AppPopover trigger={<button>Open</button>} position="bottom">
  <p>Popover content here</p>
</AppPopover>
```

**Props**

| Prop             | Type                                    | Default    | Description                          |
| ---------------- | --------------------------------------- | ---------- | ------------------------------------ |
| `trigger`        | `React.ReactNode`                       | —          | Element that opens the popover       |
| `children`       | `React.ReactNode`                       | —          | Panel content                        |
| `position`       | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Panel placement                      |
| `className`      | `string`                                | —          | Classes on the wrapper               |
| `panelClassName` | `string`                                | —          | Classes on the panel                 |

---

### AppAccordion

Collapsible content sections. When `allowMultiple` is false (default) only one item can be open at a time.

```tsx
import { AppAccordion } from '@/common';

<AppAccordion
  items={[
    { id: '1', title: 'Section 1', content: <p>Content</p> },
    { id: '2', title: 'Section 2', content: <p>Content</p> },
  ]}
  defaultOpen={['1']}
/>
```

**Props**

| Prop            | Type                    | Default | Description                                       |
| --------------- | ----------------------- | ------- | ------------------------------------------------- |
| `items`         | `AppAccordionItem[]`    | —       | Accordion sections                                |
| `allowMultiple` | `boolean`               | `false` | Allow more than one section open simultaneously   |
| `defaultOpen`   | `string[]`              | `[]`    | IDs of items pre-expanded on mount                |
| `className`     | `string`                | —       | Classes on the wrapper                            |
| `itemClassName` | `string`                | —       | Classes on each item                              |

**AppAccordionItem**

| Prop      | Type              | Description               |
| --------- | ----------------- | ------------------------- |
| `id`      | `string`          | Unique identifier         |
| `title`   | `string`          | Header text               |
| `content` | `React.ReactNode` | Body content              |
| `icon`    | `React.ReactNode` | Optional header icon      |

---

### AppModal

Accessible overlay dialog with focus trap and backdrop. Powered by Headless UI `Dialog`.

```tsx
import { AppModal } from '@/common';

<AppModal isOpen={open} onClose={() => setOpen(false)} title="Confirm">
  <p>Are you sure?</p>
</AppModal>
```

**Props**

| Prop              | Type                                      | Default | Description                          |
| ----------------- | ----------------------------------------- | ------- | ------------------------------------ |
| `isOpen`          | `boolean`                                 | —       | Controls visibility                  |
| `onClose`         | `() => void`                              | —       | Called on backdrop click / Escape    |
| `title`           | `string`                                  | —       | Optional header title                |
| `children`        | `React.ReactNode`                         | —       | Dialog body                          |
| `showCloseButton` | `boolean`                                 | `true`  | Shows the × close button             |
| `size`            | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`  | Maximum width of the panel           |
| `className`       | `string`                                  | —       | Classes on the panel                 |

---

### AppToast

Global notification system with auto-dismiss and typed messages. Requires `ToastProvider` in the application tree.

**Setup** (already done in `main.tsx`):
```tsx
import { ToastProvider, AppToastContainer } from '@/common';

<ToastProvider>
  <App />
  <AppToastContainer />
</ToastProvider>
```

**Usage**:
```tsx
import { useToast } from '@/common';

function MyComponent() {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  return <button onClick={() => showSuccess('Saved!')}>Save</button>;
}
```

**useToast methods**

| Method        | Signature                                      | Description               |
| ------------- | ---------------------------------------------- | ------------------------- |
| `showSuccess` | `(message: string, duration?: number) => void` | Green success toast       |
| `showError`   | `(message: string, duration?: number) => void` | Red error toast           |
| `showWarning` | `(message: string, duration?: number) => void` | Yellow warning toast      |
| `showInfo`    | `(message: string, duration?: number) => void` | Blue info toast           |

Pass `duration: 0` for a persistent toast that only closes manually.

---

### AppButton

Polymorphic button styled as a piece of cut card: square, 2px ink border and a hard offset shadow. `primary` is coral, `secondary` is scrap paper. Renders as a `<button>` by default but can render as any element (`span`, `div`, `a`, …) via the `as` prop.

```tsx
import { AppButton } from '@/common';

// Standard button
<AppButton onClick={() => save()}>Save</AppButton>

// Danger variant
<AppButton variant="danger" onClick={() => remove()}>Delete</AppButton>

// Render as <span> (no button semantics)
<AppButton as="span" variant="secondary">Label</AppButton>

// Render as <a> link
<AppButton as="a" href="/profile" variant="link">Profile</AppButton>

// Render as a router link that looks like a button
<AppButton as={Link} to="/guide/cup/step/1">Start folding</AppButton>

// Small size, ghost style
<AppButton variant="ghost" size="sm">Cancel</AppButton>
```

**Props**

| Prop        | Type                                                      | Default     | Description                                    |
| ----------- | --------------------------------------------------------- | ----------- | ---------------------------------------------- |
| `as`        | `React.ElementType`                                       | `'button'`  | Underlying HTML element or component to render |
| `variant`   | `'primary' \| 'secondary' \| 'danger' \| 'ghost' \| 'link'` | `'primary'` | Visual style                                |
| `size`      | `'sm' \| 'md' \| 'lg'`                                  | `'md'`      | Height / padding / font-size preset: 44px, 48px, 56px (ignored for `link`) |
| `className` | `string`                                                  | —           | Additional classes merged onto the element     |
| `children`  | `React.ReactNode`                                         | —           | Button label / content                         |

All other props are forwarded to the underlying element (e.g. `onClick`, `disabled`, `href`, `type`, …).

---

### AppInput

Styled text input extending all native `<input>` props.

```tsx
import { AppInput } from '@/common';

<AppInput placeholder="Enter value" />
<AppInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
```

**Props**

Accepts all standard `React.HTMLProps<HTMLInputElement>` props plus:

| Prop       | Type                      | Description                        |
| ---------- | ------------------------- | ---------------------------------- |
| `inputRef` | `React.Ref<HTMLInputElement>` | Ref forwarded to the input element |

---

### AppDateInput

Styled native date picker input extending all native `<input>` props.

```tsx
import { AppDateInput } from '@/common';

<AppDateInput value={date} onChange={(e) => setDate(e.target.value)} />
<AppDateInput min="2024-01-01" max="2026-12-31" />
```

**Props**

Accepts all standard `React.HTMLProps<HTMLInputElement>` props plus:

| Prop       | Type                      | Description                        |
| ---------- | ------------------------- | ---------------------------------- |
| `inputRef` | `React.Ref<HTMLInputElement>` | Ref forwarded to the input element |

---

### AppTextArea

Styled multi-line textarea extending all native `<textarea>` props.

```tsx
import { AppTextArea } from '@/common';

<AppTextArea rows={4} placeholder="Enter description" />
```

**Props**

Accepts all standard `React.HTMLProps<HTMLTextAreaElement>` props plus:

| Prop          | Type                          | Description                           |
| ------------- | ----------------------------- | ------------------------------------- |
| `textAreaRef` | `React.Ref<HTMLTextAreaElement>` | Ref forwarded to the textarea element |

---

### AppSelect

Accessible dropdown select powered by Headless UI `Listbox`.

```tsx
import { AppSelect } from '@/common';

<AppSelect
  value={selected}
  onChange={setSelected}
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ]}
/>
```

**Props**

| Prop        | Type              | Default | Description                          |
| ----------- | ----------------- | ------- | ------------------------------------ |
| `value`     | `string`          | —       | Currently selected value             |
| `onChange`  | `(value: string) => void` | — | Change handler                   |
| `options`   | `SelectOption[]`  | —       | List of selectable options           |
| `disabled`  | `boolean`         | `false` | Disables the select                  |
| `className` | `string`          | —       | Classes on the trigger button        |

**SelectOption**

| Prop    | Type     | Description    |
| ------- | -------- | -------------- |
| `value` | `string` | Option value   |
| `label` | `string` | Display label  |

---

### AppFormField

Form field wrapper that provides a consistent label + input layout.

```tsx
import { AppFormField, AppInput } from '@/common';

<AppFormField label="Full Name">
  <AppInput placeholder="Enter your name" />
</AppFormField>
```

**Props**

| Prop       | Type              | Description                               |
| ---------- | ----------------- | ----------------------------------------- |
| `label`    | `React.ReactNode` | Label content shown above input           |
| `children` | `React.ReactNode` | Input or control element                  |
| `required` | `boolean`         | Shows a red required indicator            |
| `helpText` | `React.ReactNode` | Optional help text below the field        |
| `error`    | `React.ReactNode` | Optional validation error below the field |
| `htmlFor`  | `string`          | Optional `for` attribute for the label    |

---

### AppMultiList

Controlled multi-select list with optional search and disabled items support.

```tsx
import { AppMultiList } from '@/common';

<AppMultiList
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana', disabled: true },
    { value: 'orange', label: 'Orange' },
  ]}
  value={selected}
  onChange={setSelected}
  searchable
/>
```

**Props**

| Prop          | Type                                    | Default      | Description                                       |
| ------------- | --------------------------------------- | ------------ | ------------------------------------------------- |
| `options`     | `AppMultiListOption<T>[]`               | —            | List options with value/label; `disabled` is optional |
| `value`       | `T[]`                                   | —            | Controlled selected values                        |
| `onChange`    | `(selected: T[]) => void`               | —            | Called with the full updated selection            |
| `maxHeight`   | `string`                                | `'max-h-60'` | Tailwind max-height class for list scroll area    |
| `searchable`  | `boolean`                               | `false`      | Enables client-side label filtering input         |
| `placeholder` | `string`                                | `'Search...'`| Search input placeholder                          |
| `className`   | `string`                                | —            | Additional classes on the wrapper                 |

---

### AppPaperScrap

The content surface of the app: a scrap of off-white paper with a soft shadow and square corners, optionally held by washi tape. Polymorphic like `AppButton`: renders a `<div>` by default, or any element or component via `as`.

```tsx
import { AppPaperScrap } from '@/common';

<AppPaperScrap tapes={[{ pattern: 'dots', position: 'center' }]}>
  <p>One square sheet of paper is all you need.</p>
</AppPaperScrap>

// A whole card that is a router link
<AppPaperScrap as={Link} to="/guide/cup" tapes={[{ pattern: 'stripes', position: 'left' }]}>
  Paper Cup
</AppPaperScrap>
```

**Props**

| Prop        | Type                 | Default | Description                                    |
| ----------- | -------------------- | ------- | ---------------------------------------------- |
| `as`        | `React.ElementType`  | `'div'` | Underlying element or component to render      |
| `tapes`     | `PaperScrapTape[]`   | `[]`    | Washi tapes drawn on the top edge              |
| `className` | `string`             | —       | Additional classes merged onto the element     |
| `children`  | `React.ReactNode`    | —       | Content                                        |

**PaperScrapTape**: `{ pattern: WashiTapePattern; position: WashiTapePosition }`

All other props are forwarded to the underlying element.

---

### AppWashiTape

A strip of patterned tape with torn ends. Decoration only (`aria-hidden`). It is positioned on the top edge of its parent, which must be `relative` (`AppPaperScrap` is).

```tsx
import { AppWashiTape } from '@/common';

<div className="relative">
  <AppWashiTape pattern="bands" position="right" />
</div>
```

**Props**

| Prop        | Type                               | Default    | Description                                                        |
| ----------- | ---------------------------------- | ---------- | ------------------------------------------------------------------ |
| `pattern`   | `'stripes' \| 'dots' \| 'bands'`   | —          | Coral stripes, teal dots or mustard bands                          |
| `position`  | `'left' \| 'center' \| 'right'`    | `'center'` | Place on the top edge. Physical on purpose: it does not mirror in RTL |
| `className` | `string`                           | —          | Additional classes                                                 |

---

### AppProgressBar

Ruler-style progress bar with tick marks. Exposes `role="progressbar"` with its values. The fill starts at the inline start, so it mirrors in RTL.

```tsx
import { AppProgressBar } from '@/common';

<AppProgressBar value={2} max={5} label="Step 2 of 5" />
```

**Props**

| Prop        | Type     | Default | Description                         |
| ----------- | -------- | ------- | ----------------------------------- |
| `value`     | `number` | —       | Current value                       |
| `max`       | `number` | —       | Largest value                       |
| `min`       | `number` | `0`     | Smallest value                      |
| `label`     | `string` | —       | Accessible name of the progress bar |
| `className` | `string` | —       | Additional classes                  |

---

### AppHandNote

A short handwritten note in pencil teal. For tips and small remarks only, never for reading text.

```tsx
import { AppHandNote } from '@/common';

<AppHandNote>corner to corner!</AppHandNote>
<AppHandNote as="span" size="md">continue from step 2</AppHandNote>
```

**Props**

| Prop        | Type                        | Default | Description            |
| ----------- | --------------------------- | ------- | ---------------------- |
| `as`        | `'p' \| 'span' \| 'div'`    | `'p'`   | Element to render      |
| `size`      | `'md' \| 'lg'`              | `'lg'`  | 26px or 30px           |
| `className` | `string`                    | —       | Additional classes     |
| `children`  | `React.ReactNode`           | —       | The note               |
