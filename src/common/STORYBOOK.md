# Storybook Stories for Common Components

This document provides an overview of the Storybook stories created for all components in the `client/src/common` folder.

## Setup

Storybook has been configured with:
- **Package**: `@storybook/react-vite` v10.3.6
- **Addons**: chromatic, vitest, a11y, docs, onboarding
- **Config Files**: `.storybook/main.ts` and `.storybook/preview.ts`
- **Styles**: Tailwind CSS imported in preview

## Commands

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

Storybook will be available at: http://localhost:6006

## Created Stories

### 1. AppInput (`src/common/AppInput/AppInput.stories.tsx`)

Basic text input component with customizable styling.

**Stories:**
- `Default`: Basic input with placeholder
- `WithValue`: Input with pre-filled value
- `Disabled`: Disabled input state
- `Email`: Email input type
- `Password`: Password input type
- `Number`: Number input type
- `CustomClassName`: Custom styled input with purple theme

### 2. AppDateInput (`src/common/AppDateInput/AppDateInput.stories.tsx`)

Date picker component based on native HTML date input.

**Stories:**
- `Default`: Empty date input
- `WithValue`: Date input with selected date (2026-05-14)
- `Disabled`: Disabled date input
- `WithMinMax`: Date input with min/max constraints
- `CustomClassName`: Custom styled date input with green theme

### 3. AppTextArea (`src/common/AppTextArea/AppTextArea.stories.tsx`)

Multi-line text input component.

**Stories:**
- `Default`: Basic textarea with 4 rows
- `WithValue`: Textarea with sample multi-line content
- `Disabled`: Disabled textarea
- `LargeTextArea`: 10-row textarea
- `SmallTextArea`: 2-row textarea
- `CustomClassName`: Custom styled textarea with blue theme

### 4. AppSelect (`src/common/AppSelect/AppSelect.stories.tsx`)

Dropdown select component using Headless UI Listbox.

**Stories:**
- `Default`: Fruit selection dropdown (Apple selected)
- `NoSelection`: Empty selection state
- `Disabled`: Disabled dropdown
- `ManyOptions`: Country selection with many options
- `CustomClassName`: Custom styled dropdown with purple theme
- `RTLDisplay`: Hebrew text options (demonstrates RTL support)

**Features:**
- Interactive state management using `SelectWrapper` component
- Custom styling support
- Keyboard navigation
- Focus states

### 5. AppFormField (`src/common/AppFormField/AppFormField.stories.tsx`)

Form field wrapper component that provides consistent label and layout.

**Stories:**
- `WithInput`: Form field containing text input
- `WithTextArea`: Form field containing textarea
- `WithDateInput`: Form field containing date input
- `WithSelect`: Form field containing select dropdown
- `Required`: Form field with required indicator (red asterisk)
- `WithHelpText`: Form field with help text below input
- `WithError`: Form field showing validation error state
- `MultipleFields`: Complete form with multiple fields

**Use Cases:**
- Consistent form layout
- Label-input pairing
- Help text and error message positioning
- Required field indicators

## Documentation Features

All stories include:
- **Autodocs**: Automatically generated documentation from component props
- **Interactive Controls**: Storybook controls panel for testing different props
- **Accessibility Testing**: Using `@storybook/addon-a11y`
- **Layout**: Centered layout for better visualization

## Styling

All components use Tailwind CSS v4 for styling with:
- Consistent border radius (`rounded-lg`)
- Focus states with ring effects
- Disabled states with reduced opacity
- Right-to-left (RTL) text support for Hebrew content

## Testing

Stories can be tested using:
- Visual inspection in Storybook UI
- Accessibility tests via a11y addon
- Interaction tests (future enhancement with `@storybook/addon-interactions`)
- Component testing with Vitest via `@storybook/addon-vitest`

## Next Steps

Consider adding:
1. Interaction tests for user flows
2. Visual regression testing with Chromatic
3. Additional edge cases and error states
4. More complex form validation examples
5. Dark mode variants

