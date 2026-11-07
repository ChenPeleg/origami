import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AppMultiList, type AppMultiListProps, type AppMultiListOption } from './AppMultiList';

const meta = {
    title: 'Common/AppMultiList',
    component: AppMultiList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof AppMultiList>;

export default meta;
type Story = StoryObj<AppMultiListProps<string>>;

const fruitOptions: AppMultiListOption<string>[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
    { value: 'mango', label: 'Mango' },
];

const optionsWithDisabled: AppMultiListOption<string>[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana', disabled: true },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape', disabled: true },
    { value: 'mango', label: 'Mango' },
];

const manyOptions: AppMultiListOption<string>[] = Array.from({ length: 30 }, (_, index) => ({
    value: `item-${index + 1}`,
    label: `Item ${index + 1}`,
}));

const MultiListWrapper = (args: AppMultiListProps<string>) => {
    const [selected, setSelected] = useState<string[]>(args.value);

    return (
        <div className="w-80">
            <AppMultiList {...args} value={selected} onChange={setSelected} />
        </div>
    );
};

export const Default: Story = {
    render: (args) => <MultiListWrapper {...args} />,
    args: {
        options: fruitOptions,
        value: [],
        onChange: () => {},
    },
};

export const WithPreselected: Story = {
    render: (args) => <MultiListWrapper {...args} />,
    args: {
        options: fruitOptions,
        value: ['banana', 'orange'],
        onChange: () => {},
    },
};

export const Searchable: Story = {
    render: (args) => <MultiListWrapper {...args} />,
    args: {
        options: fruitOptions,
        value: [],
        searchable: true,
        placeholder: 'Search fruits...',
        onChange: () => {},
    },
};

export const WithDisabled: Story = {
    render: (args) => <MultiListWrapper {...args} />,
    args: {
        options: optionsWithDisabled,
        value: ['banana'],
        onChange: () => {},
    },
};

export const ManyOptions: Story = {
    render: (args) => <MultiListWrapper {...args} />,
    args: {
        options: manyOptions,
        value: ['item-3', 'item-10'],
        maxHeight: 'max-h-48',
        onChange: () => {},
    },
};
