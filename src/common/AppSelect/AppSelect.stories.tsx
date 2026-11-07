import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AppSelect, type SelectOption } from './AppSelect';

const meta = {
    title: 'Common/AppSelect',
    component: AppSelect,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            control: 'boolean',
            description: 'Whether the select is disabled',
        },
        value: {
            control: 'text',
            description: 'Selected value',
        },
        options: {
            control: 'object',
            description: 'Array of select options',
        },
        textDir: {
            control: { type: 'select' },
            options: ['', 'ltr', 'rtl'],
            description: 'Text direction for the container',
            table: {
                category: 'Presentation',
            },
        },
    },
} as Meta<typeof AppSelect>;

export default meta;

// Extend Story type to include textDir for wrapper presentation
type StoryArgs = React.ComponentProps<typeof AppSelect> & {
    textDir?: string;
};

type Story = StoryObj<StoryArgs>;

const fruitOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
    { value: 'mango', label: 'Mango' },
];

const countryOptions: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'il', label: 'Israel' },
];

// Interactive wrapper component for stories
const SelectWrapper = (args: StoryArgs) => {
    const [value, setValue] = useState(args.value || '');
    return <AppSelect {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
    render: (args) => <SelectWrapper {...args} />,
    args: {
        options: fruitOptions,
        value: 'apple',
        onChange: () => {}, // Handled by SelectWrapper
    },
};

export const NoSelection: Story = {
    render: (args) => <SelectWrapper {...args} />,
    args: {
        options: fruitOptions,
        value: '',
        onChange: () => {}, // Handled by SelectWrapper
    },
};

export const Disabled: Story = {
    render: (args) => <SelectWrapper {...args} />,
    args: {
        options: fruitOptions,
        value: 'banana',
        disabled: true,
        onChange: () => {}, // Handled by SelectWrapper
    },
};

export const ManyOptions: Story = {
    render: (args) => <SelectWrapper {...args} />,
    args: {
        options: countryOptions,
        value: 'il',
        onChange: () => {}, // Handled by SelectWrapper
    },
};

export const CustomClassName: Story = {
    render: (args) => <SelectWrapper {...args} />,
    args: {
        options: fruitOptions,
        value: 'orange',
        className:
            'w-96 rounded-xl border-2 border-purple-500 bg-white px-6 py-3 text-right text-gray-900 focus:border-purple-700 focus:ring-4 focus:ring-purple-300',
        onChange: () => {}, // Handled by SelectWrapper
    },
};

export const RTLDisplay: Story = {
    render: (args) => <SelectWrapper {...args} />,
    args: {
        options: [
            { value: '1', label: 'אופציה ראשונה' },
            { value: '2', label: 'אופציה שנייה' },
            { value: '3', label: 'אופציה שלישית' },
        ],
        textDir: 'rtl',
        value: '1',
        onChange: () => {}, // Handled by SelectWrapper
    },
};
