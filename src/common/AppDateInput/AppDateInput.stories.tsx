import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppDateInput } from './AppDateInput';

const meta = {
    title: 'Common/AppDateInput',
    component: AppDateInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            control: 'boolean',
            description: 'Whether the date input is disabled',
        },
        value: {
            control: 'text',
            description: 'Date value (YYYY-MM-DD format)',
        },
        min: {
            control: 'text',
            description: 'Minimum selectable date',
        },
        max: {
            control: 'text',
            description: 'Maximum selectable date',
        },
    },
} satisfies Meta<typeof AppDateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const WithValue: Story = {
    args: {
        value: '2026-05-14',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        value: '2026-05-14',
    },
};

export const WithMinMax: Story = {
    args: {
        min: '2026-01-01',
        max: '2026-12-31',
        value: '2026-05-14',
    },
};

export const CustomClassName: Story = {
    args: {
        className: 'w-96 rounded-xl border-2 border-green-500 px-6 py-3 focus:border-green-700 focus:ring-4 focus:ring-green-300',
        value: '2026-05-14',
    },
};

