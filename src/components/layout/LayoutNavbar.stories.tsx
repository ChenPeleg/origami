import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import LayoutNavbar from './LayoutNavbar';

const meta = {
    title: 'Components/Layout/Navbar',
    component: LayoutNavbar,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof LayoutNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Catalog is the current page. */
export const Default: Story = {};

export const OnSearchPage: Story = {
    parameters: { route: '/search' },
};

/** Below 760px the links move into a menu that the button opens and closes. */
export const MobileMenu: Story = {
    globals: { viewport: { value: 'mobile1' } },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const menuButton = canvas.getByRole('button', { expanded: false });

        await userEvent.click(menuButton);
        await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    },
};
