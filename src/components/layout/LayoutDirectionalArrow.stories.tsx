import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { LayoutDirectionalArrow } from './LayoutDirectionalArrow';

const meta = {
    title: 'Components/Layout/DirectionalArrow',
    component: LayoutDirectionalArrow,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { direction: 'forward' },
} satisfies Meta<typeof LayoutDirectionalArrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Forward: Story = {};

export const Back: Story = {
    args: { direction: 'back' },
};
