import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { LayoutNavbarLanguageToggle } from './LayoutNavbarLanguageToggle';

const meta = {
    title: 'Components/Layout/LanguageToggle',
    component: LayoutNavbarLanguageToggle,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof LayoutNavbarLanguageToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const toggle = canvas.getByRole('button');
        const labelBefore = toggle.textContent;

        await userEvent.click(toggle);
        await expect(canvas.getByRole('button').textContent).not.toBe(
            labelBefore
        );
        await userEvent.click(canvas.getByRole('button'));
    },
};
