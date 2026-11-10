import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { DirectionalArrow } from './DirectionalArrow';

const meta = {
    title: 'Components/Layout/DirectionalArrow',
    component: DirectionalArrow,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { direction: 'forward' },
} satisfies Meta<typeof DirectionalArrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Forward: Story = {};

export const Back: Story = {
    args: { direction: 'back' },
};
