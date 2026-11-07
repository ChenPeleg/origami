import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { AppModal } from './AppModal';

const meta = {
    title: 'Common/AppModal',
    component: AppModal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl', 'full'],
            description: 'Width of the modal dialog',
        },
        isOpen: { control: 'boolean' },
        showCloseButton: { control: 'boolean' },
    },
} satisfies Meta<typeof AppModal>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalWrapper(args: React.ComponentProps<typeof AppModal>) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button
                className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                onClick={() => setOpen(true)}
            >
                Open Modal
            </button>
            <AppModal {...args} isOpen={open} onClose={() => setOpen(false)} />
        </>
    );
}

export const Default: Story = {
    render: (args) => <ModalWrapper {...args} />,
    args: {
        title: 'Confirm action',
        children: <p className="text-sm text-gray-600">Are you sure you want to continue?</p>,
        isOpen: false,
        onClose: () => {},
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const root = within(canvasElement.ownerDocument.body);
        await userEvent.click(canvas.getByRole('button', { name: 'Open Modal' }));

        const headings = await root.findAllByRole('heading', { name: 'Confirm action' });
        const visibleHeading = headings.find((heading) => heading.offsetParent !== null);
        await expect(visibleHeading).toBeDefined();

        const closeButtons = await root.findAllByRole('button', { name: 'Close dialog' });
        const visibleCloseButton = closeButtons.find((button) => button.offsetParent !== null);
        await expect(visibleCloseButton).toBeDefined();
        await userEvent.click(visibleCloseButton!);

        await waitFor(() => {
            expect(root.queryByRole('heading', { name: 'Confirm action' })).not.toBeInTheDocument();
        });
    },
};

export const Small: Story = {
    render: (args) => <ModalWrapper {...args} />,
    args: {
        title: 'Small modal',
        size: 'sm',
        children: <p className="text-sm text-gray-600">A compact dialog for quick prompts.</p>,
        isOpen: false,
        onClose: () => {},
    },
};

export const Large: Story = {
    render: (args) => <ModalWrapper {...args} />,
    args: {
        title: 'Large modal',
        size: 'lg',
        children: <p className="text-sm text-gray-600">More room for detailed content.</p>,
        isOpen: false,
        onClose: () => {},
    },
};

export const WithoutTitle: Story = {
    render: (args) => <ModalWrapper {...args} />,
    args: {
        children: <p className="text-sm text-gray-600">No title, just content.</p>,
        isOpen: false,
        onClose: () => {},
    },
};

export const LongContent: Story = {
    render: (args) => <ModalWrapper {...args} />,
    args: {
        title: 'Scrollable content',
        size: 'md',
        children: (
            <div className="space-y-3 text-sm text-gray-600">
                {Array.from({ length: 15 }, (_, i) => (
                    <p key={i}>
                        Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                ))}
            </div>
        ),
        isOpen: false,
        onClose: () => {},
    },
};
