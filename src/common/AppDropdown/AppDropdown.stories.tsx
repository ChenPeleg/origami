import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { AppDropdown } from './AppDropdown';

const meta = {
    title: 'Common/AppDropdown',
    component: AppDropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        position: {
            control: 'select',
            options: ['left', 'right'],
            description: 'Alignment of the dropdown menu',
        },
    },
} satisfies Meta<typeof AppDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const triggerButton = (
    <button className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600">
        Open Menu ▾
    </button>
);

export const Default: Story = {
    args: {
        trigger: triggerButton,
        items: [
            { label: 'Edit', onClick: () => {} },
            { label: 'Duplicate', onClick: () => {} },
            { label: 'Delete', onClick: () => {} },
        ],
        position: 'left',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const root = within(canvasElement.ownerDocument.body);
        const trigger = canvas.getByRole('button', { name: /open menu/i });
        await userEvent.click(trigger);

        const editItems = await root.findAllByRole('menuitem', { name: 'Edit' });
        const visibleEditItem = editItems.find((item) => item.offsetParent !== null);
        await expect(visibleEditItem).toBeDefined();
        await userEvent.click(visibleEditItem!);
    },
};

export const RightAligned: Story = {
    args: {
        trigger: triggerButton,
        items: [
            { label: 'Edit', onClick: () => alert('Edit') },
            { label: 'Delete', onClick: () => alert('Delete') },
        ],
        position: 'right',
    },
};

export const WithIcons: Story = {
    args: {
        trigger: triggerButton,
        items: [
            {
                label: 'Edit',
                onClick: () => alert('Edit'),
                icon: (
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                ),
            },
            {
                label: 'Delete',
                onClick: () => alert('Delete'),
                icon: (
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                ),
            },
        ],
    },
};

export const WithDisabledItems: Story = {
    args: {
        trigger: triggerButton,
        items: [
            { label: 'Edit', onClick: () => alert('Edit') },
            { label: 'Rename (disabled)', onClick: () => {}, disabled: true },
            { label: 'Delete', onClick: () => alert('Delete') },
        ],
    },
};

export const WithDividers: Story = {
    args: {
        trigger: triggerButton,
        items: [
            { label: 'View', onClick: () => alert('View') },
            { label: 'Edit', onClick: () => alert('Edit'), divider: true },
            { label: 'Archive', onClick: () => alert('Archive') },
            { label: 'Delete', onClick: () => alert('Delete') },
        ],
    },
};
