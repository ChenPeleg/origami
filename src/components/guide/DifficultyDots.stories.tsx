import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { DifficultyDots } from './DifficultyDots';

const meta = {
    title: 'Components/Guide/DifficultyDots',
    component: DifficultyDots,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { level: 1 },
} satisfies Meta<typeof DifficultyDots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Easy: Story = {};

export const Medium: Story = {
    args: { level: 2 },
};

export const Advanced: Story = {
    args: { level: 3 },
};
