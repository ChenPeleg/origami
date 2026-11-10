import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { SearchEmptyState } from './SearchEmptyState';

const meta = {
    title: 'Components/Search/SearchEmptyState',
    component: SearchEmptyState,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { message: 'Type a name to find a guide.' },
} satisfies Meta<typeof SearchEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hint: Story = {};

export const NoResults: Story = {
    args: { message: 'No guides found. Try another word.' },
};
