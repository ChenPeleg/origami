import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { AppToastContainer } from './AppToastContainer';
import { ToastProvider } from './ToastContext';
import { useToast } from './useToast';

const meta = {
    title: 'Common/AppToast',
    component: AppToastContainer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <ToastProvider>
                <Story />
                <AppToastContainer />
            </ToastProvider>
        ),
    ],
} satisfies Meta<typeof AppToastContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastTriggers() {
    const { showSuccess, showError, showWarning, showInfo } = useToast();
    return (
        <div className="flex flex-wrap gap-2">
            <button
                className="rounded bg-green-500 px-3 py-2 text-sm text-white hover:bg-green-600"
                onClick={() => showSuccess('Operation completed successfully!')}
            >
                Success
            </button>
            <button
                className="rounded bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
                onClick={() => showError('Something went wrong. Please try again.')}
            >
                Error
            </button>
            <button
                className="rounded bg-yellow-400 px-3 py-2 text-sm text-gray-900 hover:bg-yellow-500"
                onClick={() => showWarning('Caution: this action cannot be undone.')}
            >
                Warning
            </button>
            <button
                className="rounded bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600"
                onClick={() => showInfo('Here is some useful information.')}
            >
                Info
            </button>
            <button
                className="rounded bg-gray-500 px-3 py-2 text-sm text-white hover:bg-gray-600"
                onClick={() => showInfo('This toast will not auto-dismiss.', 0)}
            >
                Persistent
            </button>
            <button
                className="rounded bg-purple-500 px-3 py-2 text-sm text-white hover:bg-purple-600"
                onClick={() => {
                    showSuccess('First success!');
                    showError('Oops! An error occurred.');
                    showWarning('Watch out!');
                    showInfo('Just so you know...');
                }}
            >
                Show all types
            </button>
        </div>
    );
}

export const Default: Story = {
    render: () => <ToastTriggers />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'Success' }));

        const toastMessage = await canvas.findByText('Operation completed successfully!');
        await expect(toastMessage).toBeVisible();

        await userEvent.click(canvas.getByRole('button', { name: 'Dismiss notification' }));
        await waitFor(() => {
            expect(canvas.queryByText('Operation completed successfully!')).not.toBeInTheDocument();
        });
    },
};
