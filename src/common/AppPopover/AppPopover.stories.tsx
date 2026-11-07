import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppPopover } from './AppPopover';

const meta = {
    title: 'Common/AppPopover',
    component: AppPopover,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        position: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'Position of the popover panel relative to the trigger',
        },
    },
} satisfies Meta<typeof AppPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

const trigger = (
    <button className="rounded bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-600">
        Open Popover
    </button>
);

export const Default: Story = {
    args: {
        trigger,
        children: (
            <p className="text-sm text-gray-700">This is the popover content. Click outside to close.</p>
        ),
        position: 'bottom',
    },
};

export const Top: Story = {
    args: {
        trigger,
        children: <p className="text-sm text-gray-700">Popover above the trigger.</p>,
        position: 'top',
    },
};

export const Left: Story = {
    args: {
        trigger,
        children: <p className="text-sm text-gray-700">Popover to the left.</p>,
        position: 'left',
    },
};

export const Right: Story = {
    args: {
        trigger,
        children: <p className="text-sm text-gray-700">Popover to the right.</p>,
        position: 'right',
    },
};

export const RichContent: Story = {
    args: {
        trigger,
        children: (
            <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900">Quick actions</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                    <li>
                        <button className="hover:underline">Edit profile</button>
                    </li>
                    <li>
                        <button className="hover:underline">Change password</button>
                    </li>
                    <li>
                        <button className="text-red-600 hover:underline">Sign out</button>
                    </li>
                </ul>
            </div>
        ),
        position: 'bottom',
    },
};
