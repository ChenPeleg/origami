import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { LayoutFooter } from './LayoutFooter';

const meta = {
    title: 'Components/Layout/AppFooter',
    component: LayoutFooter,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof LayoutFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
