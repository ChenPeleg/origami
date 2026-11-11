import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { LayoutNavbarBrandLogo } from './LayoutNavbarBrandLogo';

const meta = {
    title: 'Components/Layout/BrandLogo',
    component: LayoutNavbarBrandLogo,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof LayoutNavbarBrandLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
