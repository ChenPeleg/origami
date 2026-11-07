import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppTextArea } from './AppTextArea';

const meta = {
    title: 'Common/AppTextArea',
    component: AppTextArea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        placeholder: {
            control: 'text',
            description: 'Placeholder text for the textarea',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the textarea is disabled',
        },
        rows: {
            control: 'number',
            description: 'Number of visible rows',
        },
        value: {
            control: 'text',
            description: 'Textarea value',
        },
    },
} satisfies Meta<typeof AppTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Enter your message...',
        rows: 4,
    },
};

export const WithValue: Story = {
    args: {
        placeholder: 'Enter your message...',
        value: 'This is a sample text that spans multiple lines.\nIt demonstrates how the textarea component works with content.',
        rows: 4,
    },
};

export const Disabled: Story = {
    args: {
        placeholder: 'Disabled textarea',
        disabled: true,
        value: 'This content cannot be edited',
        rows: 4,
    },
};

export const LargeTextArea: Story = {
    args: {
        placeholder: 'Large textarea...',
        rows: 10,
    },
};

export const SmallTextArea: Story = {
    args: {
        placeholder: 'Small textarea...',
        rows: 2,
    },
};

export const CustomClassName: Story = {
    args: {
        placeholder: 'Custom styled textarea',
        className: 'w-96 rounded-xl border-2 border-blue-500 px-6 py-3 focus:border-blue-700 focus:ring-4 focus:ring-blue-300',
        rows: 5,
    },
};

