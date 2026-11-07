# Storybook Configuration

This directory contains Storybook configuration files for the Activity Approval project.

## Files

- **`main.ts`**: Main Storybook configuration defining stories location, addons, and framework
- **`preview.ts`**: Global preview configuration including decorators and parameters
- **`decorators/`**: Custom decorators for enhancing stories

## RTL/LTR Direction Switching

The Storybook setup includes a global direction switcher that allows you to preview all components in both LTR (Left-to-Right) and RTL (Right-to-Left) layouts.

### How to Use

1. Start Storybook: `npm run storybook`
2. Open any story in Storybook
3. Look for the **Direction** control in the Storybook toolbar (top of the page)
4. Select from three options:
   - **Auto**: Uses browser default direction (typically LTR)
   - **LTR**: Forces left-to-right layout
   - **RTL**: Forces right-to-left layout

### Implementation Details

The direction switcher is implemented via:

- **DirectionDecorator** (`decorators/DirectionDecorator.tsx`): A global decorator that:
  - Reads the `direction` global parameter from Storybook context
  - Sets `document.documentElement.dir` attribute
  - Wraps stories in a `<div>` with the appropriate `dir` attribute

- **Global Types** (`preview.ts`): Configuration defining the toolbar control with:
  - Default value: 'auto'
  - Options: 'auto', 'ltr', 'rtl'
  - Dynamic title showing current selection
  - Custom icons for each option

### Benefits

- **Test RTL layouts**: Easily test how Hebrew and Arabic content looks in your components
- **Consistency**: All stories automatically support direction switching without manual configuration
- **Tailwind CSS Integration**: Works seamlessly with Tailwind's RTL utilities (requires `dir` attribute)

### For Component Authors

When creating new stories, you don't need to do anything special - the direction switcher works automatically for all stories. However, keep in mind:

1. **Use directional utilities carefully**: Tailwind utilities like `ml-4` (margin-left) should be replaced with `ms-4` (margin-start) for proper RTL support
2. **Test both directions**: Always check your component in both LTR and RTL modes using the toolbar
3. **Text alignment**: Use `text-start` and `text-end` instead of `text-left` and `text-right` for proper RTL behavior

## Addons

The project includes the following Storybook addons:

- **@chromatic-com/storybook**: Visual regression testing
- **@storybook/addon-vitest**: Vitest integration
- **@storybook/addon-a11y**: Accessibility testing
- **@storybook/addon-docs**: Automatic documentation generation
- **@storybook/addon-onboarding**: Onboarding guide for new users

## Running Storybook

```bash
# Development server (port 6006)
npm run storybook

# Build static Storybook
npm run build-storybook
```

Storybook will be available at: http://localhost:6006

