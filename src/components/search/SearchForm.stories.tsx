import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { useState } from 'react';
import { SearchForm } from './SearchForm';

const meta = {
    title: 'Components/Search/SearchForm',
    component: SearchForm,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { value: '', onChange: () => {} },
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState('');
        return <SearchForm value={value} onChange={setValue} />;
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const field = canvas.getByRole('searchbox');

        await userEvent.type(field, 'puppy');
        await expect(field).toHaveValue('puppy');
    },
};
