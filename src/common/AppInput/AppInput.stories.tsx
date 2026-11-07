import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { AppInput } from './AppInput';

const meta = {
    title: 'Common/AppInput',
    component: AppInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        placeholder: {
            control: 'text',
            description: 'Placeholder text for the input',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the input is disabled',
        },
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'tel', 'url'],
            description: 'Input type',
        },
        value: {
            control: 'text',
            description: 'Input value',
        },
    },
} satisfies Meta<typeof AppInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByPlaceholderText('Enter text...');

        await userEvent.type(input, 'storybook input test');
        await expect(input).toHaveValue('storybook input test');
    },
};

export const WithValue: Story = {
    args: {
        placeholder: 'Enter text...',
        value: 'Sample text',
    },
};

export const Disabled: Story = {
    args: {
        placeholder: 'Disabled input',
        disabled: true,
        value: 'Cannot edit',
    },
};

export const Email: Story = {
    args: {
        type: 'email',
        placeholder: 'Enter email...',
    },
};

export const Password: Story = {
    args: {
        type: 'password',
        placeholder: 'Enter password...',
        value: 'secret123',
    },
};

export const Number: Story = {
    args: {
        type: 'number',
        placeholder: 'Enter number...',
    },
};

export const CustomClassName: Story = {
    args: {
        placeholder: 'Custom styled input',
        className: 'w-96 rounded-xl border-2 border-purple-500 px-6 py-3 focus:border-purple-700 focus:ring-4 focus:ring-purple-300',
    },
};
